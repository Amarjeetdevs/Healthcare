import React from 'react'
import Hero from './Hero'
import Footer from '../footer/Footer'

export default function Contact() {
    return (
      
        <div className='bg-gray-100'>
              <>
            <Hero />
            <div className="hero min-h-screen gap-10 ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className='flex justify-end'>
                        <img src="https://prohealth-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner_img.3b99b8a0.png&w=1080&q=75" className="max-w-3xl rounded-lg " />

                    </div>
                    <div >
                        <h1 className="text-5xl text-cyan-900 font-bold">Contact Us</h1>
                        <p className="py-6 text-cyan-900 text-2xl">Kindly reach us to get the fastest response and treatment</p>
                    </div>

                </div>

            </div>
            <div className='flex justify-center'>
                <form className="max-w-6xl bg-white rounded-2xl shadow-2xl px-56 mb-6 py-24">
                    <div className="flex gap-12">
                        <div className="flex-grow">
                            <div className="form-control">
                                <label className="label text-lg">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" className="input bg-white input-bordered text-lg" required />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <div className="form-control">
                                <label className="label text-lg">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="Email" className="input bg-white input-bordered text-lg" required />
                            </div>
                        </div>
                    </div>

                    <div className="form-control mt-2">
                        <label className="label text-lg">
                            <span className="label-text">Subject</span>
                        </label>
                        <input type="text" placeholder="Subject" className="input bg-white input-bordered text-lg" required />
                    </div>

                    <div className="form-control mt-2">
                        <label className="label text-lg">
                            <span className="label-text">Message</span>
                        </label>
                        <textarea className="textarea bg-white textarea-bordered h-44 text-lg" placeholder="Message"></textarea>
                    </div>

                    <div className="form-control mt-12">

                    </div>
                    <button className="mt-10 bg-gradient-to-r rounded-full from-cyan-800 to-blue-500 p-3 px-8 text-white shadow-lg">Submit</button>
                </form>


            </div>
            <div className='px-24 pt-24 '>
                <h1 className="text-6xl  text-cyan-900 font-bold">Find Us Here</h1>





                <div className='flex justify-between py-12'>

                    <div className="card w-96 bg-white shadow-xl flex items-center">
                        <div className="card-body flex justify-between gap-8 items-center">
                            <div className="flex gap-6 items-center">
                                <img src="https://prohealth-nextjs.vercel.app/images/contact/icon_1.svg" alt="Phone Icon" className="w-12 h-12 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold">Phone</p>
                                    <p>123-456-7890</p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="card w-96 bg-white shadow-xl flex items-center">
                        <div className="card-body flex justify-between gap-8 items-center">
                            <div className="flex gap-6 items-center">
                                <img src="https://prohealth-nextjs.vercel.app/images/contact/icon_2.svg" alt="Phone Icon" className="w-12 h-12 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold">Email</p>
                                    <p>hellocallcenter@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="card w-96 bg-white shadow-xl flex items-center">
                        <div className="card-body flex justify-between gap-8 items-center">
                            <div className="flex gap-6 items-center">
                                <img src="https://prohealth-nextjs.vercel.app/images/contact/icon_3.svg" alt="Phone Icon" className="w-12 h-12 mr-4" />
                                <div>
                                    <p className="text-lg font-semibold">
                                        Location</p>
                                    <p>123 Anywhere St., Any City, 12345</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <Footer />
        </>
        </div>
    )
}
