// import { gsap}  from "gsap";
// gsap.registerPlugin(ScrollTrigger);

// getting and showing appropriate videos
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const videoType = urlParams.get('videos');
console.log(videoType);


const player0 = document.querySelector('.player0');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

// const holder = document.querySelector('.videoHolder');
const item = document.querySelector('.item');

let count = 0;


selectVideos(videoType);


async function selectVideos(videoType) {
    const res = await fetch('videos.json');
    const data = await res.json();
    console.log(data[videoType]);

    const videoTypeArr = data[videoType];

    displayVideo(videoTypeArr);

    // document.addEventListener('click', (e) => {
    //     count++;
    //     if (count === 4) {
    //         count = 0;
    //     }
    //     displayVideo(videoTypeArr);
    //     console.log('next!');
    // });

}

function displayVideo(videoTypeArr) {  
    let video0 = videoTypeArr[0];
    let video0Link = video0[0];
    let video0Height = video0[1]; 
    player0.src = video0Link;

    let video1 = videoTypeArr[1];
    let video1Link = video1[0];
    let video1Height = video1[1]; 
    player1.src = video1Link;

    // if (video1Height === 1000) {
    //     item.classList.add('small');
    //     player1.classList.add('bigVideo');
    // }
    // else if (video1Height === 900) {
    //     item.classList.add('small');
    //     player1.classList.add('smallVideo');
    // }

    let video2 = videoTypeArr[2];
    let video2Link = video2[0];
    player2.src = video2Link;

    // let videoInfo = videoTypeArr[count];
    // let videoLink = videoInfo[0];
    // let videoHeight = videoInfo[1];
    
    // if (videoHeight === 1000) {
    //     holder.classList.remove('smallsize');
    //     player.classList.remove('smallVideo');
    //     holder.classList.add('fullsize');
    //     player.classList.add('bigVideo');
    // }
    // else if (videoHeight === 900) {
    //     holder.classList.remove('fullsize');
    //     player.classList.remove('bigVideo');
    //     holder.classList.add('smallsize');
    //     player.classList.add('smallVideo');
    // }
    // player.src = videoLink;
}


let allVideoDivs = gsap.utils.toArray('.item');

allVideoDivs.forEach((videoDiv, i) => {
  
  let videoElem = videoDiv.querySelector('video')
  
  ScrollTrigger.create({
    trigger: videoElem,
    start: 'bottom 100%',
    end: 'top 0%',
    markers: false,
    onEnter: () => {videoElem.play(); videoElem.muted = false;},
    onEnterBack: () => { videoElem.play(); videoElem.currentTime = 0;},
    onLeave: () => videoElem.pause(),
    onLeaveBack: () => {videoElem.pause(); videoElem.currentTime = 0;},
  });
  
});

// document.addEventListener('mousedown', (e) => {
//     console.log('hi');
// })

// document.addEventListener('mouseup', (e) => {
//     console.log('bye');
// })
