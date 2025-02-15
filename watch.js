// getting and showing appropriate videos
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const videoType = urlParams.get('videos');
console.log(videoType);

// media Q
let desktopQ = window.matchMedia("(min-width:1000px)");

let isFirstRun = true;
let videoNum = 0;
let isPaused = false;

if (desktopQ.matches) {
    const mobileMain = document.querySelector('.main');
    const startScreen = document.querySelector('.startScreen');

    const holder = document.querySelector('.desktopVideoHolder');
    const player = document.querySelector('.desktopPlayer');

    const prev = document.querySelector('.deskPrev');
    const next = document.querySelector('.deskNext');


    mobileMain.classList.add('gone');
    startScreen.classList.add('gone');

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
            isPaused = false;
            videoNum--;
            if (videoNum === -1) {
                videoNum = videoTypeArr.length - 1;
            }
            displayVideo(videoTypeArr, videoNum);
        });
        next.addEventListener('click', () => {
            isFirstRun = false;
            isPaused = false;
            videoNum++;
            if (videoNum === videoTypeArr.length) {
                videoNum = 0;
            }
            displayVideo(videoTypeArr, videoNum);
        });

    }

    //displaying videos
    function displayVideo(videoTypeArr, videoNum) {  
        const videoArr = videoTypeArr[videoNum];
        const videoLink = videoArr[0];
        const videoHeight = videoArr[1];

        console.log(videoLink);
    
        player.src = videoLink;
        player.play();

        if (videoHeight === 1000) {
            player.classList.add('deskBig');
        }

    }

    const pausePlay = document.querySelector('.desktopPausePlay');
    pausePlay.addEventListener('click', () => {
        if (isPaused) {
            player.play();
            pausePlay.classList.remove('pause');
            pausePlay.innerHTML = ``;
            isPaused = false;
        } else {
            player.pause();
            pausePlay.classList.add('pause');
            pausePlay.innerHTML = `<i class="fa-solid fa-play fa-xl"></i>`;
            isPaused = true;
        }
    })

    const homeBtn = document.querySelector('.desktopHomeBtn');
    homeBtn.addEventListener('mousedown', () => {
        homeBtn.classList.add('clickActive');
    });
    homeBtn.addEventListener('mouseup', () => {
        homeBtn.classList.remove('clickActive');
        window.location.href = 'index.html';
    });

    console.log('desktop!');
} else {
    const desktopMain = document.querySelector('.desktopMain');
    desktopMain.classList.add('gone');

    const holder = document.querySelector('.videoHolder');
    const player = document.querySelector('.player');

    const startScreen = document.querySelector('.startScreen');
    const controls = document.querySelector('.controls');
    const prev = document.querySelector('.prevVideo');
    const next = document.querySelector('.nextVideo');

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
            pausePlay.innerHTML = `<i class="fa-solid fa-pause fa-xl"></i>`;
            isPaused = false;
            displayVideo(videoTypeArr, videoNum);
        });
    
        next.addEventListener('click', () => {
            isFirstRun = false;
            videoNum++;
            if (videoNum === videoTypeArr.length) {
                videoNum = 0;
            }
            pausePlay.innerHTML = `<i class="fa-solid fa-pause fa-xl"></i>`;
            isPaused = false;
            displayVideo(videoTypeArr, videoNum);
        });
    }
    
    
    //displaying videos
    function displayVideo(videoTypeArr, videoNum) {  
        const videoArr = videoTypeArr[videoNum];
        const videoLink = videoArr[0];
        const videoHeight = videoArr[1];
    
        player.src = videoLink;
        if (videoHeight === 900) {
            holder.classList.add('small');
            player.classList.remove('big');
    
        }
        else if (videoHeight === 1000) {
            holder.classList.remove('small');
            player.classList.add('big');
        }
    
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
    
    const homeBtn = document.querySelector('.fa-house');
    const pausePlay = document.querySelector('.pausePlay');
    const pauseBtn = document.querySelector('.fa-pause');
    // const saveBtn = document.querySelector('.fa-floppy-disk');
    
    homeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    let isPaused = false;
    pausePlay.addEventListener('click', () => {
        if (isPaused) {
            player.play();
            pausePlay.innerHTML = `<i class="fa-solid fa-pause fa-xl"></i>`;
            isPaused = false;
        } else {
            player.pause();
            pausePlay.innerHTML = `<i class="fa-solid fa-play fa-xl"></i>`;
            isPaused = true;
        }
    });
}



// GRID VIEW
const viewMenu = document.querySelector('.viewMenu');
// go to new page

