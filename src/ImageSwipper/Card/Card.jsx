// Card.js
import React, { useEffect, useRef } from 'react';
import './Card.css';

function Card(props) {
    const cardRef = useRef(null);
    const startPointRef = useRef({ x: 0, y: 0 });
    const offsetXRef = useRef(0);
    const offsetYRef = useRef(0);

    useEffect(() => {
        const swiper = document.querySelector('#swiper');
        const cards = swiper.querySelectorAll('.card:not(.dismissing)');
        cards.forEach((card, index) => {
            card.style.setProperty('--i', index);
        });

        cardRef.current = document.querySelector(`.card[data-number="${props.number}"]`);

        

        if (cardRef.current) {
            cardRef.current.addEventListener('mousedown', mousedown);
        }

        return () => {
            if (cardRef.current) {
                cardRef.current.removeEventListener('mousedown', mousedown);
            }
        };
    }, [props.number]);

    const mousedown = (e) => {
        e.stopPropagation();
        const { clientX, clientY } = e;
        startPointRef.current = { x: clientX, y: clientY };

        cardRef.current.style.transition = '';
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!startPointRef.current) return;
        const { clientX, clientY } = e;
        offsetXRef.current = clientX - startPointRef.current.x;
        offsetYRef.current = clientY - startPointRef.current.y;
        const rotate = offsetXRef.current * 0.06;
        cardRef.current.style.transform = `translate(${offsetXRef.current}px, ${offsetYRef.current}px) rotate(${rotate}deg)`;

        if (Math.abs(offsetXRef.current) > cardRef.current.clientWidth * 0.7) {
            const direction = offsetXRef.current > 0 ? 1 : -1;
            if (direction === 1) {

                console.log('liked');
            } else {
                console.log('disliked');
            }
            dismiss(direction);
        }
    };

    const handleMouseUp = () => {
        startPointRef.current = { x: null, y: null };
        document.removeEventListener('mousemove', handleMouseMove);
        cardRef.current.style.transition = 'transform 0.5s';
        cardRef.current.style.transform = '';
    };

    const dismiss = (direction) => {
        startPointRef.current = { x: null, y: null };
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
        cardRef.current.style.transition = 'transform 1s';
        cardRef.current.style.transform = `translate(${direction * window.innerWidth}px, ${offsetYRef.current}px) rotate(${90 * direction}deg)`;
        cardRef.current.classList.add('dismissing');

        setTimeout(() => {
            cardRef.current.remove();
            props.onDismiss(props.number, direction); // Call the onDismiss callback with the direction
        }, 1000);


        if(direction==1){
            props.onLike();
        }else{
            props.onDislike();
        }

    };

    return (
        <div className="card" data-number={props.number} onMouseDown={mousedown} onDragStart={(e) => e.preventDefault()}>
            <img src={props.imgLink} alt={`Card ${props.number}`} />
        </div>
    );
}

export default Card;
