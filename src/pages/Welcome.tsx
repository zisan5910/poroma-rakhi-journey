import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Mail, Sparkles, Heart } from 'lucide-react';
import poromaImage from "@/assets/poroma-image.png";
import { OptimizedImage } from "@/components/OptimizedImage";

const Welcome = () => {
  const [showEnvelope, setShowEnvelope] = useState(false);
  const navigate = useNavigate();

  const handleNextClick = () => {
    setShowEnvelope(true);
  };

  const handleEnvelopeClick = () => {
    setShowEnvelope(false);
    navigate('/letter');
  };

  return (
    <div className="min-h-screen bg-gradient-soft font-cute relative overflow-x-hidden">
      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <Heart className="absolute top-[10%] left-[10%] w-4 h-4 text-soft-pink/30 animate-float" style={{ animationDelay: '0s' }} />
        <Heart className="absolute top-[20%] right-[15%] w-3 h-3 text-warm-peach/40 animate-float" style={{ animationDelay: '2s' }} />
        <Heart className="absolute top-[60%] left-[5%] w-5 h-5 text-lavender/30 animate-float" style={{ animationDelay: '4s' }} />
        <Heart className="absolute bottom-[30%] right-[10%] w-4 h-4 text-soft-pink/25 animate-float" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute top-[40%] left-[80%] w-3 h-3 text-warm-peach/35 animate-sparkle" style={{ animationDelay: '3s' }} />
        <Sparkles className="absolute bottom-[50%] left-[20%] w-4 h-4 text-lavender/40 animate-sparkle" style={{ animationDelay: '5s' }} />
      </div>

      {/* Envelope Modal */}
      {showEnvelope && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="animate-envelope-pop cursor-pointer"
            onClick={handleEnvelopeClick}
          >
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-warm text-center transform hover:scale-105 transition-all duration-300 border border-warm-peach/20">
              <div className="relative">
                <Mail className="w-16 h-16 text-warm-peach mx-auto mb-4 animate-float" />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-lavender animate-sparkle" />
              </div>
              <p className="text-xl font-adorable text-foreground mb-2 bg-gradient-text bg-clip-text text-transparent">You have a letter! 💌</p>
              <p className="text-sm text-muted-foreground font-cute">Tap to open your surprise</p>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Page */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center relative z-20">
        <div className="max-w-md mx-auto space-y-6 sm:space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-adorable leading-tight">
              Happy Raksha Bandhan, 
              <span className="block text-warm-peach mt-2 font-playful bg-gradient-text bg-clip-text text-transparent animate-gradient-text">Poroma 💖</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-lovely px-2">
              Here's a little surprise made with love…
            </p>
          </div>

          <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <OptimizedImage
              src={poromaImage}
              alt="For my dear sister Poroma"
              className="w-full rounded-2xl overflow-hidden shadow-soft transform hover:scale-105 transition-all duration-500 border-2 border-white/20"
            />
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-soft border border-white/30 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm sm:text-base text-foreground font-sweet leading-relaxed">
              "Scroll through each step slowly. I have something special for you."
            </p>
          </div>

          <div className="animate-scale-in" style={{ animationDelay: '0.9s' }}>
            <Button 
              onClick={handleNextClick}
              className="bg-gradient-warm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium shadow-warm hover:shadow-lg transition-all duration-300 hover:scale-105 transform active:scale-95"
            >
              Next →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;