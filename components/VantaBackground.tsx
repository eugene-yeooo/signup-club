"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";

interface VantaEffect {
  destroy: () => void;
}

type VantaBackgroundProps = {
  children?: React.ReactNode;
};

export default function VantaBackground({ children }: VantaBackgroundProps) {
  const vantaRef = useRef(null);
  const vantaEffect = useRef<VantaEffect | null>(null);

  useEffect(() => {
    if (GLOBE && !vantaEffect.current && vantaRef.current) {
      try {
        vantaEffect.current = GLOBE({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xfffb,
          color2: 0xff30c2,
          backgroundColor: 0x0,
        });
      } catch (e) {
        console.error("Vanta GLOBE initialization failed:", e);
      }
    }

    return () => {
      if (
        vantaEffect.current &&
        typeof vantaEffect.current.destroy === "function"
      ) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 w-full h-full"
      style={{
        backgroundColor: "#BCF8FB",
        zIndex: 0,
      }}
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
}
