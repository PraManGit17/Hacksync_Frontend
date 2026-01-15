import React from 'react'
import { useState } from "react";
import { Trash } from "lucide-react";

const initialProject = {
  title: "",
  description: "",
  technologies: "",
  link: "",
  github: "",
};


const PortfolioGenerator = () => {

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    github: "",
    linkedin: "",
    projects: [initialProject],
  });

  const [loading, setLoading] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProjectChange = (index, e) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][e.target.name] = e.target.value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { ...initialProject }],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPortfolioUrl(null);

    const payload = {
      ...formData,
      projects: formData.projects.map((project) => ({
        ...project,
        technologies: project.technologies
          .split(",")
          .map((tech) => tech.trim()),
      })),
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/portfolio/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to generate portfolio");
      }

      setPortfolioUrl(result.data.url);

      // Auto open portfolio
      window.open(result.data.url, "_blank");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }

  };


  const handleContinue = () => {
    if (!formData.name || !formData.email) {
      setError("Name and Email are required");
      return;
    }
    setError(null);
    setStep(2);
  };

  return (

    <div className='relative z-10 black_bg h-screen w-full flex justify-center items-center overflow-hidden '>


      <img src="/images/web.png" className='absolute z-5 rotate-15 -bottom-15 -right-15' />

      <img src="/images/web.png" className='absolute z-5 rotate-15 scale-110  bottom-10 -left-10' />

      <div className='absolute z-0 w-[50%] h-full '>
        <div className='absolute z-0 rotate-45 h-200 w-20 bg-[#360ba1] -bottom-50 -left-75 opacity-75 '></div>
        <div className='absolute z-0 rotate-315 h-150 w-20 bg-[#360ba1] bottom-25  right-90 opacity-75'></div>
        <div className='absolute z-0 rotate-45 h-200 w-20 bg-[#360ba1] -top-70 -right-75 opacity-75'></div>
      </div>

      <div className="relative z-10 text-white w-full h-screen flex flex-col items-center ">

        <div className='text-3xl poppins-bold mt-22'>
          Fill Out This Form To Generate a Portfolio
        </div>

        <div
          className="
    mt-4 w-1/3 h-[550px]
    border-2 border-white
    rounded-2xl
    backdrop-blur-md bg-white/0
    flex flex-col 
    overflow-hidden
  "
        >

          <div className="flex items-center justify-center gap-3 px-6 py-4 border-b border-white/30">
            <img src="/images/skillspherelogo.png" className="w-6 h-6" />
            <div className="text-xl oxanium mt-1">Portfolio</div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">


              {/* {First Step} */}
              {step === 1 && (
                <>
                  <div className=' flex flex-col gap-2'>
                    <label>Name</label>
                    <input
                      name="name"
                      placeholder="Full Name"
                      onChange={handleChange}
                      className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                    />
                  </div>


                  <div className=' flex flex-col gap-2'>
                    <label>Email</label>
                    <input
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                    />
                  </div>

                  <div className=' flex flex-col gap-2'>
                    <label>Bio</label>
                    <input
                      name="bio"
                      placeholder="Bio"
                      onChange={handleChange}
                      className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                    />
                  </div>

                  <div className=' flex flex-col gap-2'>
                    <label>Github</label>
                    <input
                      name="github"
                      placeholder="Github URL"
                      onChange={handleChange}
                      className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                    />
                  </div>

                  <div className=' flex flex-col gap-2'>
                    <label>Linkedin</label>
                    <input
                      name="linkedin"
                      placeholder="Linkedin URL"
                      onChange={handleChange}
                      className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                    />
                  </div>
                </>)}

              {/* Second Step */}
              {step === 2 && (
                <>
                  {formData.projects.map((project, index) => (
                    <div key={index} className="flex flex-col gap-6 ">

                      <div className='relative w-full flex items-center gap-4'>

                        <div className='w-full flex flex-col gap-2'>
                          <label>Project Title</label>
                          <input
                            name="title"
                            placeholder="Enter Project Title"
                            value={project.title}
                            onChange={(e) => handleProjectChange(index, e)}
                            className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                          />
                        </div>

                        {formData.projects.length > 1 && (
                          <button type="button" onClick={() => removeProject(index)}
                            className='absolute top-0 right-0 scale-80'
                          >
                            <Trash className='text-red-500' />
                          </button>
                        )}
                      </div>


                      <div className='w-full flex flex-col gap-2'>
                        <label>Project Descrption</label>
                        <textarea
                          name="description"
                          placeholder="Project Description"
                          value={project.description}
                          onChange={(e) => handleProjectChange(index, e)}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        />
                      </div>

                      <div className='w-full flex flex-col gap-2'>
                        <label>Project Technologies</label>
                        <input
                          name="technologies"
                          placeholder="Technologies (comma separated)"
                          value={project.technologies}
                          onChange={(e) => handleProjectChange(index, e)}
                          className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                        />
                      </div>

                      <div className='w-full flex items-center gap-4'>
                        <div className='w-1/2 flex flex-col gap-2'>
                          <label>Hosted Link</label>
                          <input
                            name="link"
                            placeholder="Live Project Link"
                            value={project.link}
                            onChange={(e) => handleProjectChange(index, e)}
                            className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                          />
                        </div>

                        <div className='w-1/2 flex flex-col gap-2'>
                          <label>GitHub Repo</label>
                          <input
                            name="github"
                            placeholder="GitHub Repo Link"
                            value={project.github}
                            onChange={(e) => handleProjectChange(index, e)}
                            className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button type="button" onClick={addProject} className='border-2 border-white mt-2 p-2 rounded-lg text-sm'>
                    + Add Another Project
                  </button>
                </>
              )}

              <div className="px-6 py-4 border-t border-white/30">

                {/* STEP 1 → CONTINUE */}
                {step === 1 && (
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="w-full border-2 p-2 rounded-lg bg-purple-600"
                  >
                    Continue
                  </button>
                )}

                {/* STEP 2 → GENERATE */}
                {step === 2 && !portfolioUrl && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full border-2 p-2 rounded-lg bg-blue-500 disabled:opacity-50"
                  >
                    {loading ? "Generating..." : "Generate Portfolio"}
                  </button>
                )}

                {/* SUCCESS */}
                {portfolioUrl && (
                  <div className="text-center text-green-400">
                    <p className="font-semibold">🎉 Portfolio Generated</p>
                    <a
                      href={portfolioUrl}
                      target="_blank"
                      className="underline"
                    >
                      Open Portfolio
                    </a>
                  </div>
                )}

                {/* ERROR */}
                {error && (
                  <div className="text-center text-red-400">
                    {error}
                  </div>
                )}
              </div>

            </form>
          </div>



        </div>
      </div>

    </div>
  )
}

export default PortfolioGenerator


//  <div className='h-full w-[40%]'>


//           {portfolioUrl && (
//             <div className="mt-4 p-4 border border-green-400 rounded-lg bg-green-500/10">
//               <p className="text-green-400 font-semibold">
//                 🎉 Portfolio Generated Successfully!
//               </p>
//               <a
//                 href={portfolioUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline text-green-300 break-all"
//               >
//                 {portfolioUrl}
//               </a>
//             </div>
//           )}

//           {error && (
//             <div className="mt-4 p-4 border border-red-400 rounded-lg bg-red-500/10">
//               <p className="text-red-400">{error}</p>
//             </div>
//           )}

//         </div>


{/* <div className='h-full w-[45%] flex flex-col gap-3'>
         */}
{/* <div className='h-full w-[45%] flex flex-col gap-3 overflow-hidden'>
          <div className='poppins-bold text-2xl mt-25'>Fill Out The Following Form To Build A Portfolio</div>
         
          <form
            onSubmit={handleSubmit}
            className="space-y-6 mt-4 overflow-y-auto pr-4 no-scrollbar mb-5 "
          >

            <div className='w-full flex items-center gap-4'>
              <div className='w-1/2 flex flex-col gap-2'>
                <label>Name</label>
                <input
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                />
              </div>

              <div className='w-1/2 flex flex-col gap-2'>
                <label>Email</label>
                <input
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                />
              </div>
            </div>

            <div className='w-full flex flex-col gap-2'>
              <label>Bio</label>
              <input
                name="bio"
                placeholder="Bio"
                onChange={handleChange}
                className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
              />
            </div>

            <div className='w-full flex items-center gap-4'>
              <div className='w-1/2 flex flex-col gap-2'>
                <label>Github</label>
                <input
                  name="github"
                  placeholder="Github URL"
                  onChange={handleChange}
                  className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                />
              </div>

              <div className='w-1/2 flex flex-col gap-2'>
                <label>Linkedin</label>
                <input
                  name="linkedin"
                  placeholder="Linkedin URL"
                  onChange={handleChange}
                  className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                />
              </div>
            </div>

            <div className="space-y-2">
              <div>Projects</div>

              {formData.projects.map((project, index) => (
                <div key={index} className="flex flex-col gap-6 mt-5">

                  <div className='relative w-full flex items-center gap-4'>

                    <div className='w-1/2 flex flex-col gap-2'>
                      <label>Project Title</label>
                      <input
                        name="title"
                        placeholder="Enter Project Title"
                        value={project.title}
                        onChange={(e) => handleProjectChange(index, e)}
                        className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                      />
                    </div>

                    {formData.projects.length > 1 && (
                      <button type="button" onClick={() => removeProject(index)}
                        className='absolute top-9 right-0'
                      >
                        <Trash className='text-red-500' />
                      </button>
                    )}
                  </div>


                  <div className='w-full flex flex-col gap-2'>
                    <label>Project Descrption</label>
                    <textarea
                      name="description"
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, e)}
                      className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                    />
                  </div>

                  <div className='w-full flex flex-col gap-2'>
                    <label>Project Technologies</label>
                    <input
                      name="technologies"
                      placeholder="Technologies (comma separated)"
                      value={project.technologies}
                      onChange={(e) => handleProjectChange(index, e)}
                      className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                    />
                  </div>

                  <div className='w-full flex items-center gap-4'>
                    <div className='w-1/2 flex flex-col gap-2'>
                      <label>Hosted Link</label>
                      <input
                        name="link"
                        placeholder="Live Project Link"
                        value={project.link}
                        onChange={(e) => handleProjectChange(index, e)}
                        className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                      />
                    </div>

                    <div className='w-1/2 flex flex-col gap-2'>
                      <label>GitHub Repo</label>
                      <input
                        name="github"
                        placeholder="GitHub Repo Link"
                        value={project.github}
                        onChange={(e) => handleProjectChange(index, e)}
                        className='border-2 border-white backdrop-blur-md bg-white/5 rounded-lg px-4 py-1.5 placeholder:text-gray-300/70 placeholder:text-sm'
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" onClick={addProject} className='border-2 border-white mt-2 p-2 rounded-lg text-sm'>
                + Add Another Project
              </button>
            </div>

            <div className='w-full flex justify-center'>

              <button
                type="submit"
                disabled={loading}
                className="mt-3 w-1/3 border-2 mb-2 p-2 text-sm rounded-lg disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate Portfolio"}
              </button>

            </div>
          </form>
        </div> 
        
        */}