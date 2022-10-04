import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';

function App() {
  const [playUrl, setPlayUrl] = useState()
  const playList = [
    {title: '멜로망스 킬링보이스', url: 'https://youtu.be/hn4XiirKdNE'},
    {title: '치즈 킬링보이스', url: 'https://youtu.be/fyDz91HDt4g'},
    {title: '태연 킬링보이스', url: 'https://youtu.be/5ch94AaPZRQ'},
    {title: '나윤권 킬링보이스', url: 'https://youtu.be/4w3p3ef2ydQ'},
    {title: '벤 킬링보이스', url: 'https://youtu.be/4bwRyeT1afM'},
  ]

  const [info, setInfo] = useState({})
  const getInfo = async (url) => {
    const response = await fetch(`https://noembed.com/embed?dataType=json&url=${url}`)
                      .then((response) => response.json());
    setInfo(response)
  }
  useEffect(() => {
    getInfo('https://youtu.be/fyDz91HDt4g')
  }, [])
  
  return (
    <div className="App">
      <div className="logo">ListOn</div>
      <div className="list-title">the Playlist</div>
      
      <div className="play-window">
        <ReactPlayer url='https://youtu.be/5ch94AaPZRQ' width="960px" height="480px" />        
      </div>
      <div className="play-info">
        {info.title}
      </div>

      <div className="add-list">

      </div>

      <div classname="play-list">
        { playList.map(({title, url}, index) => (
          <div>
            <ReactPlayer url={url} width="180px" height="auto" />
            {index} {title} {url}
          </div>
        ))}
      </div>
      <style jsx>{`
        .App {
          width: 100vw;
          max-width: 960px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 
        }

        .logo {
          grid-area: 1 / 1 / 2 / 3;
        }

        .list-title {          
          grid-area: 2 / 1 / 3 / 3;
        }

        .play-window {
          grid-area: 3 / 1 / 4 / 3;
        }

        .play-info {
          grid-area: 4 / 1 / 5 / 3;

        }
        .add-list {
          grid-area: 5 / 1 / 6 / 2;
        }

        .play-list {
          grid-area: 5 / 2 / 6 / 3;
        }
      `}</style>
    </div>
  );
}

export default App;
