import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaCcPaypal } from 'react-icons/fa'
import { FiHeadphones, FiPhone, FiMapPin, FiChevronDown } from 'react-icons/fi'
import logo from '../assets/LSlogo.png'
import './Footer.css'

type FooterLink = { label: string; to: string }

// Links pointing to "#" don't have a page yet.
const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', to: '/shop' },
      { label: 'New Arrivals', to: '#' },
      { label: 'Best Sellers', to: '/best-seller' },
      { label: 'Deals & Promotions', to: '#' },
      { label: 'Gift Cards', to: '#' },
    ],
  },
  {
    title: 'Customer Support',
    links: [
      { label: 'Track Order', to: '/track-orders' },
      { label: 'Returns & Refunds', to: '#' },
      { label: 'Shipping Information', to: '#' },
      { label: 'FAQs', to: '#' },
      { label: 'Contact Us', to: '/contact-us' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { label: 'Our Story', to: '/about-us' },
      { label: 'Why Shop with Us', to: '#' },
      { label: 'Privacy Policy', to: '#' },
      { label: 'Terms & Conditions', to: '#' },
    ],
  },
]

const socials = [
  { label: 'Facebook', href: '#', icon: <FaFacebookF /> },
  { label: 'Instagram', href: '#', icon: <FaInstagram /> },
  { label: 'TikTok', href: '#', icon: <FaTiktok /> },
  { label: 'YouTube', href: '#', icon: <FaYoutube /> },
]

const year = new Date().getFullYear()

function Footer() {
  // Which link section is expanded on mobile (sections are always open on larger screens)
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggle = (title: string) =>
    setOpenSection((current) => (current === title ? null : title))

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" aria-label="Ledon Store home" className="footer-logo-link">
              <img src={logo} alt="Ledon Store" className="footer-logo" />
            </Link>
            <p>
              Your one-stop shop for top-quality products at great prices.
              Discover, shop, and enjoy with Ledon Store.
            </p>
            <div className="footer-socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => {
            const isOpen = openSection === col.title
            const id = `footer-${col.title.toLowerCase().replace(/\s+/g, '-')}`
            return (
              <div key={col.title} className={`footer-col${isOpen ? ' is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    className="footer-col-toggle"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => toggle(col.title)}
                  >
                    {col.title}
                    <FiChevronDown aria-hidden="true" />
                  </button>
                </h3>
                <ul id={id}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          <div className="footer-col footer-col-contact">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <span className="footer-contact-icon"><FiHeadphones /></span>
                <a href="mailto:support@vltradingco.com">support@vltradingco.com</a>
              </li>
              <li>
                <span className="footer-contact-icon"><FiPhone /></span>
                <a href="tel:+639123456789">+63 912 345 6789</a>
              </li>
              <li>
                <span className="footer-contact-icon"><FiMapPin /></span>
                <span>Baguio City, Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Ledon Store. All Rights Reserved.</p>
          <div className="footer-payments">
            <span className="footer-payments-label">We Accept</span>
            <div className="footer-payments-list">
              <span className="pay-badge pay-visa">VISA</span>
              <span className="pay-badge pay-mastercard" aria-label="Mastercard">
                <i />
                <i />
              </span>
              <span className="pay-badge pay-paypal">
                <FaCcPaypal /> PayPal
              </span>
              <span className="pay-badge pay-gcash">GCash</span>
              <span className="pay-badge pay-maya">maya</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
