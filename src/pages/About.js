import React from 'react';

function About() {
  return (
    <div className="about-page">
      <h1>About Wizard School</h1>
      
      <div className="about-section">
        <div>
          <h2>Our Story</h2>
          <p>
            Founded in 1432 by the legendary wizard Meridius the Wise, 
            Wizard School has been at the forefront of magical education for centuries. 
            What began as a small gathering of apprentices has grown into the premier 
            institution for magical learning in the modern world.
          </p>
          <p>
            In 2020, we expanded our reach by launching our online platform, 
            making magical education accessible to aspiring wizards everywhere.
          </p>
        </div>
        <div>
          <h2>Our Mission</h2>
          <p>
            At Wizard School, we believe that magic is a gift that should be nurtured 
            responsibly. Our mission is to provide comprehensive magical education that 
            emphasizes both technical skill and ethical practice.
          </p>
          <p>
            We strive to create a diverse and inclusive community where wizards from 
            all backgrounds can develop their abilities and contribute positively to 
            both the magical and non-magical worlds.
          </p>
        </div>
      </div>
      
      <h2>Meet Our Faculty</h2>
      <div className="features">
        <div className="feature-card">
          <h3>Professor Eldritch</h3>
          <p>Head of Spellcasting Department with over 150 years of magical experience.</p>
        </div>
        <div className="feature-card">
          <h3>Master Alexi</h3>
          <p>Renowned potion master whose brews have saved countless lives.</p>
        </div>
        <div className="feature-card">
          <h3>Professor Shield</h3>
          <p>Former Magical Defense Force commander specializing in protective magic.</p>
        </div>
      </div>
    </div>
  );
}

export default About;