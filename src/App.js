import "./App.css";
import * as Tone from "tone";
import React from "react";
import { ChordQuiz } from "./components/ChordQuiz";
import { KeysColours } from "./components/KeysColours";

const letters = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

const diatonicRegex = /[A-G]\d/;
const octave3 = letters.map((note) => note + "3");
const octave4 = letters.map((note) => note + "4");
const octave5 = letters.map((note) => note + "5");
const notes = [...octave3, ...octave4, ...octave5];
const synth = new Tone.Synth().toDestination();

function selectRandomNote(notes) {
  const diatonicNotes = notes.filter((note) => diatonicRegex.test(note));
  const randomIndex = Math.floor(Math.random() * diatonicNotes.length);
  return diatonicNotes[randomIndex];
}

function logDegree(note) {
  if (note.includes("C")) {
    return 1;
  }
  if (note.includes("D")) {
    return 2;
  }
  if (note.includes("E")) {
    return 3;
  }
  if (note.includes("F")) {
    return 4;
  }
  if (note.includes("G")) {
    return 5;
  }
  if (note.includes("A")) {
    return 6;
  }
  if (note.includes("B")) {
    return 7;
  }
}

function playNote(note) {
  console.log(note.replace(/b\d*/, " flat"), "note");
  if (note.includes("C")) {
    console.log(1);
  }
  if (note.includes("D")) {
    console.log(2);
  }
  if (note.includes("E")) {
    console.log(3);
  }
  if (note.includes("G")) {
    console.log(5);
  }
  if (note.includes("A")) {
    console.log(6);
  }
  if (note.includes("B")) {
    console.log(7);
  }
  synth.triggerAttackRelease(note, 1);
}

const renderKeys = (notes) => {
  return notes.map((note) => {
    return (
      <button key={note} onClick={() => playNote(note)}>
        {note}
      </button>
    );
  });
};

async function startGame({ rounds }) {
  await Tone.start();
  beginEarTrainingQuiz({ rounds });
}

function beginEarTrainingQuiz({ rounds }) {
  const randomNotes = Array.from({ length: rounds }, () => {
    return selectRandomNote([...octave3, ...octave4]);
  });
  console.log(randomNotes.map((randomNote) => logDegree(randomNote)));
  const loop = new Tone.Loop((time) => {
    console.log("playing...");
    const randomNote = randomNotes.shift();
    playNote(randomNote);
  }, 1.4);
  loop.iterations = rounds;
  loop.start();
  Tone.Transport.start();
}

function App() {
  const [rounds, setRounds] = React.useState(1);
  return (
    <div className="App">
      <button onClick={() => playNote("C4")}>Reference tone</button>
      <button onClick={() => startGame({ rounds })}>Start test</button>
      <p>Number of rounds: {rounds}</p>
      <button onClick={() => setRounds((x) => x + 1)}>Increase rounds</button>
      <button onClick={() => setRounds((x) => x - 1)}>Decrease rounds</button>
      {renderKeys(notes)}
      <ChordQuiz />
      {/* <KeysColours /> */}
    </div>
  );
}

export default App;
