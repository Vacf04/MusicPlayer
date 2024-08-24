import React from 'react';
import styles from './Header.module.css';
import { music } from '../App';

const Header = ({
  listOfMusic,
  handleTradeMusic,
  activeMusic,
}: {
  listOfMusic: music[];
  handleTradeMusic: (music: music) => void;
  activeMusic: music;
}) => {
  const [activeMenu, setActiveMenu] = React.useState(true);

  return (
    <header className={`${styles.header} container`}>
      <span className={styles.logo}>MusicPlayer</span>
      <nav>
        <button
          className={styles.musicsButton}
          onClick={() => setActiveMenu(!activeMenu)}
        >
          Songs
        </button>
        <ul
          className={activeMenu ? styles.musicsMenu : styles.musicsMenuActive}
        >
          {listOfMusic.map((music) => (
            <li
              key={music.id}
              onClick={() => {
                setActiveMenu(!activeMenu);
                handleTradeMusic(music);
              }}
              className={activeMusic === music ? `activeMusic` : ''}
            >
              {music.name}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
