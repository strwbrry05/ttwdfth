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

//centering
const verticalScroll = document.querySelector('.videoHolder');
verticalScroll.scrollTop = (verticalScroll.scrollTop - verticalScroll.clientHeight) / 2;

//displaying videos
function displayVideo(videoTypeArr, videoNum) {  
    const holder = document.querySelector('.videoHolder');
    const player = document.querySelector('.player');

    const videoArr = videoTypeArr[videoNum];
    const videoLink = videoArr[0];
    const videoHeight = videoArr[1];

    if (videoHeight === 1000) {
        player.src = videoLink;
        holder.classList.add('bigHolder');
    }
    else if (videoHeight === 900) {
        player.src = videoLink;
        holder.classList.add('smallHolder');
    }
}

