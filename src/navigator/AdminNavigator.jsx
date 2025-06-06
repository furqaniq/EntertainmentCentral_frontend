import React, { useState } from 'react'
import { Route, Routes } from 'react-router'
import NotFound from '../components/NotFound'
import Dashboard from '../components/admin/Dashboard'
import Movies from '../components/admin/Movies'
import Actors from '../components/admin/Actors'
import Navbar from '../components/admin/Navbar'
import Header from '../components/admin/Header'
import MovieUpload from '../components/admin/MovieUpload'
import ActorUpload from '../components/Modals/ActorUpload'
import SearchMovies from '../components/admin/SearchMovies'


export default function AdminNavigator() {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(false);
  
  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true);
  };

  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false);
  };


  const displayActorUploadModal = () => {
    setShowActorUploadModal(true);
  };

  const hideActorUploadModal = () => {
    setShowActorUploadModal(false);
  };
  return (
    <>
    <div className='flex dark:bg-primary bg-white'>
      <Navbar/>
      <div className="flex flex-col p-4 w-screen">
        <Header onAddMovieClick={displayMovieUploadModal} onAddActorClick ={displayActorUploadModal}/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </div>
    <MovieUpload visible={showMovieUploadModal} onClose={hideMovieUploadModal}/>
    <ActorUpload visible={showActorUploadModal} onClose={hideActorUploadModal}/> 
    </>
  )
}
  