"use client" // using client at the top of this page refers to how this file will be a client component, i.e. it is dependent on the user's browser, dimensions
import { Movie } from "@/typings"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import getImagePath from "@/lib/getImagePath"

type Props = {
    movies: Movie[];
}

Autoplay.globalOptions = {delay: 8000}

function CarouselsBanner({movies}: Props) {
    const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [Autoplay()])

  return (
    <div
        className = "overflow-hidden lg:-mt-40 relative cursor-pointer"
        ref={emblaRef}
    >
        <div className = "flex">
            {movies.map(movie => (
                <div key = {movie.id} className = "flex-full min-w-0 relative"> {/* over here, you made an extension to the flex class in your tailwind config allowing you to */}
                    <Image                                                       // decide if you want to make an inline customization of [0_0_100%] or use your new flex-full
                        key = {movie.id}
                        src = {getImagePath(movie.backdrop_path, true)}
                        alt = ""
                        width = {1920} // You always have to pass in the source, alt, height, and width for an Image to be rendered, some of its necessary properties in Next JS
                        height = {1080}
                    />
                    <div className = "hidden lg:inline absolute mt-0 top-0 pt-40 xl:pt-52 left-0 lg:mt-40 bg-transparent z-20 h-full w-full bg-gradient-to-r from-gray-900/90 via-transparent to-transparent p-10 space-y-5 text-white">
                        <h2 className = "text-5xl font-bold max-w-xl z-50">
                            {movie.title}
                        </h2>
                        <p className = "max-w-xl line-clamp-3"> {/* when the text goes past 3 lines, it simply renders a ... to signify more text to save space */}
                            {movie.overview}
                        </p>
                    </div>
                </div>
            ))}
        </div>

        <div
            className = "absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/25 to-gray-300 dark:to-[#1A1C29]"
        />
    </div>
  )
}

export default CarouselsBanner