import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Wallet, MessageSquare, Loader } from 'lucide-react';

interface Message {
  type: 'user' | 'system';
  content: string;
}

interface PhantomWindow extends Window {
  solana?: {
    isPhantom?: boolean;
    connect: (options?: { onlyIfTrusted?: boolean }) => Promise<{
      publicKey: { toString: () => string };
    }>;
    disconnect: () => Promise<void>;
  }
}

declare const window: PhantomWindow;

// Add diagonal line animation
const diagonalStyles = `
  .diagonal-line {
    background: linear-gradient(45deg, transparent calc(50% - 1px), rgb(34, 197, 94) calc(50%), transparent calc(50% + 1px));
  }
`;

const GameGenerator: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const generationSteps = [
    "Analyzing prompt...",
    "Setting up core systems...",
    "Generating required assets...",
    "Configuring interactive elements...",
    "Building your game now..."
  ];

  useEffect(() => {
    if ("solana" in window) {
      const solana = window.solana;
      if (solana?.isPhantom) {
        solana.connect({ onlyIfTrusted: true })
          .then((response) => {
            setWalletAddress(response.publicKey.toString());
            setIsWalletConnected(true);
          })
          .catch(() => {
            // Not already connected, that's okay
          });
      }
    }
  }, []);

  const connectWallet = async () => {
    if ("solana" in window) {
      const solana = window.solana;
      
      if (!solana?.isPhantom) {
        alert("Please install Phantom Wallet to continue!");
        window.open("https://phantom.app/", "_blank");
        return;
      }

      try {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
        setIsWalletConnected(true);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install Phantom Wallet to continue!");
      window.open("https://phantom.app/", "_blank");
    }
  };

  const disconnectWallet = async () => {
    if ("solana" in window) {
      const solana = window.solana;
      if (solana?.isPhantom) {
        await solana.disconnect();
        setIsWalletConnected(false);
        setWalletAddress(null);
      }
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim() || !isWalletConnected) return;

    setMessages(prev => [...prev, { type: 'user', content: currentMessage }]);
    setCurrentMessage('');
    setIsGenerating(true);
    setGenerationStep(0);

    for (let i = 0; i < generationSteps.length - 1; i++) {
      await new Promise(resolve => setTimeout(resolve, 8000));
      setGenerationStep(i + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{diagonalStyles}</style>
      
      {/* Diagonal line decoration */}
      <div className="fixed inset-0 pointer-events-none diagonal-line opacity-20"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="text-white hover:text-green-400 transition-colors duration-300 font-semibold">
              GAME GEN AI
            </a>
            {isWalletConnected ? (
              <div className="flex items-center space-x-4">
                <span className="text-green-400">
                  {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="flex items-center space-x-2 px-4 py-2 border border-green-500/20 hover:border-green-500 bg-black text-white transition-all duration-300 hover:translate-x-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-black transition-all duration-300 hover:translate-x-2 border-l-4 border-green-600"
                title="Connect your Phantom wallet to start generating games"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <div className="bg-black border border-green-500/20 h-[calc(100vh-8rem)] flex flex-col">
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!isWalletConnected && (
              <div className="text-center text-green-400 mt-8">
                Connect your Phantom wallet to start generating games
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 ${
                  message.type === 'user'
                    ? 'bg-black border border-green-500'
                    : 'bg-black border border-green-500/20'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="space-y-4">
                {generationSteps.map((step, index) => {
                  if (index <= generationStep) {
                    return (
                      <div key={index} className="flex items-center space-x-2 text-green-400">
                        {index === generationStep ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <div className="w-4 h-4 border border-green-500 bg-green-500"></div>
                        )}
                        <span>{step}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-green-500/20">
            <div className="flex space-x-4">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder={isWalletConnected ? "Describe your game idea..." : "Connect wallet to start generating"}
                className="flex-1 bg-black text-white border border-green-500/20 px-4 py-2 focus:outline-none focus:border-green-500 transition-colors duration-300"
                disabled={!isWalletConnected || isGenerating}
                title={!isWalletConnected ? "Please connect your Phantom wallet first" : ""}
              />
              <button
                type="submit"
                disabled={!isWalletConnected || isGenerating || !currentMessage.trim()}
                className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:translate-x-2 border-l-4 border-green-600"
                title={!isWalletConnected ? "Please connect your Phantom wallet first" : ""}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Generate</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GameGenerator;
