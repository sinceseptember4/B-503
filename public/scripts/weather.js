'use strict';
const CLASSNAME = "-visible";
const TIMEOUT = 2000;
const $target = $(".bg");

setInterval(() => {
  $target.addClass(CLASSNAME);

  setTimeout(() => {
    $target.removeClass(CLASSNAME);
  }, TIMEOUT);
}, TIMEOUT*2);

const images = ['image/image1.jpg', 'image/image2.jpg', 'image/image3.jpg', 'image/image4.jpg'];
images.forEach(function(item, index) {
    preloadImage(item);
});
let current = 0;

function changeImage(num) {
    if(current + num >= 0 && current + num < images.length) {
        current += num;
        document.getElementById('main_image').src = images[current];
        pageNum();
    }
};

function pageNum() {
    document.getElementById('page').textContent = `${current + 1}/${images.length}`;
}

function preloadImage(path) {
    let imgTag = document.createElement('img');
    imgTag.src = path;
}

pageNum();

document.getElementById('prev').onclick = function() {
    changeImage(-1);
};
document.getElementById('next').onclick = function() {
    changeImage(1);
};
