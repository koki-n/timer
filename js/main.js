// 再生、一時停止、リプレイ
const play = document.getElementById("timerOptionPlay");
const pause = document.getElementById("timerOptionPause");
const replay = document.getElementById("timerOptionReplay");

// 動画とbgm
const video = document.getElementById("backVideoSrc");
const song = document.getElementById("song");

// 時間変更ボタン
const timeSelect = document.querySelectorAll(".time-select button");

// アイコン
const icon = document.getElementById("playerSelectIcon");

// 動画とbgm変更ボタン
const sounds = document.getElementById("playerSelectVideo");

// タイマーの秒数
const min = document.getElementById("playerSelectTimerMin");
const sec = document.getElementById("playerSelectTimerSec");

const timerIcon = document.getElementById("playerSelectCircleImg");

// タイマーの円
const outline = document.getElementById("playerSelectCircleSvgCircle");

// svg画像の長さを取得
const outlineLength = outline.getTotalLength();

// 線の間隔を調整
outline.style.strokeDasharray = outlineLength;

// はじめの秒数
let fakeDuration = 600;

//タイマーの円を減らしていくための分母とリセットのための保存用
let save = 600;

// 現在の時間
let currentTime = 0;

const calcMin = Math.floor(fakeDuration / 60);
const calcSec = Math.floor(fakeDuration % 60);

min.textContent = calcMin < 10 ? "0" + calcMin + ":" : calcMin + ":";
sec.textContent = calcSec < 10 ? "0" + calcSec : calcSec;

sounds.addEventListener("click", function () {
  let songSrc = song.getAttribute("src");
  if (songSrc == "./sound/aranami.mp3") {
    song.src = "./sound/bonfire.mp3";
    video.src = "./video/Fire.mp4";
    icon.src = "./img/fireball.png";
    timerIcon.src = "./img/deskwork.png";
  } else if (songSrc == "./sound/bonfire.mp3") {
    song.src = "./sound/windybird.mp3";
    video.src = "./video/Forest.mp4";
    icon.src = "./img/forest.png";
    timerIcon.src = "./img/coffee.png";
  } else if (songSrc == "./sound/windybird.mp3") {
    song.src = "./sound/aranami.mp3";
    video.src = "./video/sea.mp4";
    icon.src = "./img/wave.png";
    timerIcon.src = "./img/deskwork.png";
  }
});

play.addEventListener("click", function () {
  playing();
});
pause.addEventListener("click", function () {
  stop();
});
replay.addEventListener("click", function () {
  replayBtn();
  stop();
});

const playing = () => {
  if (video.paused) {
    video.play();
    song.play();
    countDownTimer();
    smoothCircle();
  }
};
const stop = () => {
  if (!video.paused) {
    video.pause();
    song.pause();
  }
};
const replayBtn = () => {
  fakeDuration = save;
  currentTime = 0;
  outline.style.strokeDashoffset = 0;
  const calcMin = Math.floor(fakeDuration / 60); //分数変換
  const calcSec = Math.floor(fakeDuration % 60); //秒数変換
  min.textContent = calcMin < 10 ? "0" + calcMin + ":" : calcMin + ":";
  sec.textContent = calcSec < 10 ? "0" + calcSec : calcSec;
};

timeSelect.forEach((option) => {
  option.addEventListener("click", function () {
    video.pause();
    song.pause();
    currentTime = 0;
    fakeDuration = this.getAttribute("data-time"); //クリックしたボタンの秒数取得
    save = this.getAttribute("data-time"); //クリックしたボタンの秒数保存（リプレイとcircle削る際に使用）
    const calcMin = Math.floor(fakeDuration / 60);
    const calcSec = Math.floor(fakeDuration % 60);
    min.textContent = calcMin < 10 ? "0" + calcMin + ":" : calcMin + ":";
    sec.textContent = calcSec < 10 ? "0" + calcSec : calcSec;
  });
});

const countDownTimer = () => {
  let count = setInterval(function () {
    if (fakeDuration <= 0 || video.paused) {
      clearInterval(count);
      return;
    }
    currentTime++;
    fakeDuration--;
    let seconds = Math.floor(fakeDuration % 60);
    let minutes = Math.floor(fakeDuration / 60);
    min.textContent = minutes < 10 ? "0" + minutes + ":" : minutes + ":";
    sec.textContent = seconds < 10 ? "0" + seconds + ":" : seconds;
  }, 1000);
};
const smoothCircle = () => {
  let smoothSave = save * 10;
  let smoothCurrentTime = 0;

  let moveCircle = setInterval(function () {
    if (fakeDuration <= 0 || video.paused) {
      clearInterval(moveCircle);
      return;
    }
    smoothCurrentTime++;
    let progress = 0 + (smoothCurrentTime / smoothSave) * outlineLength; //経過時間 / 現在の時間 * svg画像の長さ
    outline.style.strokeDashoffset = progress;
  }, 100);
};
