 //스크롤 숫자 표시
let text = document.querySelector('.text');
window.addEventListener("scroll", function () {
    let wScroll = window.pageYOffset;
    console.log(parseInt(wScroll))
    text.innerHTML = parseInt(wScroll)
});

//skrollr
var s = skrollr.init();


function scrollVideo() {
  var video = $('#video').get(0),
    videoLength = video.duration,
    scrollPosition = $(document).scrollTop();

  video.currentTime = (scrollPosition / ($(document).height() - $(window).height())) * videoLength;
}

$(window).scroll(function (e) {
  scrollVideo();
});

/////////////////////////////////////////

/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)




	// 이미지슬라이드
  $('.minislider').slick({
    dots: true,
    autoplay:true
  });



  //spin slide
var radius = 240; 
var autoRotate = true;
var rotateSpeed = -60; 
var imgWidth = 120; 
var imgHeight = 170; 



setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid];

ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";



function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
};

////////////택스트 3D//////////////////////

let allText=document.querySelectorAll('.threedd');
let delay=0;

//allText.forEach(function(el,idx){}); //el 각각의 아이템, idx는 아이템의 index번호

allText.forEach((el,idx)=>{
    el.style.animationDelay=`${delay}s`;
    el.style.zIndex=allText.length - idx;
    el.classList.add('base-anim');

    delay += 0.15;
});


document.getElementById('five').addEventListener('mousemove',(e)=>{
    let innerWidth=window.innerWidth;//viewport의 넓이값
    let innerHeight=window.innerHeight;//viewport의 높이값
    let clientX=e.clientX;
    let clientY=e.clientY;
    //console.log(clientX,clientY)

    let percentX=clientX/innerWidth;
    //console.log(percentX)
    let maxRangeX=innerWidth*0.15;
    let minX=innerWidth/2 - maxRangeX;
    let maxX=innerWidth/2 + maxRangeX;
    let difX=  maxX - minX;
    let pxOffset = difX * percentX;

    let left=minX + pxOffset;

    let percentY=clientY/innerHeight;
    //console.log(percentX)
    let maxRangeY=innerHeight*0.15;
    let minY=innerHeight/2 - maxRangeY;
    let maxY=innerHeight/2 + maxRangeY;
    let difY=  maxY - minY;
    let pxOffsetY = difY * percentY;

    let top=minY + pxOffsetY;

    allText.forEach((el,idx)=>{
        //el.animate([],{})

        el.animate([
            {top:`${top}px`,left:`${left}px`}
        ],{
            duration:1000,fill:'forwards',delay:idx * 50
        })
    })

})



//page5 slide
$('.produuctsslider').slick({
  prevArrow: false, 
  nextArrow: false, 
  speed: 300,
  slidesToShow: 1,
autoplay:true

});



//////////////////////////////////////////////
const wand = document.getElementById("wand"),
      tiles = document.querySelectorAll(".tile");

const xy = (x, y) => ({ x, y }),
      px = value => `${value}px`,
      deg = value => `${value}deg`,
      clamp = (value, min, max) => Math.max(Math.min(value, max), min);

const updateMouse = (mouseX, mouseY) => {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  
  const mouse = {
    position: xy(mouseX, mouseY),
    decimal: xy(mouseX / windowWidth, mouseY / windowHeight),
    multiplier: xy(1.3, 0.4),
    offset: xy(windowWidth * -0.15, windowHeight * 0.1),
    modifiedPosition: xy(0, 0)
  }
  
  mouse.modifiedPosition.x = mouse.position.x * mouse.multiplier.x + mouse.offset.x;  
  mouse.modifiedPosition.y = mouse.position.y * mouse.multiplier.y + mouse.offset.y;  
  
  return mouse;
}

const revealImages = mouseX => {
  for(const tile of tiles) {
    const dimensions = tile.getBoundingClientRect(),
          relativeMouseX = mouseX - dimensions.left,
          mouseXAsDecimal = clamp(relativeMouseX / dimensions.width, 0, 1);
    
    const opacity = mouseXAsDecimal,
          blur = 1 - mouseXAsDecimal;
    
    tile.style.setProperty("--opacity", opacity);
    tile.style.setProperty("--blur", blur);
  }
}

const getWandStyles = mouse => ({
  left: px(mouse.modifiedPosition.x),
  top: px(mouse.modifiedPosition.y),
  rotate: deg(mouse.decimal.x * 20 - 10)
});

window.onmousemove = e => {
  const mouse = updateMouse(e.clientX, e.clientY),  
        wandStyles = getWandStyles(mouse);
  
  wand.animate(wandStyles, { duration: 400, fill: "forwards" });
  
  revealImages(mouse.modifiedPosition.x);
}

/////////////////////////페이지슬라이드////////////////////////////////
let buttons=document.querySelectorAll('.buttonWrap button');
let contentWrap=document.querySelectorAll('.contentWrap');
let imgArr=document.querySelectorAll('.contentWrap img');
let pageNum=0;
let tatalNum=0;
tatalNum=contentWrap.length;//3

buttons[0].addEventListener('click',function(){
    preFunc();
})
buttons[1].addEventListener('click',function(){
    nextFunc();
})

function preFunc(){
        if(pageNum>0){
            pageNum--;
        }else{
            pageNum=tatalNum - 1;
        }
    pageSetFunc();
}
function nextFunc(){
    if(pageNum<tatalNum - 1){
        pageNum++;
    }else{
        pageNum=0;
    }
    pageSetFunc();
}

function pageSetFunc(){
    imgArr.forEach((img)=>{
        img.classList.remove('active');
    })
    contentWrap[pageNum].querySelectorAll('img').forEach((img)=>{
        img.classList.add('active')
    })


}

pageSetFunc()

///////////////탭메뉴////////////////
function openCity(cityName, elem, color){
  let tabcontent=document.getElementsByClassName('tabcontent');
  for(let i=0 ; i<tabcontent.length; i++){
      tabcontent[i].style.display="none";
  }
  let tablinks=document.getElementsByClassName('tablink');
  for(let i=0; i<tablinks.length;i++){
      tablinks[i].style.backgroundColor="";
  }
  elem.style.backgroundColor=color;
  document.getElementById(cityName).style.display="block";
}

document.getElementById('defaultOpen').click();



