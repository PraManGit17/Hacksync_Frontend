import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Utility to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
        ${scrolled ? 'py-3 backdrop-blur-md bg-black/40 border-b border-white/5' : 'py-6 bg-transparent'}
      `}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* LOGO */}
        <div className='flex items-center gap-3 group'>
          <img src="/images/skillspherelogo.png" className='w-8 h-8 group-hover:rotate-12 transition-transform' alt="Logo" />
          <Link to='/' className='text-2xl font-bold tracking-tighter uppercase italic text-white'>
            Skill<span className='text-purple-500'>Sphere</span>
          </Link>
        </div>

        {/* NAV LINKS */}
        <div className='hidden lg:flex items-center gap-8'>
          {[
            { name: 'Career', path: '/path' },
            { name: 'Interview', path: '/interview' },
            { name: 'Resume', path: '/resume' },
            { name: 'Flashcards', path: '/flashcards-topics' },
            { name: 'Kanban', path: '/kanban' },
            { name: 'Roadmaps', path: '/roadmaps' },
          ].map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-[13px] font-bold uppercase tracking-widest transition-colors hover:text-purple-500 
                ${isActive(link.path) ? 'text-purple-500' : 'text-zinc-400'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className='flex items-center gap-4'>
          <button className='hidden md:block text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors'>
            Login
          </button>
          <button className='bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-lg shadow-purple-900/20 active:scale-95'>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}