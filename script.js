let counter = document.querySelector(".counter");
const modes = document.querySelectorAll(".btn");
const pomodoroBtn = document.querySelector(".pomodoro--btn");
const shortBtn = document.querySelector(".short--btn");
const longBtn = document.querySelector(".long--btn");
const start = document.querySelector(".start");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-icon");
const openModal = document.querySelector(".settings-icon");
const timeSetters = document.querySelectorAll('input[name="timesetter"]');
const pomodoroMode = document.querySelector(".timesetter__pomodoro");
const shortMode = document.querySelector(".timesetter__short");
const longMode = document.querySelector(".timesetter__long");
const applySettingsBtn = document.querySelector(".apply");
const root = document.querySelector(":root");

updatePomodoro();
updateFonts();

let myInterval;

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

openModal.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

applySettingsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updatePomodoro();
  updateFonts();
  modal.classList.add("hidden");

  clearInterval(myInterval)
});

document.addEventListener("click", (e) => {
  switch (e.target.dataset.mode) {
    case "pomodoro":
      counter.innerHTML = pomodoroMode.value + ":00";
      removeActiveMode();
      pomodoroBtn.classList.add("active");
      break;
    case "short":
      counter.innerHTML = shortMode.value + ":00";
      removeActiveMode();
      shortBtn.classList.add("active");
      break;
    case "long":
      counter.innerHTML = longMode.value + ":00";
      removeActiveMode();
      longBtn.classList.add("active");
      break;
  }
});

start.addEventListener("click", () => {
  if (myInterval !== null || myInterval !== undefined) {
    clearInterval(myInterval);
  }

  myInterval = setInterval(() => {
    let minutes = Number(counter.innerHTML.split(":")[0]);
    let seconds = Number(counter.innerHTML.split(":")[1]);
    seconds = seconds - 1;

    if (seconds < 0) {
      seconds = 59;
      minutes = minutes - 1;
    }

    counter.innerHTML = minutes + ":" + seconds;

    if (seconds < 10) {
      counter.innerHTML = minutes + ":0" + seconds;
    }
  }, 1000);
});

function removeActiveMode() {
  modes.forEach((mode) => {
    mode.classList.remove("active");
  });
  clearInterval(myInterval);
  myInterval = null;
}

function updatePomodoro() {
  counter.innerHTML = pomodoroMode.value + ":00";
}

function updateFonts() {
  let fontValue = document.querySelector('input[name="font-list"]:checked').id;
  if (fontValue == "georgia") {
    root.style.setProperty("--ff", "'Georgia', sans-serif");
  }
  if (fontValue == "mono") {
    root.style.setProperty("--ff", "monospace");
  }
  if (fontValue == "kumbh") {
    root.style.setProperty("--ff", "'Kumbh Sans', sans-serif");
  }
}
