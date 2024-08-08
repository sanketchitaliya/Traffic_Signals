const getSecondAll = document.getElementById("getSecondAll");
const side1 = document.getElementById("side1");
const side2 = document.getElementById("side2");
const side3 = document.getElementById("side3");
const side4 = document.getElementById("side4");
const sides = document.querySelectorAll(".same");

let firstNumber, secondNumber, thirdNumber, fourNumber;

let totalSeconds;

let secondShowArray = [];

sides.forEach((side, index) => {
  const lightColor = side.querySelectorAll(".yellow");
  const lightColorGreen = side.querySelectorAll(".green");
  const lightColorRed = side.querySelectorAll(".red");

  lightColor.forEach((light) => {
    light.classList.add("yellow");
  });

  lightColorGreen.forEach((light) => {
    light.classList.add("close");
  });

  lightColorRed.forEach((light) => {
    light.classList.add("close");
  });
});

function calculation() {
  if (timeUpdate()) {
    console.log("hello");
    return;
  }

  const lightColor = document.querySelectorAll(".yellow");

  lightColor.forEach((light) => {
    light.classList.add("close");
  });

  let num = parseInt(getSecondAll.value, 10);

  let totalPercent =
    parseInt(side1.value) +
    parseInt(side2.value) +
    parseInt(side3.value) +
    parseInt(side4.value);

  if (totalPercent !== 100) {
    alert("The total percentage must be 100.");
    return;
  }

  firstNumber = Math.floor((side1.value * num) / 100);
  secondNumber = Math.floor((side2.value * num) / 100);
  thirdNumber = Math.floor((side3.value * num) / 100);
  fourNumber = Math.floor((side4.value * num) / 100);

  totalSeconds = firstNumber + secondNumber + thirdNumber + fourNumber;

  document
    .querySelectorAll(".score")
    .forEach((ele) => secondShowArray.push(ele));

  let [leftSignal, upSignal, downSignal, rightSignal] = secondShowArray;

  setTimeout(() => {
    leftSideSignal(firstNumber, leftSignal, "green");
  }, 0);

  setTimeout(() => {
    leftSideSignal(firstNumber, upSignal, "red");
  }, 0);

  setTimeout(() => {
    leftSideSignal(firstNumber + secondNumber, downSignal, "red");
  }, 0);

  setTimeout(() => {
    leftSideSignal(
      firstNumber + secondNumber + thirdNumber,
      rightSignal,
      "red"
    );
  }, 0);

  setTimeout(() => {
    leftSideSignal(secondNumber + thirdNumber + fourNumber, leftSignal, "red");
  }, firstNumber * 1000 + 1000);

  setTimeout(() => {
    leftSideSignal(secondNumber, upSignal, "green");
  }, firstNumber * 1000 + 1000);

  setTimeout(() => {
    leftSideSignal(firstNumber + thirdNumber + fourNumber, upSignal, "red");
  }, (firstNumber + secondNumber) * 1000 + 1000);

  setTimeout(() => {
    leftSideSignal(thirdNumber, downSignal, "green");
  }, (firstNumber + secondNumber) * 1000 + 1000);

  setTimeout(() => {
    leftSideSignal(firstNumber + secondNumber + fourNumber, downSignal, "red");
  }, (firstNumber + secondNumber + thirdNumber) * 1000 + 1000);

  setTimeout(() => {
    leftSideSignal(fourNumber, rightSignal, "green");
  }, (firstNumber + secondNumber + thirdNumber) * 1000 + 1000);

  setTimeout(
    () => calculation(),
    (firstNumber + secondNumber + thirdNumber + fourNumber) * 1000 + 1000
  );
}

function leftSideSignal(second, leftSignal, colorSignal) {
  let signalIndex = secondShowArray.indexOf(leftSignal);
  let signalRed = document.querySelectorAll(".red")[signalIndex];
  let signalGreen = document.querySelectorAll(".green")[signalIndex];
  let time = second;
  let color = colorSignal;

  setInterval(() => {
    if (time < 0) return;

    if (color == "green") {
      signalGreen.classList.remove("close");
    } else {
      signalGreen.classList.add("close");
    }

    if (color == "red") {
      signalRed.classList.remove("close");
    } else {
      signalRed.classList.add("close");
    }

    leftSignal.innerHTML = time;

    time--;
  }, 1000);
}

setInterval(() => {
  timeUpdate();
}, 1000);

const timeUpdate = () => {
  let currentTime = new Date();
  let hour = currentTime.getHours().toString();
  let minute = currentTime.getMinutes().toString();

  storeData.forEach((ele) => {
    if (ele.startTime.slice(0, 2) >= hour && ele.endTime.slice(0, 2) <= hour) {
      console.log("iff");
      return true;
    } else {
      console.log("else");
      return false;
    }
  });
};

let storeData;

fetch("./time.json")
  .then((response) => response.json())
  .then((json) => (storeData = json.time));
