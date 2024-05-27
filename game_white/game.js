// Make the page not scroll down when you press space
window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

import Player from "./Player.js";
import Ground from "./Ground.js";
import Background from "./Background.js";
import CactiController from "./CactiController.js";
import Score from "./Score.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_SPEED_START = 1;
const GAME_SPEED_INCREMENT = 0.00001;

// Normal Case
const GAME_WIDTH = 500;

// Testing Case
// const GAME_WIDTH = 650;

const GAME_HEIGHT = 250;
const PLAYER_WIDTH = 548 / 15;
const PLAYER_HEIGHT = 969 / 15;
const MAX_JUMP_HEIGHT = 200;
// const MIN_JUMP_HEIGHT = 150;
const MIN_JUMP_HEIGHT = 200;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GROUND_AND_CACTUS_SPEED = 0.5;

const BACKGROUND_WIDTH = 7200;
const BACKGROUND_HEIGHT = 200;
const BACKGROUND_SPEED = 0.1;

const CACTI_CONFIG = [
  { width: 48 / 1.2, height: 100 / 1.2, image: "game_white/images/cactus_1_white.png" },
  { width: 98 / 1.2, height: 100 / 1.2, image: "game_white/images/cactus_2_white.png" },
  { width: 68 / 1.2, height: 70 / 1.2, image: "game_white/images/cactus_3_white.png" },
];

//Game Objects
let player = null;
let ground = null;
let background = null;
let cactiController = null;
let score = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;

function createSprites() {
  const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
  const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
  const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
  const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

  const groundWidthInGame = GROUND_WIDTH * scaleRatio;
  const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

  const backgroundWidthInGame = BACKGROUND_WIDTH * scaleRatio;
  const backgroundHeightInGame = BACKGROUND_HEIGHT * scaleRatio;

  player = new Player(
    ctx,
    playerWidthInGame,
    playerHeightInGame,
    minJumpHeightInGame,
    maxJumpHeightInGame,
    scaleRatio
  );

  ground = new Ground(
    ctx,
    groundWidthInGame,
    groundHeightInGame,
    GROUND_AND_CACTUS_SPEED,
    scaleRatio
  );

  background = new Background(
    ctx,
    backgroundWidthInGame,
    backgroundHeightInGame,
    BACKGROUND_SPEED,
    scaleRatio
  );

  const cactiImages = CACTI_CONFIG.map((cactus) => {
    const image = new Image();
    image.src = cactus.image;
    return {
      image: image,
      width: cactus.width * scaleRatio,
      height: cactus.height * scaleRatio,
    };
  });

  cactiController = new CactiController(
    ctx,
    cactiImages,
    scaleRatio,
    GROUND_AND_CACTUS_SPEED
  );

  score = new Score(ctx, scaleRatio);
}

function setScreen() {
  scaleRatio = getScaleRatio();
  canvas.width = GAME_WIDTH * scaleRatio;
  canvas.height = GAME_HEIGHT * scaleRatio;
  createSprites();
}

setScreen();
//Use setTimeout on Safari mobile rotation otherwise works fine on desktop
window.addEventListener("resize", () => setTimeout(setScreen, 500));

if (screen.orientation) {
  screen.orientation.addEventListener("change", setScreen);
}

function getScaleRatio() {
  const screenHeight = Math.min(
    window.innerHeight,
    document.documentElement.clientHeight
  );

  const screenWidth = Math.min(
    window.innerWidth,
    document.documentElement.clientWidth
  );

  //window is wider than the game width
  if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
    return screenWidth / GAME_WIDTH;
  } else {
    return screenHeight / GAME_HEIGHT;
  }
}

function showGameOver() {
  const fontSize = 90 * scaleRatio;
  ctx.font = `${fontSize}px VT323`;
  ctx.fillStyle = "white";
  const x = canvas.width / 5.7;
  const y = canvas.height / 1.5;
  ctx.fillText("GAME OVER", x, y);
}

function setupGameReset() {
  if (!hasAddedEventListenersForRestart) {
    hasAddedEventListenersForRestart = true;

    setTimeout(() => {
      window.addEventListener("keyup", reset, { once: true });
      window.addEventListener("touchstart", reset, { once: true });
    }, 1000);
  }
}

function reset() {
  if (waitingToStart) {
    hasAddedEventListenersForRestart = false;
    gameOver = false;
    waitingToStart = false;
    ground.reset();
    background.reset();
    cactiController.reset();
    score.reset();
    gameSpeed = GAME_SPEED_START;
  }
}

function showStartGameText() {
  const fontSize = 30 * scaleRatio;
  ctx.font = `${fontSize}px VT323`;
  ctx.fillStyle = "white";
  const x = canvas.width / 9;
  const y = canvas.height / 2;
  ctx.fillText("Tap Screen or Press Space To Jump", x, y);
}

function updateGameSpeed(frameTimeDelta) {
  gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
}

function clearScreen() {
  // ctx.fillStyle = "rgba(0, 0, 0, 0)";
  // // ctx.fillStyle = "orange";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var playedOnce = false;

function gameLoop(currentTime) {

  if (!document.hasFocus() && playedOnce) {
    gameOver = true;
  }

  ctx.fillStyle = "rgba(46, 44, 48, 1)";

  /*
  ctx.fillStyle = window
    .getComputedStyle(document.body, null)
    .getPropertyValue("background-color");
  */

  if (previousTime === null) {
    previousTime = currentTime;
    requestAnimationFrame(gameLoop);
    return;
  }
  const frameTimeDelta = currentTime - previousTime;
  previousTime = currentTime;

  clearScreen();

  if (!gameOver && !waitingToStart) {
    //Update game objects
    ground.update(gameSpeed, frameTimeDelta);
    background.update(gameSpeed, frameTimeDelta);
    cactiController.update(gameSpeed, frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta);
    score.update(frameTimeDelta);
    updateGameSpeed(frameTimeDelta);
  }

  if (!gameOver && cactiController.collideWith(player)) {
    gameOver = true;
    setupGameReset();
    score.setHighScore();
  }

  //Draw game objects
  ground.draw();
  background.draw();
  cactiController.draw();
  player.draw();
  score.draw();

  if (gameOver) {
    showGameOver();

    // For scoreboard, comment these two lines
    waitingToStart = true;
    setupGameReset();

    // For scoreboard, uncomment these lines

    // let submitUsernameContainer = document.getElementById("submit-username-container");
    // submitUsernameContainer.style.display = "block";
    // let blackScreen = document.getElementById("black-screen");
    // blackScreen.style.display = "block";
  }

  if (waitingToStart) {
    // showStartGameText();
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

let usernameBtn = document.getElementById("usernameBtn");
usernameBtn.addEventListener("click", function () {
  submit_username();
});

let startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", function () {
  start_game();
  playedOnce = true;
});

function start_game() {
  window.addEventListener("keyup", reset, { once: true });
  window.addEventListener("touchstart", reset, { once: true });
  startBtn.style.display = "none";
  reset();
}

function submit_username() {
  let submitUsernameContainer = document.getElementById(
    "submit-username-container"
  );
  let blackScreen = document.getElementById("black-screen");
  let username = document.getElementById("username");
  console.log(username.value);
  console.log(score.score);
  submitUsernameContainer.style.display = "none";
  blackScreen.style.display = "none";
  waitingToStart = true;
  reset();
}
