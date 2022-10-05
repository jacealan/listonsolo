import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';

function App() {
  const [playNumber, setPlayNumber] = useState(0)
  const [playUrl, setPlayUrl] = useState()
  const [inputUrl, setInputUrl] = useState('')
  const [checkUrl, setCheckUrl] = useState('')
  const playList = [
    {title: 'SMILEY (YENA)', url: 'https://youtu.be/y9kkXTucnLU' , thumbnail: 'https://post-phinf.pstatic.net/MjAyMjAyMDNfMTYw/MDAxNjQzODc1NDk2MTky.XteY0kIZsZB8XdxeFpTYKQ9gifOl8NWtbLrJuljTaXYg.aSxLxeWydcmunBHfbdDLDGON-szCtMr9rPDbVLQNiR0g.JPEG/127A3662.jpg'},
    {title: '멜로망스 킬링보이스', url: 'https://youtu.be/hn4XiirKdNE', thumbnail: ''},
    {title: '치즈 킬링보이스', url: 'https://youtu.be/fyDz91HDt4g', thumbnail: 'https://i.ytimg.com/vi/fyDz91HDt4g/hqdefault.jpg'},
    {title: '태연 킬링보이스', url: 'https://youtu.be/5ch94AaPZRQ', thumbnail: ''},
    {title: '나윤권 킬링보이스', url: 'https://youtu.be/4w3p3ef2ydQ', thumbnail: ''},
    {title: '벤 킬링보이스', url: 'https://youtu.be/4bwRyeT1afM', thumbnail: ''},
  ]

  const [inputUrlInfo, setInputUrlInfo] = useState('')
  const getUrlInfo = async (url) => {
    const response = await fetch(`https://noembed.com/embed?dataType=json&url=${url}`)
                      .then((response) => response.json());
    setInputUrlInfo(response)
  }
  // useEffect(() => {
  //   getUrlInfo('https://youtu.be/fyDz91HDt4g')
  // }, [])
  
  return (
    <div className="App">
      <div className="logo">ListOn</div>
      <div className="list-title">the Playlist</div>
      
      <div className="play-window">
        <ReactPlayer url={playList[0].url} controls="true" width="960px" height="480px" />
      </div>
      <div className="play-info">
        {playList[0].title}
      </div>

      <div className="add-list">
        <input type="text" placeholder="추가할 url을 입력하세요" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)}></input>
        <button onClick={() => {
          setCheckUrl(inputUrl);
          getUrlInfo(inputUrl);
          }}>Check</button>
        <ReactPlayer url={checkUrl} width="390px" height="195px" />
        <div>{inputUrlInfo ? JSON.stringify(inputUrlInfo) : ""}</div>
      </div>

      <div classname="play-list">
        { playList.map(({title, url, thumbnail}, index) => (
          <div>
            <ReactPlayer url={url} width="180px" height="auto" />
            <img src={thumbnail} width="160px" height="auto" />
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
          // grid-template-rows: 
          gap: 10px;
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
          width: 100%;
          max-width: 390px;
          grid-area: 5 / 1 / 6 / 2;
          
          word-wrap: break-word;
        }

        .play-list {
          width: 100%;
          max-width: 390px;
          grid-area: 5 / 2 / 6 / 3;
        }
      `}</style>
    </div>
  );
}

export default App;
