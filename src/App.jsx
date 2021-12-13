import logo from "./burger_logo.svg";
import "./App.css";
import restaurants from "./restaurants.js";
import loadingSentences from "./loadingSentences.js";
import React, { useState } from "react";
import seedrandom from "seedrandom";

function getRandomInt(max, generator) {
  return Math.floor(generator() * max);
}


 const PropositionDisplay = function ({restaurant}) {
  return (
    <div>
      <h1>Trouvé ! </h1>
      <h2><a
          className="App-link"
          href={restaurant.link}
          target="_blank"
          rel="noopener noreferrer"
        >
         {restaurant.name}
        </a></h2>
      <p>{restaurant.description}</p>

      <p>Bon appétit &#128523; </p>
    </div>
  ); 
};

const App = function () {
  
  const today = new Date()
  const seed = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
  const randomGenerator = seedrandom(seed)

  const [loadingState, setLoadingState] = useState("notLoaded");
  const loadingSentence = loadingSentences[getRandomInt(loadingSentences.length, Math.random)];
  const firtRestaurant= restaurants[getRandomInt(restaurants.length, randomGenerator)];
  const secondRestaurant= restaurants[getRandomInt(restaurants.length, randomGenerator)];

  const switchDisplay = (loadingState) => {
    switch(loadingState) {
      case "notLoaded": return <button className="button" onClick={() => {setLoadingState("loading"); setTimeout(() => setLoadingState("firstRestaurantLoaded"), 2000)}}>Je mange où ce midi ? </button>
      case "loading": return <h2>{loadingSentence}</h2>
      case "firstRestaurantLoaded": return <div><PropositionDisplay restaurant={firtRestaurant} /><button className="button" onClick={() => {setLoadingState("loading"); setTimeout(() => setLoadingState("secondRestaurantLoaded"), 2000)}}>C'est nul, donne moi la deuxième proposition du jour ! </button></div>
      case "secondRestaurantLoaded": return <div><PropositionDisplay restaurant={secondRestaurant} /> <button className="button" onClick={() => setLoadingState("theEnd")}>Bof, encore autre chose ! </button></div>
      case "theEnd": return <h2>Il n'y a que deux propositions par jour. Il faut bien garder quelques surprises ... </h2>
      default: return <h2>Une erreur est survenue</h2>
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{marginBottom:30}}/>
        {switchDisplay(loadingState)}
        <p className="footer" style={{fontSize:10}}>Sur une idée originale de Roch et Chloé HB</p> 
      </header>
    </div>
  );
};

export default App;
