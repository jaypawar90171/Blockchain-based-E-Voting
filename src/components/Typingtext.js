// Typingtext.jsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const Typingtext = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Typewriter effect for "WELCOME" title
      gsap.fromTo(
        "#welcome-title",
        { text: "" },
        {
          text: "Welcome to Blockchain based Decentralized Voting",
          duration: 4,
          delay: 3,
          ease: "power2",
          repeat: -1,
          repeatDelay: 2,
          yoyo: true
        }
      );

      // Typewriter effect for the subtitle
      gsap.fromTo(
        "#welcome-subtitle",
        { text: "" },
        {
          text: "Secure, Transparent, and Efficient",
          duration: 4,
          delay: 3,
          ease: "power2",
          repeat: -1,
          repeatDelay: 2,
          yoyo: true
        }
      );
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full p-4 md:p-8 lg:p-12" ref={comp}>
      <div className="max-w-2xl">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-jetbrains text-black tracking-tight mb-4 break-words hyphens-auto"
          id="welcome-title"
        ></h1>
        <h3
          className="text-xl sm:text-2xl md:text-3xl font-semibold font-jetbrains text-gray-700 mt-2 sm:mt-4 break-words hyphens-auto"
          id="welcome-subtitle"
        ></h3>
      </div>
    </div>
  );
};

export default Typingtext;