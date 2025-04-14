import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Wizard School</h1>
        <p>Unlock your magical potential with our world-class courses taught by master wizards.</p>
        <Link to="/courses" className="btn">Explore Courses</Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Expert Instructors</h3>
          <p>Learn from the most experienced wizards and witches in the magical world.</p>
        </div>
        <div className="feature-card">
          <h3>Comprehensive Curriculum</h3>
          <p>From basic spells to advanced potion-making, our courses cover all aspects of magic.</p>
        </div>
        <div className="feature-card">
          <h3>Flexible Learning</h3>
          <p>Study at your own pace with our accessible online magical education platform.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;