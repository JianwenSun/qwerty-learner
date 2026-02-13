import { isAuthenticatedAtom } from '@/store'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [isAuthenticated, setIsAuth] = useAtom(isAuthenticatedAtom)
  const [loginMethod, setLoginMethod] = useState('password') // 'password' 或 'wechat'
  const [qrcodeUrl, setQrcodeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (loginMethod === 'wechat') {
      generateWechatQrcode()
    }

    // 检查 URL 中是否有认证参数
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (token) {
      handleWechatCallback(token)
    }
  }, [loginMethod])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // 模拟用户密码登录
    setTimeout(() => {
      try {
        // 实际项目中，这里应该调用后端 API 验证用户名和密码
        if (formData.username && formData.password) {
          if (formData.username === 'sunshuo' && formData.password === 'sunshuo@143') {
            setIsAuth(true)
          } else {
            setError('请输入用户名和密码')
          }
        } else {
          setError('请输入用户名和密码')
        }
      } catch (err) {
        setError('登录失败，请检查用户名和密码')
        console.error('登录失败:', err)
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  const generateWechatQrcode = () => {
    setLoading(true)
    // 这里应该调用后端 API 生成微信扫码登录的二维码
    // 为了演示，我们使用一个模拟的二维码，包含微信登录回调链接
    setTimeout(() => {
      // 实际项目中，这里应该是后端返回的微信登录二维码 URL
      // 二维码应该包含微信登录的回调链接，例如：https://yourdomain.com/login?callback=wechat
      // 这里我们使用一个模拟的回调链接
      const callbackUrl = encodeURIComponent(window.location.origin + '/login')
      const wechatLoginUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=YOUR_APPID&redirect_uri=${callbackUrl}&response_type=code&scope=snsapi_login#wechat_redirect`
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(wechatLoginUrl)}`
      setQrcodeUrl(qrUrl)
      setLoading(false)
    }, 1000)
  }

  const handleWechatCallback = (token: string) => {
    // 验证 token 并设置认证状态
    setIsAuth(true)
    //localStorage.setItem('auth_token', token)
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">登录 Qwerty 学习平台</h1>
        </div>

        {/* 登录方式切换 */}
        <div className="mb-6 flex overflow-hidden rounded-lg border border-gray-200">
          <button
            onClick={() => setLoginMethod('password')}
            className={`flex-1 py-2 text-center ${
              loginMethod === 'password' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            账号密码登录
          </button>
          <button
            onClick={() => setLoginMethod('wechat')}
            className={`flex-1 py-2 text-center ${
              loginMethod === 'wechat' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            微信扫码登录
          </button>
        </div>

        {/* 账号密码登录表单 */}
        {loginMethod === 'password' && (
          <form onSubmit={handlePasswordLogin} className="w-full">
            {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-red-600">{error}</div>}

            <div className="mb-4">
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-black">
                用户名/邮箱
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="请输入用户名或邮箱"
                style={{ backgroundColor: 'white', color: 'black' }}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-black">
                密码
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="请输入密码"
                required
              />
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  记住我
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  忘记密码？
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>
        )}

        {/* 微信扫码登录 */}
        {loginMethod === 'wechat' && (
          <div className="flex flex-col items-center">
            {loading ? (
              <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-indigo-500"></div>
            ) : (
              <>
                {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-red-600">{error}</div>}
                <div className="mb-4 rounded-lg border-2 border-gray-200 p-2">
                  {qrcodeUrl ? (
                    <img
                      src={qrcodeUrl}
                      alt="微信登录二维码"
                      className="h-48 w-48"
                      onError={(e) => {
                        setError('二维码加载失败，请点击刷新重试')
                        console.error('二维码图片加载失败:', e)
                      }}
                    />
                  ) : (
                    <div className="flex h-48 w-48 items-center justify-center rounded bg-gray-100">
                      <span className="text-gray-500">二维码生成中...</span>
                    </div>
                  )}
                </div>
                <p className="mb-4 text-sm text-gray-500">请使用微信扫描二维码登录</p>
                <button
                  onClick={generateWechatQrcode}
                  className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  刷新二维码
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
