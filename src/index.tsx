import Loading from './components/Loading'
import './index.css'
import { ErrorBook } from './pages/ErrorBook'
import { FriendLinks } from './pages/FriendLinks'
import MobilePage from './pages/Mobile'
import TypingPage from './pages/Typing'
import { isOpenDarkModeAtom, isAuthenticatedAtom } from '@/store'
import { Analytics } from '@vercel/analytics/react'
import 'animate.css'
import { useAtomValue } from 'jotai'
import mixpanel from 'mixpanel-browser'
import process from 'process'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import 'react-app-polyfill/stable'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const AnalysisPage = lazy(() => import('./pages/Analysis'))
const GalleryPage = lazy(() => import('./pages/Gallery-N'))
const LoginPage = lazy(() => import('./pages/Login'))
const WordPreviewPage = lazy(() => import('./pages/WordPreview'))

if (process.env.NODE_ENV === 'production') {
  // for prod
  mixpanel.init('bdc492847e9340eeebd53cc35f321691')
} else {
  // for dev
  mixpanel.init('5474177127e4767124c123b2d7846e2a', { debug: true })
}

function Root() {
  const darkMode = useAtomValue(isOpenDarkModeAtom)
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  useEffect(() => {
    darkMode ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  }, [darkMode])

  // Prevent pull-to-refresh on iOS Safari and main page scrolling
  useEffect(() => {
    let startY = 0
    let startX = 0

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].pageY
      startX = e.touches[0].pageX
    }

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].pageY
      const currentX = e.touches[0].pageX
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

      // Calculate touch direction
      const deltaY = currentY - startY
      const deltaX = currentX - startX

      // Check if the touch target is inside a scrollable element
      let target = e.target as HTMLElement
      let isInsideScrollable = false

      while (target) {
        const style = window.getComputedStyle(target)
        if (style.overflow === 'auto' || style.overflow === 'scroll' || style.overflowY === 'auto' || style.overflowY === 'scroll') {
          // Check if the element has scrollable content
          if (target.scrollHeight > target.clientHeight) {
            isInsideScrollable = true
            break
          }
        }
        target = target.parentElement as HTMLElement
      }

      // Only handle vertical scrolling
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        // Prevent pull-to-refresh when at top and not inside a scrollable element
        if (scrollTop === 0 && deltaY > 0 && !isInsideScrollable) {
          e.preventDefault()
        }
        // Prevent scrolling the main page when at bottom and not inside a scrollable element
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        const clientHeight = document.documentElement.clientHeight || window.innerHeight
        if (scrollTop + clientHeight >= scrollHeight && deltaY < 0 && !isInsideScrollable) {
          e.preventDefault()
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      // Remove event listeners
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600
      if (!isMobile) {
        window.location.href = '/'
      }
      setIsMobile(isMobile)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <React.StrictMode>
      <BrowserRouter basename={REACT_APP_DEPLOY_ENV === 'pages' ? '/qwerty-learner' : ''}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {isMobile ? (
              <Route path="/*" element={<Navigate to="/mobile" />} />
            ) : (
              <>
                <Route index element={isAuthenticated ? <TypingPage /> : <Navigate to="/login" />} />
                <Route path="/gallery" element={isAuthenticated ? <GalleryPage /> : <Navigate to="/login" />} />
                <Route path="/analysis" element={isAuthenticated ? <AnalysisPage /> : <Navigate to="/login" />} />
                <Route path="/error-book" element={isAuthenticated ? <ErrorBook /> : <Navigate to="/login" />} />
                <Route path="/friend-links" element={isAuthenticated ? <FriendLinks /> : <Navigate to="/login" />} />
                <Route path="/word-preview/:dictionaryId" element={isAuthenticated ? <WordPreviewPage /> : <Navigate to="/login" />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </>
            )}
            <Route path="/mobile" element={<MobilePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Analytics />
    </React.StrictMode>
  )
}

const container = document.getElementById('root')

container && createRoot(container).render(<Root />)
