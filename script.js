const bill = document.querySelector(".bill");
const tips = document.querySelectorAll(".tip");
const customTip = document.querySelector(".custom-tip");
const numberOfPeople = document.querySelector(".people_num");
const resetBtn = document.querySelector(".button");
const inputsText = document.querySelectorAll("input[type=text]");

// result
const tipResult = document.querySelector(".tip-result");
const totalResult = document.querySelector(".total-result");

// error
const errorMsg = document.querySelectorAll(".error-msg");
const billError = document.querySelector(".bill-error");
const numberOfPeopleError = document.querySelector(".num_of_ppl-error");
const customTipError = document.querySelector(".custom-tip-error");

// check bill
function validBill(bill) {
  if (bill < 0 || isNaN(bill) || bill === 0 || bill === "") {
    billError.setAttribute("aria-invalid", "true");
    billError.style.visibility = "visible";
    // Checks if the bill is negative or not a number
    if (bill < 0 || isNaN(bill)) {
      billError.textContent = "Invalid number";
    }
    // Checks if the bill is 0 or nothing
    else if (bill === 0 || bill === "") {
      billError.textContent = "Can't be zero";
    }
    return true;
  }
  billError.setAttribute("aria-invalid", "false");
  billError.style.visibility = "hidden";
  return false;
}




// choose a tip
// take the value from bill
// take the value from num of people
// if one of them is empty or none valid then don't calculate
// if all good then calculate

// reset button
resetBtn.addEventListener("click", () => {
  tipResult.innerHTML = "$0.00";
  totalResult.innerHTML = "$0.00";
  bill.value = "";
  numberOfPeople.value = "";
  customTip.value = "";
});

// calculate the result
tips.forEach((tip) => {
  tip.addEventListener("click", () => {
    // get the value from the user
    const billValue = +bill.value.trim();
    const numOfPeopleValue = +numberOfPeople.value.trim();
    const customTipValue = +customTip.value.trim();
    const tipValue = tipMaker(tip);

    // calculate the result if the inputs are valid
    if (
      !validBill(billValue) &&
      validNumOfPeople(numOfPeopleValue) &&
      customTipValidation(customTipValue)
    ) {
      const tipPerPerson = (billValue * tipValue) / numOfPeopleValue;
      const totalPerPerson = billValue / numOfPeopleValue + tipPerPerson;

      tipResult.innerHTML = `$${tipPerPerson.toFixed(2)}`;
      totalResult.innerHTML = `$${totalPerPerson.toFixed(2)}`;
    }
  });
});

// change the cursor direction to rtl
// inputsText.forEach((input) => {
//   input.addEventListener("keyup", (e) => {
//     // change the cursor direction back to ltr when "Backspace"
//     if (e.key === "Backspace") {
//       input.setSelectionRange(999999, -1);
//     } else {
//       input.setSelectionRange(0, 0);
//     }
//   });
// });

// example: 50% -> 0.5
function tipMaker(tip) {
  let tipString = tip.value.toString();
  if (tipString.includes("%")) {
    tipString = tipString.replace("%", "");
  }
  const newTip = parseInt(tipString);
  return newTip / 100;
}

// custom tip validation
function customTipValidation(customTip) {
  if (
    customTip !== 0 ||
    customTip > 0 ||
    customTip !== "" ||
    isNaN(customTip)
  ) {
    customTipError.setAttribute("aria-invalid", "false");
    return true;
  }
  customTipError.setAttribute("aria-invalid", "true");
  return false;
}

// Checks if the bill is a valid number
// function validBill(billValue) {
//   if (billValue === 0 || billValue === "") {
//     billError.innerHTML = "Can't be zero";
//     bill.setAttribute("aria-invalid", "true");
//     errorMsg[0].style.visibility = "visible";
//     return false;
//   } else if (isNaN(billValue) || billValue < 0) {
//     billError.innerHTML = "Invalid number";
//     bill.setAttribute("aria-invalid", "true");
//     errorMsg[0].style.visibility = "visible";
//     return false;
//   }
//   bill.setAttribute("aria-invalid", "false");
//   errorMsg[0].style.visibility = "hidden";
//   return true;
// }

// Checks if the number of people is a valid number
function validNumOfPeople(numOfPeopleValue) {
  if (numOfPeopleValue === 0 || numOfPeopleValue === "") {
    numberOfPeopleError.innerHTML = "Can't be zero";
    numberOfPeople.setAttribute("aria-invalid", "true");
    errorMsg[2].style.visibility = "visible";
    return false;
  } else if (
    isNaN(numOfPeopleValue) ||
    numOfPeopleValue < 0 ||
    !Number.isInteger(numOfPeopleValue)
  ) {
    numberOfPeopleError.innerHTML = "Invalid number";
    numberOfPeople.setAttribute("aria-invalid", "true");
    errorMsg[2].style.visibility = "visible";
    return false;
  }
  numberOfPeople.setAttribute("aria-invalid", "false");
  errorMsg[2].style.visibility = "hidden";
  return true;
}
