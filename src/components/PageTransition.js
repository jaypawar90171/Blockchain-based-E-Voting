import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const PageTransition = ({ children }) => {
  const transitionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set(contentRef.current, { opacity: 0, y: 50 });
    gsap.set(transitionRef.current, { scaleY: 1 });

    // Animation sequence
    tl.to(transitionRef.current, {
      duration: 1.0,
      scaleY: 0,
      transformOrigin: 'top',
      ease: 'power4.inOut',
    })
      .to(contentRef.current, {
        duration: 1.0,
        opacity: 1,
        y: 0,
        ease: 'power4.out',
      }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <div
        ref={transitionRef}
        className="fixed inset-0 bg-orange-400 transform origin-top z-50"
      />
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default PageTransition;