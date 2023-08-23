import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("/api/teachers")
        .then(response => response.json())
        .then(data => {
          setTeachers(data);
          setLoading(false);
        })
  }, []);
  console.log(teachers);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>TEACHER List</h2>
            {teachers.map(teacher =>
                <div key={teacher.id}>
                  {teacher.name}
                </div>
            )}
          </div>
        </header>
      </div>
  );
}

export default App;