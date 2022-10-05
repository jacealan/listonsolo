import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';

function App() {
  const [playNumber, setPlayNumber] = useState(0)
  const [playUrl, setPlayUrl] = useState()
  const [inputUrl, setInputUrl] = useState('')
  const [checkUrl, setCheckUrl] = useState('')
  const listBox = [
    {idx: 0, title: '킬링보이스 BEST', description: '킬링보이스 Nice', username: 'jace'},
  ]
  const playList = [
    {title: 'SMILEY (YENA)', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/y9kkXTucnLU' , thumbnail: 'https://i.ytimg.com/vi/y9kkXTucnLU/hqdefault.jpg'},
    {title: '멜로망스 킬링보이스', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/hn4XiirKdNE', thumbnail: 'https://i.ytimg.com/vi/hn4XiirKdNE/hqdefault.jpg'},
    {title: '치즈 킬링보이스', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/fyDz91HDt4g', thumbnail: 'https://i.ytimg.com/vi/fyDz91HDt4g/hqdefault.jpg'},
    {title: '태연 킬링보이스', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/5ch94AaPZRQ', thumbnail: 'https://i.ytimg.com/vi/5ch94AaPZRQ/hqdefault.jpg'},
    {title: '나윤권 킬링보이스', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/4w3p3ef2ydQ', thumbnail: 'https://i.ytimg.com/vi/4w3p3ef2ydQ/hqdefault.jpg'},
    {title: '벤 킬링보이스', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/4bwRyeT1afM', thumbnail: 'https://i.ytimg.com/vi/4bwRyeT1afM/hqdefault.jpg'},
  ]

  const [inputUrlInfo, setInputUrlInfo] = useState('')
  const getUrlInfo = async (url) => {
    const response = await fetch(`https://noembed.com/embed?dataType=json&url=${url}`)
                      .then((response) => response.json());
    let urlInfo = []
    Object.keys(response).map((key, index) => {
      console.log(key, response[key])
      urlInfo.push(`${key} : ${response[key]}`)
  })
    
    setInputUrlInfo(urlInfo)
  }

  const [windowSize, setWindowSize] = useState({x: 960, y: 960})
  const changeSizeTotal = () => {
    const x960 = window.innerWidth < 960 ? window.innerWidth : 960
    setWindowSize({
      x: x960,
      y: window.innerHeight,
      xPlay: x960,
      yPlay: parseInt(x960 / 2),
      xHalf: parseInt(x960 / 2),
    })
  }
  useEffect(() => {
    changeSizeTotal()
    window.addEventListener('resize', changeSizeTotal);
    window.addEventListener('orientationchange', changeSizeTotal);
  }, [])
  
  return (
    <div className="App">
      <div className="logo">
        <img id="logo-image" src="/logo.svg" width="20px"/> ListOn
      </div>
      <div className="list-info" title={listBox[0].description}>
        <div className="list-title"><img id="list-image" src="/list.svg" width="20px"/>&nbsp;{listBox[0].title}</div>
        <div className="list-author">&nbsp;-&nbsp;listed by @{listBox[0].username}</div>
      </div>
      
      <div className="play-window">
        <ReactPlayer
          url={playList[playNumber].url}
          onEnded={() => {setPlayNumber(prev => prev + 1)}}
          playing={true}
          controls="true"
          width={windowSize.xPlay} height={windowSize.yPlay} />
      </div>
      <div className="play-info">
        <div className="play-title"><img id="play-image" src="/play.svg" width="20px"/>&nbsp;{playList[playNumber].title}</div>
        <div className="play-author">[{playList[playNumber].provider}] {playList[playNumber].author}</div>
      </div>
      <div className="play-thumbnail">
        {playList.map(({title, author, provider, url, thumbnail}, index) => (
          <div>
            <img src={thumbnail} title={title} onClick={() => setPlayNumber(index)} width="90px" height="auto" />
          </div>
        ))}
      </div>

      <div className="add-list">
        <input type="text" placeholder="추가할 url을 입력하세요" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)}></input>
        <button onClick={() => {
          setCheckUrl(inputUrl);
          getUrlInfo(inputUrl);
          }}>Check</button>
        <ReactPlayer url={checkUrl} width="390px" height="195px" />
        <div>{inputUrlInfo ? inputUrlInfo.map((info, index) => (
          <div>{info}</div>
        )) : ""}</div>
      </div>

      <div classname="play-list">
        { playList.map(({title, author, provider, url, thumbnail}, index) => (
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
          margin-top: 10px;
          display: flex;
          align-items: center;
          font-weight: 1000;
        }
        #logo-image {
          margin-right: 5px;
        }

        .list-info {
          grid-area: 2 / 1 / 3 / 3;
          margin: 10px 0 0 0;
          padding: 10px;
          // border: solid 2px #555;
          border-radius: 10px 10px 0 0;
          background-color: #444;
        }
        .list-title {
          display: flex;
          align-items: center;
          font-size: 1.2rem;
          font-weight: 600;
        }
        .list-author {
          font-size: 0.7rem;
          transform: skew(160deg);
        }

        .play-window {
          grid-area: 3 / 1 / 4 / 3;
        }

        .play-info {
          grid-area: 4 / 1 / 5 / 3;
          margin-bottom: 10px;
          padding: 5px 10px;
          border-radius: 0 0 10px 10px;
          background-color: #444;
        }
        .play-title {
          display: flex;
          align-items: center;
        }
        .play-author {
          text-align: right;
          font-size: 0.7rem;
        }

        .play-thumbnail {
          grid-area: 5 / 1 / 6 / 3;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
        }
        .play-thumbnail div {
          filter: grayscale(1);
        }
        .play-thumbnail div:nth-child(${playNumber + 1}) {
          filter: grayscale(0);
        }

        .add-list {
          width: 100%;
          max-width: ${windowSize.xHalf}px;
          grid-area: 6 / 1 / 7 / 2;

          word-wrap: break-word;
        }

        .play-list {
          width: 100%;
          max-width: ${windowSize.xHalf}px;
          grid-area: 6 / 2 / 7 / 3;
        }
      `}</style>
    </div>
  );
}

export default App;
