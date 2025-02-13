// getting and showing appropriate videos
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const videoType = urlParams.get('videos');
console.log(videoType);


selectVideos(videoType);


async function selectVideos(videoType) {
    const res = await fetch('videos.json');
    const data = await res.json();
    console.log(data[videoType]);

    const videoTypeArr = data[videoType];
    let videoNum = 0;

    displayVideo(videoTypeArr, videoNum);

    document.addEventListener('click', (e) => {
        videoNum++;
        if (videoNum === videoTypeArr.length) {
            videoNum = 0;
        }
        displayVideo(videoTypeArr, videoNum);
        console.log('next!');
    });

}


function displayVideo(videoTypeArr, videoNum) {  
    const holder = document.querySelector('.videoHolder');

    let html = ``;
    const videoArr = videoTypeArr[videoNum];
    const videoLink = videoArr[0];
    const videoHeight = videoArr[1];

    // html += 
    // `<div class="item">
    //     <video class="player player${videoNum}" src="${videoLink}" autoplay loop playsinline></video>
    // </div>`;

    if (videoHeight === 1000) {
        html += 
        `<div class="item big">
            <video class="player player${videoNum} bigVideo" src="${videoLink}" autoplay loop playsinline></video>
        </div>`;
    }
    else if (videoHeight === 900) {
        html += 
        `<div class="item small">
            <video class="player player${videoNum} smallVideo" src="${videoLink}" autoplay loop playsinline></video>
        </div>`;
    }

    holder.innerHTML = html;



    // let video0 = videoTypeArr[0];
    // let video0Link = video0[0];
    // let video0Height = video0[1]; 
    // player0.src = video0Link;

    // let video1 = videoTypeArr[1];
    // let video1Link = video1[0];
    // let video1Height = video1[1]; 
    // player1.src = video1Link;

    
    // let video2 = videoTypeArr[2];
    // let video2Link = video2[0];
    // player2.src = video2Link;

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

