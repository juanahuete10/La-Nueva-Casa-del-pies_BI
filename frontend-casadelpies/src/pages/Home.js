import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../App.css';

function Home({rol}) {
  return(
    <div>
      <Header rol={ rol} />
      
    </div>
  );
}

export default Home;