import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Sparkles } from 'lucide-react';

const Letter = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = () => {
    const subject = "Raksha Bandhan Letter for You";
    const body = encodeURIComponent(message);
    const mailtoLink = `mailto:ridoan.zisan@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.open(mailtoLink);
  };

  const handleNextClick = () => {
    navigate('/promise');
  };

  return (
    <div className="min-h-screen bg-gradient-soft font-cute relative">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <Heart className="absolute top-[15%] right-[10%] w-4 h-4 text-soft-pink/25 animate-float" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute top-[30%] left-[8%] w-3 h-3 text-warm-peach/30 animate-sparkle" style={{ animationDelay: '2s' }} />
        <Heart className="absolute bottom-[25%] left-[15%] w-5 h-5 text-lavender/20 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Letter Page */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-20">
        <div className="max-w-lg mx-auto space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-6 sm:mb-8 font-adorable animate-fade-in bg-gradient-text bg-clip-text text-transparent">
            A Letter for You
          </h2>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-soft border border-white/30 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="font-handwriting text-base sm:text-lg leading-relaxed text-foreground space-y-4">
              <p>Dear Poroma,</p>
              <p>
                On this special day, I want you to know that you are more than just a sister to me; 
                you are my greatest inspiration.
              </p>
              <p>
                Your kindness illuminates the world around you, and your laughter fills my days with pure joy. 
                Even though we aren't connected by blood, you are the most special person in my life.
              </p>
              <p>
                No matter where our journeys take us, always remember that I'm just a call away.
              </p>
              <div className="text-right mt-6">
                <p>With all my love,</p>
                <p className="font-bold">Your Brother 🤍</p>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-soft space-y-4 border border-white/30 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Textarea
              placeholder="Write something for me? 💕"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] border-soft-pink/30 focus:border-warm-peach resize-none font-lovely text-sm sm:text-base bg-white/80 backdrop-blur-sm transition-all duration-300 focus:bg-white/95"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-full bg-soft-pink text-foreground hover:bg-soft-pink/80 rounded-xl py-3 font-medium disabled:opacity-50 font-sweet transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Send 💌
            </Button>
          </div>

          <div className="flex justify-center animate-scale-in" style={{ animationDelay: '0.9s' }}>
            <Button 
              onClick={handleNextClick}
              className="bg-gradient-warm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium shadow-warm hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Next →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Letter;