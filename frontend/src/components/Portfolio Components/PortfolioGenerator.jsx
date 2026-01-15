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

  // Handle main form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProjectChange = (index, e) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][e.target.name] = e.target.value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  // Add new project
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { ...initialProject }],
    });
  };

  // Remove project
  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      projects: formData.projects.map((project) => ({
        ...project,
        technologies: project.technologies
          .split(",")
          .map((tech) => tech.trim()),
      })),
    };

    console.log("Final Payload:", payload);

    
  };


  return (

    <div className='relative z-10 black_bg h-screen w-full flex justify-center items-center overflow-hidden '>

      {/* <div className='absolute z-0 w-[50%] h-full scale-220 rounded-full -top-135 
      bg-[radial-gradient(circle_at_center,_#000000_0%,_#16081f_40%,_#4b1f6f_70%,_#6b2fa8_100%)]'></div>
 */}

      {/* <div className='absolute z-0 w-[50%] h-full scale-220 rounded-full -top-135 
          bg-[radial-gradient(circle_at_center,_#000_0%,_#1a1a1a_45%,_#2f2f8f_70%,_#5151BE_100%,_transparent_200%)]'></div>
 */}

      <div className="relative z-10 text-white w-full h-screen flex  items-center justify-center">
        <div className='h-full w-[40%]'></div>

        {/* <div className='h-full w-[45%] flex flex-col gap-3'>
         */}
        <div className='h-full w-[45%] flex flex-col gap-3 overflow-hidden'>

          <div className='poppins-bold text-2xl mt-25'>Fill Out The Following Form To Build A Portfolio</div>

          {/* <form onSubmit={handleSubmit} className="space-y-6 mt-4"> */}

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
                        <Trash className='text-red-500'/>
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
              <button type="submit" className="mt-3 w-1/3 border-2 mb-2 p-2 text-sm rounded-lg">
                Generate Portfolio Payload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PortfolioGenerator
