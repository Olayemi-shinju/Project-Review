import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sun } from 'lucide-react';

const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <nav className="container h-[76px] flex items-center justify-between">

        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-lg bg-[#102B46] flex items-center justify-center">
            <Sun size={23} color="#F4B928" strokeWidth={2.2} />
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-[#102B46] tracking-tight">
              QUICKVIEW
            </h1>
            <p className="text-[9px] font-semibold tracking-[2px] text-slate-500">
              SOLAR PROJECTS
            </p>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#102B46]'
                    : 'text-slate-500 hover:text-[#102B46]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden md:inline-flex primary-button text-sm"
        >
          Get in touch
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#102B46] p-2"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>


      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg">
          <div className="container py-5 flex flex-col gap-5">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? 'text-[#102B46]' : 'text-slate-500'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/contact"
              onClick={closeMenu}
              className="primary-button text-sm w-full"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
