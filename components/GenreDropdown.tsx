import { Genres } from "@/typings"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import Link from "next/link"


async function GenreDropdown() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en"

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    },
    next: {
      // By caching the request from the very first user who types in Star Wars, the next user and the user after that will only get the cached version 
      // of the request made since the request was already made to the database the first request during the 24 hour period, and after 24 hours, the new request can be made again, 
      // wherein again the users who request for the same thing will only be receiving the cached version of the response.
      revalidate: 60 * 60 * 24, // 24 hours
    }
  }

  const response = await fetch(url, options)
  const data = (await response.json()) as Genres

  console.log(data.genres)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className = "text-white flex justify-center items-center">
        Genre <ChevronDown className = "ml-1"/>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        {data.genres.map(genre => (
          <DropdownMenuItem key = {genre.id}>
            <Link href = {`/genre/${genre.id}?genre=${genre.name}`}>
              {genre.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default GenreDropdown