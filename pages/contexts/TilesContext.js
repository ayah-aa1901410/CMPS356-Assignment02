import { useState, useContext, createContext } from "react";



const tilesContext = createContext();

export default function TilesProvider({ children }) {
    const [choices, setChoices] = useState([{emo:null, id:null}, {emo:null, id:null}])
    const [matched, setMatched] = useState([])
    const [rotations, setRotations] = useState([])

  return (
    <tilesContext.Provider value={{ choices, setChoices, matched, setMatched, rotations, setRotations }}>
      {children}
    </tilesContext.Provider>
  );
}

export const useTilesContext = () => useContext(tilesContext);


