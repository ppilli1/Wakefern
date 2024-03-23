import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import { Button } from "@/components/ui/button";
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/lib/getMovies";
import Image from "next/image";

export default async function Home() {

  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main className="">
      <CarouselBannerWrapper/>

      <div className = "flex flex-col space-y-2">
        <MoviesCarousel movies={upcomingMovies} title="Upcoming" isVertical = {false}/>
        <MoviesCarousel movies={topRatedMovies} title="Top Rated" isVertical = {false}/>
        <MoviesCarousel movies={popularMovies} title="Popular" isVertical = {false}/>
      </div>
    </main>
  );
}
