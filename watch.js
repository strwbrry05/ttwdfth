// getting and showing appropriate videos
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const videoType = urlParams.get('videos');
console.log(videoType);


const player = document.querySelector('.player');

selectVideos(videoType);

async function selectVideos(videoType) {
    const res = await fetch('videos.json');
    const data = await res.json();
    console.log(data);
    console.log(data[videoType]);
    const videoTypeArr = data[videoType];

    player.src = `${videoTypeArr[0]}`;
}
