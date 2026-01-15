// import React, { useState, useEffect } from 'react';
// import { companies } from "../../data/Companylist.js";

// const CareerHero = () => {
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//   // Track mouse position
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePos({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Function to calculate distance between mouse and element
//   const getDistance = (el) => {
//     if (!el) return 9999;
//     const rect = el.getBoundingClientRect();
//     const elX = rect.left + rect.width / 2;
//     const elY = rect.top + rect.height / 2;
//     return Math.hypot(mousePos.x - elX, mousePos.y - elY);
//   };

//   return (
//     <div className="relative black_bg h-screen w-full flex justify-center items-center overflow-hidden">

//       {/* Background Cards */}
//       <div className="absolute inset-0 z-10 py-30 px-15 ">
//         <div className="w-full text-white flex flex-wrap items-center justify-between gap-6 ">

//           {companies.map((company, index) => {
//             const radius = 120;
//             const [opacity, setOpacity] = React.useState(0);

//             return (
//               <div
//                 key={index}
//                 className="
//                   group relative
//                   border border-white/80
//                   rounded-lg
//                   px-3 py-2
//                   flex items-center gap-2
//                   backdrop-blur-md
//                   bg-white/5
//                   transition-all duration-300 ease-out
//                   hover:-translate-y-2
//                   hover:scale-105
//                   hover:z-20
//                 "
//                 style={{
//                   opacity: opacity,
//                 }}
//                 ref={(el) => {
//                   if (el) {
//                     const dist = getDistance(el);
//                     setOpacity(dist < radius ? 1 : 0);
//                   }
//                 }}
//               >
//                 {/* Gradient shine */}
//                 <div
//                   className="
//                     absolute 
//                     inset-0
//                     rounded-lg
//                     opacity-0
//                     group-hover:opacity-100
//                     transition-opacity duration-300
//                     bg-gradient-to-b from-[#4242d6] to-white/0"
//                 />
//                 <img
//                   src={company.logo}
//                   alt={company.name}
//                   className="w-5 h-5 object-contain relative z-10"
//                 />
//                 <span className="text-sm font-medium relative z-10">
//                   {company.name}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <div className='absolute z-0 w-[50%] h-full scale-220 rounded-full -top-100 -left-50 
//           bg-[radial-gradient(circle_at_center,_#000_0%,_#1a1a1a_45%,_#2f2f8f_70%,_#5151BE_100%,_transparent_200%)]'></div>



//       {/* Foreground hero content (optional) */}
//       <div className="relative z-40 w-full h-full flex flex-col items-center justify-center gap-2 text-white">


//         <div className='text-5xl poppins-bold leading-relaxed w-full flex justify-center'>
//           <div className='max-w-2xl border-2 border-white'>Discover Your Perfect Career Path with Skillsphere</div>
//         </div>

//         <div className='mt-5 text-xl poppins max-w-2xl text-center'>
//           Discover the right career path, build job-ready skills, and prepare for real interviews —
//           all with <span className='font-bold'>Skillsphere</span> platform.
//         </div>

//         <div className='flex items-center gap-10 mt-8 poppins'>
//           <button className='bg-[#360ba1] rounded-md w-35 px-2 py-2'>On-Boarding</button>
//           <button className='border border-white w-30 px-6 py-2 rounded-lg'>Explore</button>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default CareerHero;



import React, { useState, useEffect } from 'react';
import { companies } from "../../data/Companylist.js";

const CareerHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveringText, setHoveringText] = useState(false); // track hover on text

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Function to calculate distance between mouse and element
  const getDistance = (el) => {
    if (!el) return 9999;
    const rect = el.getBoundingClientRect();
    const elX = rect.left + rect.width / 2;
    const elY = rect.top + rect.height / 2;
    return Math.hypot(mousePos.x - elX, mousePos.y - elY);
  };

  return (
    <div className="relative black_bg h-screen w-full flex justify-center items-center overflow-hidden">

      {/* Background Cards */}
      <div className="absolute inset-0 z-10 py-30 px-15">
        <div className="w-full text-white flex flex-wrap items-center justify-between gap-6 ">
          {companies.map((company, index) => {
            const radius = 100;
            const [opacity, setOpacity] = React.useState(0);

            // If hovering text, hide all background cards
            const finalOpacity = hoveringText ? 0 : opacity;

            return (
              <div
                key={index}
                className="
                  group relative
                  border border-white/60
                  rounded-lg
                  px-3 py-2
                  flex items-center gap-2
                  backdrop-blur-md
                  bg-white/5
                  transition-all duration-300 ease-out
                  hover:-translate-y-2
                  hover:scale-105
                  hover:z-20
                "
                style={{
                  opacity: finalOpacity,
                }}
                ref={(el) => {
                  if (el) {
                    const dist = getDistance(el);
                    setOpacity(dist < radius ? 1 : 0);
                  }
                }}
              >
                {/* Gradient shine */}
                <div
                  className="
                    absolute 
                    inset-0
                    rounded-lg
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                    bg-gradient-to-b from-[#4242d6] to-white/0"
                />
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-5 h-5 object-contain relative z-10"
                />
                <span className="text-sm font-medium relative z-10">
                  {company.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Radial gradient background */}
      <div className='absolute z-0 w-[50%] h-full scale-220 rounded-full -top-100 -left-50 
          bg-[radial-gradient(circle_at_center,_#000_0%,_#1a1a1a_45%,_#2f2f8f_70%,_#5151BE_100%,_transparent_200%)]'></div>

      {/* Foreground hero content */}
      <div
        className="relative z-20  flex flex-col items-center justify-center gap-2 text-white "
        onMouseEnter={() => setHoveringText(true)}
        onMouseLeave={() => setHoveringText(false)}
      >

        <div className='text-5xl poppins-bold leading-relaxed max-w-[950px] text-center'>
          <div >Discover Your Perfect Career Path with Skillsphere</div>
        </div>

        <div className='mt-5 text-xl poppins max-w-2xl text-center'>
          Explore career paths tailored to you. Understand the milestones to achieve in your path to destined success!
        </div>

        <div className='flex items-center gap-10 mt-8 poppins'>
          <button className='bg-[#4209d1] rounded-md  px-4 py-2'>Generate Roadmap</button>
        </div>
      </div>

    </div>
  );
};

export default CareerHero;
