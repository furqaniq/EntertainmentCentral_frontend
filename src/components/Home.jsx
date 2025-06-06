import React from "react";
import NotVerified from "./user/NotVerified";
import TopRatedMovies from "./user/TopRatedMovies";
import Container from "./Container";
import TopRatedWebSeries from "./user/TopRatedWebSeries";
import TopRatedTVSeries from "./user/TopRatedTVSeries";
import HeroSlideShow from "./user/HeroSlideShow";

export default function Home() {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className='px-2 xl:p-0'>
          <NotVerified />
          {/* slider */}
          <HeroSlideShow /> 
          {/* Most rated movies */}
          <div className="space-y-3 py-8">
            <TopRatedMovies />
            <TopRatedWebSeries />
            <TopRatedTVSeries />
          </div>
      </Container>
    </div>
  );
};