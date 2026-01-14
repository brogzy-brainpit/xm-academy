"use client";
import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useMediaQuery } from "react-responsive";

export default function MatterJS({children,inView}) {
  const containerRef = useRef(null);
 const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  useEffect(() => {
    if(inView){

    const container = containerRef.current;

    // ENGINE ONLY (NO RENDER)
    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();
    
    Matter.Runner.run(runner, engine);

    

    // FIX: container MUST be relative + overflow hidden
    container.style.position = "relative";
    container.style.overflow = "hidden";

    // const labels = ["Design", "Branding", "UI/UX", "Web", "Motion", "Logo","Design", "Branding", "UI/UX", "Web", "Motion", "Logo","Design", "Branding", "UI/UX", "Web", "Motion", "Logo"];
    const labels = [
      {img:"/images/crypto/binance.svg",size:'large'},
      {img:"/images/crypto/bitcoin.svg",size:'large'},
      {img:"/images/crypto/shiba.svg",size:'large'},
      {img:"/images/crypto/polygon.svg",size:'large'},
      {img:"/images/crypto/litecoin.svg",size:'large'},
      {img:"/images/crypto/etherium.svg",size:'large'},
      {img:"/images/crypto/solana.svg",size:'large'},
      {img:"/images/crypto/okx.svg",size:'large'},
      {img:"/images/crypto/tron.svg",size:'large'},
      {img:"/images/crypto/ton.svg",size:'large'},
      {img:"/images/crypto/kraken.svg",size:'small'},
      {img:"/images/crypto/coinbase.svg",size:'small'},
      {img:"/images/crypto/woo.svg",size:'small'},
      {img:"/images/crypto/bybit.svg",size:'small'},
      {img:"/images/crypto/bitcoin.svg",size:'small'},
      {img:"/images/crypto/shiba.svg",size:'small'},
      {img:"/images/crypto/polygon.svg",size:'small'},
      {img:"/images/crypto/litecoin.svg",size:'small'},
      {img:"/images/crypto/etherium.svg",size:'small'},
      {img:"/images/crypto/solana.svg",size:'small'},
      {img:"/images/crypto/okx.svg",size:'small'},
      {img:"/images/crypto/tron.svg",size:'small'},
      {img:"/images/crypto/ton.svg",size:'small'},

      
     ];

    const items = labels.map((text) => {
      const el = document.createElement("img");
      // el.innerText = text;
      // el.style.padding = "18px 28px";
      // el.style.borderRadius = "50px";
      // el.style.background = "#000";
      // el.style.color = "#fff";
      // el.style.width = "4em";
      el.classList = `${text.size=='small'?'w-[2.4em] 10-[2.4em] lg:w-[3em] lg:10-[3em]':'w-[4em] 10-[4em] lg:w-[5em] lg:10-[5em]'} `;
  
      el.src = text.img;
      el.style.position = "absolute";
      el.style.whiteSpace = "nowrap";
      el.style.userSelect = "none";
      el.style.pointerEvents = "none";
      container.appendChild(el);

      const radius = isTabletOrMobile?30:50;

      const body = Matter.Bodies.circle(
        Math.random() * (window.innerWidth - radius * 2) + radius,
        Math.random() * (window.innerHeight - radius * 2) + radius,
        radius,
        {
          restitution: 0.9,
          frictionAir: 0.02,
          inertia: Infinity,
        }
      );

      return { el, body, radius };
    });
    

    Matter.World.add(
      engine.world,
      items.map((i) => i.body)
    );

    // THIN WALLS (NEVER CAUSE OVERFLOW)
    const walls = [
      Matter.Bodies.rectangle(
        window.innerWidth / 2,
        0,
        window.innerWidth,
        10,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight,
        window.innerWidth,
        10,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        0,
        window.innerHeight / 2,
        10,
        window.innerHeight,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        window.innerWidth,
        window.innerHeight / 2,
        10,
        window.innerHeight,
        { isStatic: true }
      ),
    ];
    Matter.World.add(engine.world, walls);

    // MOUSE REPELLING
    window.addEventListener("mousemove", (e) => {
      items.forEach(({ body }) => {
        const dx = body.position.x - e.clientX;
        const dy = body.position.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          Matter.Body.applyForce(body, body.position, {
            x: dx * 0.002,
            y: dy * 0.002,
          });
        }
      });
    });

    // SYNC HTML TO PHYSICS
    Matter.Events.on(engine, "afterUpdate", () => {
      items.forEach(({ el, body }) => {
        el.style.left = body.position.x - el.offsetWidth / 2 + "px";
        el.style.top = body.position.y - el.offsetHeight / 2 + "px";
      });
    });
    }

  }, [inView]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden"
    >

     {children}
    </div>
  );
}
