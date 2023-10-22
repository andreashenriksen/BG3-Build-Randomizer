import { useState } from "react";
import { BuildRoulette } from "./BuildRoulette";
import "./App.css";

function App() {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedClassIcons, setSelectedClassIcons] = useState<string[]>([]);
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedRacePicture, setSelectedRacePicture] = useState("");
  const [numClasses, setNumClasses] = useState(1);

  function Dropdown({ numClasses }: { numClasses: number }) {
    const [selectedValue, setSelectedValue] = useState(numClasses.toString());

    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSelectedValue(event.target.value);
      setNumClasses(parseInt(event.target.value));
    };

    return (
      <select
        className="max-sm:text-sm bg-gray-800 border-gray-700 rounded-md shadow-sm hover:ring-gray-700 focus:ring focus:ring-gray-700 focus:ring-opacity-50 py-1 m-[10px]"
        onChange={handleSelectChange}
        value={selectedValue}
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map(
          (
            value // Create an array of numbers from 1 to 12 and map them to HTML options
          ) => (
            <option key={value} value={value.toString()}>
              {value}
            </option>
          )
        )}
      </select>
    );
  }

  function handleClassChange(buildClass: string[]) {
    setSelectedClasses(buildClass);
  }

  function handleClassIconChange(buildClassIcon: string[]) {
    setSelectedClassIcons(buildClassIcon);
  }

  function handleRaceChange(buildRace: string) {
    setSelectedRace(buildRace);
  }

  function handleRacePictureChange(buildRacePicture: string) {
    setSelectedRacePicture(buildRacePicture);
  }

  function handleBuild() {
    const buildRoulette = new BuildRoulette(numClasses);
    buildRoulette.roll();
    const classes: string[] = buildRoulette.getSelectedClasses();
    const classIcons: string[] = buildRoulette.getClassPictures();
    const race: string = buildRoulette.getRace();
    const racePicture: string = buildRoulette.getRacePicture();
    handleClassChange(classes);
    handleClassIconChange(classIcons);
    handleRaceChange(race);
    handleRacePictureChange(racePicture);
  }

  return (
    <div>
      <div className="top-0 w-full text-center bg-gradient-to-b from-black via-black text-white p-4 text-2xl font-custom">
        Baldur's Gate 3 Build Randomizer
      </div>
      <div className="flex justify-center min-h-screen">
        <div className="flex-grow bg-gray-800 p-4 rounded-lg shadow-lg max-w-xs lg:max-w-[40rem] h-fit">
          <div className="mt-4">
            <div className="mb-2 lg:mb-4">
              <label className="block text-sm lg:text-xl font-bold text-gray-300">
                Race:
              </label>
              <div className="flex items-center w-max gap-2 md:ml-16">
                <img
                  src={selectedRacePicture}
                  className="md:h-24 h-12"
                />
                <p className="lg:text-4xl text-gray-200">{selectedRace}</p>
              </div>
            </div>
            <div className="mb-4 h-[270px] md:h-[364px]">
              <label className="block text-sm lg:text-xl font-bold text-gray-300">
                Classes:
              </label>
              <ul>
                {selectedClasses.map((buildClass, index) => (
                  <li
                    key={index}
                    className='text-sm md:text-lg text-gray-200'
                  >
                    <img className="max-md:w-6 inline-block align-middle" src={selectedClassIcons[index]}/>
                    {buildClass}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-[55px]">
              <div>
                <label className="block text-xs lg:text-sm font-semibold text-gray-300">
                  Number of Classes:
                </label>
                <Dropdown numClasses={numClasses} />
              </div>
              <div>
                <button
                  className="px-4 py-2 text-xs lg:text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-700 focus:ring-opacity-50"
                  onClick={handleBuild}
                >
                  Generate Character
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
