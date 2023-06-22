import Notiflix from 'notiflix';

const formBtnSubmit = document.querySelector(".form");

formBtnSubmit.addEventListener("submit", hendlerOnClickCreatePromise);

function hendlerOnClickCreatePromise(e) {

  e.preventDefault();

  let inputForm = e.target.elements;

  let firstDelay = Number(inputForm.delay.value);
  let delayStep = Number(inputForm.step.value);
  let amount = Number(inputForm.amount.value);

  if (firstDelay <= 0 || delayStep <= 0 || amount <= 0) {
    Notiflix.Notify.failure("Менше або дорівнює нуль не проходить!");
    return;
  }

  for (let position = 1; position <= amount; position += 1) {

    const delay = firstDelay + delayStep * (position - 1);

      createPromise(position, delay)
        .then(({
          position,
          delay
        }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({
          position,
          delay
        }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      
      // firstDelay += delayStep * i;
    }
  
  e.target.reset();
}

  function createPromise(position, delay) {

    return new Promise((resolve, reject) => {

      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    })
  }

// fetch("").then(response => response.json());