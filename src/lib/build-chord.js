const getSemitonesAboveTonic = (degree) => {
  const degreesToSemitones = {
    1: 0,
    "2♭": 1,
    2: 2,
    "3♭": 3,
    3: 4,
    4: 5,
    5: 7,
    "5♯": 8,
    6: 9,
    7: 11,
    "7♭": 10,
  };
  return degreesToSemitones[degree];
};

export const buildChord = ({ degrees, tonic, accidental }) => {
  const templateOctave = [
    { note: "C" },
    { note: "D♭", enharmonicEquivalent: "C♯" },
    { note: "D" },
    { note: "E♭", enharmonicEquivalent: "D♯" },
    { note: "E" },
    { note: "F" },
    { note: "G♭", enharmonicEquivalent: "F♯" },
    { note: "G" },
    { note: "A♭", enharmonicEquivalent: "G♯" },
    { note: "A" },
    { note: "B♭" },
    { note: "B" },
  ];
  const octave4 = templateOctave.map((obj) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      newObj[key] = obj[key] + "4";
    });
    return newObj;
  });
  const octave5 = templateOctave.map((obj) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      newObj[key] = obj[key] + "5";
    });
    return newObj;
  });

  const notes = [...octave4, ...octave5];
  const [_, ...remainingDegrees] = degrees;

  const firstIndex = notes.findIndex(
    ({ note, enharmonicEquivalent }) =>
      note === tonic || tonic === enharmonicEquivalent
  );

  const remainingIndices = remainingDegrees.map(
    (degree) => getSemitonesAboveTonic(degree) + firstIndex
  );

  const remainingTriad = notes
    .filter((_, i) => remainingIndices.includes(i))
    .map(({ note, enharmonicEquivalent }) => {
      if (!note.includes("♯") && !note.includes("♭")) {
        return note;
      }

      if (note.includes(accidental)) {
        return note;
      } else {
        return enharmonicEquivalent;
      }
    });

  return [tonic, ...remainingTriad];
};
