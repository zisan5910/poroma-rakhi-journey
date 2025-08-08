import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Heart, Check, Home, Sparkles } from 'lucide-react';
import rakhiImage from "@/assets/rakhi-illustration.png";
import { OptimizedImage } from "@/components/OptimizedImage";

const Promise = () => {
  const navigate = useNavigate();

  const promises = [
    "I promise to protect you — always",
    "I promise to listen, not just hear",
    "I promise to walk beside you in every storm",
    "I promise to cheer you on in all your wins",
    "I promise to always be your safe space"
  ];

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-soft font-cute relative">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <Heart className="absolute top-[12%] left-[8%] w-5 h-5 text-soft-pink/30 animate-float" style={{ animationDelay: '0s' }} />
        <Sparkles className="absolute top-[25%] right-[12%] w-4 h-4 text-warm-peach/35 animate-sparkle" style={{ animationDelay: '1.5s' }} />
        <Heart className="absolute bottom-[20%] right-[8%] w-4 h-4 text-lavender/25 animate-float" style={{ animationDelay: '3s' }} />
        <Sparkles className="absolute bottom-[40%] left-[10%] w-3 h-3 text-soft-pink/30 animate-sparkle" style={{ animationDelay: '4s' }} />
      </div>

      {/* Promise Page */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-20">
        <div className="max-w-lg mx-auto space-y-6 sm:space-y-8 text-center">
          {/* Rakhi illustration */}
          <div className="animate-scale-in">
            <OptimizedImage
              src={rakhiImage}
              alt="Brother and sister rakhi illustration"
              className="w-full rounded-2xl overflow-hidden shadow-soft transform hover:scale-105 transition-all duration-500 border-2 border-white/20"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-adorable animate-fade-in bg-gradient-text bg-clip-text text-transparent" style={{ animationDelay: '0.3s' }}>
            My Promises to You 💞
          </h2>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-soft space-y-3 sm:space-y-4 border border-white/30 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {promises.map((promise, index) => (
              <div key={index} className="flex items-start space-x-3 text-left transform hover:scale-105 transition-all duration-300" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                <Check className="w-4 sm:w-5 h-4 sm:h-5 text-warm-peach mt-1 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground font-sweet leading-relaxed">
                  {promise}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-soft border border-white/30 animate-scale-in" style={{ animationDelay: '1.2s' }}>
            <p className="text-base sm:text-lg font-lovely text-foreground leading-relaxed mb-4">
              "No matter what happens in life, you'll always have me as your brother."
            </p>
            <p className="text-sm sm:text-base font-playful text-warm-peach">
              — Your Brother 💖
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="animate-scale-in" style={{ animationDelay: '1.5s' }}>
            <Button 
              onClick={handleBackToHome}
              className="bg-lavender text-foreground hover:bg-lavender/80 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto font-sweet"
            >
              <Home className="w-4 sm:w-5 h-4 sm:h-5" />
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promise;