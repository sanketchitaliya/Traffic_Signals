 getSecondAll = document.getElementById("getSecondAll");
const side1 = document.getElementById("side1");
const side2 = document.getElementById("side2");
const side3 = document.getElementById("side3");
const side4 = document.getElementById("side4");
const sides = document.querySelectorAll(".same");

let firstNumber, secondNumber, thirdNumber, fourNumber;
let totalSeconds, sideTimes, intervalId;

function calculation() {
  let num = parseInt(getSecondAll.value, 10);
  let divide = Math.floor(num / 4);

  // firstNumber = divide;
  // secondNumber = divide;
  // thirdNumber = divide;
  // fourNumber = divide;

  firstNumber = side1.value * num/100;
  secondNumber = side2.value * num/100;
  thirdNumber = side3.value * num/100;
  fourNumber = side4.value * num/100;

  totalSeconds = firstNumber * 4;
  sideTimes = [firstNumber, firstNumber + secondNumber, firstNumber + secondNumber + thirdNumber, totalSeconds];

  updateDisplay();
  startTrafficLights();
}



function updateDisplay() {
  const secondShowSide1 = document.querySelector("#side-1 .second-show-side1");
  const secondShowSide2 = document.querySelector("#side-2 .second-show-side2");
  const secondShowSide3 = document.querySelector("#side-3 .second-show-side3");
  const secondShowSide4 = document.querySelector("#side-4 .second-show-side4");

  secondShowSide1.textContent = firstNumber;
  secondShowSide2.textContent = secondNumber;
  secondShowSide3.textContent = thirdNumber;
  secondShowSide4.textContent = fourNumber;
                      
}

function startTrafficLights() {
  let remainingTime = totalSeconds;
  let count = 0; 

  if (intervalId) {
    clearInterval(intervalId);
  }

  function updateLightsAndDisplay() {
    if (remainingTime > 0) {
      const timePerSide = Math.floor(totalSeconds / 4);
      const sideStartTimes = [
        0,
        timePerSide,
        timePerSide * 2,
        timePerSide * 3
      ];

      sides.forEach((side, index) => {
        const lightColor = side.querySelectorAll(".light");
        lightColor.forEach((light) => {
          light.classList.add("close");
        });
        const currentTime = remainingTime - sideStartTimes[index];
        const displayElement = side.querySelector(".score");
        
        if (currentTime > 0 && currentTime <= timePerSide) {
          lightColor[2].classList.remove("close");
          displayElement.textContent = currentTime;
        } else {
          lightColor[0].classList.remove("close");
          displayElement.textContent = 0;
        }
      });

      remainingTime--;
    } else {
      remainingTime = totalSeconds; 
    }
  }

  intervalId = setInterval(updateLightsAndDisplay, 1000);
}

document.getElementById("submit-1").addEventListener("click", calculation);
//document.getElementById("submit-4").addEventListener("click", calculationSide);
