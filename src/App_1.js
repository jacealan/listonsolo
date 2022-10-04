import { useState, useRef, useEffect } from 'react';
// import ReactPlayer from 'react-player';
import ReactPlayer from 'react-player/lazy';

function App() {
  // const scrap = async (url) => {
  //   let response = await fetch(url, {
  //     // method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //     // mode: 'cors', // no-cors, cors, *same-origin
  //     // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     // credentials: 'same-origin', // include, *same-origin, omit
  //     // headers: {
  //     //     'Content-Type': 'application/json',
  //     //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //     // },
  //     // redirect: 'follow', // manual, *follow, error
  //     // referrer: 'no-referrer', // no-referrer, *client
  //     // body: JSON.stringify(data), // body data type must match "Content-Type" header
  //   });
  //   let text = await response.text(); // read response body as text
  //   console.log(response);
  //   console.log(text);
  // }

  const scrap =(url) => {
    fetch(`https://noembed.com/embed?dataType=json&url=${url}`)
    .then(res => res.json())
    .then(data => console.log('fetch', data.title))
  }

  scrap('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
  scrap('https://www.example.com/')
  scrap('https://youtu.be/fyDz91HDt4g')

  return (
    <div className="App">
      <ReactPlayer url={['https://youtu.be/fyDz91HDt4g', 'https://youtu.be/5ch94AaPZRQ']} controls='true' />
      <ReactPlayer url='https://youtu.be/fyDz91HDt4g' controls='true' width='800' height='800px' />
      <ReactPlayer url='https://youtu.be/5ch94AaPZRQ' light='https://i.pinimg.com/originals/c5/17/c8/c517c80c807e14d890e408c65ad90a47.jpg' />
    </div>
  );
}

export default App;
