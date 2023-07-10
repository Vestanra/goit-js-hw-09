import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const inputDelay = document.querySelector('input[name=delay]');
const inputStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  let delayIn = Number(inputDelay.value);
  let stepIn = Number(inputStep.value);
  let amountIn = Number(inputAmount.value);

  for (let i = 1; i <= amountIn; i++) {
    createPromise(i, delayIn).then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      delayIn += stepIn;
    }
  }

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
      resolve ({ position, delay });
    } else {
      reject ({ position, delay });
    }
    }, delay)
  })
}


