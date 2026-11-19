import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import Icon from '../components/Icon.jsx'

const links = [
  { to: '/dashboard', label: 'نظرة عامة', icon: 'grid' },
  { to: '/paths', label: 'المسارات التعليمية', icon: 'map' },
  { to: '/resources', label: 'المصادر والفرص', icon: 'book' },
]

export default function MainLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell" dir="rtl">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <NavLink to="/dashboard" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><Icon name="sparkles" size={23} /></span>
          <span>مِشوار<span className="brand-dot">.</span></span>
        </NavLink>
        <p className="nav-caption">القائمة الرئيسية</p>
        <nav className="side-nav" aria-label="القائمة الرئيسية">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon name={link.icon} size={19} />
              <span>{link.label}</span>
              {link.to === '/paths' && <Icon name="chevron" size={15} className="nav-chevron" />}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span className="note-icon"><Icon name="target" size={18} /></span>
            <strong>كل خطوة بتفرق</strong>
            <span>استمر في رحلتك، أنت أقرب لهدفك مما تتخيل.</span>
          </div>
          <button type="button" className="logout-button" onClick={handleLogout}>
            <Icon name="logout" size={18} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <button
            type="button"
            className="icon-button mobile-menu"
            aria-label="فتح القائمة"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name="menu" />
          </button>
          <div className="breadcrumb"><span>مساحة التعلم</span><Icon name="chevron" size={14} /><strong>رحلتك</strong></div>
          <div className="topbar-user">
            <button type="button" className="icon-button notification-button" aria-label="الإشعارات">
              <Icon name="bell" size={19} /><i />
            </button>
            <span className="topbar-divider" />
            <div className="user-chip">
              <div className="avatar">{(user?.name || 'م').trim().charAt(0).toUpperCase()}</div>
              <div className="user-info"><strong>{user?.name || 'متعلم'}</strong><span>متعلم جديد</span></div>
            </div>
          </div>
        </header>
        <main className="page-content"><Outlet /></main>
      </div>
    </div>
  )
}
