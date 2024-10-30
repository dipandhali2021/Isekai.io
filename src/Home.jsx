import { useState } from 'react'
import React from 'react';
import { animals, names, starWars, uniqueNamesGenerator } from 'unique-names-generator'
import { getHashValue, getStoreValue, setHashValue, setStoreValue } from './utils/helpers'



function Home({ enterWorld }) {
  const [screen, setScreen] = useState(getHashValue('r') ? 'NAME' : 'LOBBY')
  const [playerName, setPlayerName] = useState(getStoreValue('player_name'))

  const randomNameGenerator = () => {
    setPlayerName(uniqueNamesGenerator({ dictionaries: [animals, starWars, names], length: 1 }));
  }

  return (
    <div className='flex flex-row w-full'>
      <div className='hidden lg:w-6/12 lg:flex'>
        {' '}
        <img
          src='/images/group.png'
          className='h-screen'
        />
      </div>
      <div className='md:top-0 bottom-0 left-0 right-0 mx-auto lg:flex flex-col  w-6/12 items-center justify-center h-screen'>
        <img
          src='/images//logo.svg'
          alt='img'
          className='size-72 h-40 absolute md:top-12 lg:top-2 pt-20 '
        />
        {screen === 'LOBBY' && (
          <div className='flex h-full  flex-col items-center justify-center '>
            <p className='hidden lg:flex font-mono mt-1 px-32 ' style={{ fontFamily: 'Inter Tight' }}>
              Welcome to Isekai.io, a virtual world inspired by the popular "Isekai" genre. Here, you can escape the harsh realities of your
              world and build a new life anonymously. Our project aims to provide a safe and engaging space for users to connect, build
              communities, and forge meaningful relationships without revealing their real-world identities. Enjoy our features like
              anonymity, community building, and a virtual chat room where you can interact with others. Get ready to dive into the virtual
              world!
            </p>
            <button
              className='text-gray-900  bg-gradient-to-r from-cyan-500 to-blue-500 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center m-4'
              onClick={() => {
                setHashValue('r', 'R' + 'ROOM')
                setScreen('NAME')
              }}
            >
              Enter the world
            </button>
          </div>
        )}
        {screen === 'NAME' && (
          <div className='flex flex-col items-center'>
            <p className='px-32 hidden lg:flex'>
              Welcome to Isekai.io! In this virtual world, you can create a new life and explore endless possibilities. Please follow the
              instructions below to get started:
              <br />
              <br />
              1. Choose a unique name that represents your virtual identity.
              <br />
              2. Enter your chosen name in the input box below.
              <br />
              3. Click the Next button to continue.
            </p>


            <div className='flex mt-80 lg:mt-20 items-center' style={{display:'grid', alignItems:'center'}}>
              <div
                className='border border-black border-1 rounded-xl h-12 flex  overflow-hidden py-2 px-6 bg-white '
                style={{
                  borderRadius: '0.5rem',
                  borderRightWidth: 'medium',
                  borderBottomWidth: 'medium',
                  background: 'aliceblue'
                }}
              >
                <Input onChange={setPlayerName} onSubmit={() => {}} value={playerName} />
              </div>

              <button 
              style={{
                  //borderLeft: 'none',
                  marginTop: '10px',
                  width: '150px',
                  marginLeft: '60px',
                }} 
                className="relative inline-block px-5 py-3 rounded-full text-white uppercase text-sm tracking-wider transition-all duration-300 overflow-hidden group"
                onClick={() => {
                  setStoreValue('player_name', playerName)
                  enterWorld()
                }}
                >
                <span className="relative z-10">Next</span>
                <span className="absolute inset-0 bg-[#1a158d] rounded-full -z-10"></span>
                <span className="absolute inset-0 w-0 bg-[#160edb] transition-all duration-300 group-hover:w-full rounded-full -z-1"></span>
                </button>
            </div>
            <div className='text-center text-sm w-full mt-4 cursor-pointer text-blue-700 underline' onClick={randomNameGenerator}>Random name generator</div>
          </div>
        )}
        <div className='absolute bottom-5 text-xs gap-2 flex items-center'>
          <p className='text-xs mt-1'>Get ready to dive into virtual world</p>
        </div>
      </div>
    </div>
  )
}

export default Home

const Input = ({ onSubmit, onChange, value }) => (
  <>
    <input
      maxLength={300}
      placeholder='write your name'
      className='flex-1 min-w-0 rounded-xl bg-transparent text-black focus:outline-none focus:border-none input-box text5 font-bold'
      type='text'
      onChange={e => {
        onChange(e.target.value)
      }}
      onKeyDown={e => {
        e.stopPropagation() // avoids moving character while typing
        e.code === 'Enter' && onSubmit()
        e.code === 'Escape' && e.target.blur()
      }}
      value={value}
    />
  </>
)
