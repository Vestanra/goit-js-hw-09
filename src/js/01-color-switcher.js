const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body')

btnStart.addEventListener('click', onBtnStart);
btnStop.addEventListener('click', onBtnStop);

btnStop.disabled = true;
let timerId = null;

function onBtnStart() {
    btnStart.disabled = true;
    btnStop.disabled = false;
    changeColor();
};

function onBtnStop() {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(timerId);
};

function changeColor() {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

console.log('hh')