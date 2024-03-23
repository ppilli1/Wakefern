import { SearchResults } from "@/typings";

async function fetchFromTMDB(url: URL, cacheTime?: number){
    url.searchParams.set("include_adult", "false");
    url.searchParams.set("include_video", "false");
    url.searchParams.set("sort_by", "popularity.desc");
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", "1");

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
          revalidate: cacheTime || 60 * 60 * 24, // any amount of cache time that you prefer, such as 60 seconds could be passed here, but the default, the other option, will be 24 hours
        }
    }

    const response = await fetch(url.toString(), options);
    const data = (await response.json()) as SearchResults

    return data;
}

export async function getUpcomingMovies(){
    const url = new URL("https://api.themoviedb.org/3/movie/upcoming") // we're making a request to this url
    const data = await fetchFromTMDB(url);
    return data.results
}

export async function getTopRatedMovies(){
    const url = new URL("https://api.themoviedb.org/3/movie/top_rated") // we're making a request to this url
    const data = await fetchFromTMDB(url);
    return data.results
}

export async function getPopularMovies(){
    const url = new URL("https://api.themoviedb.org/3/movie/popular") // we're making a request to this url
    const data = await fetchFromTMDB(url);
    return data.results
}

export async function getDiscoverMovies(id?: string, keywords?: string){
    const url = new URL("https://api.themoviedb.org/3/discover/movie")

    keywords && url.searchParams.set("with_keywords", keywords) // if keywords are passed, then set the keywords
    id && url.searchParams.set("with_genres", id)               // if ids are passed, then set the id with their respective genres

    const data = await fetchFromTMDB(url);
    return data.results;
}

export async function getSearchedMovies(term: string){
    const url = new URL("https://api.themoviedb.org/3/search/movie")
    
    url.searchParams.set("query", term);

    const data = await fetchFromTMDB(url);
    return data.results;
}