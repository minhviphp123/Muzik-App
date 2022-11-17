import { useState } from 'react';
import { ImShuffle } from 'react-icons/im';
import { VscArrowSwap, VscDebugRestart } from 'react-icons/vsc';
import './App.css';
import { SongsData } from './assets/Songs/song';
import Song from './Comps/ListSong';
import { Playing } from './Comps/Playing';
import { Songs } from './Context';

function App() {
  const [song, setSong] = useState();
  const [songName, setSongName] = useState();
  const [songAuthor, setSongAuthor] = useState();
  const [songImg, setSongImg] = useState();
  const [isPlaySong, setIsPlaySong] = useState(false);
  const [songId, setSongId] = useState();
  const [iconId, seticonId] = useState(0);

  function prop(song) {
    setSong(song.url);
    setSongName(song.name);
    setSongAuthor(song.author);
    setSongImg(song.links.images[0].url);
    setIsPlaySong(true);
    setSongId(song.id);
  }

  function pause() {
    setIsPlaySong(false);
    // next();
  }

  function play() {
    setIsPlaySong(true);
  }

  function previous() {
    let findedSong = SongsData.find(song => song.id === songId - 1);
    setSong(findedSong.url);
    setSongName(findedSong.name);
    setSongAuthor(findedSong.author);
    setSongImg(findedSong.links.images[0].url);
    setSongId(findedSong.id);
  }

  function next() {
    let findedSong = SongsData.find(song => song.id === songId + 1);
    setSong(findedSong.url);
    setSongName(findedSong.name);
    setSongAuthor(findedSong.author);
    setSongImg(findedSong.links.images[0].url);
    setSongId(findedSong.id);
  }

  // function loop() {
  //   // let findedSong = SongsData.find(song => song.id === songId);
  //   // setSong(findedSong.url);
  //   // setSongName(findedSong.name);
  //   // setSongAuthor(findedSong.author);
  //   // setSongImg(findedSong.links.images[0].url);
  //   // setSongId(findedSong.id);
  //   document.querySelector('.AudioPlayer').loop = { true};
  // }

  function shuffle() {
    let randId = Math.floor(Math.random() * SongsData.length - 1);
    if (randId !== songId) {
      let findedSong = SongsData.find(song => song.id === randId);
      setSong(findedSong.url);
      setSongName(findedSong.name);
      setSongAuthor(findedSong.author);
      setSongImg(findedSong.links.images[0].url);
      setSongId(findedSong.id);
    }
  }

  function changeMode() {
    if (iconId < 2) {
      seticonId(iconId + 1);
    } else {
      seticonId(0)
    }
  }

  return (
    < div className='muzikApp' >
      <Songs.Provider value={SongsData}>
        <div className="header">
          <h2 className='first'>{songName ? songName : 'Plz pick one'}</h2>
          <h3 className='song'>{songAuthor ? songAuthor : 'Plz pick one'}</h3>
        </div>

        <div className="body">
          <div className="img">
            {songImg ? (isPlaySong ? <img src={songImg} alt="" className='twirl' /> :
              <img src={songImg} alt="" className={!isPlaySong ? 'back' : ''} />) : <img src='https://cdn.quotesgram.com/img/0/28/2126851481-ac5c5c269b1a79c5d13bf630e5f690df.jpg' alt="" />}
          </div>

          <div className='play'>

            {/* <div className='stream'>
              <div className='range'></div>
            </div> */}

            {/* <div class="player__volume">
              <i class="bx bxs-volume-full"></i>
              <input type="range" min="0" max="1" step="0.05" value={volume} onChange={() => onChangeVolume()} />
            </div> */}

          </div>

        </div>

        <div className="songs">
          <Song props={prop} />
        </div>

        {iconId === 0 && <Playing song={song} pause={pause} play={play}
          previous={previous} next={next}
          end={next}
        />}

        {iconId === 1 && <Playing song={song} pause={pause} play={play}
          previous={previous} next={next}
        // end={loop}
        />}

        {iconId === 2 && <Playing song={song} pause={pause} play={play}
          previous={previous} next={next}
          end={shuffle}
        />}
        {iconId === 0 && <VscArrowSwap className='shuff' onClick={changeMode} />}
        {iconId === 1 && <VscDebugRestart className='shuff' onClick={changeMode} />}
        {iconId === 2 && <ImShuffle className='shuff' onClick={changeMode} />}
      </Songs.Provider>
    </div >
  );
}

export default App;




