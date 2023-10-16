import { useState } from 'react'
import { BuildRoulette } from './BuildRoulette'
import './App.css'

function App() {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [selectedRace, setSelectedRace] = useState('')
  const [numClasses, setNumClasses] = useState(1)

  function Dropdown({ numClasses }: { numClasses: number }) {
    const [selectedValue, setSelectedValue] = useState(numClasses.toString());
  
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(event.target.value);
      setNumClasses(parseInt(event.target.value));
    };
  
    return (
      <select
        className="bg-gray-800 border-gray-700 rounded-md shadow-sm hover:ring-gray-700 focus:ring focus:ring-gray-700 focus:ring-opacity-50 py-1 px-2" 
        onChange={handleSelectChange}
        style={{ margin: "10px" }}
        value={selectedValue}
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((value) => (
          <option key={value} value={value.toString()}>
            {value}
          </option>
        ))}
      </select>
    );
  }

  function handleClassChange(buildClass: string[]) {
    setSelectedClasses(buildClass)
  }

  function handleRaceChange(buildRace: string) {
    setSelectedRace(buildRace)
  }

  function handleBuild() {
    const buildRoulette = new BuildRoulette(numClasses)
    buildRoulette.roll()
    const classes: string[] = buildRoulette.getClasses()
    const race: string = buildRoulette.getRace()
    handleClassChange(classes)
    handleRaceChange(race)
  }
  
  return (
    <div>
      <div className="fixed top-0 w-full text-center bg-gradient-to-b from-black via-black text-white p-4 text-2xl font-custom">
        Baldur's Gate 3 Build Randomizer
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center">Build</h1>
          <div className="mt-4">
            <div className="mb-4">
              <label className="block text-xl font-bold text-gray-300">Race:</label>
              <p className="text-lg text-gray-200">{selectedRace}</p>
            </div>
            <div className="mb-4">
              <label className="block text-xl font-bold text-gray-300">Classes:</label>
              <ul>
                {selectedClasses.map((buildClass, index) => (
                  <li key={index} className="text-lg text-gray-200">{buildClass}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-300">Number of Classes:</label>
              <Dropdown numClasses={numClasses} />
            </div>
          </div>
          <div className="mt-6">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-700 focus:ring-opacity-50"
              onClick={handleBuild}
            >
              Generate Character
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
