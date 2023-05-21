import { buildChord } from "./lib/build-chord";

describe("buildChord()", () => {
  it("can build a basic triad from C4 ( in a single octave )", () => {
    expect(buildChord({ degrees: ["1", "3", "5"], tonic: "C4" })).toEqual([
      "C4",
      "E4",
      "G4",
    ]);
    expect(buildChord({ degrees: ["1", "2", "5"], tonic: "C4" })).toEqual([
      "C4",
      "D4",
      "G4",
    ]);
    expect(buildChord({ degrees: ["1", "4", "5"], tonic: "C4" })).toEqual([
      "C4",
      "F4",
      "G4",
    ]);
    expect(
      buildChord({ degrees: ["1", "3♭", "5"], tonic: "C4", accidental: "♭" })
    ).toEqual(["C4", "E♭4", "G4"]);
    expect(
      buildChord({ degrees: ["1", "3♭", "5"], tonic: "C4", accidental: "♭" })
    ).toEqual(["C4", "E♭4", "G4"]);
  });
  it("can build a triad from any starting tonic", () => {
    expect(
      buildChord({ degrees: ["1", "3", "5"], tonic: "D4", accidental: "♯" })
    ).toEqual(["D4", "F♯4", "A4"]);
    expect(
      buildChord({ degrees: ["1", "3♭", "5"], tonic: "D4", accidental: "♯" })
    ).toEqual(["D4", "F4", "A4"]);
    expect(
      buildChord({ degrees: ["1", "2", "5"], tonic: "D4", accidental: "♯" })
    ).toEqual(["D4", "E4", "A4"]);
    expect(
      buildChord({ degrees: ["1", "4", "5"], tonic: "D4", accidental: "♯" })
    ).toEqual(["D4", "G4", "A4"]);
    expect(
      buildChord({ degrees: ["1", "3", "5"], tonic: "E4", accidental: "♯" })
    ).toEqual(["E4", "G♯4", "B4"]);
    expect(
      buildChord({ degrees: ["1", "3", "5"], tonic: "C♯4", accidental: "♯" })
    ).toEqual(["C♯4", "F4", "G♯4"]);
  });
  it("can build 7th chords - major 7th", () => {
    expect(
      buildChord({
        degrees: ["1", "3", "5", "7"],
        tonic: "C4",
        accidental: "♯",
      })
    ).toEqual(["C4", "E4", "G4", "B4"]);
  });
  it("can build 7th chords - dominant 7th", () => {
    expect(
      buildChord({
        degrees: ["1", "3", "5", "7♭"],
        tonic: "C4",
        accidental: "♭",
      })
    ).toEqual(["C4", "E4", "G4", "B♭4"]);
  });
  it("can build chords outside of a single octave", () => {
    expect(
      buildChord({
        degrees: ["1", "3", "5", "7♭"],
        tonic: "D4",
        accidental: "♯",
      })
    ).toEqual(["D4", "F♯4", "A4", "C5"]);
    expect(
      buildChord({
        degrees: ["1", "3", "5", "7"],
        tonic: "D4",
        accidental: "♯",
      })
    ).toEqual(["D4", "F♯4", "A4", "C♯5"]);
  });
});
