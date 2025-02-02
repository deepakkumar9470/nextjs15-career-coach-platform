"use client"
import React,{useRef,useEffect} from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
    const imageRef = useRef(null);

    useEffect(()=>{
        const imgEle = imageRef.current;
        const handleScroll = () =>{
            const scrollPos = window.scrollY;
            const scrollThreshold = 100;

            if(scrollPos>scrollThreshold){
                imgEle.classList.add("scrolled")
            }else{
                imgEle.classList.remove("scrolled")
            }
        }
        window.addEventListener("scroll",handleScroll)
        return () =>window.removeEventListener("scroll",handleScroll)
    },[])
  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
      <div className='space-yy-6 text-center'>
        <div className='space-y-6 mx-auto'>
            <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title'>
                Your AI Career Coach for 
                <br />
                Professional Success
            </h1>
            <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>               
                Advance your career with personalized guidance, interview preparation, & AI-Powered tools for job success.
            </p>
        </div>
        <div className='flex justify-center py-4'>
          <Link href="/dashboard">
          <Button size="lg" className="px-8">Get Started</Button>
          </Link>
       </div>

       <div className='hero-image-wrapper mt-5 md:mt-0'>
        <div ref={imageRef} className="hero-image">
            <Image src="/banner.jpeg" width={1280} height={720} alt="banner"
            className="rounded-lg shadow-2xl border mx-auto"/>
        </div>
       </div>
      </div>
    </section>
  )
}

export default Hero
