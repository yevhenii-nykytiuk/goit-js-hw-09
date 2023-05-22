import Notiflix from 'notiflix';

const formBtnSubmit = document.querySelector(".form");

formBtnSubmit.addEventListener("click", hendlerOnClickCreatePromise);

function hendlerOnClickCreatePromise(e) {

  e.preventDefault();

  const firstDelay = formBtnSubmit.delay.value;
  const delayStep = formBtnSubmit.step.value;
  const amount = formBtnSubmit.amount.value;

    for (let i = 0; i < amount; i += 1) {
      let position = i + 1;
      const delays = Number(firstDelay) + delayStep * i;

      createPromise(position, delays)
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
    }
  
  e.currentTarget.reset();
}

  function createPromise(position, delay) {

    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({
            position,
            delay
          });
        } else {
          reject({
            position,
            delay
          });
        }
      }, delay);
    })

  }