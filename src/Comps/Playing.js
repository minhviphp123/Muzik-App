import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

export const Playing = (props) => {

    return (
        <AudioPlayer
            autoPlay
            src={props.song}
            onPause={props.pause}
            onPlay={props.play}
            showSkipControls={true}
            onClickNext={props.next}
            onClickPrevious={props.previous}
            onEnded={props.end}
            customAdditionalControls={[]}
            loop={true}
            className='AudioPlayer'

        // other props here
        />
    )
}