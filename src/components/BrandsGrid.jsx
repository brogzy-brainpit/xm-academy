import Section from '@/app/layout/Section';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';


const ALL_LOGOS = [
  '/images/crypto/bybit.svg',
  '/images/crypto/coinbase.svg',
  '/images/crypto/crypto.svg',
  '/images/crypto/kraken.svg',
  '/images/crypto/kucoin.svg',
  '/images/crypto/mexc.svg',
  '/images/crypto/poloniex.svg',
  '/images/crypto/woo.svg',
  '/images/crypto/bitcoin.svg',
  '/images/crypto/solana.svg',
  '/images/crypto/tron.svg',
  '/images/crypto/ton.svg',
  '/images/crypto/etherium.svg',
  '/images/crypto/litecoin.svg',
  '/images/crypto/okx.svg',
  '/images/crypto/polygon.svg',
  '/images/crypto/shiba.svg',
  '/images/crypto/binance.svg',
];

const BOX_COUNT = 9; // Number of visible boxes

export default function BrandsGrid() {
  const [slots, setSlots] = useState([]);
  const available = useRef([]); // pool of extra logos

  // Initialize slots and pool
  useEffect(() => {
    const shuffled = [...ALL_LOGOS].sort(() => Math.random() - 0.5);
    setSlots(
      shuffled.slice(0, BOX_COUNT).map((logo, i) => ({
        id: Date.now() + i,
        logo,
      }))
    );
    available.current = shuffled.slice(BOX_COUNT);
  }, []);

  // Teacher-controlled swap interval
  useEffect(() => {
   const randomDelay=()=>{ return 200 +Math.random()*2000 }
    const interval = setInterval(() => {
      if (slots.length === 0 || available.current.length === 0) return;

      const boxIndex = Math.floor(Math.random() * slots.length); // teacher chooses a random box
      swap(boxIndex);
    }, randomDelay()); // every 2 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [slots]); // only triggers after initial slots

  // Swap logic
  const swap = (index) => {
    setSlots((prev) => {
      const pool = available.current;
      if (!pool.length) return prev;

      // Get logos currently visible
      const visible = new Set(prev.map((s) => s.logo));

      // Candidates: logos in pool NOT currently visible
      const candidates = pool.filter((l) => !visible.has(l));
      if (!candidates.length) return prev;

      const next = candidates[Math.floor(Math.random() * candidates.length)];
      const current = prev[index].logo;

      // Update pool: remove chosen logo, add current back
      available.current = pool.filter((l) => l !== next).concat(current);

      // Return updated slots
      return prev.map((s, i) => (i === index ? { ...s, logo: next } : s));
    });
  };

  return (
    <div className="h-screen bg-black w-full">
      <Section className="h-full">
        <div className="h-full grid lg:grid-rows-3 grid-cols-3 lg:grid-cols-3 w-full gap-4">
          {slots.map((slot) => (
            <LogoBox key={slot.id} logo={slot.logo} />
          ))}
        </div>
      </Section>
    </div>
  );
}

// Individual box component
const LogoBox = ({ logo }) => {
  return (
    <div className="relative text-para bg-neutral900 flex items-center justify-center">
      <div className="overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={logo}
            src={logo}
            className="w-[4em] object-cover "
            initial={{ y: '100%',scale:0,}}
            animate={{ y: '0%',scale:1,transition: { duration: 0.2 } }}
            exit={{ y: '-100%',scale:0,transition: { duration: 0.2 } }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};
