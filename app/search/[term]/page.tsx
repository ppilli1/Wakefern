import AISuggestion from "@/components/AISuggestion";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";

// just for reference, find the two URL links you could use to deploy your app, first one is internal and the second one is external
// https://disney-clone-[aqrkqcsyl]-ppilli1s-projects.vercel.app/   >>> the characters in the square brackets change for every new deployment, also remove the square brackets for using the deployment
// https://disney-clone-eta-ten.vercel.app/

type Props = {
    params: {
        term: string;
    }
}

async function SearchPage({params: {term}}: Props) {
    if(!term) notFound();

    const termToUse = decodeURI(term);

    // API call to get the search movies
    const movies = await getSearchedMovies(termToUse)
    // API call to get the popular movies
    const popularMovies = await getPopularMovies() // Next JS will let you know immediately if the function you are calling requires 0, 1, or 2 parameters, and if you pass in the wrong number of parameters, it'll be highlighted in red.

  return (
    <div className = "max-w-7xl mx-auto">
        <div className = "flex flex-col space-y-4 mt-32 xl:mt-42">
            <h1 className = "text-6xl font-bold px-10">Results for {termToUse}</h1>
            
            <AISuggestion term = {termToUse}/>
            <MoviesCarousel title = "Movies" movies = {movies} isVertical />
            <MoviesCarousel title = "You may also like" movies = {popularMovies} isVertical = {false}/>
        </div>
    </div>
  )
}

export default SearchPage