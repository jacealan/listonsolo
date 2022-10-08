import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';

function App() {
  const [editMode, setEditMode] = useState(false)
  const [playNumber, setPlayNumber] = useState(0)
  const [playUrl, setPlayUrl] = useState()
  const [inputUrl, setInputUrl] = useState('')
  const [checkUrl, setCheckUrl] = useState('')
  const onChangeInputUrl = (e) => setInputUrl(e.target.value)
  
  const listBox = [
    {idx: 0, title: 'BEST LIST', description: '딩고 뮤직 킬링보이스 & ...', username: 'jace'},
  ]
  const playListTemplate = [
    // {title: 'YENA (최예나) - SMILEY (Feat. BIBI) MV', author: 'Stone Music Entertainment', provider: 'YouTube', url: 'https://youtu.be/y9kkXTucnLU' , thumbnail: 'https://i.ytimg.com/vi/y9kkXTucnLU/hqdefault.jpg'},
    {title: '멜로망스(MeloMance)의 킬링보이스를 라이브로! - 인사, 동화, 입맞춤, You, 고백, 질투가좋아, 부끄럼, 선물, 짙어져, 좋은날, 욕심, 사랑인가봐, 축제, 초대', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/hn4XiirKdNE', thumbnail: 'https://i.ytimg.com/vi/hn4XiirKdNE/hqdefault.jpg'},
    {title: '치즈(CHEEZE)의 킬링보이스를 라이브로!- Madeleine Love, 어떻게 생각해, Mood Indigo, 빈칸에게, 퐁당, Perhaps Love, 좋아해 | 딩고뮤직', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/fyDz91HDt4g', thumbnail: 'https://i.ytimg.com/vi/fyDz91HDt4g/hqdefault.jpg'},
    {title: '태연(TAEYEON)의 킬링보이스를 라이브로! - I,그대라는 시,만약에,11:11,Blue,Time Lapse,Weekend,불티,사계,Gravity,INVU,너를 그리는 시간', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/5ch94AaPZRQ', thumbnail: 'https://i.ytimg.com/vi/5ch94AaPZRQ/hqdefault.jpg'},
    {title: '나윤권(Na Yoon Kwon)의 킬링보이스를 라이브로!-나였으면,기대,동감,애창곡,바람이좋은날,약한남자,뒷모습,멍청이,오늘이지나면,헤어져보자ㅣ딩고뮤직', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/4w3p3ef2ydQ', thumbnail: 'https://i.ytimg.com/vi/4w3p3ef2ydQ/hqdefault.jpg'},
    {title: '벤(BEN)의 킬링보이스를 라이브로! - 열애중,오늘은가지마,꿈처럼,갈수가없어,눈사람,헤어져줘서고마워,빈방, LoobyLoo,내목소리들리니,180도,혼술하고싶은밤,지금뭐해ㅣ딩고뮤직', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/4bwRyeT1afM', thumbnail: 'https://i.ytimg.com/vi/4bwRyeT1afM/hqdefault.jpg'},
    {title: '권진아 (KwonJinAh)의 킬링보이스를 라이브로! - 끝, Lonely Night, Fly Away, 씨스루,여기까지,KNOCK, 위로,운이좋았지,뭔가잘못됐어, 여행가ㅣ딩고뮤직', author: '딩고 뮤직 / dingo music', provider: 'YouTube', url: 'https://youtu.be/5ePKBm4spBg', thumbnail: 'https://i.ytimg.com/vi/5ePKBm4spBg/hqdefault.jpg'},
  ]
  const [playList, setPlayList] = useState(
    window.localStorage.getItem('liston') !== null
    ? JSON.parse(window.localStorage.getItem('liston'))
    : playListTemplate
  )
  // useEffect(() => {setPlayList(prev => prev)}, [playList])
  // const playListTemp = playList
  const [playListEditIndex, setPlayListEditIndex] = useState(null)

  const [inputUrlInfo, setInputUrlInfo] = useState('')
  const getUrlInfo = async (url) => {
    const response = await fetch(`https://noembed.com/embed?dataType=json&url=${url}`)
                      .then((response) => response.json());
    // console.log(response)
    setInputUrlInfo(response)
    // let urlInfo = {}
    // Object.keys(response).map((key, index) => {
    //   console.log(key, response[key])
    //   // urlInfo[key] = ${response[key]}`)
    // })
  }

  const checkTitle = useRef();
  const checkAuthor = useRef();
  useEffect(() => {
    checkTitle.current.style.height = 'auto'
    checkTitle.current.style.height = `${checkTitle.current.scrollHeight}px`
    checkAuthor.current.style.height = 'auto'
    checkAuthor.current.style.height = `${checkAuthor.current.scrollHeight}px`
  }, [inputUrlInfo])

  const [windowSize, setWindowSize] = useState({x: 960, y: 960})
  const changeSizeTotal = () => {
    const x960 = document.documentElement.clientWidth < 960 ? document.documentElement.clientWidth : 960
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
        <img id="logo-image" src="/logo.svg" width="20px" /> ListOn
      </div>

      <div className="list-info">
        <div title={listBox[0].description}>
          <div className="list-title"><img id="list-image" src="/list.svg" width="20px"/>&nbsp;{listBox[0].title}</div>
          <div className="list-author">&nbsp;-&nbsp;listed by @{listBox[0].username}</div>
        </div>
        <div className="list-edit" title="Edit List" onClick={() => setEditMode((prev => !prev))}>
          <img id="edit-list-image" src="/edit-list.svg" width="20px" />
        </div>
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

      <div className="add-check">
        <div className="add-check-title">ADD</div>
        <div className="add-check-pastecheck">
          <div className="paste-image">
            <img id="paste-image" src="/paste.svg" width="20px" onClick={() => {
              navigator.clipboard.readText().then(clipboardText => setInputUrl(clipboardText));   
            }} />
          </div>
          {/* <button onClick={() => {
            navigator.clipboard.readText().then(clipboardText => setInputUrl(clipboardText));            
          }}>Paste</button> */}
          <div>
            <input type="text"
              placeholder="추가할 영상 url을 입력하세요."
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value)
                }}
            />
          </div>
          <div className="check-image">
            <img id="check-image" src="/check.svg" width="20px" onClick={() => {
              setCheckUrl(inputUrl);
              getUrlInfo(inputUrl);
            }} />
          </div>
          {/* <button onClick={() => {
            setCheckUrl(inputUrl);
            getUrlInfo(inputUrl);
            }}>Check</button> */}
        </div>
        <div className="add-checked">
          <div className="add-check-play">
            <ReactPlayer url={checkUrl} width={`${windowSize.xHalf - 15}px`} height={`${(windowSize.xHalf - 15) / 2}px`} />
            <div className="add-check-play-notice">외부 플레이가 제한된 영상도 있습니다.</div>
          </div>
          <div className="add-template">
            <div className="add-template-image"><img src={inputUrlInfo.thumbnail_url} width="100%" height="auto" /></div>
            <div className="add-template-info">
              <div className="add-template-info-title">{inputUrlInfo.title}</div>
              <div className="add-template-info-author">[ {inputUrlInfo.author_name} ]</div>
            </div>
          </div>
          <div className="add-check-edit">
            <div>
              <div className="label">TITLE</div>
              <textarea ref={checkTitle} value={inputUrlInfo.title} rows={1}
                onChange={(e) => {
                  const temp = inputUrlInfo
                  temp.title = e.target.value
                  setInputUrlInfo(JSON.parse(JSON.stringify(temp)))
                }} />
              <div className="label">AUTHOR</div>
              <textarea ref={checkAuthor} value={inputUrlInfo.author_name} rows={1}
                onChange={(e) => {
                  const temp = inputUrlInfo
                  temp.author_name = e.target.value
                  setInputUrlInfo(JSON.parse(JSON.stringify(temp)))
                }} />
            </div>
            <div className="add-check-edit-button">
              <div>
                <img id="add-image" src="/add.svg" width="20px"
                  onClick={() => {
                    console.log(playListEditIndex)
                    if (playListEditIndex !== null) {
                      playList[playListEditIndex] = {title: inputUrlInfo.title, author: inputUrlInfo.author_name, provider: inputUrlInfo.provider_name, url: inputUrlInfo.url, thumbnail: inputUrlInfo.thumbnail_url}
                      setPlayList(playList.slice())
                      setPlayListEditIndex(null)
                    } else {
                      playList.push({title: inputUrlInfo.title, author: inputUrlInfo.author_name, provider: inputUrlInfo.provider_name, url: inputUrlInfo.url, thumbnail: inputUrlInfo.thumbnail_url})
                      setPlayList(playList.slice())
                    }
                  }} />
              </div>
              <div>LIST로</div>
            </div>
          </div>
        </div>
      </div>

      <div className="play-list">
        <div className="play-list-title">
          <div>LIST</div>
          <div>
            <img id="save-image" src="/save.svg" width="20px"
              onClick={() => {window.localStorage.setItem('liston', JSON.stringify(playList));}} />
          </div>
        </div>
        { playList.map(({title, author, provider, url, thumbnail}, index) => (
          <div className="play-list-one">
            <div className="upNdown">
              <div>
                <img id="up-image" src="/up.svg" width="14px"
                  onClick={() => {
                    if (index !== 0) {
                      const temp = playList[index - 1];
                      playList[index - 1] = playList[index];
                      playList[index] = temp;
                      setPlayList(playList.slice())
                    }
                  }} />
              </div>
              <div>                
                <img id="down-image" src="/down.svg" width="14px"
                  onClick={() => {
                    console.log(index, playList.length)
                    if (index !== playList.length - 1) {
                      const temp = playList[index + 1];
                      playList[index + 1] = playList[index];
                      playList[index] = temp;
                      setPlayList(playList.slice())
                    }
                  }} />
              </div>
            </div>
            <div className="play-list-one-image"><img src={thumbnail} width="100%" height="auto" /></div>
            <div className="play-list-one-info">
              <div className="play-list-one-info-title">{title}</div>
              <div className="play-list-one-info-author">[ {author} ]</div>
            </div>
            <div className="deleteNedit">
              <div>
                <img id="delete-image" src="/delete.svg" width="14px"
                  onClick={() => {
                    playList.splice(index, 1)
                    setPlayList(playList.slice())
                  }} />
              </div>
              <div>                
                <img id="edit-image" src="/edit.svg" width="14px"
                  onClick={async () => {
                    setInputUrl(url)
                    setCheckUrl(url)
                    await getUrlInfo(url)
                    setPlayListEditIndex(index)
                    inputUrlInfo.title = title
                    inputUrlInfo.author_name = author
                    inputUrlInfo.provider_name = provider
                    inputUrlInfo.url = url
                    inputUrlInfo.thumbnail_url = thumbnail
                    setInputUrlInfo(JSON.parse(JSON.stringify(inputUrlInfo)))
                  }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <footer>
        <div className="supported">
          Fully Supported Media: YouTube, Facebook, SoundClound, Vimeo<br />
          Supported Media: Treamable, Vidme, Wistia, Twitch, DailyMotion, Vidyard
        </div>
        <div className="copyright">Copyright. Jace</div>
      </footer>

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
          display: grid;
          grid-template-columns: 1fr 20px;
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
        .list-edit {
          display: flex;
          justify-content: center;
          align-items: center;          
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
          padding-right: 10px;
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

        .add-check {
          ${editMode ? "display: block;" : "display: none;"}
          width: calc(100% - 15px);
          max-width: ${windowSize.xHalf}px;
          margin-right: 5px;
          border-radius: 5px;
          padding: 5px;
          background-color: #444;
          grid-area: 6 / 1 / 7 / 2;
          word-wrap: break-word;
        }
        .add-check-pastecheck {
          display: grid;
          grid-template-columns: 24px 1fr 24px;
          justify-content: space-between;
          align-items: center;
        }
        input {
          width: ${windowSize.xHalf - 85}px;
          margin: 0 3px;
          border: solid 1px #aaa;
          border-radius: 5px;
          padding: 5px;
          outline: none;
          background-color: #444;
          color: #aaa;
        }
        button {          
          width: 60px;
          border: none;
          border-radius: 5px;
          padding: 5px;
          background-color: #aaa;
          color: #444;
        }
        .paste-image, .check-image {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .add-checked {
          display: ${inputUrlInfo !== '' ? "block" : "none"};'
        }
        .add-check-play-notice {
          margin-top: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.7rem;
          color: #777;
        }
        .add-check-title {
          padding: 5px;
          background-color: #444;
          font-weight: 600;
        }
        .add-check-play {
          margin-top: 10px;
          border-top: solid #777 1px;
          padding-top: 10px;
        }
        .add-template {
          margin-top: 10px;
          border-top: solid #777 1px;
          padding-top: 10px;
          display: grid;
          grid-template-columns: 1fr 3fr;
        }
        .add-template-image {
          margin-right: 10px;
        }
        .add-template-info {  
          font-size: 0.8rem;
        }
        .add-template-info-title {
          word-break: break-all;
        }
        .add-template-info-author {
          padding-right: 10px;
          font-size: 0.7rem;
          transform: skew(170deg);
          text-align: right;
          word-break: break-all;
        }
        .add-check-edit {
          margin-top: 5px;
          border-top: solid #777 1px;
          padding-top: 5px;
          display: grid;
          grid-template-columns: 1fr 40px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        textarea {
          overflow: hidden;
          width: calc(100% - 10px);
          border-radius: 5px;
          outline: none;
          padding: 5px 5px 0 5px;
          background-color: #444;
          color: #ddd;
        }
        .add-check-edit-button {
          margin: 5px;
          border-radius: 5px;
          // background-color: #555;
          font-size: 0.6rem;
          font-weight: 400;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .play-list {
          ${editMode ? "display: block;" : "display: none;"}
          width: calc(100% - 15px);
          max-width: ${windowSize.xHalf}px;
          margin-left: 5px;
          border-radius: 5px;
          padding: 5px;
          background-color: #444;
          grid-area: 6 / 2 / 7 / 3;
        }
        .play-list-title {
          padding: 5px;
          background-color: #444;
          font-weight: 600;
          display: grid;
          grid-template-columns: 1fr 20px;
        }
        .play-list-one {
          margin-top: 4px;
          border-top: solid #777 1px;
          padding-top: 6px;
          display: grid;
          grid-template-columns: 20px 1fr 3fr 20px;
        }
        .upNdown {
          margin: 5px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
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
          padding-right: 10px;
          font-size: 0.7rem;
          transform: skew(170deg);
          text-align: right;
        }
        .deleteNedit {
          margin: 5px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        footer {
          margin-top: 20px;
          border-top: solid #555 1px;
          padding: 10px;
          grid-column: 1 / 3;
          display: flex;
          justify-content: between-around;
          color: #777;
        }
        .supported {
          width: 100%;
          font-size: 0.8rem;
        }
        .copyright {
          width: 100px;
          display: flex;
          justify-content: flex-end;
          // align-items: flex-end;
          // text-align: right;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}

export default App;
