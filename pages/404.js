import React from 'react';

export default function Custom404() {
  return (
    <div className="error-page">
      <h1>404 Cat not found</h1>
      <section className="hero">
        <p>
          <span>The page </span>
          <span>you're looking for </span>
          <span>doesn't exists...</span>
        </p>
      </section>
    </div>
  );
}
