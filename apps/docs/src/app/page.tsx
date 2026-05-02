"use client";
import { Footer } from "@/components/Footer";
import { CopyButton } from "@/components/animate-ui/components/buttons/copy";
import { GitHubStarsButton } from "@/components/animate-ui/components/buttons/github-stars";
import { FlowButton } from "@/components/flow-button";
import { Button } from "@/components/ui/button";
import "@/lib/rn-globals";
import { motion } from "motion/react";
import Link from "next/link";
import { toastiva } from "toastiva";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Home() {
  const renderToast = () => {
    toastiva.success("Toastiva toast rendered", {
      description: "This came from the docs landing page.",
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#080808] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 34% at 50% 0%, #3F1D2Ecc 0%, #FDA4AF66 42%, #7F1D1D99 78%, #0000 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 50% -10%, #FDA4AF55 0%, #FBCFE840 25%, #FFF1F220 55%, #000 100%)",
        }}
      />

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-6 sm:py-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-white hover:opacity-70 transition-opacity"
        >
          Toast
        </Link>
        <nav className="flex items-center gap-2">
          <GitHubStarsButton
            username="imskyleen"
            repo="animate-ui"
            variant={"ghost"}
          />
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-12 text-center sm:px-6 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="relative mb-7 h-18 w-full max-w-[320px] sm:mb-8"
          style={{
            maskImage: "linear-gradient(to top, transparent 0%, black 50%)",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute bottom-0 left-1/2 rounded-xl bg-white/8 border border-white/10"
              style={{
                width: `${320 - i * 24}px`,
                height: "40px",
                transform: `translateX(-50%) translateY(-${i * 14}px) scale(${1 - i * 0.04})`,
                opacity: 1 - i * 0.25,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl leading-none font-(family-name:--font-bethany-elingston) sm:text-8xl">
            Toastiva<span className="pl-2 text-shadow-neutral-200">.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          className="mt-5 max-w-[35rem] text-balance text-[15px] leading-relaxed text-neutral-400 sm:text-base"
        >
          Morphing blob toasts for React Native and React Native Web, from pill
          to card with gooey SVG transitions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease }}
          className="mt-8 flex w-full flex-col items-center gap-5 pb-16 sm:pb-20"
        >
          <div className="flex h-11 w-full max-w-[22rem] items-center gap-2 rounded-xl border border-white/8 bg-white/5 pl-4 pr-2 transition-colors hover:border-white/15 sm:w-auto sm:max-w-none">
            <span className="font-mono text-neutral-600 select-none text-sm">
              $
            </span>
            <span className="min-w-0 flex-1 truncate text-left font-mono text-[13px] text-neutral-200 sm:flex-none">
              npm install toastiva
            </span>
            <CopyButton
              content="npm install toastiva"
              variant="ghost"
              size="xs"
              className="text-neutral-500 hover:text-neutral-200 hover:bg-white/10 rounded-lg"
            />
          </div>

          <div className="flex w-full max-w-[22rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <Button
              type="button"
              size="lg"
              title="Render a toast"
              onClick={renderToast}
              className="h-11 border-white/10 bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.18)] hover:bg-white/90"
            >
              Render a toast
            </Button>
            <FlowButton asChild size="default" borderColor="#3d3d3d">
              <Link href="/docs" className="h-11 w-full text-white sm:w-auto">
                Documentation
              </Link>
            </FlowButton>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
