import { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components'
import ReactPlayer from 'react-player/lazy';

import { CollectionPlayFill, Check2Square } from '@styled-icons/bootstrap'
import { ArrowRepeatAllOff, ArrowRepeatAll } from '@styled-icons/fluentui-system-regular'
import { MoviePlay, ChevronUpCircle, ChevronDownCircle, Edit } from '@styled-icons/boxicons-solid'
import { TextBulletListSquareEdit, CopyArrowRight } from '@styled-icons/fluentui-system-filled'
import { PlaylistAddCheck, DeleteForever } from '@styled-icons/material-rounded'
import { FileMark } from '@styled-icons/remix-line'
import { InsertRowTop, InsertRowBottom } from '@styled-icons/remix-editor'
import { Youtube, Vimeo, Soundcloud, Facebook } from '@styled-icons/fa-brands'

//////////
// Themes
const themes = [
  {white: '#bbb', gray: '#444', black: '#222'}
]
const theme = themes[0]

//////////
// DIV Flex
const Flex = styled.div`
  margin: ${props => props.margin};
  grid-area: ${props => props.gridArea};
  display: flex;
  align-items: center;
  ${props => props.spaceBetween && css`
    justify-content: space-between;
  `}  
  ${props => props.button && css`
    cursor: pointer;
  `}
  ${props => props.fontSize && css`
    font-size: ${props.fontSize}px;
  `}
  ${props => props.alignSelf && css`
    align-self: ${props.alignSelf};
  `}
`
const FlexCenter = styled(Flex)`
  justify-content: center;
  text-align: center;
`
const FlexRight = styled(Flex)`
  justify-content: flex-end;
`
const FlexColumn = styled.div`
  margin: ${props => props.margin};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ${props => props.center && css`
    justify-content: center;
  `}
`
const DivFont08 = styled.div`
  font-size: 0.8rem;
`

// IMG BUTTON
const Button = styled.div`
  cursor: pointer;
`

//////////
// Container
const Container = styled.div`
  width: ${(props => props.width)}px;
  min-width: 360px;
  max-width: 960px;
`

// const AppTitle = styled(Flex)`
//   max-width: 100vw;
//   margin: 10px 0;
//   font-weight: 1000;
//   color: ${theme.white};
// `

// const CenterImage = styled.div`
//   max-width: 100vw;
//   margin: 30px 0;
//   display: grid;
//   grid-template-columns: 1fr 40px 1fr;
// `

const Footer = styled.div`
  margin-top: 20px;
  border-top: solid #555 1px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 100px;
  color: #777;
  font-size: 0.8rem;
`

// Player
const PlayerList = styled.div`
  margin: 10px 0 0 0;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  background-color: ${theme.gray};
  display: grid;
  grid-template-columns: 30px 60px 1fr 30px;
  // align-items: center;
  gap: 5px;
  font-size: 1.1rem;
  font-weight: 600;
`

const Player = styled.div`
  // width: ${(props => props.width)}px;
  // height: ${(props => props.width / 2)}px;
`

const PlayerInfo = styled.div`
  padding: 10px;
  border-radius: 0 0 10px 10px;
  background-color: ${theme.gray};
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 5px;
`

const AuthorInfo = styled.div`
  padding-right: 5px;
  align-self: flex-end;
  text-align: right;
  font-size: 0.7rem;
  transform: skew(170deg);
`

const PlayerThumbnail = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  & div {
    filter: grayscale(1);
  }
  & div:nth-child(${props => props.playNumber + 1}) {
    filter: grayscale(0);
  }
`

// Edit
const EditMode = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 10px;
`

const EditBlock = styled.div`
  background-color: ${theme.gray};
  border-radius: 5px;
  padding: 10px;
`

//// Add Item
// const AddUrl = styled.div`
//   display: grid;
//   grid-template-columns: 24px 1fr 24px;
//   justify-content: space-between;
//   align-items: center;
// `
const AddInput = styled.input`
  width: ${props => props.width}px;
  margin: 0 3px;
  border: solid 1px #aaa;
  border-radius: 5px;
  padding: 5px;
  outline: none;
  background-color: #444;
  color: #aaa;
  font-size: 1rem;
`
const AddOne = styled.div`
  margin-top: 4px;
  border-top: solid #777 1px;
  padding-top: 6px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 5px;
`
const AddInfo = styled.div`
  margin-top: 5px;
  border-top: solid #777 1px;
  padding-top: 5px;
  display: grid;
  grid-template-columns: 1fr 40px;
  font-size: 0.8rem;
  font-weight: 600;
`
const Textarea = styled.textarea`
  overflow: hidden;
  width: calc(100% - 10px);
  border: solid 1px #aaa;
  border-radius: 5px;
  outline: none;
  padding: 10px;
  background-color: #444;
  color: #ddd;
`

//// Edit List
const EditTitle = styled.div`
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr 30px;
`
const EditListOne = styled.div`
  margin-top: 4px;
  border-top: solid #777 1px;
  padding-top: 6px;
  display: grid;
  grid-template-columns: 20px 1fr 3fr 20px;
  gap: 10px;
`



// const ImageTest = styled.img.attrs({
//   src: `${logoImg}`,
// })`
//   width: 20px;
//   height: 20px;
// `

function App() {
  const [repeat, setRepeat] = useState(false)
  const listBox = [
    {idx: 0, title: 'Jace\'s Pick', description: '딩고 뮤직 킬링보이스 & ...', username: 'jace'},
  ]

  const listTitleTemplate = 'Jace\'s Pick'
  const [listTitle, setListTitle] = useState(
    window.localStorage.getItem('listonTitle') !== null
    ? JSON.parse(window.localStorage.getItem('listonTitle'))
    : listTitleTemplate)
  const [editListTitle, setEditListTitle] = useState(listTitle)

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
  const [playNumber, setPlayNumber] = useState(0)

  //Edit
  const [editOnOff, setEditOnOff] = useState(false)
  const [inputUrl, setInputUrl] = useState('')
  const [editable, setEditable] = useState(false)
  const [inputUrlInfo, setInputUrlInfo] = useState('')
  const getUrlInfo = async (url) => {
    const response = await fetch(`https://noembed.com/embed?dataType=json&url=${url}`)
                      .then((response) => response.json());
    setInputUrlInfo(response)
  }  
  const [editIndex, setEditIndex] = useState(null)

  // Textarea Resize
  const checkTitle = useRef();
  const checkAuthor = useRef();
  useEffect(() => {
    if (checkTitle.current) {
      checkTitle.current.style.height = 'auto'
      checkTitle.current.style.height = `${checkTitle.current.scrollHeight}px`
    }
    if (checkAuthor.current) {
      checkAuthor.current.style.height = 'auto'
      checkAuthor.current.style.height = `${checkAuthor.current.scrollHeight}px`
    }
  }, [inputUrlInfo])

  // Window Size
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
    <Container width={windowSize.x}>
      
      <PlayerList width={windowSize.x}>
        <CollectionPlayFill size="24" />
        <div>ListOn</div>
        <FlexRight>{listTitle}</FlexRight>
        <Flex button onClick={() => setRepeat(prev => !prev)}>{repeat ? <ArrowRepeatAll size="24" /> : <ArrowRepeatAllOff size="24" />}</Flex>
      </PlayerList>
      <Player>
        <ReactPlayer
          url={playList[playNumber].url}
          onEnded={() => {
            if (playNumber + 1 !== playList.length) {
              setPlayNumber(prev => prev + 1)
            } else if (repeat) {
              setPlayNumber(0)
            }
          }}
          playing={true}
          controls="true"
          width={windowSize.xPlay} height={windowSize.yPlay}></ReactPlayer>
      </Player>
      <PlayerInfo width={windowSize.x}>
        <div><MoviePlay /></div>
        <div>
          <div>{playList[playNumber].title}</div>
          <AuthorInfo>{playList[playNumber].author}</AuthorInfo>
        </div>
      </PlayerInfo>
      <PlayerThumbnail playNumber={playNumber}>
        {playList.map(({title, author, provider, url, thumbnail}, index) => (
          <Button>
            <img src={thumbnail} alt={title} title={title} onClick={() => setPlayNumber(index)} width="auto" height="64px" />
          </Button>
        ))}
      </PlayerThumbnail>

      <FlexCenter button margin="20px 0">
        <TextBulletListSquareEdit size="40" onClick={() => setEditOnOff(prev => !prev)} />
      </FlexCenter>

    {editOnOff ? (
      <EditMode>
        <EditBlock>
          <EditTitle>ADD</EditTitle>
          <Flex spaceBetween>
            <Button><CopyArrowRight size="24" onClick={() => {
              navigator.clipboard.readText().then(clipboardText => setInputUrl(clipboardText));   
            }} /></Button>
            <div>
              <AddInput type="text"
                placeholder="추가할 영상 url을 입력하세요."
                width={windowSize.x >= 730 ? windowSize.xHalf - 85 : windowSize.x - 85}
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value)
                  }}
              />
            </div>
            <Button><PlaylistAddCheck size="26" onClick={() => {
              // setCheckUrl(inputUrl);
              getUrlInfo(inputUrl);
              setEditable(prev => !prev)
            }} /></Button>
          </Flex>
          {editable ? (
            <div className="add-checked">
              <FlexColumn margin="10px 0 0 0">
                <ReactPlayer
                  url={inputUrlInfo.url}
                  width={`${windowSize.x >= 730 ? windowSize.xHalf - 25 : windowSize.x - 20}px`}
                  height={`${(windowSize.x >= 730 ? windowSize.xHalf - 25 : windowSize.x - 20) / 2}px`} />
                <FlexCenter><DivFont08>외부 플레이가 제한된 영상도 있습니다.</DivFont08></FlexCenter>
              </FlexColumn>
              <AddOne>
                <div><img src={inputUrlInfo.thumbnail_url} alt={inputUrlInfo.title} width="100%" height="auto" /></div>
                <FlexColumn margin="0 5px">                  
                  <Flex fontSize="12" alignSelf="flex-start">{inputUrlInfo.title}</Flex>
                  <AuthorInfo>[ {inputUrlInfo.author_name} ]</AuthorInfo>
                </FlexColumn>
              </AddOne>
              <AddInfo>
                <div>
                  <div className="label">TITLE</div>
                  <Textarea ref={checkTitle} value={inputUrlInfo.title} rows={1}
                    onChange={(e) => {
                      const temp = inputUrlInfo
                      temp.title = e.target.value
                      setInputUrlInfo(JSON.parse(JSON.stringify(temp)))
                    }} />
                  <div className="label">AUTHOR</div>
                  <Textarea ref={checkAuthor} value={inputUrlInfo.author_name} rows={1}
                    onChange={(e) => {
                      const temp = inputUrlInfo
                      temp.author_name = e.target.value
                      setInputUrlInfo(JSON.parse(JSON.stringify(temp)))
                    }} />
                </div>
                {editIndex !== null
                  ? (
                    <FlexColumn center>
                      <Button><Check2Square size="34"
                        onClick={() => {
                            playList[editIndex] = {title: inputUrlInfo.title, author: inputUrlInfo.author_name, provider: inputUrlInfo.provider_name, url: inputUrlInfo.url, thumbnail: inputUrlInfo.thumbnail_url}
                            setPlayList(playList.slice())
                            setEditIndex(null)
                            setInputUrl('')
                            setInputUrlInfo({title: '', author_name: '', provider: '', url: '', thumbnail: ''})
                            setEditable(false)
                          }
                        } /></Button>
                    </FlexColumn>
                  )
                  : (
                    <FlexColumn center>
                      <Button><InsertRowTop size="34"
                        onClick={() => {
                          if (inputUrlInfo.title && inputUrlInfo.author_name && inputUrlInfo.provider_name && inputUrlInfo.url && inputUrlInfo.thumbnail_url) {
                            playList.unshift({title: inputUrlInfo.title, author: inputUrlInfo.author_name, provider: inputUrlInfo.provider_name, url: inputUrlInfo.url, thumbnail: inputUrlInfo.thumbnail_url})
                            setPlayList(playList.slice())
                            setEditable(false)
                          }
                        }} /></Button>
                      <Button><InsertRowBottom size="34"
                        onClick={() => {
                          if (inputUrlInfo.title && inputUrlInfo.author_name && inputUrlInfo.provider_name && inputUrlInfo.url && inputUrlInfo.thumbnail_url) {
                            playList.push({title: inputUrlInfo.title, author: inputUrlInfo.author_name, provider: inputUrlInfo.provider_name, url: inputUrlInfo.url, thumbnail: inputUrlInfo.thumbnail_url})
                            setPlayList(playList.slice())
                            setEditable(false)
                          }
                        }} /></Button>
                    </FlexColumn>
                  )
                }
              </AddInfo>
            </div>
          ) : null }
        </EditBlock>

        <EditBlock>
          <EditTitle>
            <AddInput type="text"
              width={windowSize.x >= 730 ? windowSize.xHalf - 70 : windowSize.x - 70}
              value={editListTitle}
              onChange={(e) => {
                setEditListTitle(e.target.value)
                }}
              onKeyUp={(e) => {
                if (e.code === 'Enter') {
                  setListTitle(editListTitle)
                }
              }}
            />
            <Flex button>
              <FileMark size="26"
                onClick={() => {
                  window.localStorage.setItem('listonTitle', JSON.stringify(listTitle));
                  window.localStorage.setItem('liston', JSON.stringify(playList));
                  alert('Your list is saved')}} />
            </Flex>
          </EditTitle>
          <FlexRight margin="0 0 10px 0" fontSize="12">수정한 List를 계속 이용하려면 저장(<FileMark size="16" />)하시기 바랍니다</FlexRight>
          { playList.map(({title, author, provider, url, thumbnail}, index) => (
            <EditListOne>
              <FlexColumn>
                <Button><ChevronUpCircle size="20" color={index === 0 ? "#555": ""}
                  onClick={() => {
                    if (index !== 0) {
                      const temp = playList[index - 1];
                      playList[index - 1] = playList[index];
                      playList[index] = temp;
                      setPlayList(playList.slice())
                    }
                  }} /></Button>
                <Button><ChevronDownCircle size="20" color={index === playList.length - 1 ? "#555": ""}
                  onClick={() => {
                    if (index !== playList.length - 1) {
                      const temp = playList[index + 1];
                      playList[index + 1] = playList[index];
                      playList[index] = temp;
                      setPlayList(playList.slice())
                    }
                  }} /></Button>
              </FlexColumn>
              <div><img src={thumbnail} alt={title} width="100%" height="auto" /></div>
              <FlexColumn>
                <Flex fontSize="12" alignSelf="flex-start">{title}</Flex>
                <AuthorInfo>
                  {provider === 'YouTube' ? <Youtube size="14" /> : null}
                  {provider === 'Vimeo' ? <Vimeo size="14" /> : null}
                  {provider === 'SoundCloud' ? <Soundcloud size="14" /> : null}
                  {provider === 'Facebook' ? <Facebook size="14" /> : null}
                  &nbsp;{author}
                </AuthorInfo>
              </FlexColumn>
              <FlexColumn>
                <Button><DeleteForever size="20"
                  onClick={() => {
                    playList.splice(index, 1)
                    setPlayList(playList.slice())
                  }} /></Button>
                <Button><Edit size="20"
                  onClick={async () => {
                    setEditable(true)
                    setInputUrl(url)
                    // setCheckUrl(url)
                    await getUrlInfo(url)
                    setEditIndex(index)
                    inputUrlInfo.title = title
                    inputUrlInfo.author_name = author
                    inputUrlInfo.provider_name = provider
                    inputUrlInfo.url = url
                    inputUrlInfo.thumbnail_url = thumbnail
                    setInputUrlInfo(JSON.parse(JSON.stringify(inputUrlInfo)))
                  }} /></Button>
              </FlexColumn>
            </EditListOne>
          ))}
        </EditBlock>
      </EditMode>


    ) : null}


      <Footer width={windowSize.x}>
        <div>
          <div>Supported Media: YouTube, Vimeo, SoundClound, Facebook</div>
          <div>Hosted on <a href="https://vercel.com/">▲Vercel</a></div>
          {/* Supported Media: Treamable, Vidme, Wistia, Twitch, DailyMotion, Vidyard */}
        </div>
        <div>
        <FlexRight>
          Copyright. Jace
        </FlexRight>
        
        <FlexRight>
          <a href="mailto:jacealan@naver.com">@Naver</a>&nbsp;
          {/* <a href="mailto:jacealan@daum.net">@Daum</a>&nbsp; */}
          <a href="mailto:jacealan1@gmail.com">@Gmail</a>
        </FlexRight>
        </div>
      </Footer>

    </Container>
  )
}

export default App;
