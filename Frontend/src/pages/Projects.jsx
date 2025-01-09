import React, { useState } from 'react';
import chevron from '../assets/chevron.png';
import chevronDown from '../assets/chevron-down.png';
import check from '../assets/Check.png';
import data from '../data.json';
import reactIcon from '../assets/reactLogo.png'
import htmlIcon from '../assets/html5Logo.png'
import cssIcon from '../assets/cssLogo.png'
import pythonIcon from '../assets/pythonLogo.webp'
import tailwindIcon from '../assets/tailwindLogo.png'
import javascriptIcon from '../assets/javascriptLogo.png'
import github from '../assets/Github.webp'
import cIcon from '../assets/cLogo.png'
import closeIcon from '../assets/close-icon.png'


const Projects = () => {
	const [expandedMenu, setExpandedMenu] = useState(true);
	const [selectedTechnologies, setSelectedTechnologies] = useState([]);

	const toggleMenu = () => {
		setExpandedMenu(prevState => !prevState);
	};

	const projects = data.projects;
	const technologies = [{
		name: 'React',
		icon: reactIcon
	}, {
		name: 'HTML',
		icon: htmlIcon
	}, {
		name: 'CSS',
		icon: cssIcon
	}, {
		name: 'Python',
		icon: pythonIcon
	}, {
		name: 'React Native',
		icon: reactIcon
	}, {
		name: 'C',
		icon: cIcon
	}, {
		name: 'Vanilla JS',
		icon: javascriptIcon
	}, {
		name: 'Tailwind CSS',
		icon: tailwindIcon
	},
	];

	const handleCheckboxChange = (tech) => {
		setSelectedTechnologies(prevSelected =>
			prevSelected.includes(tech)
				? prevSelected.filter(item => item !== tech) // Remove if already selected
				: [...prevSelected, tech] // Add if not selected
		);
	};

	const filteredProjects = selectedTechnologies.length
		? projects.filter(project =>
			selectedTechnologies.every(tech => project.tech.includes(tech))
		)
		: projects;

	const filtered = selectedTechnologies.join('; ')

	return (
		<div className="w-full md:flex">
			<h1 className="md:hidden text-white p-5 text-[14px]">_projects</h1>
			<div className=" md:min-w-[200px]">
				<button
					onClick={toggleMenu}
					className="flex items-center bg-line-color pl-5 gap-3 text-white w-full h-[31px] md:bg-transparent md:border-b md:border-line-color"
				>
					<img
						src={expandedMenu ? chevronDown : chevron}
						alt="chevron"
						className="h-[8.5px] w-[8px]"
					/>
					projects
				</button>
				{expandedMenu && (
					<div className="px-5 pt-2 flex flex-col gap-3">
						{technologies.map((tech, index) => (
							<div key={index} className="flex items-center gap-5">
								<input
									type="checkbox"
									id={tech.name}
									value={tech.name}
									onChange={() => handleCheckboxChange(tech.name)}
									checked={selectedTechnologies.includes(tech.name)}
									className=" focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-light-gray relative peer appearance-none w-[19px] h-[19px] border border-light-gray rounded bg-transparent shrink-0 checked:bg-light-gray"
								/>
								<img src={check} alt="" className='absolute w-[19px] h-[19px] hidden peer-checked:block pointer-events-none' />
								<label htmlFor={tech.name} className={`text-light-gray flex gap-3 items-center text-[14px] ${filtered.includes(tech.name) && 'text-white'}`}>
									<img src={tech.icon} alt={tech.name} className={`${tech.icon === tailwindIcon && 'h-3'} ${tech.icon === cssIcon && 'h-6'} ${tech.icon === pythonIcon && 'h-7'} ${tech.icon === javascriptIcon && 'h-6'} ${tech.icon === cIcon && 'h-7'} ${tech.icon === reactIcon && 'h-7'}`} />
									{tech.name}
								</label>
							</div>
						))}
					</div>
				)}
			</div>
			<div className="mt-5 p-5 md:p-0 md:mt-0 md:border-l md:border-line-color md:w-full">
				<div className="md:flex md:gap-3 md:border md:border-line-color md:p-[2.5px] md:w-fit md:items-center"><h2 className="text-white mb-3 md:mb-0 md:ml-2"><span className='md:hidden'>&#47;&#47; projects </span><span className='text-light-gray'><span className='md:hidden'>/</span> {filtered ? filtered : "all"}</span> </h2> <button onClick={() => setSelectedTechnologies([])}><img src={closeIcon} alt="reset filter" /></button></div>
				<ul className="text-white flex flex-col gap-3 md:border-t md:border-line-color md:grid md:grid-cols-3 md:p-5 md:w-full">
					{filteredProjects.map((project, index) => (
						<li key={project.id} className="mb-2 text-light-gray flex flex-col gap-3 md:max-w-[280px]">
							<p> <span className='text-blue font-bold'>Project {index + 1}</span> / {project.name}</p>
							<div className="border border-line-color rounded-xl overflow-hidden relative ">
								<img src={project.picture} alt="" className='' />
								<div className=" flex flex-col gap-2 p-5">
									<p className='text-[14px]'>{project.description}
										<a href={project['github link']} target="_blank" rel="noopener noreferrer" className='pl-2 hover:underline hover:text-white'>Read more..</a>
									</p>
									<div className="flex gap-2">
										{project['live link'] && (<a href={project['live link']} target="_blank" rel="noopener noreferrer">
											<button className='cta-default text-[14px] p-2 rounded-lg h-10'>view-live</button>
										</a>)}
										<a href={project['github link']} target="_blank" rel="noopener noreferrer">
											<button className='border border-[#263B50] hover:bg-[#263B50] text-[14px] h-10 flex items-center rounded-lg'><img src={github} alt="GitHub logo" className='hover:cursor-pointer' /></button>
										</a>
									</div>
								</div>
								<img src={project.techIcon} alt="tech logo" className={` ${project.techIcon.includes('react') && 'bg-black rounded' } h-7 absolute top-2 right-2`}/>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Projects;
