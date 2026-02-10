import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate = new Date();
const startButton = document.querySelector('[data-start]');
const inputField = document.querySelector('#datetime-picker');
const values = document.querySelectorAll('.value');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (
      new Date(selectedDates[0]).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
    ) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      startButton.disabled = false;
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  inputField.disabled = true;

  const intervalId = setInterval(() => {
    const diff = userSelectedDate - new Date();
    if (diff < 0) {
      clearInterval(intervalId);
      inputField.disabled = false;
      values.forEach(el => {
        el.textContent = '00';
      });
      return;
    }
    let timeDataObj = convertMs(diff);
    values.forEach(el => {
      const key = Object.keys(el.dataset)[0];
      el.textContent = String(timeDataObj[key]).padStart(2, '0');
    });
  }, 1000);
});

flatpickr('#datetime-picker', options);
