import React from 'react'
import linkedin from '../assets/Linkedin.png'
import twitter from '../assets/twitter.png'
import github from '../assets/Github.webp'
const Footer = () => {
  return (
	  <div className="border-t border-line-color flex justify-between items-center">
		  <p className='ml-3 text-light-gray'>find me in: </p>
		  <div className="flex">
			  <a href="https://x.com/koladev01?s=21" target="_blank" rel="noopener noreferrer">
				  <img src={twitter} alt="Twitter logo" className='border-l border-line-color' />
			  </a>
			  <a href="https://www.linkedin.com/in/christopher-k-b64b35119/" target="_blank" rel="noopener noreferrer">
				  <img src={linkedin} alt="LinkedIn logo" className='p-3 border-l border-line-color' />
			  </a>
			  <a href="https://github.com/ckola99" target="_blank" rel="noopener noreferrer">
				  <img src={github} alt="GitHub logo" className='border-l border-line-color' />
			  </a>
		  </div>
	  </div>
  )
}

export default Footer
