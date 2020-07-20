import React from 'react';
import GifItem from './GifItem';

const GifCard = (props) => {
  const gifItems = props.gifs.map((image) => {
    return <GifItem key={image.id} gif={image} />
  });

  return (
    <div className='gif-list'>{gifItems}</div>
  );
};

export default GifCard;
