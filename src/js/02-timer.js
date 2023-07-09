import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

btnEl.disabled = true;
let chosenTime = null; 
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    chosenTime = selectedDates[0];
    if ((options.defaultDate - selectedDates[0]) >= 0) {
      Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      btnEl.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

btnEl.addEventListener('click', onBtn);

function onBtn() {
  let timerId = null;
  timerId = setInterval(() => { 
    const currentTime = new Date();
    const timeLeft = chosenTime - currentTime;
    if (timeLeft > 0) {
      const formatTime = convertMs(timeLeft);
      days.textContent = addLeadingZero(formatTime.days);
      hours.textContent = addLeadingZero(formatTime.hours);
      minutes.textContent = addLeadingZero(formatTime.minutes);
      seconds.textContent = addLeadingZero(formatTime.seconds);
    } else {
      clearInterval(timerId);
    }
  }, 1000)
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
