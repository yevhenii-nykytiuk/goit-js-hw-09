
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const colorStart = document.querySelector('button[data-start]');
const colorStop = document.querySelector('button[data-stop]');

colorStart.addEventListener("click", hendlerOnClickColorStart);
colorStop.addEventListener("click", hendlerOnClickColorStop);

let intervalId = null;

colorStop.disabled = true;

function hendlerOnClickColorStart({target}) {

  target.setAttribute("disabled", true);
  colorStop.removeAttribute("disabled");

    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function hendlerOnClickColorStop({target}) {
  target.setAttribute("disabled", true);
  colorStart.removeAttribute("disabled");
  clearInterval(intervalId);
}

