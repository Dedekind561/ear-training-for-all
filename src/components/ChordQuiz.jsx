import React, { useState } from "react";
import { buildChord } from "../lib/build-chord";
import "./ChordQuiz.css";

export const ChordQuiz = () => {
  const [tonic, setTonic] = useState("C4");
  const [chordType, setChordType] = useState("major");

  const typeToDegrees = {
    major: ["1", "3", "5"],
    minor: ["1", "3♭", "5"],
    augmented: ["1", "3", "5♯"],
  };
  const degrees = typeToDegrees[chordType];

  const handleChange = (e) => {
    setTonic(e.target.value);
  };

  const updateChordType = (e) => {
    setChordType(e.target.value);
  };

  const removeOctaveNumeral = (note) => note.replace(/[0-9]/, "");

  return (
    <>
      <h2>
        notes of {removeOctaveNumeral(tonic)} {chordType} triad
      </h2>
      <select defaultValue={"C4"} onChange={handleChange}>
        <option value="C4">C4</option>
        <option value="D4">D4</option>
        <option value="E4">E4</option>
      </select>
      <select name="" id="" defaultValue={"major"} onChange={updateChordType}>
        <option value="major">major</option>
        <option value="minor">minor</option>
        <option value="augmented">augmented</option>
      </select>
      {buildChord({ degrees, tonic, accidental: "♭" }).map((note) => (
        <p className="note">{removeOctaveNumeral(note)}</p>
      ))}
    </>
  );
};
