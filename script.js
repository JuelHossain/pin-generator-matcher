const $ = (id) => document.getElementById(id);

const pinGeneratorInput = $("pinGeneratorInput");
const pinGeneratorButton = $("pinGeneratorButton");

const buttons = $("buttons");
const pinInput = $("pinInput");
const left = $("left");

const error = $("error");
const success = $("success");
const empty = $("empty");

const submit = $("matcherButton");

const noticlear = () => {
  error.style.display = "none";
  success.style.display = "none";
  empty.style.display = "none";
};
const notification = (status) => {
  noticlear();
  if (status === "error") {
    error.style.display = "block";
  } else if (status === "empty") {
    empty.style.display = "block";
  } else {
    success.style.display = "block";
  }
};

const generatePin = () => {
  const pin = Math.round(Math.random() * 10000);
  if (pin.toString().length === 4) {
    left.innerText = 3;
    noticlear();
    pinGeneratorInput.value = pin;
  } else {
    generatePin();
  }
};

pinGeneratorButton.addEventListener("click", generatePin);
buttons.addEventListener("click", (e) => {
  const number = e.target.innerText;
  if (isNaN(number)) {
    switch (number) {
      case "C":
        pinInput.value = "";
        break;
      case "<":
        const pValue = pinInput.value.split("");
        pValue.pop();
        pinInput.value = pValue.join("");
        break;
      case "Submit":
        if (pinGeneratorInput.value === "") {
          notification("empty");
        } else if (pinGeneratorInput.value === pinInput.value) {
          notification();
          left.innerText = 3;
          pinInput.value = "";
          pinGeneratorInput.value = "";
        } else {
          notification("error");
          const leftNumber = parseInt(left.innerText);
          if (leftNumber > 1) {
            left.innerText = leftNumber - 1;
          } else {
            left.parentElement.innerText = "You are blocked";
            submit.disabled = true;
            error.style.display = "none";
          }
        }
        break;

      default:
        break;
    }
  } else {
    pinInput.value += number;
  }
});
