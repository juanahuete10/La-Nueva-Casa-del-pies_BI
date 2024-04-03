// About.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../App.css';

function About({rol}) {
  return (
    <div>
      <Header rol={ rol}/>
      <Link to="/">Ir a inicio</Link>
    </div>
  );
}

export default About;