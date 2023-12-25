// ImageSwipper.js
import React, { useState } from 'react';
import Result from './Result/Result';
import Card from './Card/Card';
import Img1 from '../assets/Images/Img1.jpg';
import Img2 from '../assets/Images/Img2.jpg';
import Img3 from '../assets/Images/Img3.jpg';
import Img4 from '../assets/Images/Img4.jpg';
import Img5 from '../assets/Images/Img5.jpg';

import './ImageSwipper.css';

function ImageSwipper() {
    const [likedCards, setLikedCards] = useState([]);
    const [dislikedCards, setDislikedCards] = useState([]);

    const urls = [Img1, Img2, Img3, Img4, Img5];

    const handleCardDismiss = (number, direction) => {
        if (direction === 1) {
            setLikedCards((prevLikedCards) => [...prevLikedCards, number]);
        } else {
            setDislikedCards((prevDislikedCards) => [...prevDislikedCards, number]);
        }
    };

    const onLike = () => {

        const like = document.querySelector('#like');
        like.style.animationPlayState = 'running';
        like.classList.toggle('trigger');
    };

    const onDislike = () => {

        const dislike = document.querySelector('#dislike');
        dislike.style.animationPlayState = 'running';
        dislike.classList.toggle('trigger');
    }

    return (

        <>


            {
            
            likedCards.length + dislikedCards.length == urls.length ? 
             
            <Result likedCards={likedCards} dislikedCards={dislikedCards} images={urls} />

             :
             
             <div id="wrapper">
                <ion-icon id="dislike" name="heart-dislike"></ion-icon>
                <div id="swiper">
                    {urls.map((url, index) => (
                        <Card key={index} number={index} imgLink={url} onDismiss={handleCardDismiss} onLike={onLike} onDislike={onDislike}  />
                    ))}
                </div>
                <ion-icon id="like" name="heart"></ion-icon>
            </div>

        
        }

            {/* Display liked and disliked cards */}
            

            {console.log(likedCards)}
            {console.log(dislikedCards)}

        

        </>
        
    );
}

export default ImageSwipper;
