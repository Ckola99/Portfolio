import React, { useState } from 'react'
import chevron from '../assets/chevron.png'
import chevronDown from '../assets/chevron-down.png'
import markdownFile from '../assets/markdownFile.png'
import GithubSnippet from '../components/GithubSnippet'

const About = () => {

  const [openFolder, setOpenFolder] = useState(true);
  const [openFile, setOpenSelectedFile] = useState('bio');

  const toggleFolder = () => {
    setOpenFolder(prevState => !prevState);
  }

  const files = ['bio', 'skills']

  return (
    <div className='w-full'>
      <h1 className='text-white p-5 text-[14px]'>_about-me</h1>
      <div className="">
        <button onClick={toggleFolder} className="flex items-center bg-line-color pl-5 gap-3 text-white w-full h-[31px]">
          <img src={openFolder ? chevronDown : chevron} alt="chevron" className='h-[8.5px] w-[8px]' />personal-info
        </button>
        {openFolder && (<div className="">
          {files.map((file, index) => (<button onClick={() => setOpenSelectedFile(file)} key={index} className={`flex gap-2 text-light-gray items-center ml-5 mt-2 ${openFile === file ? 'text-white ' : ''
            }`}>
            <img src={markdownFile} alt=" markdown file icon" /> {file}
          </button>))}

        </div>)}
      </div>
      {openFile === 'bio' && (<article className="p-5 flex flex-col gap-3">
        <h2 className='text-white'>&#47;&#47; personal-info  <span className='text-light-gray'>&#47; bio</span></h2>
        <p className='text-light-gray'>I am an enthusiastic Front-End Developer and aspiring Full-Stack Engineer with a passion for creating functional, engaging, and user-friendly web applications. With strong skills in React, JavaScript, and CSS, I have a background in backend technologies like express and mongoDB. I enjoy translating complex ideas into polished digital experiences.

        </p>
      </article>)}
      {openFile === 'skills' && (<article className="p-5 flex flex-col gap-3">
        <h2 className="text-white">
          &#47;&#47; personal-info <span className="text-light-gray">&#47; skills</span>
        </h2>
        <p className="text-light-gray">
          <strong>Front-End Development</strong>
          <br />
          Proficient in HTML5, CSS3, and JavaScript (ES6+). Skilled in modern frameworks and
          libraries such as React.js, Redux Toolkit, and Tailwind CSS. Experienced in building
          responsive, accessible, and user-friendly web interfaces. Expertise in state management
          using React Hooks and Redux. Knowledge of front-end routing with React Router.
          <br />
          <strong>Back-End Development</strong>
          <br />
          Familiar with Node.js for server-side development. Experience building RESTful APIs with
          Express.js. Proficient in database management using MongoDB.
          <br />
          <strong>Tools and Workflow</strong>
          <br />
          Strong understanding of version control using Git and GitHub. Skilled in modern build
          tools like Vite and Webpack.
          <br />
          <strong>Additional Skills</strong>
          <br />
          Integration of third-party APIs such as Spotify and OpenAI. Basic design and
          prototyping knowledge for creating intuitive user experiences. Writing clean, modular,
          and maintainable code with a focus on best practices.
          <br />
          <strong>Soft Skills</strong>
          <br />
          Collaborative and communicative team player with a problem-solving mindset. Passionate
          about continuous learning and exploring emerging technologies.
        </p>
      </article>)}
      <article className='px-5 text-white'>
        <h3 className='mb-3'>&#47;&#47; Code snippet showcase:</h3>
        <GithubSnippet owner="Ckola99"
          repo="FindYourHat"
          filePath="main.js"
          startLine={26}
          endLine={39}
          />
      </article>
    </div>
  )
}

export default About
