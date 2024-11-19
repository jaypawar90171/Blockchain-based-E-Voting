import {React, useLayoutEffect, useRef, useState} from 'react'
import gsap from "gsap";

export default function Slidebar() {


  return (
    <div
      id="intro-slider"
      className="h-screen p-10 bg-gradient-to-tr from-orange-500 via-white to-green-500 absolute top-0 left-0 font-jetbrains z-10 w-full flex flex-col gap-10 tracking-tight"
    >
      <h1 className="text-9xl text-orange-500 mt-5" id="title-1" style={{ textShadow: "8px 4px 4px rgba(0, 0, 0, 0.5)" }}>Every</h1>
      <h1 className="text-9xl text-white" id="title-2" style={{ textShadow: "8px 4px 4px rgba(0, 0, 0, 0.5)" }}>Vote</h1>
      <h1 className="text-9xl text-green-500" id="title-3" style={{ textShadow: "8px 4px 4px rgba(0, 0, 0, 0.5)" }}>Matters</h1>
    </div>
  );
}
