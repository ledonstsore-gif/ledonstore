import { useEffect, useState } from 'react'
import type { ComponentProps } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiShoppingCart,
  FiPackage,
  FiChevronRight,
  FiArrowRight,
} from 'react-icons/fi'
import logo from '../assets/LSlogo.png'
import './Header.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about-us', label: 'About Us' },
  { to: '/best-seller', label: 'Best Seller' },
  { to: '/contact-us', label: 'Contact Us' },
]

function Header() {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  // Add a shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll and allow Escape to close while the menu is open
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleSearch: ComponentProps<'form'>['onSubmit'] = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
  }

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-main">
        <button
          type="button"
          className="icon-btn menu-toggle"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <FiMenu />
        </button>

        <Link to="/" className="header-logo" aria-label="Ledon Store home">
          <img src={logo} alt="Ledon Store" />
        </Link>

        <form className="header-search" onSubmit={handleSearch} role="search">
          <FiSearch className="header-search-icon" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search for products, brands, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" aria-label="Search">
            <FiSearch />
          </button>
        </form>

        <div className="header-actions">
          <NavLink to="/account" className="header-action header-action-account">
            <span className="header-action-icon">
              <FiUser />
            </span>
            <span className="header-action-label">Account</span>
          </NavLink>
          <NavLink to="/cart" className="header-action">
            <span className="header-action-icon">
              <FiShoppingCart />
            </span>
            <span className="header-action-label">Cart</span>
          </NavLink>
        </div>
      </div>

      <div className="header-navbar">
        <div className="container header-navbar-inner">
          <Link to="/track-orders" className="track-orders-btn">
            <FiPackage />
            <span>Track Orders Now</span>
            <FiArrowRight className="track-orders-arrow" />
          </Link>

          <nav className="header-nav" aria-label="Main">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Slide-out menu for tablet and mobile */}
      <div
        className={`drawer-overlay${menuOpen ? ' is-open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <aside
        id="mobile-menu"
        className={`drawer${menuOpen ? ' is-open' : ''}`}
        aria-label="Menu"
        inert={!menuOpen}
      >
        <div className="drawer-head">
          <Link to="/" onClick={closeMenu} aria-label="Ledon Store home">
            <img src={logo} alt="Ledon Store" className="drawer-logo" />
          </Link>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <FiX />
          </button>
        </div>

        <Link to="/track-orders" className="track-orders-btn drawer-track" onClick={closeMenu}>
          <FiPackage />
          <span>Track Orders Now</span>
          <FiArrowRight className="track-orders-arrow" />
        </Link>

        <nav className="drawer-nav" aria-label="Mobile">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={closeMenu}
            >
              {link.label}
              <FiChevronRight />
            </NavLink>
          ))}
        </nav>

        <div className="drawer-footer">
          <NavLink to="/account" onClick={closeMenu}>
            <FiUser /> My Account
          </NavLink>
          <NavLink to="/cart" onClick={closeMenu}>
            <FiShoppingCart /> Cart
          </NavLink>
        </div>
      </aside>
    </header>
  )
}

export default Header
