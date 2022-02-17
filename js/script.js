const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const sendBtn = document.querySelector(".control-buttons__send");
const clearBtn = document.querySelector(".control-buttons__clear");
const popup = document.querySelector(".popup");
const inputArray = [username, pass, pass2, email];

const clearInputs = () => {
  inputArray.forEach((el) => {
    el.value = "";
    clearError(el);
  });
};

const checkForm = (input) => {
  input.forEach((el) => {
    if (el.value === "") {
      console.log(el.placeholder);
      showError(el, el.placeholder);
    } else {
      clearError(el);
    }
  });
};

const showError = (input, msg) => {
  //argument INPUT przehowuje nasze INPUTy (el)
  //agrument MSG przechowuje placeholder

  const formBox = input.parentElement;
  console.log(formBox);
  const errorMsg = formBox.querySelector(".formBox__errorText");

  formBox.classList.add("error");
  errorMsg.textContent = msg;
};

const clearError = (input) => {
  const formBox = input.parentElement;
  formBox.classList.remove("error");
};

const checkLength = (input, minValue) => {
  if (input.value.length < minValue) {
    showError(
      input,
      `${input.previousElementSibling.innerText.slice(
        0,
        -1
      )} składa się z min. ${minValue} znaków`
    );
  }
};

const chceckPassword = (passwdOne, passwdTwo) => {
  if (passwdOne.value !== passwdTwo.value) {
    showError(passwdTwo, "Hasła do siebie nie pasują");
  }
};

const checkMail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email.value)) {
    clearError(email);
  } else {
    showError(email, `E-mail jest niepoprawny`);
  }
};

const checkErrors = () => {
  const allInputs = document.querySelectorAll(".formBox");
  let errorCount = 0;

  allInputs.forEach((el) => {
    if (el.classList.contains("error")) {
      errorCount++;
    }
  });

  if (errorCount === 0) {
    popup.classList.add("show-popup");
  }
};

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearInputs();
});

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkForm(inputArray);
  checkLength(username, 5);
  checkLength(pass, 10);
  chceckPassword(pass, pass2);
  checkMail(email);
  checkErrors();
});

//argument INPUT z funkcji "checkForm" przechowuje tablice z naszymi inputami
//argument EL odnosi się do każdje zmiennej, którą umieściliśmy w tablicy
