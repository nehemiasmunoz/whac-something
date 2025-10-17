const monsters = document.querySelectorAll(".monster");
const timeCounter = document.getElementById("timeCounter");
const startButton = document.getElementById("startButton");
const scoreText = document.getElementById("score");
const angryCatImg = "assets/images/angry_cat.png";
const happyCatImg = "assets/images/happy_cat.png";
const badCatImg = "assets/images/bad_cat.png";
const characters = [badCatImg, happyCatImg];

let score = 0;

let seconds = 30;
let intervalID;

function play() {
  monsters.forEach((monster) =>
    monster.addEventListener("click", function () {
      hitMonster(monster);
      monster.classList.toggle("disable");
    })
  );
  startCounter();
}

function hitMonster(monster) {
  let actualImg = monster.firstElementChild.attributes["src"].value;
  if (actualImg.endsWith("happy_cat.png")) {
    changeImage(monster);
    return;
  }
  if (actualImg.endsWith("bad_cat.png")) {
    incraseScore();
    return;
  }
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

function changeImage(monster, image = angryCatImg) {
  monster.firstElementChild.src = image;
}

function incraseScore() {
  score++;
  scoreText.textContent = score;
}

function updateTimeCounter() {
  seconds--;
  timeCounter.textContent = seconds;
  if (seconds % 2 == 0) {
    showMonster(getMonster(), 2000);
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
  changeImage(monster, getRamdomCharacter());
  monster.classList.remove("disable");
  const animation = monster.animate(
    [
      {
        transform: "translateY(100%)",
      },
      {
        transform: "translateY(0px)",
      },
      {
        transform: "translateY(100%)",
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

function getRamdomCharacter() {
  return characters[getRandomNumber(characters.length)];
}
