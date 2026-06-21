import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface Firework {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function CakeScreen() {
  const [showCandles, setShowCandles] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const [flame1, setFlame1] = useState(true);
  const [flame2, setFlame2] = useState(true);
  const [flame3, setFlame3] = useState(true);

  const [showSmoke1, setShowSmoke1] = useState(false);
  const [showSmoke2, setShowSmoke2] = useState(false);
  const [showSmoke3, setShowSmoke3] = useState(false);

  const [showFireworks, setShowFireworks] = useState(false);

  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const timers = [

      setTimeout(() => setShowCandles(true), 2000),

      setTimeout(() => {
        setDarkMode(true);
        setShowWish(true);
      }, 4000),

      setTimeout(() => setShowWish(false), 9000),

      setTimeout(() => {
        setFlame1(false);
        setShowSmoke1(true);
      }, 10000),

      setTimeout(() => {
        setFlame2(false);
        setShowSmoke2(true);
      }, 10800),

      setTimeout(() => {
        setFlame3(false);
        setShowSmoke3(true);
      }, 11600),

      setTimeout(() => {
        setShowFireworks(true);
      }, 12500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);



  useEffect(() => {
    if (!showFireworks) return;

    const interval = setInterval(() => {

      confetti({
        particleCount: 120,
        spread: 360,
        startVelocity: 45,
        gravity: 0.7,
        ticks: 150,

        origin: {
          x: Math.random() * 0.9,
          y: Math.random() * 0.5,
        },

        colors: [
          "#ff0000",
          "#ffd700",
          "#00ffff",
          "#ffffff",
          "#ff69b4",
          "#00ff7f",
        ],
      });

      const id = Date.now();

      setFireworks((prev) => [
        ...prev,
        {
          id,
          x: Math.random() * 90,
          y: Math.random() * 45,
          size: 120 + Math.random() * 100,
        },
      ]);

      setTimeout(() => {
        setFireworks((prev) =>
          prev.filter((f) => f.id !== id)
        );
      }, 900);

    }, 500);

    return () => clearInterval(interval);

  }, [showFireworks]);



  return (
    <>
      <style>{`

      *{
      box-sizing:border-box;
      }

      body{
      margin:0;
      }

      .scene{

      width:100vw;
      height:100vh;

      overflow:hidden;

      position:relative;

      display:flex;

      justify-content:center;
      align-items:center;

      background:${darkMode ? "#000" : "#ffb8c1"};

      transition:all 2s ease;
      }


      .wish{

      position:absolute;

      top:10%;

      left:50%;

      transform:translateX(-50%);

      color:#FFD700;

      font-size:clamp(28px,6vw,55px);

      text-align:center;

      font-weight:700;

      text-shadow:
      0 0 10px #FFD700,
      0 0 25px #FFD700,
      0 0 50px #FFD700;

      animation:fade 1s ease;
      z-index:999;

      }


      @keyframes fade{

      from{
      opacity:0;
      transform:translate(-50%,-20px);
      }

      to{
      opacity:1;
      transform:translate(-50%,0);
      }

      }


      .cake-wrapper{

      position:relative;

      transform:translateY(40px);

      }


      .candles{

      display:flex;

      justify-content:center;

      gap:25px;

      margin-bottom:-65px;

      animation:appear 1.5s ease;

      }


      @keyframes appear{

      from{
      opacity:0;
      transform:translateY(20px);
      }

      to{
      opacity:1;
      transform:translateY(0);
      }

      }


      .candle{

      width:12px;

      height:75px;

      border-radius:8px;

      background:
      repeating-linear-gradient(
      45deg,
      white 0px,
      white 5px,
      crimson 5px,
      crimson 10px);

      position:relative;

      }


      .flame{

      width:20px;

      height:32px;

      border-radius:50%;

      background:
      radial-gradient(circle,#fff,#ffd700,orange);

      position:absolute;

      top:-28px;

      left:50%;

      transform:translateX(-50%);

      animation:flicker .2s infinite alternate;

      }


      @keyframes flicker{

      from{

      transform:translateX(-50%) scale(1);

      }

      to{

      transform:translateX(-50%) scale(1.15);

      }

      }



      .smoke{

      width:18px;

      height:18px;

      background:#ddd;

      border-radius:50%;

      position:absolute;

      left:50%;

      transform:translateX(-50%);

      animation:smoke 2s forwards;

      }


      @keyframes smoke{

      from{

      opacity:1;

      top:-10px;

      }

      to{

      opacity:0;

      top:-90px;

      transform:translateX(-50%) scale(2);

      }

      }



      .cake{

      width:min(90vw,360px);

      height:250px;

      position:relative;

      }


      .bottom{

      width:100%;

      height:120px;

      background:

      linear-gradient(

      #ffc7e0,

      #ff8bc0

      );

      border-radius:25px;

      position:absolute;

      bottom:0;

      box-shadow:

      inset 0 -20px 30px rgba(0,0,0,.15),

      0 15px 30px rgba(0,0,0,.2);

      }


      .top{

      width:220px;

      height:90px;

      background:

      linear-gradient(

      #ffe9f4,

      #ffaad7

      );

      border-radius:20px;

      position:absolute;

      left:50%;

      transform:translateX(-50%);

      bottom:110px;

      }


      .icing1{

      position:absolute;

      width:240px;

      height:28px;

      background:white;

      border-radius:50px;

      left:50%;

      transform:translateX(-50%);

      bottom:175px;

      }


      .icing2{

      position:absolute;

      width:320px;

      height:30px;

      background:white;

      border-radius:50px;

      left:50%;

      transform:translateX(-50%);

      bottom:105px;
      z-index:1;

      }


      .face{

      position:absolute;

      width:100%;

      bottom:35px;

      text-align:center;

      font-size:34px;

      }


      .firework{

      position:absolute;

      border-radius:50%;

      border:2px solid rgba(255,255,255,.7);

      animation:explode .9s ease-out forwards;

      pointer-events:none;

      }


      @keyframes explode{

      from{

      opacity:1;

      transform:translate(-50%,-50%) scale(.2);

      }

      to{

      opacity:0;

      transform:translate(-50%,-50%) scale(1.6);

      }

      }

      `}</style>

      <div className="scene">

        {fireworks.map((f)=>(

          <div

          key={f.id}

          className="firework"

          style={{

          left:`${f.x}%`,

          top:`${f.y}%`,

          width:f.size,

          height:f.size,

          }}

          />

        ))}

        {showWish && (

          <div className="wish">

            Хүслээ шивнээрэй ✨

          </div>

        )}


        <div className="cake-wrapper">

          {showCandles && (

            <div className="candles">

              <div className="candle">

                {flame1 && <div className="flame"/>}

                {showSmoke1 && <div className="smoke"/>}

              </div>

              <div className="candle">

                {flame2 && <div className="flame"/>}

                {showSmoke2 && <div className="smoke"/>}

              </div>

              <div className="candle">

                {flame3 && <div className="flame"/>}

                {showSmoke3 && <div className="smoke"/>}

              </div>

            </div>

          )}


          <div className="cake">

            <div className="bottom"/>

            <div className="icing2"/>

            <div className="top"/>

            <div className="icing1"/>

            
          </div>

        </div>

      </div>

    </>
  );
}