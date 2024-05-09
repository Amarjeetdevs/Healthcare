import React from 'react'
import Hero from './Hero'
import Footer from '../footer/Footer'

export default function About() {
    return (
        <>
            <Hero />
            <div className="hero min-h-screen bg-gray-100">
                <div className="hero-content flex-col lg:flex-row">
                    <img src="https://prohealth-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner_img.eeaea09a.png&w=750&q=75" className="max-w-2xl rounded-lg " />
                    <div>
                        <h1 className="text-6xl text-blue-950 font-bold">
                            Welcome to
                            ProHealth Medical & Healthcare Center</h1>
                        <p className="py-6 text-2xl text-blue-950" >Your Partner in Health and Wellness</p>
                      
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
