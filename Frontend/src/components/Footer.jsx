import React from 'react'
import linkedin from '../assets/Linkedin.png'
import twitter from '../assets/twitter.png'
import github from '../assets/Github.webp'
const Footer = () => {
  return (
	  <div className="border-t border-line-color flex justify-between items-center md:justify-normal">
		  <p className='ml-3 text-light-gray md:min-w-fit md:pr-3'>find me on: </p>
		  <div className="flex md:w-full">
			  <a href="https://x.com/koladev01?s=21" target="_blank" rel="noopener noreferrer" className='border-l border-line-color'>
				  <img src={twitter} alt="Twitter logo"  />
			  </a>
			  <a href="https://www.linkedin.com/in/christopher-k-b64b35119/" target="_blank" rel="noopener noreferrer" className='p-3 border-l border-r border-line-color'>
				  <img src={linkedin} alt="LinkedIn logo"  />
			  </a>
			  <a href="https://github.com/ckola99" target="_blank" rel="noopener noreferrer" className='border-l border-line-color md:flex md:items-center md:pl-4 md:ml-auto'>
				  <h1 className='hidden md:flex md:text-light-gray'>@Ckola99</h1>
				  <img src={github} alt="GitHub logo"  />

			  </a>
		  </div>
	  </div>
  	)
}

export default Footer
