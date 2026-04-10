import React from 'react'
import TypingText from './TypingAnimation'
import './Hero.css'

const Hero = () => {
  return (
    <div className='container d-flex justify-content-between align-items-center hero-section'>
        <div className="hero-left">
            <div>
                <h2>Hello! I'm</h2>
                <h1>Aanchal Goyal</h1>
                <TypingText />
            </div>
            <a href="https://wa.me/919688591477">
            <button className='cta-btn-2'>Hire Me <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>  <div className='shine'></div></button>
            </a>
        </div>
        <div className="hero-right">
            <img src="/goyal-pic.png" alt="my-pic" />
        </div>
    </div>
  )
}

export default Hero