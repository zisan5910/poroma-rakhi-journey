import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Mail, Check } from 'lucide-react';
import poromaImage from "@/assets/poroma-image.png";

const RakshaBandhanGift = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [message, setMessage] = useState('');

  const scrollToSection = (index: number) => {
    setCurrentSection(index);
    document.getElementById(`section-${index}`)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleNextFromWelcome = () => {
    setShowEnvelope(true);
  };

  const handleEnvelopeClick = () => {
    setShowEnvelope(false);
    scrollToSection(1);
  };

  const handleSendMessage = () => {
    const subject = "Raksha Bandhan Letter for You";
    const body = encodeURIComponent(message);
    const mailtoLink = `mailto:ridoan.zisan@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.open(mailtoLink);
  };

  const promises = [
    "I promise to protect you — always",
    "I promise to listen, not just hear",
    "I promise to walk beside you in every storm",
    "I promise to cheer you on in all your wins",
    "I promise to always be your safe space"
  ];

  return (
    <div className="min-h-screen bg-gradient-soft font-poppins relative overflow-x-hidden">
      {/* Envelope Modal */}
      {showEnvelope && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="animate-envelope-pop cursor-pointer"
            onClick={handleEnvelopeClick}
          >
            <div className="bg-white p-8 rounded-3xl shadow-warm text-center transform hover:scale-105 transition-transform">
              <Mail className="w-16 h-16 text-warm-peach mx-auto mb-4 animate-float" />
              <p className="text-lg font-handwriting text-foreground mb-2">You have a letter! 💌</p>
              <p className="text-sm text-muted-foreground">Tap to open</p>
            </div>
          </div>
        </div>
      )}

      {/* Section 1: Welcome Page */}
      <section id="section-0" className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground font-poppins">
              Happy Raksha Bandhan, 
              <span className="block text-warm-peach mt-2">Poroma 💖</span>
            </h1>
            <p className="text-lg text-muted-foreground font-handwriting">
              Here's a little surprise made with love…
            </p>
          </div>

          <div className="w-full rounded-2xl overflow-hidden shadow-soft">
            <img 
              src={poromaImage} 
              alt="For my dear sister Poroma"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
            <p className="text-base text-foreground font-handwriting leading-relaxed">
              "Scroll through each step slowly. I have something special for you."
            </p>
          </div>

          <Button 
            onClick={handleNextFromWelcome}
            className="bg-gradient-warm text-white px-8 py-4 rounded-full text-lg font-medium shadow-warm hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Next →
          </Button>
        </div>
      </section>

      {/* Section 2: Letter Page */}
      <section id="section-1" className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-lg mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            A Letter for You
          </h2>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-soft">
            <div className="font-handwriting text-lg leading-relaxed text-foreground space-y-4">
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

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-soft space-y-4">
            <Textarea
              placeholder="Write something for me?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] border-soft-pink/30 focus:border-warm-peach resize-none font-handwriting text-base"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="w-full bg-soft-pink text-foreground hover:bg-soft-pink/80 rounded-xl py-3 font-medium disabled:opacity-50"
            >
              Send 💌
            </Button>
          </div>

          <Button 
            onClick={() => scrollToSection(2)}
            className="bg-gradient-warm text-white px-8 py-4 rounded-full text-lg font-medium shadow-warm hover:shadow-lg transition-all duration-300 hover:scale-105 mx-auto block"
          >
            Next →
          </Button>
        </div>
      </section>

      {/* Section 3: Promise Page */}
      <section id="section-2" className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-lg mx-auto space-y-8 text-center">
          {/* Placeholder for rakhi illustration */}
          <div className="w-full h-48 bg-gradient-warm rounded-2xl shadow-soft flex items-center justify-center">
            <div className="text-white font-handwriting text-center">
              <Heart className="w-12 h-12 mx-auto mb-2 animate-heart-pulse" />
              <p className="text-lg">Rakhi Illustration</p>
              <p className="text-sm opacity-80">(Brother & Sister)</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-foreground">
            My Promises to You 💞
          </h2>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-soft space-y-4">
            {promises.map((promise, index) => (
              <div key={index} className="flex items-start space-x-3 text-left">
                <Check className="w-5 h-5 text-warm-peach mt-1 flex-shrink-0" />
                <p className="text-base text-foreground font-handwriting leading-relaxed">
                  {promise}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
            <p className="text-lg font-handwriting text-foreground leading-relaxed mb-4">
              "No matter what happens in life, you'll always have me as your brother."
            </p>
            <p className="text-base font-handwriting text-warm-peach">
              — Your Brother 💖
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RakshaBandhanGift;