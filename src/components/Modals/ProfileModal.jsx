import React, { useEffect, useState } from 'react'
import ModalContainer from './ModalContainer';
import { useNotification } from '../../hooks';
import { getActorProfile } from '../../api/actor';

export default function ProfileModal({ visible, profileId, onClose }) {
   const [profile, setProfile]  = useState({});
   const { updateNotification } = useNotification();

   const fetchActorProfile = async () => {
     const {error, actor} =   await getActorProfile(profileId);
     if(error) return updateNotification('error', error);

     setProfile(actor);
   };

   useEffect(() => {
     if(profileId) fetchActorProfile()
   }, [profileId]);

   const {avatar, name, about} = profile;
  
    return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
       <div className="w-72 p-5 rounded flex flex-col items-center bg-white dark:bg-primary space-y-3 max-h-[30rem]">
        <img className='w-28 h-28 rounded-full' src={avatar} alt="" />
        <h1 className='dark:text-white text-primary font-semibold'>{name}</h1>
        <p className='dark:text-dark-subtle text-light-subtle'>{about}</p>
       </div>
    </ModalContainer>
  );
}
