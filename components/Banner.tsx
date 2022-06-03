// import Image from 'next/image'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { RiInformationLine } from 'react-icons/ri'
interface Props {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  return (
    <div className="flex flex-col justify-start  space-y-2 py-16 px-2 md:space-y-4 lg:h-[65vh] lg:justify-end">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h1 className="z-50  text-2xl font-bold text-white md:text-4xl lg:text-7xl">
        {movie?.title || movie?.original_name}
      </h1>
      <p className="md:md-w-lg max-w-xs text-xs text-white md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>

      <div className="m-4 flex space-x-4">
        <button className="bannerButton bg-white">
          <FaPlay className="h-4 w-4 md:h-8 md:w-8 " />
          Play
        </button>
        <button className="bannerButton bg-gray-500/70">
          <RiInformationLine className="h-5 w-5 md:h-8 md:w-8" />
          More Info
        </button>
      </div>
    </div>
  )
}

export default Banner
