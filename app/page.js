import styles from "../css/globals.css";
//import Video from "next-video";
import React from "react";
import { Poppins } from 'next/font/google';  
import Footer from "@/components/footer/footer";

const roboto = Poppins({
  subsets: ['latin'], 
  weight:['400','700'],
}) 

export default function Home() {
  return (
    <>
      <main >
        <video
          src="video/video1.webm" 
          autoPlay
          muted
          loop
          playsInline
          className={styles.video} 
        />
         
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10">
          <div className={roboto.className}>
          <div className="content text-black font-bold">
            <h1>
              Welcome to Construction Safety App
            </h1>
            <p className=" font-bold text-lime-100">Optimization and Productivity is our top priority </p>
            <div className="grid grid-flow-col grid-rows-1 grid-cols-1 gap-8">
              <div className="py-12 mt-12  ">
                <div className="bg-white shadow rounded bg-opacity-20 font-bold text-xl italic w-auto py-8 px-5">
                  <h1>
                    We Excel in providing solutions 
                  </h1>
                  <h1 className="text-lime-100 backdrop:first-line:">
                  for Optimization and Productivity Problems
                  </h1>
                  <p className="font-bold">Our aim is to enhance your profits and productivity</p>
                </div>
              </div>
            </div>
          </div> 
          </div> 
        </div>  
        <Footer></Footer>
      </main> 
     
       

    </>
  );
}

