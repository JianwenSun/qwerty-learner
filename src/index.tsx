import Loading from './components/Loading'
import './index.css'
import { ErrorBook } from './pages/ErrorBook'
import { FriendLinks } from './pages/FriendLinks'
import MobilePage from './pages/Mobile'
import SentenceTypingPage from './pages/Typing/SentenceTyping'
import SentenceGalleryPage from './pages/Typing/SentenceTyping/pages/Gallery'
import WordTypingPage from './pages/Typing/WordTyping'
import { isOpenDarkModeAtom, isAuthenticatedAtom } from '@/store'
import { Analytics } from '@vercel/analytics/react'
import 'animate.css'
// 导入 Howler.js 并配置
import { useAtomValue } from 'jotai'
import mixpanel from 'mixpanel-browser'
import process from 'process'
import { Suspense, lazy, useEffect, useState } from 'react'
import 'react-app-polyfill/stable'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const AnalysisPage = lazy(() => import('./pages/Analysis'))
const WordGalleryPage = lazy(() => import('./pages/Typing/WordTyping/pages/Gallery'))
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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)

  return (
    <>
      <BrowserRouter basename={REACT_APP_DEPLOY_ENV === 'pages' ? '/qwerty-learner' : ''}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {isMobile ? (
              <Route path="/*" element={<Navigate to="/mobile" />} />
            ) : (
              <>
                <Route path="/word-typing" element={isAuthenticated ? <WordTypingPage /> : <Navigate to="/login" />} />
                <Route path="/word-typing/gallery" element={isAuthenticated ? <WordGalleryPage /> : <Navigate to="/login" />} />
                <Route path="/sentence-typing" element={isAuthenticated ? <SentenceTypingPage /> : <Navigate to="/login" />} />
                <Route path="/sentence-typing/gallery" element={isAuthenticated ? <SentenceGalleryPage /> : <Navigate to="/login" />} />
                <Route path="/analysis" element={isAuthenticated ? <AnalysisPage /> : <Navigate to="/login" />} />
                <Route path="/error-book" element={isAuthenticated ? <ErrorBook /> : <Navigate to="/login" />} />
                <Route path="/friend-links" element={isAuthenticated ? <FriendLinks /> : <Navigate to="/login" />} />
                <Route path="/word-preview/:dictionaryId" element={isAuthenticated ? <WordPreviewPage /> : <Navigate to="/login" />} />
                <Route path="/*" element={<Navigate to="/sentence-typing" />} />
              </>
            )}
            <Route path="/mobile" element={<MobilePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Analytics />
    </>
  )
}

const container = document.getElementById('root')

container && createRoot(container).render(<Root />)
