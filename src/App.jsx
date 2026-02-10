import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// 📸 CONFIGURATION
const PARTNER_NAME = ""; // Add your partner's name here
const memories = [
  {
    id: 1,
    url: "/images/photo_5785047410294852967_y.jpg",
    caption: "We are art"
  },
  {
    id: 2,
    url: "/images/photo_5785047410294852968_y.jpg",
    caption: "Kisses strong like a waterfall "
  },
  {
    id: 3,
    url: "/images/photo_5785047410294852972_y.jpg",
    caption: "Just you being cute"
  },
  {
    id: 4,
    url: "/images/photo_5785047410294852976_y.jpg",
    caption: "Wet but happy"
  },
  {
    id: 5,
    url: "/images/photo_5785047410294852990_y.jpg",
    caption: "Beer and sea together?"
  },
  {
    id: 6,
    url: "/images/photo_5785047410294852981_y.jpg",
    caption: "Some more tulips"
  },
  {
    id: 7,
    url: "/images/photo_5785047410294852977_y.jpg",
    caption: "I love you! ❤️"
  },
];

const PROPOSAL_PHRASES = [
  // --- ENGLISH ---
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
  "I'm disappointed",
  "This is illegal",
  "Nooooo, seriously?",
  "This is so wrong",
  "I'm emotionally crushed",

  // --- ITALIAN ---
  "Dai, ripensaci!",
  "Per favore, noooo!",
  "Aspetta, fermati",
  "Che dolore",
  "ok anche meno",
  "vabbè",

  // --- NAPOLETANO ---
  "Sto piangenn'",
  "Nun me fa' chist!",
  "Ma pecché??",
  "Dai, nun fa accussì!",
  "Sto morenn'",
  "MA CHE STAI FACENN",
  "AOOO E BAST AAMM CAPIT",
];

export default function App() {
  const [step, setStep] = useState(0);
  const [clickHearts, setClickHearts] = useState([]);
  const [noCount, setNoCount] = useState(0);

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
      <div className="relative z-10 w-full px-4 md:px-20 flex flex-col items-center justify-center min-h-screen md:min-h-[500px]">
        <AnimatePresence mode="wait">
          {step === 0 && <WelcomeStep onNext={() => setStep(1)} />}
          {step === 1 && <CardStackGallery memories={memories} onNext={() => setStep(2)} />}
          {step === 2 && <ProposalStep noCount={noCount} setNoCount={setNoCount} onYes={() => setStep(3)} />}
          {step === 3 && <SuccessStep noCount={noCount} />}
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
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) setIsOpen(true);
    else onNext();
  };

  return (
    <motion.div
      className="relative cursor-pointer flex flex-col items-center justify-center p-8"
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 1.2, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-80 h-52 perspective-[1200px]">
        {/* ================= BACK OF ENVELOPE ================= */}
        <div className="absolute inset-0 bg-white rounded-xl shadow-lg z-0 border border-gray-100" />

        {/* ================= FLAP ================= */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0 origin-top z-40"
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[120px] border-t-white drop-shadow-md"
            style={{ backfaceVisibility: "hidden" }}
          />

          {/* Wax seal */}
        </motion.div>

        {/* ================= LETTER ================= */}
        <motion.div
          className="absolute top-2 left-4 right-4 h-48 bg-white rounded-xl shadow-inner border border-rose-100 overflow-hidden flex flex-col items-center pt-10"
          style={{ zIndex: isOpen ? 15 : 5 }}
          animate={{
            y: isOpen ? -85 : 10,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.5,
            delay: isOpen ? 0.25 : 0,
            ease: "easeOut",
          }}
        >
          {/* Heart emoji pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,
                <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'>
                  <text x='6' y='24' font-size='18'>&#10084;&#65039;</text>
                </svg>")
              `,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Decorative frame */}
          <div className="absolute inset-3 border border-rose-200 rounded-lg pointer-events-none">
            {[
              "-top-2 -left-2",
              "-top-2 -right-2",
              "-bottom-2 -left-2",
              "-bottom-2 -right-2",
            ].map((pos, i) => (
              <span
                key={i}
                className={`absolute ${pos} text-rose-400 text-sm`}
              >
                ❤
              </span>
            ))}
          </div>

          <p className="relative z-10 font-title text-rose-500 text-xl font-semibold tracking-wide text-center px-4">
            For {PARTNER_NAME}
          </p>
          <p className="relative z-10 font-body text-rose-500 text-md font-semibold tracking-wide text-center px-3">
            There are a lot of our memories some are good and some are bad but I will always love you no matter what
          </p>
        </motion.div>

        {/* ================= WAX SEAL ================= */}
        {!isOpen && (
          <div
            className="absolute left-1/2 -translate-x-1/2 z-100 pointer-events-none"
            style={{ top: "85px" }}
          >
            <svg
              viewBox="0 0 32 32"
              className="w-16 h-16 drop-shadow-xl fill-rose-600 stroke-rose-400 stroke-1"
            >
              <path d="M16 28.5L14.1 26.8C7.33333 20.6667 3 16.7333 3 12.1667C3 8.41667 5.91667 5.5 9.66667 5.5C11.7833 5.5 13.8167 6.48333 15.1167 8.05L16 9.11667L16.8833 8.05C18.1833 6.48333 20.2167 5.5 22.3333 5.5C26.0833 5.5 29 8.41667 29 12.1667C29 16.7333 24.6667 20.6667 17.9 26.8L16 28.5Z" />
              <text
                x="16"
                y="17"
                fontSize="8"
                fill="white"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                ❤
              </text>
            </svg>
          </div>
        )}


        {/* ================= ENVELOPE FRONT ================= */}
        <div className="absolute inset-0 z-20 pointer-events-none rounded-xl overflow-hidden">
          {/* Left fold */}
          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-l-rose-50/30 border-t-[104px] border-t-transparent" />
          {/* Right fold */}
          <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[160px] border-r-rose-50/30 border-t-[104px] border-t-transparent" />
          {/* Bottom fold */}
          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-b-[110px] border-b-white drop-shadow-[-0_-5px_10px_rgba(0,0,0,0.03)]" />
        </div>
      </div>

      {/* ================= CTA ================= */}
      <motion.p
        className="mt-16 text-white/90 font-bold text-lg md:text-xl font-title tracking-widest bg-rose-500/30 px-8 py-3 rounded-full backdrop-blur-sm border border-white/20 shadow-lg"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {!isOpen ? "TAP TO OPEN 💌" : "TAP TO CONTINUE! ✨"}
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
      className="relative w-[85vw] max-w-[350px] h-[60vh] md:h-[500px] flex items-center justify-center mx-auto"
    >

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
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{
        scale: 1 - index * 0.05,
        y: index * 10,
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
      <div className="card-image flex-1 mb-3 shadow-sm relative overflow-hidden bg-gray-100 rounded-xl min-h-[220px]">
        <img
          src={data.url}
          alt="Memory"
          className="w-full h-full object-cover"
          loading="eager"
          onLoad={(e) => e.target.style.opacity = 1}
          style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
        />
      </div>
      <div className="pb-2 text-center">
        <p className="text-[#4A0E1C] font-title text-lg md:text-xl font-bold leading-tight">
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
function ProposalStep({ noCount, setNoCount, onYes }) {
  const handleNo = (e) => {
    e.stopPropagation();
    setNoCount((prev) => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-4"
    >
      <div className="glass-panel p-8 mb-8 relative overflow-hidden rounded-3xl shadow-2xl bg-white/70 backdrop-blur-xl border-2 border-pink-200">
        <h1 className="text-3xl md:text-4xl font-bold text-[#FF3366] font-title text-center leading-snug">
          {PARTNER_NAME}, will you be my Valentine? 💘
        </h1>

        {/* Cuori galleggianti */}
        {noCount > 0 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(Math.min(noCount, 8))].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-pink-400 text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: "-10%",
                }}
                animate={{ y: -150 - Math.random() * 50, opacity: 0 }}
                transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
              >
                ❤️
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>

      <div className="relative h-44 w-full flex justify-center items-center">
        {/* YES BUTTON */}
        <motion.button
          className="absolute z-20 py-4 px-14 text-xl font-bold shadow-2xl rounded-full text-white"
          style={{
            background: 'linear-gradient(45deg, #ff5fa2, #ff3366)',
            minWidth: '220px'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onYes();
          }}
          whileHover={{ scale: 1.15, rotate: [0, 5, -5, 0] }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: Math.min(1 + noCount * 0.08, 3.5),
            boxShadow: `0 0 ${20 + noCount * 8}px rgba(255,83,135,0.8)`
          }}
        >
          YES! ❤️😍
        </motion.button>

        {/* NO BUTTON */}
        <motion.button
          className="absolute bg-white/70 text-rose-500 font-bold py-2 px-6 rounded-full shadow-md border-2 border-dashed border-rose-300 backdrop-blur-sm"
          style={{ top: '115%', zIndex: 10 }}
          onClick={handleNo}
          animate={{
            x: noCount === 0 ? 0 : [-10, 10, -6, 6, 0][noCount % 5], // piccolo oscillamento
            y: noCount === 0 ? 0 : [0, -8, 0, -5, 0][noCount % 5],     // leggero salto
            rotate: noCount === 0 ? 0 : [-5, 5, -3, 3, 0][noCount % 5],
            scale: noCount === 0 ? 1 : [1, 0.95, 1, 0.95, 1][noCount % 5],
          }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 250 }}
        >
          {PROPOSAL_PHRASES[Math.min(noCount, PROPOSAL_PHRASES.length - 1)]}
        </motion.button>
      </div>
    </motion.div>
  );
}


// ----------------------------------------------------
// 4. SUCCESS STEP
// ----------------------------------------------------
function SuccessStep({ noCount }) {
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

  const getSuccessMessage = () => {
    const L = PROPOSAL_PHRASES.length;
    if (noCount === 0) {
      return "I knew you'd say yes! I love you so much!";
    } else if (noCount <= L * 0.2) {
      return "Finally! I was starting to worry... but I knew I could convince you! I love you!";
    } else if (noCount <= L * 0.4) {
      return "That was close! You really made me work for it, uh? I'll have to make it up to you on the 14th!";
    } else if (noCount <= L * 0.6) {
      return "Wow, you really like seeing me beg, don't you? At least you finally said YES! I love you forever!";
    } else {
      return `Dopo ${noCount} NO... mi ero quasi arreso! Ma finalmente hai detto SÌ! Sei una monella ma bellissima... sono la persona più felice del mondo!`;
    }
  };

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
          className="w-40 mx-auto mb-4 rounded-xl"
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
            className="glass-panel p-8 md:p-16 max-w-2xl w-full border-t-[12px] border-rose-400 transform -rotate-1 bg-white/95 shadow-2xl"
          >
            <p className="text-2xl md:text-4xl text-gray-800 font-body leading-relaxed font-bold">
              "{getSuccessMessage()}"
            </p>
            <div className="mt-8 text-right text-lg text-rose-500 font-sans uppercase tracking-widest font-bold">
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
