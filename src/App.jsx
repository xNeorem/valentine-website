
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// 📸 CONFIGURATION
const PARTNER_NAME = "Anna";
const memories = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600&auto=format&fit=crop",
    caption: "Our first date 🍷"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop",
    caption: "Just you being cute 🥰"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
    caption: "I love this memory ❤️"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600&auto=format&fit=crop",
    caption: "Forever & Always ♾️"
  }
];

export default function App() {
  const [step, setStep] = useState(0);
  const [clickHearts, setClickHearts] = useState([]);

  // Handle global clicks to spawn hearts anywhere
  const handleGlobalClick = (e) => {
    // Check if target is interactive to avoid double triggers if needed, 
    // but for "tap anywhere" we generally want the heart effect too!

    // Select either orange or white random heart
    const randomHeart = Math.random() > 0.5 ? "🧡" : "🤍";

    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      emoji: randomHeart
    };
    setClickHearts(prev => [...prev, newHeart]);

    // Cleanup heart after animation
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center"
      onClick={handleGlobalClick}
    >
      <FloatingHearts />

      {/* Click Hearts Layer */}
      {clickHearts.map(heart => (
        <div
          key={heart.id}
          className="click-heart"
          style={{ left: heart.x, top: heart.y }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center justify-center min-h-[500px]">
        <AnimatePresence mode="wait">
          {step === 0 && <WelcomeStep onNext={() => setStep(1)} />}
          {step === 1 && <CardStackGallery memories={memories} onNext={() => setStep(2)} />}
          {step === 2 && <ProposalStep onYes={() => setStep(3)} />}
          {step === 3 && <SuccessStep />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 1. WELCOME STEP - CLICK ANYWHERE
// ----------------------------------------------------
// ----------------------------------------------------
// 1. WELCOME STEP - ENVELOPE STYLE
// ----------------------------------------------------
function WelcomeStep({ onNext }) {
  return (
    <motion.div
      className="relative cursor-pointer group flex flex-col items-center justify-center"
      onClick={onNext}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 1.4, opacity: 0, rotateX: 90 }}
      transition={{ duration: 0.5 }}
    >
      {/* Envelope */}
      <div className="relative w-[480px] h-[320px] bg-[#fff0f5] shadow-[0_30px_60px_rgba(0,0,0,0.25)] rounded-xl flex items-center justify-center overflow-hidden border border-rose-100">

        {/* Back Paper */}
        <div className="absolute inset-4 bg-white rounded-lg shadow-sm"></div>

        {/* Side Folds */}
        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[240px] border-l-[#ffc1cc] border-t-[160px] border-t-transparent z-10"></div>
        <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[240px] border-r-[#ffc1cc] border-t-[160px] border-t-transparent z-10"></div>

        {/* Bottom Fold */}
        <div className="absolute bottom-0 w-0 h-0 border-l-[240px] border-l-transparent border-r-[240px] border-r-transparent border-b-[190px] border-b-[#ffb3c1] z-20"></div>

        {/* Top Flap */}
        <div className="absolute top-0 w-0 h-0 border-l-[240px] border-l-transparent border-r-[240px] border-r-transparent border-t-[190px] border-t-[#ff9aad] z-30 origin-top shadow-xl group-hover:scale-y-90 transition-transform duration-300"></div>

        {/* Label */}
        <div className="absolute z-40 bg-white/90 px-10 py-4 rounded-lg shadow-md border border-rose-100 -rotate-2 transition-transform group-hover:rotate-0">
          <p className="font-title text-[#FF3366] font-bold text-3xl tracking-wide">
            For {PARTNER_NAME}
          </p>
        </div>

        {/* Wax Seal */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-20 h-20 bg-[#d41c3c] rounded-full border-4 border-[#b0102b] shadow-2xl flex items-center justify-center text-4xl text-white">
            💌
          </div>
        </motion.div>
      </div>

      {/* Tap text */}
      <motion.p
        className="mt-20 text-white font-bold text-4xl drop-shadow-lg font-title uppercase tracking-widest bg-black/10 px-8 py-3 rounded-full backdrop-blur-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Tap to open
      </motion.p>
    </motion.div>
  );
}

// ----------------------------------------------------
// 2. CARD STACK GALLERY
// ----------------------------------------------------
function CardStackGallery({ memories, onNext }) {
  const [cards, setCards] = useState(memories);

  const removeCard = (id) => {
    setCards((current) => current.filter((card) => card.id !== id));
    if (cards.length <= 1) {
      setTimeout(onNext, 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-[450px] flex items-center justify-center"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute -top-16 text-[#FF3366] text-2xl font-title font-bold bg-white/90 px-6 py-2 rounded-full shadow-md z-50 text-center"
        style={{ width: 'max-content' }}
      >
        Tap to continue!
      </motion.h2>

      <AnimatePresence>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            data={card}
            index={index}
            onRemove={() => removeCard(card.id)}
          />
        )).reverse()}
      </AnimatePresence>
    </motion.div>
  );
}

function Card({ data, index, onRemove }) {
  const isFront = index === 0;

  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{
        scale: 1 - index * 0.05,
        y: index * 15,
        rotate: index % 2 === 0 ? index * 2 : index * -2,
        opacity: 1,
        zIndex: 100 - index
      }}
      exit={{
        x: Math.random() < 0.5 ? -300 : 300,
        y: Math.random() < 0.5 ? -100 : 100,
        opacity: 0,
        transition: { duration: 0.4 }
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(e, info) => {
        if (Math.abs(info.offset.x) > 100) onRemove();
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (isFront) onRemove();
      }}
      className="card-stack-item cursor-grab active:cursor-grabbing border-4 border-white"
    >
      <div className="card-image mb-4 shadow-sm pointer-events-none">
        <img src={data.url} alt="Memory" draggable="false" />
      </div>
      <div className="text-center pointer-events-none">
        <p className="text-[#4A0E1C] font-title text-xl font-bold">
          {data.caption}
        </p>
      </div>

      {isFront && (
        <div className="absolute top-4 right-4 text-white drop-shadow-md animate-pulse text-3xl pointer-events-none">
          👆
        </div>
      )}
    </motion.div>
  );
}

// ----------------------------------------------------
// 3. PROPOSAL STEP
// ----------------------------------------------------
function ProposalStep({ onYes }) {
  const [noCount, setNoCount] = useState(0);

  const handleNo = (e) => {
    e.stopPropagation();
    setNoCount((prev) => prev + 1);
  };

  const phrases = [
    "No",
    "Are you sure?",
    "Really??",
    "Pleaseee",
    "I'm crying",
    "This hurts...",
    "Wait",
    "Hold on!",
    "Let's talk about this",
    "We can fix it",
    "Think again",
    "This feels wrong",
    "I'm begging you",
    "You wouldn't do this",
    "Heart = broken",
    "Why are you like this",
    "This is dramatic",
    "I'm offended",
    "Emotionally damaged",
    "Ok but… why?",
    "This is a choice",
    "Bad choice",
    "I'm disappointed",
    "System error",
    "Are you testing me?",
    "This is illegal",
    "ok anche meno",
    "vabbè",
    "MA CHE STAI FACENN",
    "AOOO E BAST AAMM CAPIT"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center w-full px-4"
    >
      <div className="glass-panel p-6 mb-8 relative overflow-hidden">
        <h1 className="text-3xl font-bold text-[#FF3366] font-title leading-tight">
          {PARTNER_NAME}, will you be my Valentine? 💘
        </h1>

        {/* floating hearts */}
        {noCount > 0 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(Math.min(noCount, 6))].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-pink-400 text-xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: "-10%",
                }}
                animate={{ y: -120, opacity: 0 }}
                transition={{ duration: 2 + Math.random() }}
              >
                ❤️
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>

      <div className="relative h-40 w-full flex justify-center items-center">
        {/* YES BUTTON */}
        <motion.button
          className="absolute z-20 btn-main py-4 px-12 text-xl shadow-2xl rounded-full"
          style={{ backgroundColor: '#2ecc71', minWidth: '220px' }}
          onClick={(e) => {
            e.stopPropagation();
            onYes();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: 1 + noCount * 0.12,
            boxShadow: `0 0 ${20 + noCount * 8}px rgba(46,204,113,0.8)`
          }}
        >
          YES! ❤️😍
        </motion.button>

        {/* NO BUTTON */}
        <motion.button
          className="absolute bg-white/60 text-rose-500 font-bold py-2 px-6 rounded-full shadow-md border-2 border-dashed border-rose-300 backdrop-blur-sm"
          style={{ top: '110%', zIndex: 10 }}
          whileHover={{ scale: 0.9, rotate: 12 }}
          animate={{
            x: noCount === 0 ? 0 : [0, 120, -120, 80, -80][noCount % 5],
            y: noCount === 0 ? 0 : [0, 140, -140, 100, -100][noCount % 5],
            rotate: noCount === 0 ? 0 : [0, 25, -25, 15, -15][noCount % 5],
            opacity: noCount > 6 ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
          onClick={handleNo}
        >
          {phrases[Math.min(noCount, phrases.length - 1)]}
        </motion.button>
      </div>
    </motion.div>
  );
}


// ----------------------------------------------------
// 4. SUCCESS STEP
// ----------------------------------------------------
function SuccessStep() {
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowLetter(true), 1000);
    const end = Date.now() + 5000;
    const colors = ['#bb0000', '#ffffff', '#ff69b4'];
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring" }}
        className="text-center mb-8"
      >
        <motion.img
          src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
          className="w-40 mx-auto mb-4 rounded-xl shadow-lg border-4 border-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        />
        <h1 className="text-5xl font-bold text-[#FF3366] font-title drop-shadow-sm">YAY!!!</h1>
      </motion.div>

      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 max-w-xs border-t-4 border-rose-400 transform -rotate-1 bg-white"
          >
            <p className="text-xl text-gray-800 font-body leading-relaxed font-bold">
              "I knew you'd say yes! You make every day special. I love you so much!"
            </p>
            <div className="mt-6 text-right text-xs text-rose-500 font-sans uppercase tracking-widest font-bold">
              See you on the 14th 🌹
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------
// BACKGROUND
// ----------------------------------------------------
function FloatingHearts() {
  const [hearts] = useState(() => {
    const emojis = ["❤️", "🌷", "🌸", "🌹", "🌺", "💖", "💕", "🧡", "🤍"];
    return [...Array(60)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 20,
      size: Math.random() * 4 + 1, // Random size between 1rem and 3rem
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));
  });

  return (
    <div className="floating-hearts-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}rem`
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}
