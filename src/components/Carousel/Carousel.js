import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import './Carousel.css'
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { ActerApi } from '../../config/api';
import { img_300, noPicture } from '../../config/config';

const handleDragStart = (e) => e.preventDefault();


const Carousel = ({ id, media_type}) => {
    const [credits, setCredits] = useState()
  
 const fetchCredits= async()=>{
    const{data } = await axios.get( ActerApi(media_type,id))
    setCredits(data.cast)
}
useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);


const items = credits?.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  ));
  
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  return (
    <AliceCarousel
    mouseTracking
    infinite
    disableDotsControls
    disableButtonsControls
    responsive={responsive}
    items={items}
    autoPlay
  />
  );
}
 export default Carousel