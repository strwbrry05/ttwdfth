
// start scrollbar in the center
const horizontalScroll = document.querySelector('.items');
const main = document.querySelector('.main');
horizontalScroll.scrollLeft = (horizontalScroll.scrollWidth - horizontalScroll.clientWidth) / 2;

// LINK TO WATCH PAGE AFTER ANIMATION
const items = document.querySelectorAll('[data-link]');

items.forEach(item => item.addEventListener('click', () => {
    item.classList.add('levitate');
    setTimeout(function() {
        window.location.href = `watchVideos.html?videos=${item.dataset.link}`;
    }, 500);
    setTimeout(function() {
        item.classList.remove('levitate');
    }, 2000);
}));

// DRAG SCROLL BAR
const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return; // stop the fn from running
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
});
