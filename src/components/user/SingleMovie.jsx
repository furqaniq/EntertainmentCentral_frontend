import React, { useEffect, useState } from 'react'
import { getSingleMovie } from '../../api/movie';
import { useNavigate, useParams } from 'react-router';
import { useAuth, useNotification } from '../../hooks';
import Container from '../Container';
import { Link } from 'react-router-dom';
import RatingStar from '../RatingStar';
import RelatedMovies from '../RelatedMovies';
import AddRatingModal from '../Modals/AddRatingModal';
import CustomButtonLink from '../CustomButtonLink';
import ProfileModal from '../Modals/ProfileModal';
import { convertReviewCount } from '../../utils/helper';



const convertDate = (date = '') => {
  return date.split("T")[0];
};

export default function SingleMovie() {
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});
  const [movie, setMovie] = useState({});

  
  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();

  const fetchMovie = async () => {
   const {error, movie} = await getSingleMovie(movieId);
   if(error) return updateNotification('error', error);
   
   setReady(true);
   setMovie(movie);
  };

  const handleOnRateMovie = () => {
    if(!isLoggedIn) return navigate('/auth/signin');
    setShowRatingModal(true); 
  };

  const hideRatingModal = () => {
    setShowRatingModal(false); 
  };

  const handleOnRatingSuccess = (reviews) => {
    setMovie({...movie, reviews: {...reviews}});
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const hideProfileModal = () => {
    setShowProfileModal(false);
  };
   
  useEffect(() => {
    if(movieId) fetchMovie();
  }, [movieId]);

  if(!ready) return <div className='h-screen flex justify-center items-center dark:bg-primary bg-white'>
    <p className='text-light-subtle dark:text-dark-subtle animate-pulse'>
      Please wait
    </p>
  </div>
  
  const {
    id, 
    trailer, 
    poster, 
    title, 
    storyLine, 
    language, 
    releaseDate,
    type, 
    director = {}, 
    reviews = {}, 
    writers = [], 
    cast = [],
    genres = [], 
  } = movie;
  
  return (
    <div className='dark:bg-primary bg-white min-h-screen pb-10'>
      <Container className='xl:px-0 px-2'>
        <video poster={poster} controls src={trailer}></video>
        <div className="flex justify-between">
          <h1 className='xl:text-4xl lg:text-3xl text-2xl text-highlight dark:text-highlight-dark font-semibold py-3'>
            {title}
          </h1>
          <div className='flex flex-col items-end'>
            <RatingStar rating={reviews.ratingAvg} />
            <CustomButtonLink 
              label={convertReviewCount(reviews.reviewCount) + " Reviews"}
              onClick={() => navigate('/movie/reviews/' +id)}
            />

            <CustomButtonLink 
              label='Rate The Movie'
              onClick={handleOnRateMovie}
            /> 

          </div>
        </div>
        
        <div className='space-y-3 '>
          <p className='text-light-subtle dark:text-dark-subtle'>{storyLine}</p>

          {/* <div className='flex space-x-2'>
            <p className='text-light-subtle dark:text-dark-subtle font-semibold'>Director: </p>
            <p className='text-highlight dark:text-highlight-dark hover:underline cursor-pointer'> {director.name}</p>
          </div> */}

          <ListWithLabel label='Director: '>
            <CustomButtonLink label={director.name} onClick={() => handleProfileClick(director)}/>
          </ListWithLabel>

          <ListWithLabel label='Writers: '>
          {writers.map((w) => (<CustomButtonLink key={w.id} label={w.name}/>))}  
          </ListWithLabel>

         
          <ListWithLabel label="Cast:">
            {cast.map(({ id, profile, leadActor }) => {
              return leadActor ? (
                <CustomButtonLink label={profile.name} key={id} />
              ) : null;
            })}
          </ListWithLabel>

          <ListWithLabel label='Language: '>
            <CustomButtonLink label={language} clickable={false}/>
          </ListWithLabel>

          <ListWithLabel label='Release Date: '>
            <CustomButtonLink label={convertDate(releaseDate)} clickable={false}/>
          </ListWithLabel>

         

          <ListWithLabel label='Genres: '>
            {genres.map((g) => (<CustomButtonLink key={g} label={g} clickable={false}/>))}  
          </ListWithLabel>

          <ListWithLabel label='Type: '>
            <CustomButtonLink label={type} clickable={false}/>
          </ListWithLabel>

          <CastProfiles cast={cast}/>
          <RelatedMovies movieId={movieId}/>
        </div>
        
      </Container>

      <ProfileModal
        visible={showProfileModal}
        onClose={hideProfileModal}
        profileId={selectedProfile.id}
      />

      <AddRatingModal visible={showRatingModal} onClose={hideRatingModal} onSuccess={handleOnRatingSuccess}/>
    </div>
  )
}

const ListWithLabel = ({ children, label }) => {
  return (
    <div className='flex space-x-2'>
      <p className='text-light-subtle dark:text-dark-subtle font-semibold'>{label}</p>
      {children}
    </div>
  );
};

const CastProfiles = ({cast}) => {
  return (
    <div className="">
          <h1 className='text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2'>Starring: </h1>
          <div className='flex flex-wrap space-x-5' >
            {cast.map(({ id, profile, roleAs }) => {
              return (
                <div key={id} className='basis-28 flex flex-col items-center text-center mb-4'>
                    <img 
                        className='w-24 h-24 aspect-square object-cover rounded-full'
                        src={profile.avatar} 
                        alt="" 
                    />
                    <CustomButtonLink label={profile.name}/>
                    {/* <span className='text-light-subtle dark:text-dark-subtle'>as</span> */}
                    <p className='text-light-subtle dark:text-dark-subtle '>
                      {roleAs}
                    </p> 
                </div>
              )
            })}
          </div>
        </div>
  )
}