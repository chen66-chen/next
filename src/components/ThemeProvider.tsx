"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  // Initialize theme from localStorage (client-side only)
  useEffect(() => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  // Update the class on the html element
  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  // Helper function to safely access localStorage
  const getStoredTheme = (): Theme | undefined => {
    try {
      return localStorage.getItem(storageKey) as Theme || undefined
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      return undefined
    }
  }

  // Helper function to safely set localStorage
  const storeTheme = (theme: Theme): void => {
    try {
      localStorage.setItem(storageKey, theme)
    } catch (error) {
      console.error("Error setting localStorage:", error)
    }
  }

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)
      storeTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
