// TypewriterText.jsx
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
          text: "Welcome to Bloackchain based Decentralized Voting",
          duration: 4,
          delay: 3,
          ease: "power2",
          repeat: -1, // Loop indefinitely
          repeatDelay: 2, // Delay between loops
          yoyo: true // Animates back to the starting text (empty) before repeating
        }
      );

      // Typewriter effect for the subtitle
      gsap.fromTo(
        "#welcome-subtitle",
        { text: "" },
        {
          
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
    <div className="flex flex-col justify-center text-black font-jetbrains font-bold tracking-tight mx-0 p-6 w-1/2" ref={comp}>
      <h1 className="text-6xl font-jetbrains" id="welcome-title"></h1>
      <h3 className="text-2xl mt-4 font-jetbrains" id="welcome-subtitle"></h3>
    </div>
  );
};

export default Typingtext;
