'use client'
import { useState, useEffect } from 'react'
import styles from './Slider.module.css'
import { VideoBackground } from '@/components/VideoBackground'
import { FaArrowRightLong } from 'react-icons/fa6'
import Link from 'next/link'
export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [currentSlide])
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 4 : (prev) => prev - 1)
  }

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 4 ? 0 : (prev) => prev + 1)
  }

  return (
    <div className={styles.slider}>
      <div
        className={styles.container}
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <div
          className={`${styles.slide}  relative flex flex-col items-end justify-end h-full pl-5 text-left pb-9 xl:justify-center xl:items-start xl:gap-5`}
        >
          <VideoBackground source="/videos/milkyWay.mp4" />
          <h3 className="text-[#da374f] font-Space text-xl font-bold block uppercase text-left w-full tracking-[3px] xl:text-3xl">
            {/* DESCUBRE CONFINES ESTELARES. */}
            Efemérides
          </h3>
          <Link
            href="/ephemeris"
            className="w-full text-2xl font-semibold text-white text-gradient xl:text-5xl xl:w-[620px]"
          >
            Explorando el Calendario Cósmico, Tras los Pasos de los Astros
            <FaArrowRightLong className="arrow xl:my-5" color="#da374f" />
          </Link>
        </div>
        <div
          className={`${styles.slide}  relative flex flex-col items-end justify-end h-full pl-5 text-left pb-9 xl:justify-center xl:items-start xl:gap-5`}
        >
          <VideoBackground source="/videos/constellations.mp4" />
          <h3 className="text-[#da374f] font-Space text-xl font-bold block uppercase text-left w-full tracking-[3px] xl:text-3xl">
            Constelaciones
          </h3>
          <Link
            href="/constellations"
            className="w-full text-2xl font-semibold text-white text-gradient xl:text-5xl xl:w-[620px]"
          >
            Las Constelaciones nos Guían{' '}
            <FaArrowRightLong className="arrow xl:my-5" color="#da374f" />
          </Link>
        </div>
        <div
          className={`${styles.slide}  relative flex flex-col items-end justify-end h-full pl-5 text-left pb-9 xl:justify-center xl:items-start xl:gap-5`}
        >
          <VideoBackground source="/videos/galaxy.mp4" />
          <h3 className="text-[#da374f] font-Space text-xl font-bold block uppercase text-left w-full tracking-[3px] xl:text-3xl">
            Galaxias
          </h3>
          <Link
            href="/galaxies"
            className="w-full text-2xl font-semibold text-white text-gradient xl:text-5xl xl:w-[620px]"
          >
            NAVEGA ENTRE LAS CONSTELACIONES DE GALAXIAS
            <FaArrowRightLong className="arrow xl:my-5" color="#da374f" />
          </Link>
        </div>
        <div
          className={`${styles.slide}  relative flex flex-col items-end justify-end h-full pl-5 text-left pb-9 xl:justify-center xl:items-start xl:gap-5`}
        >
          <VideoBackground source="/videos/eclipse.mp4" />
          <h3 className="text-[#da374f] font-Space text-xl font-bold block uppercase text-left w-full tracking-[3px] xl:text-3xl">
            Eclipses
          </h3>
          <Link
            href="/lunar-eclipses"
            className="w-full text-2xl font-semibold text-white text-gradient xl:text-5xl xl:w-[620px]"
          >
            ENTRE LUZ Y SOMBRA{' '}
            <FaArrowRightLong className="arrow xl:my-5" color="#da374f" />
          </Link>
        </div>
        <div
          className={`${styles.slide}  relative flex flex-col items-end justify-end h-full pl-5 text-left pb-9 xl:justify-center xl:items-start xl:gap-5`}
        >
          <VideoBackground source="/videos/MoonPhase.mp4" />
          <h3 className="text-[#da374f] font-Space text-xl font-bold block uppercase text-left w-full tracking-[3px] xl:text-3xl">
            Fases de la Luna
          </h3>
          <Link
            href="/moon-phases"
            className="w-full text-2xl font-semibold text-white text-gradient xl:text-5xl xl:w-[620px]"
          >
            EXPLORA LAS FASES OCULTAS DE LA LUNA{' '}
            <FaArrowRightLong className="arrow xl:my-5" color="#da374f" />
          </Link>
        </div>
      </div>
      {/* <div className={styles.icons}>
        <div className={styles.icon} onClick={prevSlide}>
          <MdWest />
        </div>
        <div className={styles.icon} onClick={nextSlide}>
          <MdEast />
        </div>
      </div> */}
    </div>
  )
}
