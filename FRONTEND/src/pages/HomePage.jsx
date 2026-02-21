// import React from 'react'
// import NavBarComponent from '../components/NavBarComponent'
// function HomePage() {
//   return (
//     <div className="text-1xl font-bold underline text-red-500 min-h-screen">
//   HomePage of labeasy
//   <div><NavBarComponent/></div>
// </div>
//   )
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Beaker, ShieldCheck, ArrowRight, Sparkles, Circle, ArrowBigDown } from "lucide-react";
import AdminLoginLogoutButton from "../buttons/AdminLoginLogoutButton";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-slate-100">
      <div className="min-h-screen flex flex-col font-sans selection:bg-teal-200">

        {/* Navigation */}
<nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-500 backdrop-blur-md border-b border-teal-500/40 h-[72px] shadow-lg shadow-teal-900/20">
  <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

    {/* Left: Branding */}
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center size-10 rounded-xl bg-white/15 text-white border border-white/20">
        <Beaker className="size-6" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-white text-lg leading-tight tracking-tight drop-shadow-sm">
          Welcome to Labeasy
        </span>
        <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-widest">
          A product of Droham
        </span>
      </div>
    </div>

    {/* Right: Admin Login */}
    {/* <div className="flex items-center gap-4">
      <a
        href="#"
        className="group hidden sm:flex items-center gap-2 px-5 h-10 rounded-lg border-2 border-white/70 text-white font-semibold text-sm transition-all duration-300 hover:bg-white hover:text-teal-700 bg-white/10 backdrop-blur-sm"
      >
        <ShieldCheck className="size-[18px]" />
        
      </a>
    </div> */}
    <span><AdminLoginLogoutButton/></span>
  </div>
</nav>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center relative pt-[72px] min-h-[calc(100vh-48px)] overflow-hidden">

          {/* Background dot grid */}
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #0d9488 1px, transparent 1px)",
              backgroundSize: "28px 28px"
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-cyan-50/60 via-white/50 to-white/90 pointer-events-none" />

          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">

            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold tracking-widest uppercase shadow-sm"
            >
              <Sparkles className="size-[14px] text-amber-500" />
              Simplifying Lab Management
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-bold text-5xl sm:text-5xl md:text-[64px] leading-[1.1] text-slate-800 tracking-tight mb-6 max-w-3xl"
            >
              Lab Management,
              <br />
              Made{" "}
              <span className="relative inline-block leading-none align-baseline -translate-y-[1px] text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-200">
                Easy
              </span>
              <span className="text-amber-400">.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-500 max-w-[600px] leading-relaxed mb-10 font-normal"
            >
              Labeasy streamlines your laboratory workflows, inventory, and
              reporting — all in one intelligent platform.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-center mb-12 w-full justify-center"
            >
              <button
                className="relative group overflow-hidden bg-teal-600 hover:bg-teal-700 text-white font-bold text-base px-10 h-14 rounded-xl shadow-lg shadow-teal-300/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto min-w-[220px] flex items-center justify-center gap-2"
              >
                <span className="relative z-20">Get Started</span>
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 relative z-20" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 w-1/2 h-full skew-x-12" />
              </button>
            </motion.div>

            {/* Trust / Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              {/* <p className="text-sm font-medium text-slate-400">
                Trusted by <span className="text-teal-600 font-bold">500+</span> laboratories across <span className="text-teal-600 font-bold">20</span> countries
              </p> */}
              <div className="flex items-center gap-1 text-amber-400">
                <Circle className="size-2 fill-current" />
                <Circle className="size-2 fill-current" />
                <Circle className="size-2 fill-current" />
                <Circle className="size-2 fill-current" />
                <Circle className="size-2 fill-current" />
              </div>
            </motion.div>
          </div>

          {/* Decorative Blobs */}
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-100/30 rounded-full blur-3xl -z-10" />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-teal-100 h-12 flex items-center justify-center z-10 relative">
        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          © {new Date().getFullYear()} Droham. All rights reserved.
          <span className="mx-2 text-slate-300">|</span>
          <span className="text-teal-600 font-semibold">Labeasy</span>
        </p>
      </footer>
    </div>
  );
}


export default HomePage