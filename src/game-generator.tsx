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
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGenerationStep(i + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="text-white hover:text-purple-400 transition-colors duration-300 font-semibold">
              PROMPT GAMES AI
            </a>
            {isWalletConnected ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">
                  {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-500 hover:bg-purple-600 transition-all duration-300"
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
        <div className="bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50 shadow-lg h-[calc(100vh-8rem)] flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!isWalletConnected && (
              <div className="text-center text-gray-400 mt-8">
                Connect your Phantom wallet to start generating games
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-white'
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
                      <div key={index} className="flex items-center space-x-2 text-gray-300">
                        {index === generationStep ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-purple-500" />
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
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="flex space-x-4">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder={isWalletConnected ? "Describe your game idea..." : "Connect wallet to start generating"}
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={!isWalletConnected || isGenerating}
                title={!isWalletConnected ? "Please connect your Phantom wallet first" : ""}
              />
              <button
                type="submit"
                disabled={!isWalletConnected || isGenerating || !currentMessage.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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