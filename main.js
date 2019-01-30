const container = document.querySelector(".container");
const body = document.querySelector("body");
const pudding = document.querySelectorAll(".pudding");
let width = window.innerWidth;
let height = window.innerHeight;

// menu

// refresh btn
const refresBtn = document.querySelector(".refresh-icon");

refresBtn.addEventListener("click", () => {
  location.reload(true);
});

// change pudding
let flag = false;

const input = document.querySelector(".input");
const changeCake = document.querySelector(".change--cake--btn");

input.addEventListener("keyup", e => {
  flag = ValidURL(e.target.value);
});

function ValidURL(str) {
  regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}

changeCake.addEventListener("click", () => {
  if (flag) {
    pudding.forEach(el => {
      el.style.backgroundImage = `url(${input.value})`;
    });
  } else {
    console.log("incorrect url");
  }
});

// open modals
const faceBtn = document.querySelector(".face-icon");
const faceModal = document.querySelector(".add--face__container");
const faceForm = document.querySelector(".add--face");

const puddingBtn = document.querySelector(".pudding-icon");
const puddingModal = document.querySelector(".add--pudding__container");
const puddingForm = document.querySelector(".add--pudding");

const playlistBtn = document.querySelector(".playlist-icon");
const playlist = document.querySelector(".playlist");

const closeAll = () => {
  puddingModal.classList.remove("show");
  faceModal.classList.remove("show");
  playlist.classList.remove("show");
};

playlistBtn.addEventListener("click", () => {
  puddingModal.classList.remove("show");
  faceModal.classList.remove("show");
  playlist.classList.toggle("show");
});

faceBtn.addEventListener("click", () => {
  puddingModal.classList.remove("show");
  playlist.classList.remove("show");
  faceModal.classList.toggle("show");
});

puddingBtn.addEventListener("click", () => {
  faceModal.classList.remove("show");
  playlist.classList.remove("show");
  puddingModal.classList.toggle("show");
});

container.addEventListener("click", e => {
  if (!playlist.contains(e.target)) {
    playlist.classList.remove("show");
  }
  if (!faceForm.contains(e.target)) {
    faceModal.classList.remove("show");
  }
  if (!puddingForm.contains(e.target)) {
    puddingModal.classList.remove("show");
  }
});

// close modals

const closeBtns = document.querySelectorAll(".close");

closeBtns.forEach(close => {
  close.addEventListener("click", e => {
    e.target.parentNode.parentNode.classList.remove("show");
  });
});

// toggle fullscreen

const toggleFullscreenBtn = document.querySelector(".fullscreen");

document.addEventListener("fullscreenchange", function(event) {
  width = window.innerWidth;
  height = window.innerHeight;
});

toggleFullscreenBtn.addEventListener("click", () => {
  toggleFullScreen();
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    toggleFullscreenBtn.innerText = "close fullscreen";
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      toggleFullscreenBtn.innerText = "open fullscreen";
    }
  }
}

// youtube
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    playerVars: { autoplay: 1, controls: 1 },
    height: "180",
    width: "320",
    videoId: "qp5UtJJbgQE",
    events: {
      onReady: onPlayerReady
      // onStateChange: onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
//   if (event.data == YT.PlayerState.PLAYING && !done) {
//     setTimeout(stopVideo, 6000);
//     done = true;
//   }
// }
// function stopVideo() {
//   player.stopVideo();
// }

// max velocity
const velMax = 5;
const velMin = -5;
// max x axis - generate
const xMax = width / 1.5;
const xMin = 150;
// max y axis - generate
const yMax = height / 1.5;
const yMin = 150;
// max pudding size
const sMax = 200;
const sMin = 50;

const rotateMax = 360;
const rotateMin = 0;

// generate random puddings
pudding.forEach(el => {
  let elSize = Math.floor(Math.random() * (sMax - sMin)) + sMin;

  let x = Math.floor(Math.random() * (xMax - xMin)) + xMin;
  let y = Math.floor(Math.random() * (yMax - yMin)) + yMin;

  let velX = Math.random() * (velMax - velMin) + velMin;
  let velY = Math.random() * (velMax - velMin) + velMin;

  setInterval(() => {
    if (x + elSize >= width) {
      velX = -velX;
    }

    if (x + 10 <= 0) {
      velX = -velX;
    }

    if (y + elSize >= height) {
      velY = -velY;
    }

    if (y + 10 <= 0) {
      velY = -velY;
    }

    x += velX;
    y += velY;

    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.width = `${elSize}px`;
    el.style.height = `${elSize}px`;
  }, 10);
});
