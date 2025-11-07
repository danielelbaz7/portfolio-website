"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, ArrowUpRight, Code } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Analytics } from "@vercel/analytics/next"

const TerminalEffect = dynamic(() => import("@/components/ui/terminal-effect").then((m) => m.TerminalEffect), {
  ssr: false,
  loading: () => <div style={{ height: 40 }} />,
})

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function PortfolioPage() {
  const [terminalState, setTerminalState] = useState<"normal" | "minimized" | "maximized" | "closed">("normal")
  const [particles, setParticles] = useState<
    Array<{ top: string; left: string; animation: string; animationDelay: string }>
  >([])
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set())

  useEffect(() => {
    const generatedParticles = Array.from({ length: 12 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animation: `float ${20 + Math.random() * 20}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 10}s`,
    }))
    setParticles(generatedParticles)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const toggleProjectExpansion = (index: number) => {
    setExpandedProjects((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const projects = [
    {
      title: "StudyAP.ai",
      description:
        "A SaaS application for students in advanced placement high school classes. The program allows students to create custom high-quality practice questions with AI, all based on course curriculum.",
      expandedDescription:
        "The website offers free pre-generated practice questions and users have the option to pay for credits that they can use to generate questions for a variety of AP courses based on whatever topics they choose. The tool uses RAG to obtain the relevant information for the topic and generates unique questions every time, beating standard LLMs with its access to a much wider range of in-depth information. Questions can also be sorted by textbook chapter and course unit which provides versatility for customers and makes sure they can learn whatever material they need to.",
      tags: ["TypeScript", "React", "Python", "Flask", "Tailwind CSS", "Supabase"],
      image: "/placeholder.svg?height=225&width=400",
      liveUrl: "#",
      githubUrl: "#",
      inDevelopment: true,
    },
    {
      title: "AI Video Studio",
      description:
        "A suite of video editing tools packed as a SaaS for content creators looking to craft original videos or upgrade the quality of pre-existing content. Provides 6+ tools for creating and improving videos to ensure viral content.",
      expandedDescription:
        "The website offers tools like auto-subtitles, a clip finding tool, AI voiceover, and more, ensuring creators have the tools to build any kind of video they would like. The frontend integrates authentication and displays credit amounts to each user. It also implements drag-and-drop and video prompting depending on the tool. This information is then sent to the Flask backend where the content is run through a pipeline of different tools. Some tools utilize one API while others utilize multiple, and the backend is in charge of directing tools to each other and connecting everything to create complete products. The backend also calculates cost and ensures that users have enough credits to perform each operation.",
      tags: ["TypeScript", "React", "Python", "Flask", "Tailwind CSS", "Supabase"],
      image: "/placeholder.svg?height=225&width=400",
      liveUrl: "#",
      githubUrl: "#",
      inDevelopment: true,
    },
    {
      title: "Chess Engine",
      description:
        "A chess game with AI functionality that provides the best move for the user or their opponent. The engine's primary purpose is to simulate real chess games and determine what the best move at each point is for each player.",
      expandedDescription:
        "A complete chess game in Java that can be played by 2 players on the same device. It uses multiple bitboards to store the board information and then updates the Java Swing GUI accordingly. The application finds all possible moves for any selected piece and then simulates each of them, eliminating those that cannot be played (a piece in the way, causes a self-check, etc.) and highlights them on the board. The game also utilizes a heuristic evaluation function that determines who is winning and if a checkmate has happened. This function is also used for the AI algorithm that determines the best move to make. This algorithm utilizes minimax with alpha-beta pruning to find the best move (default depth of 3) and checks each permutation with the evaluation function to decide what move to make next.",
      tags: ["Java", "Java Swing"],
      image: "/placeholder.svg?height=225&width=400",
      liveUrl: "#",
      githubUrl: "https://github.com/danielelbaz7/chess-engine",
      comingSoon: true,
    },
    {
      title: "Quantitative Trading Visualizer",
      description:
        "A site that allows users to select any security or cryptocurrency and perform two trading strategies between two dates they select to view historical success rates of each algorithm on their selected security.",
      expandedDescription:
        "The website offers two testable strategies: median reversion and IQR breakout. Median reversion utilizes a double heap to create a running median, implementing a hash table to more efficiently remove values outside of our window size. Then, when the current price is too high above or below the median, the algorithm will buy or sell accordingly. The IQR breakout strategy works similarly, implementing a red-black tree to create a running range of values. It then adds indexing to the tree to quickly find the first and third quartiles. When the price goes above the third quartile or below the first, the algorithm buys or sells accordingly. On the frontend, the user is able to enter in a ticker, the start and end dates for their analysis, and their selected algorithm. This data is then sent to the backend and the frontend calls for the prices at every date as well as the details of each trade and the metrics of the analysis. The backend returns a list of dictionaries containing the price at every date and what trades are made on each day. The frontend then plots this on a chart. Finally, the frontend requests the metrics like return %, return $, trade #, winrate %, and a few others to display at the end of the analysis.",
      tags: ["TypeScript", "React", "Python", "Flask", "yfinance API", "Recharts"],
      image: "/placeholder.svg?height=225&width=400",
      liveUrl: "https://stock-trading-visualizer.vercel.app/",
      githubUrl: "https://github.com/danielelbaz7/stock-trading-visualizer",
    },
    {
      title: "Carbon Emissions Calculator",
      description:
        "A web app that takes in user details about habits like how many flights they take and how much they drive and uses this data to determines the user's environmental impact and how they can reduce it.",
      expandedDescription:
        "A website that utilizes the Carbon Interface API to estimate the carbon emissions that the user produces based on the car that they drive, how much they drive it, how many flights they take each year, and more. Then, based on the source of the user's emissions, the website offers suggestions on how to reduce emissions, like walking or taking the bus instead of driving. The Carbon Interface API is utilized to determine the carbon emissions of different cars and more. The website was made for the SwampHacks X hackathon competition at the University of Florida.",
      tags: ["JavaScript", "Vue.js", "Python", "Flask", "Carbon Interface API"],
      image: "/placeholder.svg?height=225&width=400",
      liveUrl: "#",
      githubUrl: "https://github.com/danielelbaz7/carbon-emissions-calculator",
    },
    {
      title: "Minesweeper",
      description:
        "A C++ recreation of the classic game, Minesweeper, featuring the original graphics used in the 1989 game. On top of all original features, it offers board importing as well as random board generation and a debug mode.",
      expandedDescription:
        "This app is a recreation of the original Minesweeper, offering the same original experience and graphics with some additional features. Pre-made test boards are offered and they, alongside other custom boards, are importable into the game. A debug mode is also offered, allowing users get additional insights into the game. The program is written in C++ and uses SFML for the game's visuals. The program is just a modernized recreation of the original game.",
      tags: ["C++", "SFML"],
      image: "/placeholder.svg?height=225&width=400",
      liveUrl: "#",
      githubUrl: "https://github.com/danielelbaz7/minesweeper-cpp",
      comingSoon: true,
      privateRepo: true,
    },
    {
      title: "Personal Portfolio Website",
      description:
        "A portfolio website that highlights my projects, technical skills, and additional details about me as a developer. Offers a terminal interface that allows users to navigate the site or view details about me.",
      expandedDescription:
        "The website offers all important information about me, Daniel Y. Elbaz, and my knowledge as a developer. It outlines all of my major programming projects, those in development, and the tech stacks used for each one. It also details all of the technical skills I have experience with. Finally, it provides an about me section and my email address as well as my socials. The website features a variety of animations and methods of interactivity like automatic scrolling when pressing on certain buttons. The site also implements a terminal interface made to emulate the MacOS terminal, and this terminal offers commands that allow users to view details about me or navigate the website. The website features lazy-loading to improve performance, and the website utilizes TypeScript and React for the frontend and Next.js in the backend to optimize website usability.",
      tags: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
      image: "/placeholder.svg?height=225&width=400",
      liveUrl: "#",
      githubUrl: "https://github.com/danielelbaz7/portfolio-website",
      isPortfolio: true,
    },
  ]

  const terminalLines = [
    { text: "Booting kernel..." },
    { text: "Initializing system modules..." },
    { text: "Compiling project data..." },
    { text: "System ready. Welcome.", className: "text-green-400" },
  ]

  return (
    <div className="dark text-foreground min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-black">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950/90 via-purple-950/80 to-black/95">
        {/* Advanced geometric grid patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.08)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(-45deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

        {/* Dynamic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-indigo-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-violet-800/25 via-transparent to-purple-700/20"></div>
        <div className="absolute inset-0 bg-radial-gradient from-purple-600/15 via-transparent to-transparent"></div>

        {/* Abstract floating geometric shapes */}
        <div
          className="absolute top-20 left-16 w-32 h-32 border border-purple-400/30 rotate-45 rounded-lg"
          style={{ animation: "float 25s ease-in-out infinite, rotate 60s linear infinite" }}
        ></div>
        <div
          className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-violet-600/10 rounded-full blur-sm"
          style={{ animation: "float 30s ease-in-out infinite reverse" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-40 h-2 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent rounded-full"
          style={{ animation: "float 35s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 border-2 border-violet-400/25 rounded-full"
          style={{ animation: "float 28s ease-in-out infinite reverse, rotate 45s linear infinite reverse" }}
        ></div>

        {/* Circuit-like animated lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent">
          <div
            className="absolute top-0 w-3 h-3 bg-purple-400/80 rounded-full shadow-lg shadow-purple-400/50"
            style={{ animation: "moveRight 15s linear infinite" }}
          ></div>
        </div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent">
          <div
            className="absolute top-0 w-2 h-2 bg-violet-400/70 rounded-full shadow-md shadow-violet-400/50"
            style={{ animation: "moveRight 20s linear infinite", animationDelay: "5s" }}
          ></div>
        </div>
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/35 to-transparent">
          <div
            className="absolute left-0 w-2 h-2 bg-purple-500 rounded-full shadow-md shadow-purple-500/50"
            style={{ animation: "moveDown 18s linear infinite", animationDelay: "3s" }}
          ></div>
        </div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-400/30 to-transparent">
          <div
            className="absolute left-0 w-2.5 h-2.5 bg-indigo-400 rounded-full shadow-lg shadow-indigo-400/50"
            style={{ animation: "moveDown 22s linear infinite", animationDelay: "8s" }}
          ></div>
        </div>

        {/* Abstract hexagonal patterns */}
        <div
          className="absolute top-1/5 right-1/5 w-16 h-16 border border-purple-300/20"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            animation: "float 40s ease-in-out infinite, rotate 80s linear infinite",
          }}
        ></div>
        <div
          className="absolute bottom-1/5 left-1/5 w-12 h-12 bg-violet-400/15"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            animation: "float 35s ease-in-out infinite reverse, rotate 70s linear infinite reverse",
          }}
        ></div>

        {/* Static floating data nodes without flashing */}
        <div
          className="absolute bottom-1/6 right-1/2 w-3 h-3 bg-violet-300/70 rounded-full shadow-md shadow-violet-300/40"
          style={{ animation: "float 30s ease-in-out infinite", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/6 w-3.5 h-3.5 bg-indigo-400/65 rounded-full shadow-lg shadow-indigo-400/35"
          style={{ animation: "float 28s ease-in-out infinite", animationDelay: "4s" }}
        ></div>

        {/* Abstract triangular elements */}
        <div
          className="absolute top-1/3 left-1/6 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-purple-400/20"
          style={{ animation: "float 32s ease-in-out infinite, rotate 90s linear infinite" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/6 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[26px] border-l-transparent border-r-transparent border-t-violet-400/25"
          style={{ animation: "float 28s ease-in-out infinite reverse, rotate 75s linear infinite reverse" }}
        ></div>

        {/* Glowing connection lines */}
        <div className="absolute top-1/4 left-1/4 w-32 h-px bg-gradient-to-r from-purple-400/60 to-transparent rotate-45 origin-left">
          <div className="absolute right-0 top-0 w-2 h-2 bg-purple-400/80 rounded-full shadow-sm shadow-purple-400/50"></div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-28 h-px bg-gradient-to-l from-violet-400/50 to-transparent -rotate-45 origin-right">
          <div className="absolute left-0 top-0 w-1.5 h-1.5 bg-violet-400/70 rounded-full shadow-sm shadow-violet-400/40"></div>
        </div>

        {/* Particle field - client-side generated particles to prevent hydration mismatch */}
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-300/40 rounded-full"
            style={{
              top: particle.top,
              left: particle.left,
              animation: particle.animation,
              animationDelay: particle.animationDelay,
            }}
          ></div>
        ))}

        {/* Abstract wave patterns */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
            style={{
              clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
              animation: "wave 25s ease-in-out infinite",
            }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-violet-400/25 to-transparent"
            style={{
              clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0 100%)",
              animation: "wave 30s ease-in-out infinite reverse",
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link href="#" className="flex items-center gap-2 group">
            <Code className="w-6 h-6 text-purple-400 group-hover:rotate-12 transition-all duration-500" />
            <span className="font-bold text-lg group-hover:text-purple-300 transition-colors duration-300">
              Daniel Y. Elbaz
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="https://github.com/danielelbaz7" target="_blank" rel="noopener noreferrer" className="group">
              <Github className="w-6 h-6 hover:text-purple-400 transition-all duration-300 group-hover:scale-105" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/danielelbaz7/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Linkedin className="w-6 h-6 hover:text-purple-400 transition-all duration-300 group-hover:scale-105" />
            </Link>
          </nav>
        </header>

        <main className="flex-1 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <section
            id="hero"
            className="flex flex-col items-center justify-center text-center py-8 md:py-12 min-h-[80vh]"
          >
            <div className="animate-fadeIn w-full max-w-5xl relative">
              {/* Terminal accent decorations */}
              <div
                className={cn(
                  "absolute -inset-0.5 opacity-30 transition-all duration-700 ease-in-out",
                  terminalState === "maximized" && "-inset-1",
                  terminalState === "minimized" && "scale-0 opacity-0 translate-x-[45vw] translate-y-[45vh]",
                  terminalState === "closed" && "scale-0 opacity-0",
                )}
                style={{
                  transformOrigin: terminalState === "minimized" ? "bottom right" : "center",
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-purple-400/60"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-purple-400/60"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-purple-400/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-purple-400/60"></div>

                {/* Side accent lines */}
                <div className="absolute top-8 -left-2 w-2 h-px bg-gradient-to-r from-purple-400/80 to-transparent"></div>
                <div className="absolute top-14 -left-3 w-3 h-px bg-gradient-to-r from-purple-300/60 to-transparent"></div>
                <div className="absolute bottom-8 -left-2 w-2 h-px bg-gradient-to-r from-purple-400/80 to-transparent"></div>
                <div className="absolute bottom-14 -left-3 w-3 h-px bg-gradient-to-r from-purple-300/60 to-transparent"></div>

                <div className="absolute top-8 -right-2 w-2 h-px bg-gradient-to-l from-purple-400/80 to-transparent"></div>
                <div className="absolute top-14 -right-3 w-3 h-px bg-gradient-to-l from-purple-300/60 to-transparent"></div>
                <div className="absolute bottom-8 -right-2 w-2 h-px bg-gradient-to-l from-purple-400/80 to-transparent"></div>
                <div className="absolute bottom-14 -right-3 w-3 h-px bg-gradient-to-l from-purple-300/60 to-transparent"></div>
              </div>

              {/* Static floating accent dots */}
              <div
                className={cn(
                  "transition-all duration-700 ease-in-out",
                  terminalState === "minimized" && "scale-0 opacity-0 translate-x-[45vw] translate-y-[45vh]",
                  terminalState === "closed" && "scale-0 opacity-0",
                )}
                style={{
                  transformOrigin: terminalState === "minimized" ? "bottom right" : "center",
                }}
              >
                <div className="absolute -top-4 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60"></div>
                <div className="absolute -top-2 right-1/3 w-1 h-1 bg-violet-300 rounded-full opacity-50"></div>
                <div className="absolute -bottom-4 left-1/3 w-1.5 h-1.5 bg-purple-500 rounded-full opacity-70"></div>
                <div className="absolute -bottom-2 right-1/4 w-1 h-1 bg-purple-300 rounded-full opacity-55"></div>
              </div>

              {/* Subtle glow effect */}
              <div
                className={cn(
                  "absolute inset-0 bg-purple-500/5 rounded-lg blur-xl -z-10 transition-all duration-700 ease-in-out",
                  terminalState === "maximized" && "bg-purple-500/8",
                  terminalState === "minimized" && "scale-0 opacity-0 translate-x-[45vw] translate-y-[45vh]",
                  terminalState === "closed" && "scale-0 opacity-0",
                )}
                style={{
                  transformOrigin: terminalState === "minimized" ? "bottom right" : "center",
                }}
              ></div>

              {/* Main terminal */}
              <TerminalEffect
                lines={terminalLines}
                className="min-h-[280px] mx-auto relative z-10"
                onStateChange={setTerminalState}
              />

              {/* Additional floating elements */}
              <div
                className={cn(
                  "transition-all duration-700 ease-in-out",
                  terminalState === "minimized" && "scale-0 opacity-0 translate-x-[45vw] translate-y-[45vh]",
                  terminalState === "closed" && "scale-0 opacity-0",
                )}
                style={{
                  transformOrigin: terminalState === "minimized" ? "bottom right" : "center",
                }}
              >
                <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
                  <div className="w-2 h-8 bg-gradient-to-b from-transparent via-purple-400/40 to-transparent"></div>
                </div>
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-2 h-8 bg-gradient-to-b from-transparent via-purple-400/40 to-transparent"></div>
                </div>

                {/* Static circuit-like lines */}
                <div className="absolute top-1/3 -left-6 w-6 h-px bg-purple-400/30">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full absolute -right-0.5 -top-0.5"></div>
                </div>
                <div className="absolute bottom-1/3 -right-6 w-6 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent">
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full absolute -left-0.5 -top-0.5"></div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-snug mt-8 mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent max-w-6xl px-6">
              Architecting Innovative Solutions
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-4xl animate-fadeIn px-6"
              style={{ animationDelay: "0.3s" }}
            >
              I'm Daniel Y. Elbaz, a developer building modern, useful, and cutting-edge software. Currently, I'm
              particularly passionate about artificial intelligence and am currently building multiple AI-powered
              applications.
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn"
              style={{ animationDelay: "0.6s" }}
            >
              <Button
                size="lg"
                className="bg-purple-500/80 hover:bg-purple-500/90 text-white hover:scale-102 transition-all duration-300 min-w-[160px]"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-400/30 hover:bg-purple-400/5 text-white hover:scale-102 transition-all duration-300 bg-transparent min-w-[160px]"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </Button>
            </div>
          </section>

          <section id="projects" className="pt-24 md:pt-32 pb-24 md:pb-32">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 animate-fadeIn">
              My Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {projects.map((project, index) => {
                const isExpanded = expandedProjects.has(index)
                return (
                  <Card
                    key={index}
                    className="bg-card/50 backdrop-blur-sm border-purple-400/15 hover:border-purple-400/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 relative group animate-fadeIn overflow-visible flex flex-col h-full"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {project.inDevelopment && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-black rounded-full animate-ping"></div>
                            IN DEVELOPMENT
                          </span>
                        </div>
                      </div>
                    )}
                    <CardHeader className="pb-4">
                      <CardTitle
                        className={`${project.inDevelopment ? "text-amber-200" : ""} group-hover:text-purple-200 transition-colors duration-300 text-lg sm:text-xl`}
                      >
                        {project.title}
                      </CardTitle>
                      <CardDescription className="transition-all duration-500 ease-in-out text-sm sm:text-base">
                        <span className="group-hover:text-gray-200 transition-colors duration-300">
                          {project.description}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProjectExpansion(index)}
                          className="w-full text-purple-300 hover:text-purple-200 hover:bg-purple-400/10 transition-all duration-300 mt-2 -mb-1"
                        >
                          {isExpanded ? "Less Details" : "More Details"}
                          <ArrowUpRight
                            className={`w-4 h-4 ml-2 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </Button>
                        <span
                          className={`block text-purple-300 transition-[max-height,opacity,transform] duration-500 ease-in-out overflow-hidden break-words leading-relaxed ${
                            isExpanded
                              ? "opacity-100 max-h-[500px] xl:max-h-[800px] transform translate-y-0 mt-2"
                              : "opacity-0 max-h-0 transform translate-y-3"
                          }`}
                        >
                          {project.expandedDescription}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4 flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-purple-400/20 text-purple-100 px-2 py-1 rounded-full border border-purple-400/30 hover:bg-purple-400/25 hover:scale-105 transition-all duration-200 cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-between gap-3">
                      {project.privateRepo ? (
                        <Button
                          variant="outline"
                          className="border-purple-400/20 bg-purple-400/5 text-gray-400 cursor-not-allowed flex-1 sm:flex-none bg-transparent opacity-70"
                          disabled
                        >
                          <Github className="w-4 h-4 mr-2" /> Private
                        </Button>
                      ) : project.inDevelopment ? (
                        <Button
                          variant="outline"
                          className="border-purple-400/20 bg-purple-400/5 text-gray-400 cursor-not-allowed flex-1 sm:flex-none bg-transparent opacity-70"
                          disabled
                        >
                          <Github className="w-4 h-4 mr-2" /> Private
                        </Button>
                      ) : (
                        <Button
                          asChild
                          variant="outline"
                          className="border-purple-400/20 hover:bg-purple-400/5 text-white hover:scale-102 transition-all duration-300 flex-1 sm:flex-none bg-transparent"
                        >
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" /> GitHub
                          </Link>
                        </Button>
                      )}

                      {project.inDevelopment ||
                      project.title === "Carbon Emissions Calculator" ||
                      project.comingSoon ? (
                        <Button
                          className="bg-purple-500/30 text-gray-400 cursor-not-allowed flex-1 sm:flex-none opacity-70"
                          disabled
                        >
                          Coming Soon <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : project.isPortfolio ? (
                        <Button
                          className="bg-purple-500/70 hover:bg-purple-500/80 text-white hover:scale-102 transition-all duration-300 flex-1 sm:flex-none cursor-default"
                          disabled
                        >
                          You're here! <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          asChild
                          className="bg-purple-500/70 hover:bg-purple-500/80 text-white hover:scale-102 transition-all duration-300 flex-1 sm:flex-none"
                        >
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            Live Demo <ArrowUpRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </section>

          <section id="skills" className="py-24 md:py-32">
            <div className="max-w-7xl mx-auto space-y-12">
              {/* Languages */}
              <div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-8 text-purple-200">
                  Languages
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-4 lg:gap-6">
                  {[
                    {
                      name: "Java",
                      image: "/icons/java.webp",
                    },
                    {
                      name: "Python",
                      image: "/icons/python.webp",
                    },
                    {
                      name: "C#",
                      image: "/icons/csharp.webp",
                    },
                    {
                      name: "C",
                      image: "/icons/c.webp",
                    },
                    {
                      name: "C++",
                      image: "/icons/cpp.webp",
                    },
                    {
                      name: "JavaScript",
                      image: "/icons/javascript.webp",
                    },
                    {
                      name: "TypeScript",
                      image: "/icons/typescript.webp",
                    },
                    {
                      name: "SQL",
                      image: "/icons/sql.webp",
                    },
                    {
                      name: "HTML",
                      image: "/icons/html.webp",
                    },
                    {
                      name: "CSS",
                      image: "/icons/css.webp",
                    },
                  ].map((skill, index) => (
                    <Card
                      key={index}
                      className="bg-card/40 backdrop-blur-sm border-purple-400/20 hover:border-purple-400/50 transition-[transform,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] transform hover:-translate-y-3 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 hover:bg-card/60 group p-4 aspect-square flex flex-col items-center justify-center text-center will-change-transform"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mb-1 relative overflow-hidden rounded-lg group-hover:scale-115 transition-transform duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform">
                        <Image
                          src={skill.image || "/placeholder.svg"}
                          alt={skill.name}
                          fill
                          className="object-contain"
                          priority={index < 6}
                          loading={index < 6 ? undefined : "lazy"}
                          sizes="(min-width: 640px) 64px, 48px"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-purple-100 group-hover:text-white group-hover:font-semibold transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        {skill.name}
                      </span>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Frameworks/Libraries */}
              <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-8 text-purple-200">
                  Frameworks & Libraries
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4 lg:gap-6">
                  {[
                    {
                      name: "React",
                      image: "/icons/react.webp",
                    },
                    {
                      name: "React Native",
                      image: "/icons/react.webp",
                    },
                    {
                      name: "Vue.js",
                      image: "/icons/vue.webp",
                    },
                    {
                      name: "Pandas",
                      image: "/icons/pandas.webp",
                    },
                    {
                      name: "Scikit",
                      image: "/icons/scikit-learn.webp",
                    },
                    {
                      name: "Flask",
                      image: "/icons/flask.webp",
                    },
                    {
                      name: "Maven",
                      image: "/icons/maven.webp",
                    },
                    {
                      name: "Unity",
                      image: "/icons/unity.webp",
                    },
                    {
                      name: "Unreal",
                      image: "/icons/unreal.webp",
                    },
                  ].map((skill, index) => (
                    <Card
                      key={index}
                      className="bg-card/40 backdrop-blur-sm border-purple-400/20 hover:border-purple-400/50 transition-[transform,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] transform hover:-translate-y-3 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 hover:bg-card/60 group p-4 aspect-square flex flex-col items-center justify-center text-center will-change-transform"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mb-1 relative overflow-hidden rounded-lg group-hover:scale-115 transition-transform duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform">
                        <Image
                          src={skill.image || "/placeholder.svg"}
                          alt={skill.name}
                          fill
                          className="object-contain"
                          loading="lazy"
                          sizes="(min-width: 640px) 64px, 48px"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-purple-100 group-hover:text-white group-hover:font-semibold transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        {skill.name}
                      </span>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Developer Tools */}
              <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-8 text-purple-200">
                  Developer Tools
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
                  {[
                    {
                      name: "CLion",
                      image: "/icons/clion.webp",
                    },
                    {
                      name: "IntelliJ",
                      image: "/icons/intellij.webp",
                    },
                    {
                      name: "PyCharm",
                      image: "/icons/pycharm.webp",
                    },
                    {
                      name: "Blender",
                      image: "/icons/blender.webp",
                    },
                    {
                      name: "Linux",
                      image: "/icons/linux.webp",
                    },
                    {
                      name: "VS Code",
                      image: "/icons/vscode.webp",
                    },
                    {
                      name: "GitHub",
                      image: "/icons/github.webp",
                    },
                    {
                      name: "Git",
                      image: "/icons/git.webp",
                    },
                  ].map((skill, index) => (
                    <Card
                      key={index}
                      className="bg-card/40 backdrop-blur-sm border-purple-400/20 hover:border-purple-400/50 transition-[transform,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] transform hover:-translate-y-3 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 hover:bg-card/60 group p-4 aspect-square flex flex-col items-center justify-center text-center will-change-transform"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mb-1 relative overflow-hidden rounded-lg group-hover:scale-115 transition-transform duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform">
                        <Image
                          src={skill.image || "/placeholder.svg"}
                          alt={skill.name}
                          fill
                          className={`object-contain ${skill.name === "GitHub" ? "invert" : ""}`}
                          loading="lazy"
                          sizes="(min-width: 640px) 64px, 48px"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-purple-100 group-hover:text-white group-hover:font-semibold transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        {skill.name}
                      </span>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              <Card className="animate-fadeIn bg-card/50 backdrop-blur-sm border-purple-400/15 hover:border-purple-400/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">About Me</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    Hello! I'm Daniel Y. Elbaz, a versatile developer with experience in a variety of languages,
                    frameworks, and product types. I've built multiple SaaS websites in React and TypeScript, but I've
                    also developed entire games in Java.
                  </p>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    I'm especially passionate about building products that leverage complex and cutting-edge technology
                    to solve modern problems and craft interactive applications as my extensive portfolio highlights.
                  </p>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    My expertise lies in desktop applications, math-heavy programming, and backend development, but I am
                    also experienced in frontend engineering. I look forward to growing the depth of my knowledge in
                    these fields while growing the range of my skills.
                  </p>
                </CardContent>
              </Card>
              <div
                className="relative w-full animate-fadeIn overflow-hidden rounded-lg aspect-[4/3]"
                style={{ animationDelay: "0.2s" }}
              >
                <Image
                  src="/images/design-mode/175679070.jpg.jpeg"
                  alt="About me"
                  fill
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover scale-x-[-1]"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          <section id="contact" className="py-24 md:py-32 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fadeIn">
              Let's Connect
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto animate-fadeIn px-4 leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              I'm currently open to new opportunities and collaborations. If you have a project in mind or just want to
              say hello, feel free to reach out.
            </p>
            <div className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
              <Button
                asChild
                size="lg"
                className="bg-purple-500/80 hover:bg-purple-500/90 text-white hover:scale-102 transition-all duration-300 min-w-[200px]"
              >
                <a href="mailto:contact@danielelbaz.dev">contact@danielelbaz.dev</a>
              </Button>
            </div>
          </section>
        </main>

        <footer className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-purple-400/15">
          <p className="text-center text-sm text-muted-foreground animate-fadeIn">
            &copy; {new Date().getFullYear()} Daniel Y. Elbaz. All rights reserved.
          </p>
        </footer>
      </div>

      <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-15px);
                    }
                }

                @keyframes rotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes moveRight {
                    0% {
                        left: -10px;
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        left: 100%;
                        opacity: 0;
                    }
                }

                @keyframes moveDown {
                    0% {
                        top: -10px;
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        top: 100%;
                        opacity: 0;
                    }
                }

                @keyframes wave {
                    0%, 100% {
                        transform: scaleX(1);
                    }
                    50% {
                        transform: scaleX(1.1);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out forwards;
                    opacity: 0;
                }

                .hover\\:scale-102:hover {
                    transform: scale(1.02);
                }

                .bg-radial-gradient {
                    background: radial-gradient(circle at center, var(--tw-gradient-stops));
                }
            `}</style>
    </div>
  )
}
