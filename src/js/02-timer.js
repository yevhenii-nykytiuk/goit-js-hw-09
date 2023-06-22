import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';




const dateTime = document.getElementById('datetime-picker');
const dateStartBtn = document.querySelector('button[data-start]');

const dateStopBtn = document.querySelector(".data-start");

const timeDays = document.querySelector('span[data-days]');
const timeHours = document.querySelector('span[data-hours]');
const timeMinutes = document.querySelector('span[data-minutes]');
const timeSeconds = document.querySelector('span[data-seconds]');

let intervalId = null;

dateStartBtn.disabled = true;
dateStopBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      dateStartBtn.disabled = true;
    } else {
      dateStartBtn.disabled = false;
      Notiflix.Notify.success('Good');
    }
  },
};

flatpickr(dateTime, options);


dateStartBtn.addEventListener("click", hendleOnBtnStartClick);

function hendleOnBtnStartClick() {

  dateStartBtn.disabled = true;
  dateTime.disabled = true;
  dateStopBtn.disabled = false;

  intervalId = setInterval(() => {
    const newDate = new Date(dateTime.value);
    const onStartingToClick = newDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(onStartingToClick);
    

    timeDays.textContent = addLeadingZero(days);
    timeHours.textContent = addLeadingZero(hours);
    timeMinutes.textContent = addLeadingZero(minutes);
    timeSeconds.textContent = addLeadingZero(seconds);

    if (onStartingToClick < 1000) {
      clearInterval(intervalId);
      dateStartBtn.disabled = false;
      dateTime.disabled = false;
    }
    
  }, 1000)
}


dateStopBtn.addEventListener("click", hendleOnBtnStopClick);

function hendleOnBtnStopClick () {
  clearInterval(intervalId);
  dateStopBtn.disabled = true;
  dateStartBtn.disabled = false;
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return {
    days,
    hours,
    minutes,
    seconds
  };
}


function addLeadingZero (value) {
  return `${value}`.padStart(2, "0");
}









