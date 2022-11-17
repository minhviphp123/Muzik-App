import { useContext, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { ImDownload3 } from 'react-icons/im';
import { Songs } from '../Context';

export default function Song(props) {

    const subData = useContext(Songs);

    const [SongsData, setSongsData] = useState(useContext(Songs));
    const [isChange1, setIsChange1] = useState(false);
    const [isChange2, setIsChange2] = useState(false);

    const [valueIP, setValueIP] = useState('');

    // const [song, setSong] = useState();

    function transSong(data) {
        let song = data;
        props.props(song);
    }

    function sortAZ() {
        //Comparer Function    
        function GetSortOrder(prop) {
            return function (a, b) {
                if (a[prop] > b[prop]) {
                    return 1;
                } else if (a[prop] < b[prop]) {
                    return -1;
                }
                return 0;
            }
        }
        SongsData.sort(GetSortOrder("name"));
        setIsChange1(true);
        setIsChange2(!isChange2);

    }

    function sortZA() {
        //Comparer Function    
        function GetSortOrder(prop) {
            return function (a, b) {
                if (a[prop] < b[prop]) {
                    return 1;
                } else if (a[prop] > b[prop]) {
                    return -1;
                }
                return 0;
            }
        }
        SongsData.sort(GetSortOrder("name"));
        setIsChange2(true);
        setIsChange1(!isChange1);
    }

    function search(e) {
        let copy = subData;
        setValueIP(e.target.value);
        function checkDup(song) {
            return (song.name.toLowerCase()).includes(e.target.value);
        }
        const findedSong = copy.filter(checkDup);
        setSongsData(findedSong);

        if (e.target.value == '') {
            setSongsData(subData);
        }
    }

    return (
        <div className='songsCont'>

            <div className='search'>
                <input type="text" placeholder='Search' onChange={search} value={valueIP} />
            </div>

            <div className='sort'>
                <button onClick={sortAZ}>Sort az</button>
                <button onClick={sortZA}>Sort za</button>
            </div>
            {SongsData && SongsData.length > 0 &&
                SongsData.map((song, index) => (
                    <div className="songItem" onClick={() => transSong(song)}>
                        <div className='imgAndInfo'>
                            <img src={song.links.images[0].url} alt="" className='songImg' />
                            <div className='songInfo'>
                                <div className="name">{song.name}</div>
                                <div className='author'>{song.author}</div>
                            </div>
                            <div className='download'>
                                <a href={song.url}>
                                    <ImDownload3 />
                                </a>
                            </div>
                        </div>
                        <div className='threedot'>
                            <HiDotsHorizontal />
                        </div>
                    </div>
                ))
            }

            {SongsData && SongsData.length > 0 && isChange1 &&
                SongsData.map((song, index) => (
                    <div className="songItem" onClick={() => transSong(song)}>
                        <div className='imgAndInfo'>
                            <img src={song.links.images[0].url} alt="" className='songImg' />
                            <div className='songInfo'>
                                <div className="name">{song.name}</div>
                                <div className='author'>{song.author}</div>
                            </div>
                            <div className='download'>
                                <a href={song.url}>
                                    <ImDownload3 />
                                </a>
                            </div>
                        </div>
                        <div className='threedot'>
                            <HiDotsHorizontal />
                        </div>
                    </div>
                ))
            }

            {SongsData && SongsData.length > 0 && isChange2 &&
                SongsData.map((song, index) => (
                    <div className="songItem" onClick={() => transSong(song)}>
                        <div className='imgAndInfo'>
                            <img src={song.links.images[0].url} alt="" className='songImg' />
                            <div className='songInfo'>
                                <div className="name">{song.name}</div>
                                <div className='author'>{song.author}</div>
                            </div>
                            <div className='download'>
                                <a href={song.url}>
                                    <ImDownload3 />
                                </a>
                            </div>
                        </div>
                        <div className='threedot'>
                            <HiDotsHorizontal />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
