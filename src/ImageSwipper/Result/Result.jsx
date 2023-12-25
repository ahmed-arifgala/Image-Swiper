import React from 'react'
import './Result.css'


function Result({likedCards, dislikedCards, images}) {
  return (

    <div id='ResultWrapper'>

        <div id='Result'>
    
            <div id='liked'>
                <h2>Liked Cards</h2>

                <div className='images'>
                        {likedCards.map((cardNumber) => (
                            <div className="image">
                                <img src={images[cardNumber]} />
                            </div>
                        ))}
                </div>
            </div>
            

           

            <div id='disliked'>
                <h2>Disliked Cards</h2>
                <div className='images'>
                        {dislikedCards.map((cardNumber) => (
                            <div className="image">
                                <img src={images[cardNumber]} />
                            </div>
                            
                        ))}
                </div>
            </div>
            
        
        </div>
       
        
        
    </div>
  )
}

export default Result