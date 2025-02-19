// getting and showing appropriate videos
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const videoType = urlParams.get('videos');
console.log(videoType);

// media Q
let desktopQ = window.matchMedia("(min-width:900px)");
const desktopMain = document.querySelector('.desktopMain');
const mobileMain = document.querySelector('.main');
const startScreen = document.querySelector('.startScreen');
const menu = document.querySelector('.menu');


let isFirstRun = true;
let videoNum = 0;
let isPaused = false;
let isMuted = false;

// FETCHING JSON VIDEO DATA (videos.json)
async function selectVideos(videoType) {
    const res = await fetch('utils/videos.json');
    const data = await res.json();    
    const videoArr = data[videoType];
    return videoArr;
}
const videoArr = await selectVideos(videoType);

if (desktopQ.matches) {
    // getting rid of unwanted mobile elements
    startScreen.classList.add('gone');
    mobileMain.classList.add('gone');
    menu.classList.add('gone'); 

    // main elements
    const player = document.querySelector('.desktopPlayer');
    const prev = document.querySelector('.deskPrev');
    const next = document.querySelector('.deskNext');
    //
    const pausePlay = document.querySelector('.desktopPausePlay');
    const homeBtn = document.querySelector('.desktopHomeBtn');

    displayVideo(videoNum);

    // MOVE BETWEEN VIDEOS
    next.addEventListener('click', () => {
        videoNum++;
        if (videoNum === videoArr.length) {
            videoNum = 0;
        }
        changeVideo(videoNum);
    });
    prev.addEventListener('click', () => {
        videoNum--;
        if (videoNum === -1) {
            videoNum = videoArr.length - 1;
        }
        changeVideo(videoNum);
    });

    function changeVideo(videoNum) {
        isFirstRun = false;
        isPaused = false;
        displayVideo(videoNum);
    }

    //DISPLAYING VIDEOS
    function displayVideo(videoNum) {  
        const video = videoArr[videoNum];
        const videoLink = video[0];
        const videoHeight = video[1];
    
        player.src = videoLink;
        pausePlay.classList.remove('pause');
        pausePlay.innerHTML = ``;
        // player.play();

        if (videoHeight === 1000) {
            player.classList.add('deskBig');
        }
    }

    // PAUSE / PLAY MECHANICS
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

    // HOME BTN
    homeBtn.addEventListener('mousedown', () => {
        homeBtn.classList.add('clickActive');
    });
    homeBtn.addEventListener('mouseup', () => {
        homeBtn.classList.remove('clickActive');
        window.location.href = 'index.html';
    });

} else {
    // remove unwanted desktop elements
    desktopMain.classList.add('gone');

    // main document elements
    const holder = document.querySelector('.videoHolder');
    const player = document.querySelector('.player');
    const startScreen = document.querySelector('.startScreen');
    const controls = document.querySelector('.controls');
    const prev = document.querySelector('.prevVideo');
    const next = document.querySelector('.nextVideo');

    const homeBtn = document.querySelector('.fa-house');
    const muteBtn = document.querySelector('.fa-volume-xmark');
    const pausePlay = document.querySelector('.pausePlay');
    const pauseScreen = document.querySelector('.pauseScreen');
    const muteOverlay = document.querySelector('.muteOverlay');

    displayVideo(videoNum);
    
    // MOVE BETWEEN VIDEOS
    next.addEventListener('click', () => {
        videoNum++;
        if (videoNum === videoArr.length) {
            videoNum = 0;
        }
        changeVideo(videoNum);
    });
    prev.addEventListener('click', () => {
        videoNum--;
        if (videoNum === -1) {
            videoNum = videoArr.length - 1;
        }
        changeVideo(videoNum);
    });

    function changeVideo(videoNum) {
        isFirstRun = false;
        isPaused = false;
        isMuted = false;

        pausePlay.innerHTML = `<i class="fa-solid fa-pause fa-xl"></i>`;
        player.muted = false;
        displayVideo(videoNum);
    }
    
    
    //DISPLAY VIDEOS
    function displayVideo(videoNum) {  
        const video = videoArr[videoNum];
        const videoLink = video[0];
        const videoHeight = video[1];
    
        player.src = videoLink;
        startScreen.classList.add('gone');
        muteOverlay.classList.add('gone');
        pauseScreen.classList.add('gone');

        if (videoHeight === 900) {
            holder.classList.add('small');
            player.classList.remove('big');
        }
        else if (videoHeight === 1000) {
            holder.classList.remove('small');
            player.classList.add('big');
        }
    
        // we need to show the instruction screen and hide the controls
        if (videoNum === 0 && isFirstRun === true) {
            isFirstVideo();
        }
    }

    function isFirstVideo() {
        startScreen.classList.remove('gone');
        controls.classList.add('gone');
        player.pause();

        startScreen.addEventListener('click', () => {
            startScreen.classList.add('gone');
            controls.classList.remove('gone');
            controls.classList.add('active');
            player.play();
        });
    }
    
    // MUTE BUTTON
    muteBtn.addEventListener('click', () => {
        if (isMuted) {
            player.muted = false;
            isMuted = false;
            muteOverlay.classList.add('gone');
        } else {
            player.muted = true;
            isMuted = true;
            muteOverlay.classList.remove('gone');
        }
    });
    
    // HOME BUTTON
    homeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // PAUSE / PLAY BUTTON
    pausePlay.addEventListener('click', () => {
        if (isPaused) {
            player.play();
            pauseScreen.classList.add('gone');
            pausePlay.innerHTML = `<i class="fa-solid fa-pause fa-xl"></i>`;
            isPaused = false;
        } else {
            player.pause();
            pauseScreen.classList.remove('gone');
            pausePlay.innerHTML = `<i class="fa-solid fa-play fa-xl"></i>`;
            isPaused = true;
        }
    });
}