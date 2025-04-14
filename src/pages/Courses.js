import React from 'react';

function Courses() {
  const courses = [
    {
      id: 1,
      title: 'Introduction to Spellcasting',
      description: 'Learn the fundamentals of casting magical spells with precision and control.',
      level: 'Beginner',
      instructor: 'Professor Eldritch'
    },
    {
      id: 2,
      title: 'Potion Making 101',
      description: 'Master the art of brewing magical potions for various purposes.',
      level: 'Beginner',
      instructor: 'Master Alexi'
    },
    {
      id: 3,
      title: 'Advanced Defensive Magic',
      description: 'Protect yourself and others with powerful defensive magical techniques.',
      level: 'Intermediate',
      instructor: 'Professor Shield'
    },
    {
      id: 4,
      title: 'Magical Creatures & How to Interact',
      description: 'Study the diverse magical creatures and learn safe interaction methods.',
      level: 'Intermediate',
      instructor: 'Dr. Faunawatcher'
    },
    {
      id: 5,
      title: 'Ancient Runes & Magical Scripts',
      description: 'Decipher and understand ancient magical languages and symbols.',
      level: 'Advanced',
      instructor: 'Scholar Runestone'
    },
    {
      id: 6,
      title: 'Wandless Magic Mastery',
      description: 'Develop your abilities to perform magic without traditional wands.',
      level: 'Advanced',
      instructor: 'Archmage Handwaver'
    }
  ];

  return (
    <div className="courses-page">
      <h1>Our Magical Courses</h1>
      <p>Browse our selection of courses designed to develop your magical abilities.</p>
      
      <div className="courses-grid">
        {courses.map(course => (
          <div className="course-card" key={course.id}>
            <div className="course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Level:</strong> {course.level}</p>
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <button className="btn">Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;