import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import Icon from '../components/Icon.jsx'

export default function AuthPage({ mode = 'login' }) {
  const isSignup = mode === 'signup'
  const { user, login, register } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to="/dashboard" replace />

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (isSignup && password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين.')
      return
    }

    setSubmitting(true)
    const action = isSignup ? register({ name, email, password }) : login(email, password)
    action
      .then(() => navigate(location.state?.from?.pathname || '/dashboard', { replace: true }))
      .catch((authError) => setError(authError.message || 'تعذر إكمال العملية. حاولي مرة أخرى.'))
      .finally(() => setSubmitting(false))
  }

  function useDemoAccount() {
    setEmail('demo@mashwar.app')
    setPassword('mashwar123')
  }

  return (
    <main className="auth-page" dir="rtl">
      <section className="auth-visual">
        <a className="brand auth-brand" href="/login">
          <span className="brand-mark"><Icon name="sparkles" size={23} /></span>
          <span>مِشوار<span className="brand-dot">.</span></span>
        </a>
        <div className="auth-visual-copy">
          <span className="eyebrow light-eyebrow">رحلتك تبدأ بخطوة</span>
          <h1>اكتشف طريقك<br />في عالم التقنية.</h1>
          <p>مسار واضح، خطوات صغيرة، وإنجازات حقيقية. خلّينا نبدأ مشوارك سوا.</p>
          <div className="visual-progress">
            <div className="visual-avatars"><span>ن</span><span>س</span><span>ر</span><span>+</span></div>
            <span>انضمّ لمجتمع يتعلّم كل يوم</span>
          </div>
        </div>
        <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
        <span className="visual-decoration">✳</span>
        <span className="visual-footnote">خطوة اليوم، تصنع فرق بكرة.</span>
      </section>
      <section className="auth-panel">
        <div className="auth-form-wrap">
          <div className="auth-heading">
            <span className="eyebrow">{isSignup ? 'خطوتك الأولى لمستقبلك' : 'أهلاً بعودتك'}</span>
            <h2>{isSignup ? 'أنشئي حسابك' : 'سجّلي دخولك'}</h2>
            <p>{isSignup ? 'أنشئي حساباً واحفظي مسارك وإنجازاتك.' : 'كمّلي مشوارك وخلي حلمك أقرب.'}</p>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <label htmlFor="name">الاسم</label>
                <input id="name" type="text" autoComplete="name" placeholder="كيف نناديك؟" value={name} onChange={(event) => setName(event.target.value)} minLength={2} required />
              </>
            )}
            <label htmlFor="email">البريد الإلكتروني</label>
            <input id="email" type="email" autoComplete="email" placeholder="name@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <div className="password-label">
              <label htmlFor="password">كلمة المرور</label>
              {!isSignup && <button type="button" onClick={() => setError('لإعادة تعيين كلمة المرور، أنشئي حساباً جديداً أو تواصلي مع الدعم.')}>نسيتِ كلمة المرور؟</button>}
            </div>
            <input id="password" type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} placeholder={isSignup ? '٨ أحرف على الأقل' : '••••••••'} value={password} onChange={(event) => setPassword(event.target.value)} minLength={isSignup ? 8 : undefined} required />
            {isSignup && (
              <>
                <label htmlFor="confirm-password" className="confirm-label">تأكيد كلمة المرور</label>
                <input id="confirm-password" type="password" autoComplete="new-password" placeholder="أعيدي كتابة كلمة المرور" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength={8} required />
              </>
            )}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary auth-submit" type="submit" disabled={submitting}>
              {submitting ? 'لحظة من فضلك...' : isSignup ? 'إنشاء حساب والبدء' : 'دخول إلى حسابي'} <Icon name="arrow" size={17} />
            </button>
          </form>
          {!isSignup && (
            <div className="demo-box">
              <div><strong>جرّبي المنصة الآن</strong><span>حساب تجريبي جاهز، بدون إنشاء حساب.</span></div>
              <button type="button" onClick={useDemoAccount}>استخدمي الحساب التجريبي</button>
              <small>demo@mashwar.app · mashwar123</small>
            </div>
          )}
          {isSignup && <p className="auth-hint">بيانات الحساب محفوظة محلياً على هذا المتصفح في النسخة التجريبية.</p>}
          <div className="auth-footer">
            {isSignup ? 'عندك حساب بالفعل؟' : 'لسه ما عندك حساب؟'}
            <a href={isSignup ? '/login' : '/signup'}>{isSignup ? 'سجّلي الدخول' : 'انضمي إلينا'}</a>
          </div>
        </div>
      </section>
    </main>
  )
}
