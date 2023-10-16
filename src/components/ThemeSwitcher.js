'use client'
import { useState, useEffect } from 'react'
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      type="button"
      className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      onClick={() => handleTheme()}
    >
      {theme === 'light' ? <BiSolidSun /> : <BiSolidMoon />}
    </button>
  )
}

export default ThemeSwitcher
