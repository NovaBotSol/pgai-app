import React, { useState } from 'react';
import { Layout, Text, ChevronRight, Gamepad2, Users, Coins } from 'lucide-react';

// Add the keyframes for the title glow animation
const glowKeyframes = `
  @keyframes titleGlow {
    0%, 100% {
      color: rgb(74, 222, 128);
      text-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
    }
    50% {
      color: rgb(34, 197, 94);
      text-shadow: 0 0 30px rgba(34, 197, 94, 0.7);
    }
  }
  
  .animate-title-glow {
    animation: titleGlow 3s ease-in-out infinite;
  }

  .diagonal-line {
    background: linear-gradient(45deg, transparent calc(50% - 1px), rgb(34, 197, 94) calc(50%), transparent calc(50% + 1px));
  }
`;

interface Section {
  title: string;
  content: string;
  icon: React.ReactNode;
}

interface Sections {
  [key: string]: Section;
}

interface HoverTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body';
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface TokenCardProps {
  title: string;
  description: string;
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<string>('technology');

  const sections: Sections = {
    technology: {
      title: 'Technology',
      content: `GAME GEN AI is a groundbreaking platform that harnesses cutting-edge AI and blockchain technology to transform simple text prompts into fully playable video games. Our advanced AI models handle everything from game mechanics to assets and storylines, while blockchain integration ensures secure transactions and ownership.`,
      icon: <Layout className="w-12 h-12 text-green-500" />
    },
    monetization: {
      title: 'Monetization & Marketplace',
      content: `Turn your creativity into income with our comprehensive monetization system. Upload your generated games to the platform, and earn $GGAI tokens from in-game transactions. Track your revenue in real-time, and if you decide, place your game for sale on our marketplace for your desired price.`,
      icon: <Coins className="w-12 h-12 text-green-500" />
    },
    ecosystem: {
      title: 'Complete Gaming Ecosystem',
      content: `Join a thriving metaverse where creators and players interact seamlessly. Use $GGAI tokens for in-game purchases, marketplace transactions, and revenue sharing. Our platform combines AI game generation, secure wallet integration, and blockchain transactions to create a self-sustaining gaming economy.`,
      icon: <Text className="w-12 h-12 text-green-500" />
    }
  };

  const HoverText: React.FC<HoverTextProps> = ({ children, variant = 'body' }) => {
    const baseStyles = "inline-block transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:text-green-400";
    const variants: { [key: string]: string } = {
      h1: "text-6xl font-bold tracking-tight",
      h2: "text-4xl font-bold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
      body: "text-lg"
    };
    
    return (
      <span className={`${baseStyles} ${variants[variant]}`}>
        {children}
      </span>
    );
  };

  const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
    <div className="relative group p-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg group-hover:bg-black transform transition-all duration-500 border border-green-500/20 group-hover:border-green-500 shadow-lg"></div>
      <div className="relative flex flex-col items-start justify-center h-80 text-left">
        <div className="mb-6 transform transition-all duration-500 group-hover:scale-105">
          {icon}
        </div>
        <div className="mb-4 transform transition-all duration-500 group-hover:translate-x-2">
          <HoverText variant="h3">{title}</HoverText>
        </div>
        <div className="transform transition-all duration-500 group-hover:translate-x-2">
          <HoverText>{description}</HoverText>
        </div>
      </div>
    </div>
  );

  const TokenCard: React.FC<TokenCardProps> = ({ title, description }) => (
    <div className="relative group p-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg group-hover:bg-black transform transition-all duration-500 border border-green-500/20 group-hover:border-green-500 shadow-lg"></div>
      <div className="relative flex flex-col items-start justify-center h-80 text-left">
        <div className="mb-4 transform transition-all duration-500 group-hover:translate-x-2">
          <HoverText variant="h4">{title}</HoverText>
        </div>
        <div className="transform transition-all duration-500 group-hover:translate-x-2">
          <HoverText>{description}</HoverText>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{glowKeyframes}</style>
      
      {/* Diagonal line decoration */}
      <div className="fixed inset-0 pointer-events-none diagonal-line opacity-20"></div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a 
              href="https://pump.fun" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-green-400 transition-colors duration-300 font-semibold"
            >
              Buy $GGAI
            </a>

            <div className="flex items-center space-x-6">
              <span className="text-white mr-4">Join GGAI Community</span>
              <a 
                href="https://x.com/GameGenAI" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-green-400 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://t.me/GGAIPORTALL" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-green-400 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.224-.535.224l.188-2.69 4.896-4.43c.217-.19-.047-.297-.335-.107l-6.054 3.81-2.605-.81c-.564-.188-.576-.564.117-.836l10.13-3.91c.468-.176.878.106.698 1.777z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.1),transparent_50%)] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Hero Section */}
          <div className="text-center mb-24 relative">
            <div className="mb-6">
              <h1 className="text-6xl font-bold tracking-tight animate-title-glow">
                GAME GEN AI
              </h1>
            </div>
            <div className="mb-12 max-w-2xl mx-auto">
              <HoverText>
                Transform Your Ideas Into Games and Earn With $GGAI
              </HoverText>
            </div>
            <button 
              onClick={() => window.location.href = '/generate'} 
              className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 transition-all duration-300 hover:translate-x-2 border border-green-600"
            >
              Start Creating
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-24 bg-green-500/20">
            <div>
              <FeatureCard
                title="AI Game Generation"
                description="Transform text prompts into fully playable games using our advanced AI technology"
                icon={<Gamepad2 className="w-16 h-16 text-green-500" />}
              />
            </div>
            <div>
              <FeatureCard
                title="Creator Economy"
                description="Generate income by selling your games and earning from in-game transactions"
                icon={<Coins className="w-16 h-16 text-green-500" />}
              />
            </div>
            <div>
              <FeatureCard
                title="Gaming Metaverse"
                description="Join a thriving ecosystem where creators earn and players enjoy unique gaming experiences"
                icon={<Users className="w-16 h-16 text-green-500" />}
              />
            </div>
          </div>

          {/* Tabs Section */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="flex justify-center mb-8 flex-wrap gap-4">
              {Object.keys(sections).map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveTab(section)}
                  className={`px-8 py-3 transform transition-all duration-300 hover:translate-x-2 ${
                    activeTab === section
                      ? 'bg-green-500 text-black border border-green-600'
                      : 'bg-black text-white border border-green-500/20 hover:border-green-500'
                  }`}
                >
                  <span className="font-semibold">{sections[section].title}</span>
                </button>
              ))}
            </div>

            <div className="relative p-8 bg-black">
              <div className="absolute inset-0 border border-green-500/20 transform transition-all duration-500 group-hover:border-green-500"></div>
              <div className="relative">
                <div className="flex items-start mb-8">
                  {sections[activeTab].icon}
                  <div className="ml-6">
                    <HoverText variant="h2">{sections[activeTab].title}</HoverText>
                  </div>
                </div>
                <div className="text-lg leading-relaxed">
                  <HoverText>{sections[activeTab].content}</HoverText>
                </div>
              </div>
            </div>
          </div>

          {/* Token Section */}
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <HoverText variant="h2">$GGAI Token Utility</HoverText>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-green-500/20">
              <TokenCard
                title="In-Game Currency"
                description="$GGAI serves as the foundation for all in-game transactions and marketplace activities"
              />
              <TokenCard
                title="Creator Earnings"
                description="Monetize your games through sales and earn $GGAI from every in-game transaction"
              />
              <TokenCard
                title="Real-Time Analytics"
                description="Track your game's performance and revenue generation in real-time on the blockchain"
              />
              <TokenCard
                title="Sustainable Economics"
                description="GGAI team takes 10% of all revenue generated, 5% supports platform development & 5% is automatically burned"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
