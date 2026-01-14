import React from 'react'
import { useState } from "react";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",

  education: [
    {
      degree: "",
      institution: "",
      field: "",
      year: ""
    }
  ],

  workExperience: [
    {
      position: "",
      company: "",
      duration: "",
      description: ""
    }
  ],

  skills: [],

  projects: [
    {
      name: "",
      description: "",
      technologies: []
    }
  ]
};


const OnBoarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [skillInput, setSkillInput] = useState("");
  const [techInput, setTechInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!name.includes("[")) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
      return;
    }

    // Handles nested fields like education[0].degree
    const keys = name.replace("]", "").split(/\.|\[/);

    setFormData((prev) => {
      const updated = structuredClone(prev);
      let ref = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        ref = ref[keys[i]];
      }

      ref[keys[keys.length - 1]] = value;
      return updated;
    });
  };


  const addSkill = () => {
    if (!skillInput.trim()) return;

    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, skillInput.trim()]
    }));

    setSkillInput("");
  };


  const addTechnology = () => {
    if (!techInput.trim()) return;
    setFormData(prev => {
      const updated = structuredClone(prev);
      updated.projects[0].technologies.push(techInput.trim());
      return updated;
    });
    setTechInput("");
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "resumeFormData",
      JSON.stringify(formData)
    );

    console.log("Saved Resume Data:", formData);
  };


  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // useEffect(() => {
  //   const saved = localStorage.getItem("resumeFormData");
  //   if (saved) {
  //     setFormData(JSON.parse(saved));
  //   }
  // }, []);




  return (
    <div className='relative z-10 black_bg h-screen w-full flex justify-center items-center overflow-hidden '>

      <div className='absolute z-0 w-[50%] h-full '>
        <div className='absolute z-0 rotate-45 h-200 w-20 bg-[#360ba1] -bottom-50 -left-75 '></div>
        <div className='absolute z-0 rotate-45 h-200 w-20 bg-[#360ba1] -top-70 -right-75 '></div>
      </div>


      <div className="relative z-10 text-white w-full h-screen flex flex-col items-center gap-5">


        <div className='text-4xl poppins-bold leading-relaxed mt-25 text-center flex items-center gap-2'>
          <div> Help us understand you,</div>
          <div>So we can guide you better.</div>
        </div>

        <div
          className="
    border-2 border-white w-[35%] rounded-3xl
    backdrop-blur-xl bg-white/0
    flex flex-col
  "
        >

          <form onSubmit={handleSubmit} className="w-full h-full px-4 py-6 text-white">
            {/* First Step */}
            {step === 1 && (
              <>
                <div className="flex flex-col h-[450px]">

                  <div className="shrink-0 text-center mt-3">
                    <div className="poppins-bold text-xl">
                      Lets Begin With Your Introduction
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar scroll-fade">
                    <div className="w-full flex flex-col items-center pb-6">


                      <div className="flex flex-col gap-2 w-[80%] mt-8">
                        <label className="poppins">Name</label>
                        <input
                          name="fullName"
                          placeholder="Enter Name"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-[80%] mt-6">
                        <label className="poppins">Phone</label>
                        <input
                          name="phone"
                          placeholder="Enter Phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-[80%] mt-6">
                        <label className="poppins">Email</label>
                        <input
                          name="email"
                          placeholder="Enter Email"
                          value={formData.email}
                          onChange={handleChange}
                          className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                        />
                      </div>

                    </div>
                  </div>

                  <div className="shrink-0 flex justify-center w-[80%] mx-auto mt-6">
                    <button
                      type="button" onClick={nextStep}
                      className="bg-blue-500/80 rounded-md w-40 px-4 py-2"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </>)}

            {/* Second Step */}
            {step === 2 && (
              <>

                <div className="shrink-0 text-center">
                  <div className="poppins-bold text-xl">
                    Lets Us Know Your Qualification
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar scroll-fade">
                  <div className="w-full flex flex-col items-center pb-6">

                    <div className="flex flex-col gap-2 w-[80%] mt-4">
                      <label className="poppins">Degree</label>
                      <input
                        type="text"
                        placeholder="e.g. Bachelors of Engineering"
                        name="education[0].degree"
                        value={formData.education[0].degree}
                        onChange={handleChange}
                        className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-[80%] mt-6">
                      <label className="poppins">Institution</label>

                      <input
                        type="text"
                        placeholder="e.g. Thadomal Shahani Engineering College"
                        name="education[0].institution"
                        value={formData.education[0].institution}
                        onChange={handleChange}
                        className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                      />
                    </div>



                    <div className="flex flex-col gap-2 w-[80%] mt-6">
                      <label className="poppins">Field of Study</label>
                      <input
                        type="text"
                        placeholder="e.g. Computer Engineering"
                        name="education[0].field"
                        value={formData.education[0].field}
                        onChange={handleChange}
                        className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-[80%] mt-6">
                      <label className="poppins">Duration</label>
                      <input
                        type="text"
                        placeholder="e.g. August 2023 - Present"
                        name="education[0].year"
                        value={formData.education[0].year}
                        onChange={handleChange}
                        className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm
            "
                      />
                    </div>
                  </div>
                </div>


                <div className="shrink-0 flex items-center gap-4 w-[80%] mx-auto mt-6">
                  <button
                    type="button" onClick={prevStep}
                    className="border border-white w-[50%] px-6 py-2 rounded-lg"
                  >
                    Back
                  </button>

                  <button
                    type="button" onClick={nextStep}
                    className="bg-blue-500/80 rounded-md w-[50%] px-2 py-2"
                  >
                    Continue
                  </button>
                </div>
              </>)}

            {/* Third Step */}

            {step === 3 && (
              <>
                <div className="flex flex-col h-[450px]">
                  <div className="shrink-0 text-center">
                    <div className="poppins-bold text-xl">
                      Lets Us Know Your Experience
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar scroll-fade">

                    <div className="w-full flex flex-col items-center pb-6">

                      <div className="flex flex-col gap-2 w-[80%] mt-4">
                        <label className="poppins">Job Title / Role</label>
                        <input
                          type="text"
                          placeholder="e.g. Member of Tech Team"
                          name="workExperience[0].position"
                          value={formData.workExperience[0].position}
                          onChange={handleChange}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-[80%] mt-6">
                        <label className="poppins">Company</label>
                        <input
                          type="text"
                          placeholder="e.g. CSI - TSEC"
                          name="workExperience[0].company"
                          value={formData.workExperience[0].company}
                          onChange={handleChange}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-[80%] mt-6">
                        <label className="poppins">Description</label>
                        <textarea
                          placeholder="Describe your responsibilities and achievements"
                          name="workExperience[0].description"
                          value={formData.workExperience[0].description}
                          onChange={handleChange}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-[80%] mt-6">
                        <label className="poppins">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. June 2024 - Dec 2024"
                          name="workExperience[0].duration"
                          value={formData.workExperience[0].duration}
                          onChange={handleChange}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        />
                      </div>

                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-4 w-[80%] mx-auto mt-4">
                    <button
                      type="button" onClick={prevStep}
                      className="border border-white w-[50%] px-6 py-2 rounded-lg"
                    >
                      Back
                    </button>

                    <button
                      type="button" onClick={nextStep}
                      className="bg-blue-500/80 rounded-md w-[50%] px-2 py-2"
                    >
                      Continue
                    </button>
                  </div>
                </div>

              </>)}

            {/* Fourth Step */}
            {step === 4 && (
              <>
                <div className="flex flex-col h-[450px]">
                  <div className="shrink-0 text-center">
                    <div className="poppins-bold text-xl">
                      Lets Us Know Your Skills
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar scroll-fade">

                    <div className="w-full flex flex-col items-center pb-6">
                      <div className="flex flex-col gap-2 w-[70%] mt-6">
                        <label className="poppins">Skills</label>
                        <input
                          type="text"
                          placeholder="Type Skill"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          className="
                        border border-white bg-transparent backdrop-blur-xl
                        px-3 py-1.5 rounded-lg
                        placeholder:text-gray-300/60 placeholder:text-sm
                        "
                        />
                      </div>
                      <div className='w-[70%] flex justify-end'>

                        <button type="button" onClick={addSkill}
                          className="bg-blue-500/80 rounded-md w-40 px-2 py-1.5 mt-4 text-sm"
                        >
                          + Add Skill
                        </button>
                      </div>
                    </div>

                    <ul>
                      {formData.skills.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>

                  <div className="shrink-0 flex items-center gap-4 w-[80%] mx-auto mt-4">
                    <button
                      type="button" onClick={prevStep}
                      className="border border-white w-[50%] px-6 py-2 rounded-lg"
                    >
                      Back
                    </button>

                    <button
                      type="button" onClick={nextStep}
                      className="bg-blue-500/80 rounded-md w-[50%] px-2 py-2"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </>)}

            {/* Fifth Step */}
            {step === 5 && (
              <>
                <div className="flex flex-col h-[450px]">
                  <div className="shrink-0 text-center">
                    <div className="poppins-bold text-xl">
                      Share Your Work With Us
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto no-scrollbar scroll-fade">
                    <div className="w-full flex flex-col items-center pb-6">

                      <div className="flex flex-col gap-2 w-[80%] mt-4">
                        <label className="poppins">Project Name</label>
                        <input
                          type="text"
                          placeholder="e.g. MediStats"
                          name="projects[0].name"
                          value={formData.projects[0].name}
                          onChange={handleChange}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-[80%] mt-6">
                        <label className="poppins">Project Description</label>
                        <textarea
                          placeholder="Explain what the project does"
                          name="projects[0].description"
                          value={formData.projects[0].description}
                          onChange={handleChange}
                          className="border border-white bg-transparent backdrop-blur-xl
                     px-3 py-1.5 rounded-lg
                     placeholder:text-gray-300/60 placeholder:text-sm"
                        ></textarea>
                      </div>

                      <div className="w-full flex flex-col items-center pb-6">
                        <div className="flex flex-col gap-2 w-[80%] mt-6">
                          <label className="poppins">Technologies Used</label>
                          <input
                            type="text"
                            placeholder="Type technology and press Enter"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            className="
              border border-white bg-transparent backdrop-blur-xl
              px-3 py-1.5 rounded-lg
              placeholder:text-gray-300/60 placeholder:text-sm"
                          />
                        </div>

                        <div className='w-[80%] flex justify-end'>
                          <button
                            type="button"
                            onClick={addTechnology}
                            className="bg-blue-500/80 rounded-md w-40 px-2 py-1.5 mt-4 text-sm"
                          >
                            + Add Technology
                          </button>
                        </div>
                      </div>

                      <ul>
                        {formData.projects[0].technologies.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-4 w-[80%] mx-auto mt-4">
                    <button
                      type="button" onClick={prevStep}
                      className="border border-white w-[50%] px-6 py-2 rounded-lg"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className="bg-blue-500/80 rounded-md w-[50%] px-2 py-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>

              </>
            )}
          </form>


        </div>
      </div>
    </div >
  )
}

export default OnBoarding








