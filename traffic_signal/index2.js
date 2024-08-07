let totalTime = document.getElementById("getSecondAll");
let side1time = document.getElementById("side1");
let side2time = document.getElementById("side2");
let side3time = document.getElementById("side3");
let side4time = document.getElementById("side4");

let firstNumber, secondNumber, thirdNumber, fourNumber;


function calculationSide(){
     
    let num = parseInt(getSecondAll.value);

  firstNumber = side1time.value * num/100;
  secondNumber = side2time.value * num/100;
  thirdNumber = side3time.value * num/100;
  fourNumber = side4time.value * num/100;
   console.log(firstNumber);
   console.log(secondNumber);
   console.log(thirdNumber);
   console.log(fourNumber);
   
}
