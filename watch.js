// getting and showing appropriate videos
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const videoType = urlParams.get('videos');
console.log(videoType);

const holder = document.querySelector('.videoHolder');
const player = document.querySelector('.player');

const startScreen = document.querySelector('.startScreen');
const instructions = document.querySelector('.instructions');
const leftI = document.querySelector('.left');

const controls = document.querySelector('.controls');
const prev = document.querySelector('.prevVideo');
const next = document.querySelector('.nextVideo');


let isFirstRun = true;
let videoNum = 0;

selectVideos(videoType);


async function selectVideos(videoType) {
    const res = await fetch('videos.json');
    const data = await res.json();
    console.log(data[videoType]);

    const videoTypeArr = data[videoType];

    startScreen.classList.add('active');
    displayVideo(videoTypeArr, videoNum);

    prev.addEventListener('click', () => {
        isFirstRun = false;
        videoNum--;
        if (videoNum === -1) {
            videoNum = videoTypeArr.length - 1;
        }
        displayVideo(videoTypeArr, videoNum);
    });

    next.addEventListener('click', () => {
        isFirstRun = false;
        videoNum++;
        if (videoNum === videoTypeArr.length) {
            videoNum = 0;
        }
        displayVideo(videoTypeArr, videoNum);
    });

    // holder.addEventListener('click', (e) => {
    //     isFirstRun = false;
    //     videoNum++;
    //     if (videoNum === videoTypeArr.length) {
    //         videoNum = 0;
    //     }
    //     displayVideo(videoTypeArr, videoNum);
    //     console.log('next!');
    // });

}




//displaying videos
function displayVideo(videoTypeArr, videoNum) {  


    const videoArr = videoTypeArr[videoNum];
    const videoLink = videoArr[0];
    const videoHeight = videoArr[1];

    player.src = videoLink;

    if (videoNum === 0 && isFirstRun === true) {
        startScreen.classList.add('active');
        controls.classList.add('gone');
        player.pause();

        startScreen.addEventListener('click', () => {
            startScreen.classList.remove('active');
            startScreen.classList.add('gone');
            controls.classList.remove('gone');
            controls.classList.add('active');
            player.play();
        });
    }
    else {
        startScreen.classList.remove('active');
        startScreen.classList.add('gone');
    }

}

