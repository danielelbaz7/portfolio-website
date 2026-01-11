"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface TerminalLine {
  text: string
  className?: string
}

interface TerminalEffectProps {
  lines: TerminalLine[]
  className?: string
  onStateChange?: (state: TerminalState) => void
}

type TerminalState = "normal" | "minimized" | "maximized" | "closed"

export function TerminalEffect({ lines, className, onStateChange }: TerminalEffectProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [terminalState, setTerminalState] = useState<TerminalState>("normal")

  const [userInput, setUserInput] = useState("")
  const [isInteractive, setIsInteractive] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const stateBeforeActionRef = useRef<TerminalState>("normal")
  const restoreTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false)
      setTimeout(() => {
        setIsInteractive(true)
        setShowWelcome(false)
      }, 1000)
      return
    }

    const currentLine = lines[currentLineIndex]
    const targetText = currentLine.text

    if (currentText.length < targetText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(targetText.slice(0, currentText.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1)
        setCurrentText("")
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [currentText, currentLineIndex, lines])

  useEffect(() => {
    onStateChange?.(terminalState)
  }, [terminalState, onStateChange])

  const clearRestoreTimeout = () => {
    if (restoreTimeoutRef.current) {
      clearTimeout(restoreTimeoutRef.current)
      restoreTimeoutRef.current = null
    }
  }

  const handleTerminalClick = () => {
    if (isInteractive && inputRef.current) {
      inputRef.current.focus()
      setIsFocused(true)
    }
  }

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase()
    setCommandHistory((prev) => [...prev, `$ ${command}`])

    if (cmd.startsWith("goto ")) {
      const section = cmd.substring(5).trim()
      const validSections = ["hero", "projects", "skills", "about", "contact"]

      if (validSections.includes(section)) {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
          setCommandHistory((prev) => [...prev, `Navigating to ${section} section...`])
        } else {
          setCommandHistory((prev) => [...prev, `Section '${section}' not found.`])
        }
      } else {
        setCommandHistory((prev) => [...prev, `Invalid section. Available: ${validSections.join(", ")}`])
      }
      return
    }

    switch (cmd) {
      case "help":
        setCommandHistory((prev) => [...prev, "Commands: help, clear, about, skills, projects, goto [section]"])
        break
      case "clear":
        setCommandHistory([])
        break
      case "about":
        setCommandHistory((prev) => [...prev, "Full-stack developer passionate about creating innovative solutions."])
        break
      case "skills":
        setCommandHistory((prev) => [...prev, "Languages: Java, Python, C#, JavaScript, TypeScript, and more..."])
        break
      case "projects":
        setCommandHistory((prev) => [...prev, "Check out my projects below! 👇"])
        break
      default:
        setCommandHistory((prev) => [...prev, `Command not found: ${command}. Type 'help' for available commands.`])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.trim()) {
      handleCommand(userInput)
      setUserInput("")
    }
  }

  const handleClose = () => {
    clearRestoreTimeout()
    if (terminalState === "normal" || terminalState === "maximized") {
      stateBeforeActionRef.current = terminalState
    }
    setTerminalState("closed")

    setCommandHistory([])
    setUserInput("")
    setCurrentLineIndex(0)
    setCurrentText("")
    setIsTyping(true)
    setIsInteractive(false)
    setShowWelcome(true)
    setIsFocused(false)

    restoreTimeoutRef.current = setTimeout(() => {
      setTerminalState(stateBeforeActionRef.current)
    }, 1500)
  }

  const handleMinimize = () => {
    clearRestoreTimeout()
    if (terminalState === "normal" || terminalState === "maximized") {
      stateBeforeActionRef.current = terminalState
    }
    setTerminalState("minimized")
    restoreTimeoutRef.current = setTimeout(() => {
      setTerminalState(stateBeforeActionRef.current)
    }, 1500)
  }

  const handleMaximize = () => {
    clearRestoreTimeout()
    if (terminalState === "normal") {
      setTerminalState("maximized")
    } else if (terminalState === "maximized") {
      setTerminalState("normal")
    }
  }

  if (terminalState === "closed") {
    return (
      <div
        className={cn(
          "bg-black/90 backdrop-blur-sm border border-purple-400/20 rounded-lg font-mono text-sm mx-auto overflow-hidden transition-all duration-700 ease-in-out transform-gpu",
          "max-w-2xl scale-0 opacity-0",
          className,
        )}
        style={{
          transformOrigin: "center",
        }}
      ></div>
    )
  }

  return (
    <div
      ref={terminalRef}
      onClick={handleTerminalClick}
      className={cn(
        "bg-black/90 backdrop-blur-sm border border-purple-400/20 rounded-lg font-mono text-sm mx-auto overflow-hidden transition-all duration-700 ease-in-out transform-gpu",
        "hover:border-purple-400/40",
        isInteractive && "cursor-text",
        terminalState === "normal" && "max-w-2xl scale-100 opacity-100",
        terminalState === "minimized" && "max-w-2xl scale-0 opacity-0 translate-x-[45vw] translate-y-[45vh]",
        terminalState === "maximized" && "max-w-5xl scale-97 opacity-100",
        className,
      )}
      style={{
        transformOrigin: terminalState === "minimized" ? "bottom right" : "center",
      }}
    >
      <div className="bg-gray-900 p-2 flex items-center relative">
        <div className="flex gap-1.5">
          <button
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors duration-200"
            aria-label="Close terminal"
          ></button>
          <button
            onClick={handleMinimize}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200"
            aria-label="Minimize terminal"
          ></button>
          <button
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors duration-200"
            aria-label="Maximize terminal"
          ></button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-white text-xs font-medium">Terminal</div>
      </div>
      <div
        className={cn(
          "p-4 space-y-3 text-left font-mono overflow-hidden",
          terminalState === "maximized" && "p-5 space-y-4 text-[15px]",
        )}
        style={{
          maxHeight: `${(lines.length + commandHistory.length + 2) * 3}rem`,
          transition: "max-height 0.4s ease-out, padding 0.3s ease-out",
        }}
      >
        <div
          className="transition-all duration-400 ease-out"
          style={{
            height: "auto",
            transition: "height 0.4s ease-out",
          }}
        >
          {lines.slice(0, currentLineIndex).map((line, index) => (
            <div key={index} className={cn("text-green-400 leading-relaxed mb-3", line.className)}>
              <span className="text-purple-400 font-medium">$</span> <span className="ml-3">{line.text}</span>
            </div>
          ))}
          {currentLineIndex < lines.length && (
            <div className={cn("text-green-400 leading-relaxed mb-3", lines[currentLineIndex]?.className)}>
              <span className="text-purple-400 font-medium">$</span> <span className="ml-3">{currentText}</span>
              {isTyping && <span className="text-green-400 font-bold animate-blink">|</span>}
            </div>
          )}

          {isInteractive &&
            commandHistory.map((cmd, index) => (
              <div key={`history-${index}`} className="text-green-400 leading-relaxed font-mono mb-3">
                {cmd.startsWith("$") ? (
                  <span>
                    <span className="text-purple-400 font-medium">$</span> <span className="ml-3">{cmd.slice(2)}</span>
                  </span>
                ) : (
                  <span className="ml-8 text-green-300">{cmd}</span>
                )}
              </div>
            ))}

          {isInteractive && (
            <div className="flex items-center text-green-400 leading-relaxed">
              <span className="text-purple-400 font-medium">$</span>
              <span className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="bg-transparent border-none outline-none w-full text-green-400 placeholder-green-400/60 font-mono caret-transparent"
                  placeholder="Type 'help' to begin..."
                  autoComplete="off"
                  spellCheck="false"
                  style={{
                    caretColor: "transparent",
                    paddingLeft: "0.75rem",
                  }}
                />
                <div
                  className="absolute top-0 w-0.5 h-5 bg-green-400 animate-blink pointer-events-none"
                  style={{
                    left: `${userInput.length * 0.6 + 0.75 + 0.1}rem`,
                    transform: "translateX(0)",
                  }}
                />
              </span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  )
}
