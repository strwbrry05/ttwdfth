// getting and showing appropriate videos
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const videoType = urlParams.get('videos');
console.log(videoType);


const player = document.querySelector('.player');
const holder = document.querySelector('.videoHolder');
let count = 0;


selectVideos(videoType);


async function selectVideos(videoType) {
    const res = await fetch('videos.json');
    const data = await res.json();
    console.log(data[videoType]);

    const videoTypeArr = data[videoType];

    displayVideo(videoTypeArr);

    document.addEventListener('click', (e) => {
        count++;
        if (count === 4) {
            count = 0;
        }
        displayVideo(videoTypeArr);
        console.log('next!');
    });

}

function displayVideo(videoTypeArr) {  
    let videoInfo = videoTypeArr[count];
    let videoLink = videoInfo[0];
    let videoHeight = videoInfo[1];
    
    if (videoHeight === 1000) {
        holder.classList.remove('smallsize');
        player.classList.remove('smallVideo');
        holder.classList.add('fullsize');
        player.classList.add('bigVideo');
    }
    else if (videoHeight === 900) {
        holder.classList.remove('fullsize');
        player.classList.remove('bigVideo');
        holder.classList.add('smallsize');
        player.classList.add('smallVideo');
    }
    player.src = videoLink;
}

// document.addEventListener('mousedown', (e) => {
//     console.log('hi');
// })

// document.addEventListener('mouseup', (e) => {
//     console.log('bye');
// })
