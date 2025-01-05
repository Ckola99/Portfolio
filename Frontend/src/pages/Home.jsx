import React from 'react'

const Home = () => {
  return (
	<div className='px-5 flex justify-between flex-col py-20 md:grid md:grid-cols-2 md:w-full md:p-[270px]'>
      <div className=" relative">
        <h1 className='text-white'>Hi all. I am <span className='text-5xl block'>Christopher Kola</span></h1>
        <p className='text-mint-accent'> &gt; Front-end developer</p>
        <p className='text-mint-accent'> &gt; Johannesburg, ZA</p>
        <div className=" absolute h-28 w-28 bg-mint-accent blur-[80px] top-5 left-0"></div>
        <div className=" absolute h-28 w-28 bg-blue blur-[80px] bottom-0 right-[15px]"></div>
      </div>
      <div className=" flex flex-col gap-3 text-[14px] md:row-start-2">
        <p className='hidden md:flex text-light-gray'> &#47;&#47; complete the game to continue</p>
        <p className='text-light-gray'> &#47;&#47; find my profile on Github:</p>
        <p className='text-white'> <span className='text-blue'>const</span> <a href='https://github.com/Ckola99' target='_blank'><span className='text-mint-accent'>githubLink</span> = <span className='text-orange-accent hover:underline hover:cursor-pointer'>&Prime;https://github.com/Ckola99&Prime;</span></a></p>
      </div>
      {/* Embed Snake Game */}
      <div className="md:row-span-2 hidden md:grid">
        <iframe
          src="https://snake-js-blond.vercel.app/"
          title="Snake Game"
          className="border-none w-full h-full"
          style={{ aspectRatio: '16 / 9' }}
        ></iframe>
      </div>
  </div>
  )
}

export default Home
