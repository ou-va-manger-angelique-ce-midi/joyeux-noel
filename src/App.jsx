import logo from "./burger_logo.svg";
import "./App.css";
import restaurants from "./restaurants.js";
import loadingSentences from "./loadingSentences.js";
import React, { useState } from "react";
import seedrandom from "seedrandom";

function getRandomInt(max, seed) {
  if (seed) {
    const randomGenerator = seedrandom(seed)
    return Math.floor(randomGenerator() * max);
  }
  return Math.floor(Math.random() * max);
}


 const PropositionDisplay = function ({restaurant}) {
  return (
    <div>
      <h1>Trouvé ! </h1>
      <h2>{restaurant.name}</h2>
      <a
          className="App-link"
          href={restaurant.link}
          target="_blank"
          rel="noopener noreferrer"
        >
         Lien vers Google Maps
        </a>
      <p>Bon appétit &#128523; </p>
    </div>
  ); 
};

const App = function () {
  
  const today = new Date()
  const seed = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

  const [loadingState, setLoadingState] = useState("notLoaded");
  const loadingSentence = loadingSentences[getRandomInt(loadingSentences.length)];
  const restaurant= restaurants[getRandomInt(restaurants.length, seed)];

  const switchDisplay = (loadingState) => {
    switch(loadingState) {
      case "notLoaded":   return <button className="button" onClick={() => {setLoadingState("loading"); setTimeout(() => setLoadingState("loaded"), 2000)}}>Trouver un restaurant</button>;
      case "loading":   return <h2>{loadingSentence}</h2>
      case "loaded": return <PropositionDisplay restaurant={restaurant} /> 
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{marginBottom:20}}/>
        {switchDisplay(loadingState)}
        <p className="footer" style={{fontSize:10}}>Sur une idée originale de Roch et Chloé HB</p> 
      </header>
    </div>
  );
};

export default App;
