import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';

const What = ({ whatido }) => {
  const itemsRef = useRef();

  useEffect(() => {
    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll('li');

      gsap.fromTo(
        [items],
        {
          autoAlpha: 0,
          y: '150%'
        },
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          stagger: 0.5,
          ease: 'circ.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top center', // when the top of the trigger hits the bottom of the viewport
            end: 'bottom center', // end when the bottom of the trigger hits the top of the viewport
            // toggleClass: {
            //   targets: 'body',
            //   className: 'theme-dark'
            // }
            markers: true
          }
        }
      );
    }
  }, []);

  return (
    <section id="whatido" className="whatido">
      <h2>{whatido.heading}</h2>

      <ul ref={itemsRef} className="whatido__items">
        {whatido &&
          whatido.items &&
          whatido.items.map(item => (
            <li key={item.title}>
              <p className="whatido__title">{item.title}</p>
              <p className="whatido__description">{item.description}</p>
            </li>
          ))}
      </ul>
    </section>
  );
};

What.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  whatido: PropTypes.object.isRequired
};

export default What;
