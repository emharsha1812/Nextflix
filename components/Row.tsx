import { Movie } from '../typings'
import { BsChevronLeft } from 'react-icons/bs'
import { BsChevronRight } from 'react-icons/bs'
import Thumbnail from './Thumbnail'
import { useEffect, useRef, useState } from 'react'
interface Props {
  //When using Firebase
  //movie:Movie | DocumentData[]
  title: string
  movies: Movie[]
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: string) => {
    setIsMoved(true)
    if (rowRef.current) {
      // const { scrollLeft, clientWidth } = rowRef.current
      //Another way of writing the above statement is
      const scrollLeft = rowRef.current.scrollLeft
      const clientWidth = rowRef.current.clientWidth

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  useEffect(() => {}, [])

  return (
    <div className="h-40 space-y-2 md:space-y-4">
      <h2 className="w-56 cursor-pointer space-y-4 text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:scale-125 hover:text-white md:text-2xl ">
        {title}
      </h2>

      <div className="group relative">
        <BsChevronLeft
          onClick={() => handleClick('left')}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-10 w-10 cursor-pointer text-white opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
        />
        <div
          ref={rowRef}
          className=" flex items-center space-x-0.5 overflow-x-scroll text-white scrollbar-hide md:space-x-2.5 md:p-2  "
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <BsChevronRight
          onClick={() => handleClick('right')}
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-10 w-10 cursor-pointer text-white opacity-0 transition hover:scale-125 group-hover:opacity-100"
        />
      </div>
    </div>
  )
}

export default Row
