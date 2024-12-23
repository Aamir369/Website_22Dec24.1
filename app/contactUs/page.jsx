"use client";

import Image from 'next/image';
import safety1 from '/public/video/ed5.jpg';
import { Montserrat } from 'next/font/google';
import Footer from "@/components/footer/footer";
import React, { useState } from "react";
import "@/css/globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormSuccess(false);

    const formData = new FormData(event.target);
    formData.append("access_key", "0f21d948-c2a8-4b94-9967-cd4de7beb731");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const data = await res.json();

      if (data.success) {
        console.log("Success:", data);
        event.target.reset(); // Reset form fields
        setFormSuccess(true); // Set success state
      } else {
        console.log("Error:", data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <Image alt="safety1" src={safety1} layout='fill' style={{ objectFit: 'cover', filter: 'blur(4px)' }} />
        </div>

        {/* Row Container for Text and Form */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '1200px', height: '95vh', margin: 'auto', padding: '2rem', color: 'white' }}>
          <div className='flex justify-center gap-20'>
            {/* Text Content */}
            <div className="text-center max-w-xlg p-8" style={{ width: '1100px' }}>
              <h2 className="text-4xl underline underline-offset-8 py-12 mt-24">For Business Enquiries :</h2>
              <p className="text-5xl py-4">Kinetic Data Minds <span style={{ fontSize: '38px' }}> Inc</span></p>
              <p className="text-4xl">Aamir Baig Mughal</p>
              <p className="text-xl my-2">B.Appl Science (Engineering), M.B.A (Business Analytics), DMIT (CSD)</p>
              <p className="text-4xl py-2">Edmonton - T6T 1A4</p>
              <div className="flex flex-col items-center text-3xl space-y-4 py-4">
                <div className="inline-flex items-center">
                  <svg className="w-14 h-10 mr-2" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clipRule="evenodd" />
                  </svg>
                  +1-587-990-6399
                </div>
                <div className="inline-flex items-center">
                  <svg className="w-14 h-10 mr-2" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                    <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                  </svg>
                  +1-780-465-5595
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={onSubmit} className="bg-red-800 bg-opacity-90 rounded-lg p-8 shadow-lg w-full max-w-lg mx-4 mt-36">
              <h2 className="text-white text-xl mb-1 font-medium title-font">Contact Us</h2>
              <p className="leading-relaxed mb-5 text-white">Please fill up the form below to send us a message</p>

              <div className="flex mb-6 space-x-4">
                <div className="w-full md:w-1/2">
                  <label htmlFor="first_name" className="block mb-2 text-sm text-white">First Name</label>
                  <input
                    type="text"
                    name="name"
                    id="first_name"
                    placeholder="John"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md text-gray-900"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label htmlFor="lname" className="block mb-2 text-sm text-white">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    id="lname"
                    placeholder="Doe"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md text-gray-900"
                  />
                </div>
              </div>

              <div className="flex mb-6 space-x-4">
                <div className="w-full md:w-1/2">
                  <label htmlFor="email" className="block mb-2 text-sm text-white">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@company.com"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md text-gray-900"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label htmlFor="phone" className="block text-sm mb-2 text-white">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="+1 (587) 1234-567"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-md text-gray-900"
                  />
                </div>
              </div>

              <div className="relative mb-4">
                <label htmlFor="message" className="text-sm text-white">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-white rounded border border-gray-300 h-32 text-base px-3 py-1 resize-none text-gray-900"
                  placeholder="Please enter your message or suggestions here"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center bg-blue-950 text-white py-4 px-6 rounded"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              {formSuccess && (
                <p className="mt-4 text-green-600">Form submitted successfully!</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
