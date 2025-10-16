const monsters = document.querySelectorAll(".monster");
const timeCounter = document.getElementById("timeCounter");
const startButton = document.getElementById("startButton");
const scoreText = document.getElementById("score");

let score = 0;

let seconds = 30;
let intervalID;

function play() {
  monsters.forEach((monster) =>
    monster.addEventListener("click", function () {
      incraseScore();
      monster.classList.toggle("disable");
    })
  );
  startCounter();
}

function startCounter() {
  if (intervalID) {
    clearInterval(intervalID);
  }
  score = 0;
  seconds = 30;
  timeCounter.textContent = seconds;
  scoreText.textContent = score;
  intervalID = setInterval(updateTimeCounter, 1000);
}

function incraseScore() {
  score++;
  scoreText.textContent = score;
}

function updateTimeCounter() {
  seconds--;
  timeCounter.textContent = seconds;
  if (seconds % 2 == 0) {
    showMonster(getMonster());
  }
  if (seconds <= 0) {
    clearInterval(intervalID);
  }
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getMonster() {
  return monsters[getRandomNumber(monsters.length)];
}

function showMonster(monster, duration = 1500) {
  monster.classList.remove("disable");
  const animation = monster.animate(
    [
      {
        transform: "translateY(100)",
      },
      {
        transform: "translateY(0)",
      },
      {
        transform: "translateY(100)",
      },
    ],
    {
      duration: duration,
      fill: "forwards",
    }
  );
  animation.finished.then(() => {
    monster.classList.add("disable");
  });
}
