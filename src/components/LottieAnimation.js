// src/LottieAnimation.js
import React, { useRef } from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import { useLayoutEffect } from "react";
import gsap from "gsap";
const LottieAnimation = () => {
        
  return (
    <div className="animation-container">
      <Player
        autoplay
        loop
        src="https://lottie.host/90c099a3-1aa6-44a9-bf98-d26f3036c1ff/fdrHqujSxS.json"
        style={{ height: "500px", width: "100%" }}
      />
    </div>
  );
};

export default LottieAnimation;
