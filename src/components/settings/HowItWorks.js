import React from 'react';

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h2 className="home-section-title">How Curbside Cookies Works</h2>
      <div className="hiw-img-col">
        <img className="hiw-img" src="/img/HIW-step-1.png" />
        <p>Step Description</p>
      </div>
      <div className="hiw-arrow-col top-down-arrow">
        <img src="/img/arrow.png" />
      </div>
      <div className="hiw-img-col">
        <img className="hiw-img" src="/img/HIW-step-2.png" />
        <p>Step Description</p>
      </div>
      <div className="hiw-arrow-col top-down-arrow">
        <img src="/img/arrow.png" />
      </div>
      <div className="hiw-img-col">
        <img className="hiw-img" src="/img/HIW-step-4.png" />
        <p>Step Description</p>
      </div>
    </div>
  );
};

export default HowItWorks;
