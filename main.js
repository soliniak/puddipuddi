const container = document.querySelector(".container");
const body = document.querySelector("body");
const pudding = document.querySelectorAll(".pudding");
let width = window.innerWidth;
let height = window.innerHeight;



// menu

// refresh btn
const refresBtn = document.querySelector(".refresh-icon");

refresBtn.addEventListener("click", () => {
  location.reload();
});



// change pudding
let flag = false;

const input = document.querySelector(".input");
const changeCake = document.querySelector(".change--cake--btn");

input.addEventListener("keyup", (e) => {
  flag = ValidURL(e.target.value);
});

function ValidURL(str)
{
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}

changeCake.addEventListener("click", () => {
  if(flag) {
    console.log(input.value);
    pudding.forEach((el) => {
      el.style.backgroundImage = `url(${input.value})`;
    })
  } else {
    console.log("incorrect url");
  }
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
