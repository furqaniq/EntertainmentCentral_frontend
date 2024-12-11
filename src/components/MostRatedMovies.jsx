import React, { useEffect, useState } from 'react'
import { useNotification } from '../hooks';
import { getMostRatedMovies } from '../api/admin';
import RatingStar from './RatingStar';
import { convertReviewCount } from '../utils/helper';


export default function MostRatedMovies() {
   const [movies, setMovies] = useState([]);

   const { updateNotification } = useNotification();

   const fetchMostRatedMovies = async () => {
    const { error, movies } = await getMostRatedMovies();
    if (error) return updateNotification('error', error);

    setMovies([...movies]);
   };

   useEffect(() => {
    fetchMostRatedMovies();
   }, []);

    return (
    <div className="bg-white shadow dark:bg-secondary dark:shadow p-5 rounded">
        <h1 className="font-semibold text-2xl mb-2 text-primary
          dark:text-white">
            Most Rated Movies
          </h1>
          <ul>
            {movies.map((movie) => {
                console.log(movie.rating);
              return (
              <li key={movie.id}>
                <h1 className='dark:text-white text-secondary font-semibold'>
                    {movie.title}
                </h1>
                <div className='flex space-x-2'>
                   <RatingStar rating={movie.reviews?.ratingAvg}/>
                   <p className='text-light-subtle dark:text-dark-subtle'>
                     {convertReviewCount(movie.reviews?.reviewCount)}  Reviews
                   </p>
                </div>
              </li>
              );
            })}
          </ul>
    </div>
  );
};
