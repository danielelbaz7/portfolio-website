const projects = [
  {
    title: "StudyAP.ai",
    description:
      "A SaaS application for students in advanced placement high school classes. The program allows students to create custom high-quality practice questions with AI, all based on course curriculum.",
    expandedDescription:
      "The website offers free pre-generated practice questions and users have the option to pay for credits that they can use to generate questions for a variety of AP courses based on whatever topics they choose. The tool uses RAG to obtain the relevant information for the topic and generates unique questions every time, beating standard LLMs with its access to a much wider range of in-depth information. Questions can also be sorted by textbook chapter and course unit which provides versatility for customers and makes sure they can learn whatever material they need to.",
    tags: ["TypeScript", "React", "Python", "Flask", "TailwindCSS", "Supabase"],
    image: "/placeholder.svg?height=225&width=400",
    liveUrl: "https://studyap.ai",
    githubUrl: "#",
    privateRepo: true,
  },
  {
    title: "Game Boy Emulator",
    description:
      "A cycle-accurate Game Boy emulator with hardware-faithful CPU, PPU, and memory model. Implements the LR35902 instruction set with 500 opcodes, accurate scanline-based graphics rendering, the original memory map, and a GUI for ease-of-use.",
    expandedDescription:
      "This Game Boy (DMG) emulator implements a cycle-aware LR35902 CPU with a full fetch–decode–execute pipeline, correct flag behavior, interrupt servicing via IE/IF/IME, and accurate HALT/STOP semantics as validated by blargg CPU test ROMs. The emulator models the complete 16-bit memory map, including ROM banking, WRAM, HRAM, VRAM, OAM, and memory-mapped I/O registers with correct access restrictions. A scanline-driven PPU reproduces the original LCD timing, implementing OAM search, pixel transfer, H-Blank, and V-Blank modes, with background, window, and sprite rendering controlled by LCDC and STAT. The project is written in C++ with SDL2 for framebuffer output and input handling, emphasizing hardware accuracy, cycle timing, and low-level system behavior.",
    tags: ["C++", "SDL2"],
    image: "/placeholder.svg?height=225&width=400",
    liveUrl: "#",
    githubUrl: "https://github.com/danielelbaz7/Game-Boy-Emulator/",
    comingSoon: true,
  },
  {
    title: "Chip-8 Emulator",
    description:
      "A fully functional emulator for the Chip-8 virtual machine, a simple 8-bit interpreter originally designed to run games from the 1970s-80s. Supports all 35 opcodes with accurate cycle-by-cycle execution and graphical display.",
    expandedDescription:
      "This Chip-8 emulator faithfully recreates the original 8-bit virtual machine architecture, featuring a 64x32 pixel display, 16 8-bit registers, 4KB of memory, and a stack for subroutine calls. The emulator implements all 35 Chip-8 opcodes with precise timing and cycle-accurate execution. It uses a fetch-decode-execute cycle to interpret bytecode instructions and handles timer decrements for sound and delay operations. Built with C++ and SDL for high-performance graphics rendering, the emulator supports loading and playing original Chip-8 ROM files and includes adjustable execution speed. The project demonstrates deep understanding of low-level architecture, instruction sets, and how virtual machines work.",
    tags: ["C++", "SDL"],
    image: "/placeholder.svg?height=225&width=400",
    liveUrl: "#",
    githubUrl: "https://github.com/danielelbaz7/Chip_8",
    comingSoon: true,
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
    tags: ["TypeScript", "React", "Next.js", "TailwindCSS"],
    image: "/placeholder.svg?height=225&width=400",
    liveUrl: "#",
    githubUrl: "https://github.com/danielelbaz7/portfolio-website",
    isPortfolio: true,
  },
]

const Page = () => {
  return <div>{/* Render projects here */}</div>
}

export default Page
