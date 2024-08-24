import './App.css';
import React from 'react';
import mansur from './assets/music/dmc-mansur-amp-alex-ezhov-drift-away-royalty-free-music-174836.mp3';
import yourHear from './assets/music/mitrox-your-hear-royalty-free-music-177761.mp3';
import tokyo from './assets/music/tokyo-cooffe.mp3';
import notWhat from './assets/music/ozee-not-what-i-need-royalty-free-music-164888.mp3';
import AudioPlayer from './components/AudioPlayer';
import Header from './components/Header';

export interface music {
  id: number;
  src: string;
  name: string;
}

const listOfMusic = [
  {
    id: 0,
    src: mansur,
    name: 'Mansur',
  },
  {
    id: 1,
    src: yourHear,
    name: 'Your Hear',
  },
  {
    id: 2,
    src: tokyo,
    name: 'Tokyo Coffee',
  },
  {
    id: 3,
    src: notWhat,
    name: 'Not What I Need',
  },
];

function App() {
  const [activeMusic, setActiveMusic] = React.useState(listOfMusic[0]);

  function handleTradeMusic(music: music) {
    setActiveMusic(music);
  }

  function setNextMusic(musicId: number) {
    if (musicId < 0) return;
    if (musicId >= listOfMusic.length) {
      setActiveMusic(listOfMusic[0]);
      return;
    }
    setActiveMusic(listOfMusic[musicId]);
  }

  return (
    <>
      <Header
        handleTradeMusic={handleTradeMusic}
        listOfMusic={listOfMusic}
        activeMusic={activeMusic}
      />
      <AudioPlayer activeMusic={activeMusic} setNextMusic={setNextMusic} />
    </>
  );
}

export default App;
