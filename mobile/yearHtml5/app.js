require('./app.scss');

const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
const htmlDom = document.getElementsByTagName('html')[0];
htmlDom.style.fontSize = htmlWidth / 10 + 'px';

// 加载时，自动播放；点击一下停止，再点击可继续播放
document.addEventListener('DOMContentLoaded', function() {
    const musicPlay = document.getElementsByTagName('audio')[0];
    const musicDom = document.querySelector('.music');

    const playPointer = document.querySelector('.pointer');
    const playDisc = document.querySelector('.disc');
    musicDom.addEventListener('touchstart', changePlay); // 将clic改为 touchstart

    function changePlay() {
        console.log('music = ', musicPlay.paused);
        if (musicPlay.paused) {
            console.log('开始播放');
            musicPlay.play();
            playPointer.setAttribute('class', 'pointer pointer_play');
            playDisc.setAttribute('class', 'disc disc_play');
            // playDisc.style.webkitAnimationPlayState = 'running'; // 4.4以下的android不兼容，iphone6及以下的版本都不兼容
            // playPointer.style.webkitAnimationPlayState = 'running'; // 4.4以下的android不兼容，iphone6及以下的版本都不兼容
        }
        else {
            console.log('暂停');
            musicPlay.pause();
            playPointer.setAttribute('class', 'pointer');
            playDisc.setAttribute('class', 'disc');
            // playDisc.style.webkitAnimationPlayState = 'paused';
            // playPointer.style.webkitAnimationPlayState = 'paused';
        }
    }
    const lantern = document.querySelector('.p1_lantern');
    const page1 = document.querySelector('#page1');
    const page2 = document.querySelector('#page2');
    const page3 = document.querySelector('#page3');
    lantern.addEventListener('touchstart', function() {
        page1.style.display = 'none';
        page2.style.display = 'block';
        page3.style.display = 'block';
        page3.style.top = '100%';
        setTimeout(function() {
            page2.setAttribute('class', 'page fadeout');
            page3.setAttribute('class', 'page fadein');
        }, 5500);
    });
    // page2.addEventListener('touchstart', function() {
    //     page2.style.display = 'none';
    //     page3.style.display = 'block';
    // });
    // page3.addEventListener('touchstart', function() {
    //     page3.style.display = 'none';
    //     page2.style.display = 'block';
    // });
});

window.onload = function() {
    // const musicPlay = document.getElementsByTagName('audio')[0];
    // if (musicPlay.paused) {
    //     console.log('开始播放');
    //     musicPlay.play();
    // }
};

// 页面切换

// 滑动/点击最上面按钮，可以回到上一页