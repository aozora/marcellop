import React from 'react';
import PropTypes from 'prop-types';

const What = ({ whatido }) => {

  const getRandomJustification = () => {
    const index = Math.floor(Math.random() * 3);

    switch (index) {
      case 2:
        return 'flex-start';
      case 1:
        return 'flex-end';
      case 0:
        return 'center';
      default:
        return 'center';
    }
  };

  return (
    <section id="whatido" className="whatido">
      <h2>{whatido.heading}</h2>

      <ul className="whatido__items">
        {whatido && whatido.items && whatido.items.map((item) => (
          <li key={item.title} style={{ '--whatido-justify': getRandomJustification() }}>
            <p className="whatido__title">{item.title}</p>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="whatido__description" dangerouslySetInnerHTML={{ __html: item.description }}/>
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
