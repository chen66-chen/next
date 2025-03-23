"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import ClientWindowWrapper from "./ClientWindowWrapper"

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
  const [mounted, setMounted] = useState(false)

  // 确保只在客户端执行
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize theme from localStorage (client-side only)
  useEffect(() => {
    if (!mounted) return

    const storedTheme = getStoredTheme()
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [mounted])

  // Update the class on the html element
  useEffect(() => {
    if (!mounted) return
    
    const applyTheme = () => {
      if (typeof window === 'undefined') return
      
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
    }
    
    applyTheme()
  }, [theme, mounted])

  // Helper function to safely access localStorage
  const getStoredTheme = (): Theme | undefined => {
    if (typeof window === 'undefined') return undefined
    
    try {
      return localStorage.getItem(storageKey) as Theme || undefined
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      return undefined
    }
  }

  // Helper function to safely set localStorage
  const storeTheme = (theme: Theme): void => {
    if (typeof window === 'undefined') return
    
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

  // 避免服务端渲染闪烁
  if (!mounted) {
    return (
      <ThemeProviderContext.Provider value={initialState}>
        {children}
      </ThemeProviderContext.Provider>
    )
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
