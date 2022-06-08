import MuiModal from '@mui/material/Modal'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { Genre, Movie } from '../typings'
import { Element } from '../typings'
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from 'react-icons/fa'
import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre>()
  const [muted, setMuted] = useState(false)
  useEffect(() => {
    if (!movie) {
      return
    }

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message))
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])

  const handleClose = () => {
    setShowModal(false)
  }

  console.log(trailer)

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40"
        >
          <AiOutlineCloseCircle className="h-8 w-8 text-white" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={
              `https://www.youtube.com/watch?v=${trailer}` ||
              `https://c.tenor.com/1xrPyJF7kQQAAAAM/this-content-is-not-available-confetti.gif`
            }
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10 text-white">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8  text-xl font-semibold text-black transition hover:bg-[#e6e6e6] ">
                <FaPlay className="h-7 w-7 gap-x-2 rounded text-black" />
                Play
              </button>

              <button className="modalButton">
                <PlusIcon className="h-8 w-8 text-white" />
              </button>

              <button className="">
                <ThumbUpIcon className="h-8 w-8" />
              </button>
            </div>
            <button
              className=" h-8 w-8 text-white"
              onClick={() => setMuted(!muted)}
            >
              {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8 ">
          <div className="space-y-6 text-lg ">
            <div className="flex items-center space-x-4 text-lg text-white">
              <p className="font-semibold text-green-500">
                {movie!.vote_average * 10}% Match
              </p>
              <p>{movie?.release_date || movie?.first_air_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="font-regular flex flex-col gap-x-10 gap-y-4 md:flex-row">
              <p className="w-5/6 text-lg text-white">{movie?.overview}</p>
              <div className="spacce-y-3 flex flex-col text-sm">
                <div className="text-lg text-white">
                  <span className="text-lg text-gray-500">Genres: </span>
                  {genres?.map((genre) => genre.name).join(', ')}
                </div>
                <div className=" text-white ">
                  <span className="text-lg text-gray-500">
                    Original Language:{' '}
                  </span>
                  <span className="text-lg">{movie?.original_language}</span>
                </div>
                <div className="text-white">
                  <span className="text-gray-500">Total Votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal
