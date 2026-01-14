import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`
        fixed top-0 left-0 w-full py-5 z-20 px-35 text-white
        flex items-center justify-between
        transition-all duration-300 ease-out

        ${scrolled
          ? 'backdrop-blur-xl bg-white/10 border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
          : 'bg-transparent'
        }
      `}
    >


      <div className='flex items-center gap-3 '>
        <img src="/images/skillspherelogo.png" className='w-8 h-8' />
        {/* <Sparkles className='text-white' /> */}
        <div className='text-3xl oxanium mt-1'>Skillsphere</div>
      </div>

      <div className='poppins text-lg flex items-center gap-10 mt-2'>
        <div>Carieer</div>
        <div>Portfolio</div>
        <div>Interview</div>
        <div>Resume</div>
      </div>

      <div className='flex items-center gap-4'>
        <button className='bg-blue-500/60 rounded-md w-30 px-2 py-2'>Get Started</button>
        <button className='border border-white px-6 py-2 rounded-lg'>Login</button>
      </div>
    </div>
  )
}




// <div className="fixed top-0 left-0 w-full px-35 py-5  z-20 text-white bg-transparent
//   flex items-center justify-between
// ">