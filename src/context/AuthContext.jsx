import { useMemo, useState } from 'react'
import { AuthContext } from './auth-context.js'

const USER_STORAGE_KEY = 'mashwar-user'
const ACCOUNTS_STORAGE_KEY = 'mashwar-accounts'
const DEMO_ACCOUNT = { email: 'demo@mashwar.app', password: 'mashwar123', name: 'متعلم مشوار' }

function readStoredUser() {
  try {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY)
    const user = storedUser ? JSON.parse(storedUser) : null
    if (!user?.email) return null
    const email = user.email.trim().toLowerCase()
    if (email === DEMO_ACCOUNT.email || readAccounts().some((account) => account.email === email)) {
      return { name: user.name || DEMO_ACCOUNT.name, email }
    }
    localStorage.removeItem(USER_STORAGE_KEY)
    return null
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY)
    return null
  }
}

function readAccounts() {
  try {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_STORAGE_KEY) || '[]')
    return Array.isArray(accounts) ? accounts : []
  } catch {
    localStorage.removeItem(ACCOUNTS_STORAGE_KEY)
    return []
  }
}

function bytesToHex(bytes) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('التشفير غير متاح في هذا المتصفح. افتحي الموقع عبر localhost أو اتصال آمن.')
  }

  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const derivedBits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 120000, hash: 'SHA-256' },
    keyMaterial,
    256,
  )
  return bytesToHex(derivedBits)
}

function createSalt() {
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error('تعذر إنشاء حساب آمن. افتحي الموقع عبر localhost أو اتصال آمن.')
  }
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return bytesToHex(bytes)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  async function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail || !password) {
      throw new Error('أدخلي البريد الإلكتروني وكلمة المرور.')
    }

    let account
    if (normalizedEmail === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
      account = { email: DEMO_ACCOUNT.email, name: DEMO_ACCOUNT.name }
    } else {
      const savedAccount = readAccounts().find((item) => item.email === normalizedEmail)
      if (!savedAccount || await hashPassword(password, savedAccount.salt) !== savedAccount.passwordHash) {
        throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة. إذا كنتِ جديدة، أنشئي حساباً أولاً.')
      }
      account = { email: savedAccount.email, name: savedAccount.name }
    }

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(account))
    setUser(account)
  }

  async function register({ name, email, password }) {
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedName = name.trim()
    if (!normalizedName || !normalizedEmail || !password) {
      throw new Error('أكملي جميع الحقول المطلوبة.')
    }

    const accounts = readAccounts()
    if (normalizedEmail === DEMO_ACCOUNT.email || accounts.some((account) => account.email === normalizedEmail)) {
      throw new Error('هذا البريد مسجّل بالفعل. سجّلي الدخول بدلاً من ذلك.')
    }

    const salt = createSalt()
    const passwordHash = await hashPassword(password, salt)
    accounts.push({ name: normalizedName, email: normalizedEmail, salt, passwordHash })
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts))
    const nextUser = { name: normalizedName, email: normalizedEmail }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }

  function logout() {
    localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
