"use strict";
var opr_buttons = document.querySelectorAll("div .operator");
var inp = document.getElementById("_input");
var numb_button = document.querySelectorAll("[data-number]");
var result = document.getElementById("result");
var clc = document.getElementById("clear");
var del = document.getElementById("del");
var resultDisplayed = false;

// console.log(numb_button);
// console.log(inp.innerHTML);
//e.target  در واقع میاد و به اون المانی اشاره می‌کند که در متد قرار دادیم. در اینجا به کلیدها اشاره می‌کند

//adding eventlistener to numbers
for (let i = 0; i < numb_button.length; i++) {
  numb_button[i].addEventListener("click", function (e) {
    var currentString = inp.innerHTML;
    //here is how the calculator won't let 0 number first
    if (currentString.length === 0 && e.target.innerHTML === "0") {
      console.log("Not zero number first!!");
      inp.innerHTML = "";
    } else if (currentString.includes(".") && e.target.innerHTML == ".") {
      alert("Only one decimal point!!");
    } else {
      inp.innerHTML += e.target.innerHTML;
    }
  });
}

//add eventListener to operator buttons
for (let i = 0; i < opr_buttons.length; i++) {
  opr_buttons[i].addEventListener("click", function (e) {
    var currentString = inp.innerHTML;
    var lastChar = currentString[currentString.length - 1];
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      var newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
      inp.innerHTML = newString;
    } else if (currentString.length == 0) {
      alert("Enter a number first!");
    } else {
      inp.innerHTML += e.target.innerHTML;
    }
  });
}

clc.addEventListener("click", function () {
  inp.innerHTML = "";
});

del.addEventListener("click", function () {
  var currentString = inp.innerHTML;
  inp.innerHTML = currentString.slice(0, currentString.length - 1);
});

result.addEventListener("click", function () {
  var inpString = inp.innerHTML;
  // here is how to split to get numbers
  var numbs = inpString.split(/\+|\-|\×|\÷/g);
  //here is how to get what operator we have(we used regularexpression flag=>/.../g)
  var operators = inpString.replace(/[0-9]|\./g, "").split("");
  console.log(inpString);
  console.log(numbs);
  console.log(operators);
  console.log("===============");
  //he indexOf() method returns the index of (the position of) the first occurrence of a specified text in a string
  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbs.splice(divide, 2, numbs[divide] / numbs[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }
  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbs.splice(multiply, 2, numbs[multiply] * numbs[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }
  var minus = operators.indexOf("-");
  while (minus != -1) {
    numbs.splice(
      minus,
      2,
      parseFloat(numbs[minus]) - parseFloat(numbs[minus + 1])
    );
    operators.splice(minus, 1);
    minus = operators.indexOf("-");
  }
  var addition = operators.indexOf("+");
  while (addition != -1) {
    numbs.splice(
      addition,
      2,
      parseFloat(numbs[addition]) + parseFloat(numbs[addition + 1])
    );
    operators.splice(addition, 1);
    addition = operators.indexOf("+");
  }
  inp.innerHTML = numbs[0];
});
