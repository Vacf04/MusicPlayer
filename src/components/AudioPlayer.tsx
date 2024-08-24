import React from 'react';
import styles from './AudioPlayer.module.css';
import PlayIcon from '../assets/playIcon.svg?react';
import PauseIcon from '../assets/pauseIcon.svg?react';
import PrevIcon from '../assets/prevIcon.svg?react';
import NextIcon from '../assets/nextIcon.svg?react';
import VolumeIcon from '../assets/volumeIcon.svg?react';
import VolumeOffIcon from '../assets/volumeOffIcon.svg?react';
import Vynil from '../assets/vynilIcon.svg?react';
import { music } from '../App';

const AudioPlayer = ({
  activeMusic,
  setNextMusic,
}: {
  activeMusic: music;
  setNextMusic: (musicId: number) => void;
}) => {
  const [audioProgression, setAudioProgression] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const player = React.useRef<HTMLAudioElement>(null);
  const [totalDuration, setTotalDuration] = React.useState(0);
  const [tradeMusic, setTradeMusic] = React.useState(true);
  const [volume, setVolume] = React.useState(100);
  const [lastVolume, setLastVolume] = React.useState(100);

  function handleTimeUpdate() {
    if (player.current) {
      setAudioProgression(player.current.currentTime);
      if (
        Number(audioProgression.toFixed()) === Number(totalDuration.toFixed())
      ) {
        setTradeMusic(true);
        if (tradeMusic) {
          setNextMusic(activeMusic.id + 1);
          setTradeMusic(false);
        }
      }
    }
  }

  function convertSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds
      .toFixed()
      .toString()
      .padStart(2, '0')}`;
  }

  function handleTimeChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (player.current) player.current.currentTime = Number(event.target.value);
  }

  function handleLoaded() {
    if (player.current) setTotalDuration(player.current.duration);
  }

  function handleVolume(newVolume: number) {
    setLastVolume(volume);
    setVolume(newVolume);
  }

  React.useEffect(() => {
    if (player.current) player.current.volume = volume / 100;
  }, [volume]);

  return (
    <section className="container">
      <div className={styles.albumPic}>
        <Vynil className={styles.vynil} />
      </div>
      <p className={styles.musicName}>{activeMusic.name}</p>
      <div className={styles.audioInfo}>
        <p>{convertSeconds(audioProgression)}</p>
        <input
          type="range"
          min={0}
          max={totalDuration}
          value={audioProgression}
          onChange={handleTimeChange}
          style={
            {
              '--timing': `${(audioProgression / totalDuration) * 100}%`,
            } as React.CSSProperties
          }
          className={styles.audioDurationRange}
        />
        <audio
          src={activeMusic.src}
          ref={player}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onLoadedMetadata={handleLoaded}
          autoPlay
        ></audio>
        <p>{convertSeconds(totalDuration)}</p>
      </div>
      <div className={styles.controls}>
        <button
          className={styles.playerIconHandler}
          onClick={() => setNextMusic(activeMusic.id - 1)}
        >
          <PrevIcon className={styles.playerIcon} />
        </button>
        <button
          onClick={() =>
            playing ? player.current?.pause() : player.current?.play()
          }
          className={styles.playerIconHandler}
        >
          {playing ? (
            <PauseIcon className={styles.playerIcon} />
          ) : (
            <PlayIcon className={styles.playerIcon} />
          )}
        </button>
        <button
          className={styles.playerIconHandler}
          onClick={() => setNextMusic(activeMusic.id + 1)}
        >
          <NextIcon className={styles.playerIcon} />
        </button>
        <div className={styles.volumeControl}>
          {volume <= 0 ? (
            <VolumeOffIcon
              className={styles.playerIcon}
              onClick={() => handleVolume(lastVolume)}
            />
          ) : (
            <VolumeIcon
              className={styles.playerIcon}
              onClick={() => handleVolume(0)}
            />
          )}
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => handleVolume(Number(e.target.value))}
            className={styles.volumeRange}
            style={
              {
                '--timing': `${volume}%`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;
