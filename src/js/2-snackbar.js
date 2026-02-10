import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const selectedState = document.querySelector('input[name="state"]:checked');
  const delay = document.querySelector('input[name="delay"]').value;
  if (!selectedState) return;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState.value == 'fulfilled') {
        resolve(delay);
      } else if (selectedState.value == 'rejected') {
        reject(delay);
      }
    }, delay);
  })
    .then(value => {
      iziToast.show({
        title: 'Promise resolved',
        message: `✅ Fulfilled promise in ${value}ms`,
      });
    })
    .catch(error => {
      {
        iziToast.show({
          title: 'Promise rejected',
          message: `❌ Rejected promise in ${error}ms`,
        });
      }
    });
});
