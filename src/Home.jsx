import { useState } from 'react';
import { animals, names, starWars, uniqueNamesGenerator } from 'unique-names-generator';
import { getHashValue, getStoreValue, setHashValue, setStoreValue } from './utils/helpers';

function Home({ enterWorld }) {
  const [screen, setScreen] = useState(getHashValue('r') ? 'NAME' : 'LOBBY');
  const [playerName, setPlayerName] = useState(getStoreValue('player_name'));

  const randomNameGenerator = () => {
    setPlayerName(uniqueNamesGenerator({ dictionaries: [animals, starWars, names], length: 1 }));
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-gray-50">
      {/* Image Section */}
      <div className="w-full lg:w-6/12 flex items-center justify-center bg-gray-100">
        <img
          src="/images/group.png"
          alt="Group Illustration"
          className="w-3/4 lg:w-full h-auto object-contain max-h-[50vh] lg:max-h-screen mb-6 lg:mb-0"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col w-full lg:w-6/12 items-center justify-center px-6 lg:px-16">
        <img
          src="/images/logo.svg"
          alt="Isekai.io Logo"
          className="h-20 lg:h-24 mb-4 "
         
        />

        {/* LOBBY Screen */}
        {screen === 'LOBBY' && (
          <div className="text-center">
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Welcome to Isekai.io, a virtual world inspired by the popular "Isekai" genre. Build a
              new life anonymously, connect with others, and explore our unique features.
            </p>
            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg px-6 py-3 shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              onClick={() => {
                setHashValue('r', 'R' + 'ROOM');
                setScreen('NAME');
              }}
            >
              Enter the World
            </button>
          </div>
        )}

        {/* NAME Screen */}
        {screen === 'NAME' && (
          <div className="w-full text-center">
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Create your virtual identity by choosing a unique name and clicking Next.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex-1 flex items-center border rounded-lg bg-white shadow">
                <Input onChange={setPlayerName} value={playerName} />
              </div>
              <button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium px-6 py-2 rounded-lg shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                onClick={() => {
                  setStoreValue('player_name', playerName);
                  enterWorld();
                }}
              >
                Next
              </button>
            </div>
            <button
              className="mt-4 text-cyan-600 hover:text-cyan-800 font-medium flex items-center justify-center gap-2 focus:outline-none"
              onClick={randomNameGenerator}
            >
              <span role="img" aria-label="dice">
                🎲
              </span>
              Generate Random Name
            </button>
          </div>
        )}

        <p className="absolute bottom-5 text-gray-500 text-xs text-center">
          Get ready to dive into the virtual world
        </p>
      </div>
    </div>
  );
}

export default Home;

const Input = ({ onChange, value }) => (
  <input
    type="text"
    maxLength={300}
    placeholder="Enter your name"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="flex-1 px-4 py-2 text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
  />
);
