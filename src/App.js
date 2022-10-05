import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';

function App() {
  const [playNumber, setPlayNumber] = useState(0)
  const [playUrl, setPlayUrl] = useState()
  const [inputUrl, setInputUrl] = useState('')
  const [checkUrl, setCheckUrl] = useState('')
  const listBox = [
    {idx: 0, title: '킬링보이스 BEST', description: '딩고 뮤직 킬링보이스', username: 'jace'},
  ]
  const playList = [
    {title: 'YENA (최예나) - SMILEY (Feat. BIBI) MV', author: 'Stone Music Entertainment', provider: 'YouTube', url: 'https://youtu.be/y9kkXTucnLU' , thumbnail: 'https://i.ytimg.com/vi/y9kkXTucnLU/hqdefault.jpg'},
    {title: '멜로망스(MeloMance)의 킬링보이스를 라이브로! - 인사, 동화, 입맞춤, You, 고백, 질투가좋아, 부끄럼, 선물, 짙어져, 좋은날, 욕심, 사랑인가봐, 축제, 초대', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/hn4XiirKdNE', thumbnail: 'https://i.ytimg.com/vi/hn4XiirKdNE/hqdefault.jpg'},
    {title: '치즈(CHEEZE)의 킬링보이스를 라이브로!- Madeleine Love, 어떻게 생각해, Mood Indigo, 빈칸에게, 퐁당, Perhaps Love, 좋아해 | 딩고뮤직', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/fyDz91HDt4g', thumbnail: 'https://i.ytimg.com/vi/fyDz91HDt4g/hqdefault.jpg'},
    {title: '태연(TAEYEON)의 킬링보이스를 라이브로! - I,그대라는 시,만약에,11:11,Blue,Time Lapse,Weekend,불티,사계,Gravity,INVU,너를 그리는 시간', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/5ch94AaPZRQ', thumbnail: 'https://i.ytimg.com/vi/5ch94AaPZRQ/hqdefault.jpg'},
    {title: '나윤권(Na Yoon Kwon)의 킬링보이스를 라이브로!-나였으면,기대,동감,애창곡,바람이좋은날,약한남자,뒷모습,멍청이,오늘이지나면,헤어져보자ㅣ딩고뮤직', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/4w3p3ef2ydQ', thumbnail: 'https://i.ytimg.com/vi/4w3p3ef2ydQ/hqdefault.jpg'},
    {title: '벤(BEN)의 킬링보이스를 라이브로! - 열애중,오늘은가지마,꿈처럼,갈수가없어,눈사람,헤어져줘서고마워,빈방, LoobyLoo,내목소리들리니,180도,혼술하고싶은밤,지금뭐해ㅣ딩고뮤직', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/4bwRyeT1afM', thumbnail: 'https://i.ytimg.com/vi/4bwRyeT1afM/hqdefault.jpg'},
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
        <div className="play-image"><img id="play-image" src="/play.svg" width="20px"/></div>
        <div>
          <div>{playList[playNumber].title}</div>
          <div className="play-author">[{playList[playNumber].provider}] {playList[playNumber].author}</div>
        </div>
      </div>
      <div className="play-thumbnail">
        {playList.map(({title, author, provider, url, thumbnail}, index) => (
          <div>
            <img src={thumbnail} title={title} onClick={() => setPlayNumber(index)} width="auto" height="64px" />
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

      <div className="play-list">
        { playList.map(({title, author, provider, url, thumbnail}, index) => (
          <div className="play-list-one">
            {/* <ReactPlayer url={url} width="180px" height="auto" /> */}
            <div className="play-list-one-image"><img src={thumbnail} width="100%" height="auto" /></div>
            <div className="play-list-one-info">
              <div className="play-list-one-info-title">{title}</div>
              <div className="play-list-one-info-author">[ {author} ]</div>
            </div>
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
          margin: 0 5px;
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
          display: grid;
          grid-template-columns: 27px 1fr;
        }
        .play-image {
          padding-top: 1px;
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
          margin-bottom: 30px;
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
        .play-list-one {
          display: grid;
          grid-template-columns: 1fr 3fr;
        }
        .play-list-one-image {
          margin-right: 10px;
        }
        .play-list-one-info {
          font-size: 0.8rem;
        }
        .play-list-one-info-title {
        }
        .play-list-one-info-author {
          font-size: 0.7rem;
          transform: skew(170deg);
        }
      `}</style>
    </div>
  );
}

export default App;
