let stopSignalSign = false;
let signals = [];

const stopSignal = () => {
  setInterval(() => {
    if (stopSignalSign) {
      document.querySelectorAll(".yellowSignal").forEach((light) => {
        light.style.background = "rgb(247, 227, 0)";
      });
    } else {
      document.querySelectorAll(".yellowSignal").forEach((light) => {
        light.style.transition = "background 0.4s";
        light.style.background = "rgb(53, 48, 0)";
      });
    }
    stopSignalSign = !stopSignalSign;
  }, 900);
};

//this function will take duration of timer and which signal you want to set timer
const setSignalTimer = (timeDuration, signalTimer, type) => {
  let signalLightIndex = signals.indexOf(signalTimer);
  let signalLightRed = document.querySelectorAll(".redSignal")[signalLightIndex];
  let signalLightGreen = document.querySelectorAll(".greenSignal")[signalLightIndex];

  let time = timeDuration;
  signalTimer.style.color = type == "red" ? "red" : "rgb(0, 255, 72)";
  signalLightRed.style.background = type == "red" ? "red" : "rgb(49, 0, 0)";
  signalLightGreen.style.background = (type == "green" ? "rgb(0, 255, 72)" : "rgb(0, 30, 0)");

  interval = setInterval(() => {
    if (time < 0) {
      signalTimer.style.color = (type == "red" ? "rgb(77, 1, 1)" : "rgb(0, 52, 0)");
      signalLightRed.style.background = (type == "red" ? "rgb(49, 0, 0" : "rgb(49, 0, 0)");
      signalLightGreen.style.background = (type == "green" ? "rgb(0, 30, 0)" : "rgb(0, 30, 0)");
      return;
    }
    signalTimer.value = time.toString().length == 1 ? `0${time}` : time;
    time--;
  }, 1000);
};

//Set Signal Time Ratio
const setSignalTimeRatio = (event) => {
  event.preventDefault();
  let totalTimeRatio = document.querySelector("#signalTIme").value;
  document.querySelector("#setBtn").style.pointerEvents = "none";
  document.querySelector("#setBtn").style.color = "gray";
  document.querySelectorAll(".alInputs").forEach((input) => {
    input.setAttribute("readonly", "readonly");
    input.style.color = "gray";
  });
  let signalDuration = [];
  document.querySelectorAll("#signalRatio").forEach((signal) => signalDuration.push(signal.value));
  let [firstSignalRatio, secondSignalRatio, thirdSignalRatio, fourthSignalRatio] = signalDuration.map(Number);

  if (firstSignalRatio + secondSignalRatio + thirdSignalRatio + fourthSignalRatio > 100) {
    alert("Sum of all signal durations should not exceed total time ratio. Please maintain!");
    return;
  }

  firstSignalRatio = Math.ceil((totalTimeRatio * firstSignalRatio) / 100);
  secondSignalRatio = Math.ceil((totalTimeRatio * secondSignalRatio) / 100);
  thirdSignalRatio = Math.ceil((totalTimeRatio * thirdSignalRatio) / 100);
  fourthSignalRatio = Math.ceil((totalTimeRatio * fourthSignalRatio) / 100);

  document.querySelectorAll(".timer").forEach((signal) => signals.push(signal));
  let [firstSignal, secondSignal, thirdSignal, fourthSignal] = signals;

  setSignalTimer(firstSignalRatio, firstSignal, "green");
  setSignalTimer(firstSignalRatio, secondSignal, "red");
  setSignalTimer(firstSignalRatio * 2, thirdSignal, "red");
  setSignalTimer(firstSignalRatio * 3, fourthSignal, "red");

  setTimeout(() => {
    setSignalTimer((secondSignalRatio + thirdSignalRatio + fourthSignalRatio), firstSignal, "red");
    setSignalTimer(secondSignalRatio, secondSignal, "green");
  }, (firstSignalRatio) * 1000);
  setTimeout(() => {
    setSignalTimer((firstSignalRatio + thirdSignalRatio + fourthSignalRatio) , secondSignal, "red");
    setSignalTimer(thirdSignalRatio, thirdSignal, "green");
  }, (firstSignalRatio + secondSignalRatio) * 1000);
  setTimeout(() => {
    setSignalTimer((firstSignalRatio + secondSignalRatio + fourthSignalRatio) , thirdSignal, "red");
    setSignalTimer(fourthSignalRatio, fourthSignal, "green");
  }, (firstSignalRatio + secondSignalRatio + thirdSignalRatio) * 1000);
};

//Watch Current Time
setInterval(() => {
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.querySelector(".curTime").textContent = time;
}, 1000);














let totalSeconds = document.getElementById("totalSeconds");
let leftSideRatio = document.getElementById("leftSideRatio");
let upperSideRatio = document.getElementById("upperSideRatio");
let rightSideRatio = document.getElementById("rightSideRatio");
let downSideRatio = document.getElementById("downSideRatio");
let apply = document.getElementById("apply");
let timeZone=[];
fetch('./time.json')
    .then((response) => response.json())
    .then((time) =>{timeZone=time.data});

    
let leftLight = {
    time: document.getElementById("leftSideTime"),
    red: document.getElementById("leftRedLight"),
    yellow: document.getElementById("leftYellowLight"),
    green: document.getElementById("leftGreenLight"),
    ratio: document.getElementById("leftSideRatio"),
    priority: 25
}

let upperLight = {
    time: document.getElementById("topSideTime"),
    red: document.getElementById("topRedLight"),
    yellow: document.getElementById("topYellowLight"),
    green: document.getElementById("topGreenLight"),
    ratio: document.getElementById("upperSideRatio"),
    priority: 25
}

let rightLight = {
    time: document.getElementById("rightSideTime"),
    red: document.getElementById("rightRedLight"),
    yellow: document.getElementById("rightYellowLight"),
    green: document.getElementById("rightGreenLight"),
    ratio: document.getElementById("rightSideRatio"),
    priority: 25
}

let lowerLight = {
    time: document.getElementById("bottomSideTime"),
    red: document.getElementById("bottomRedLight"),
    yellow: document.getElementById("bottomYellowLight"),
    green: document.getElementById("bottomGreenLight"),
    ratio: document.getElementById("downSideRatio"),
    priority: 25
}

let seconds;
let timer;
function getTiming() {
    seconds = document.getElementById("totalSeconds").value;
    let sumRatio = 0;
    let unchanged = document.querySelectorAll(".ratio")
    let changed = document.querySelectorAll(".changed");
    if (changed.length > 0) {
        changed.forEach((ele) => { sumRatio += parseInt(ele.value) });
        if (sumRatio > 100) {
            alert("set proper Light Ratio 'for perfect result set proper ratio'!");
            location.reload();
        }

        unchanged.forEach((ele) => { ele.value = Math.round((100 - sumRatio) / unchanged.length) });

        leftLight.priority = parseInt(document.getElementById("leftSideRatio").value);
        upperLight.priority = parseInt(document.getElementById("upperSideRatio").value);
        rightLight.priority = parseInt(document.getElementById("rightSideRatio").value);
        lowerLight.priority = parseInt(document.getElementById("downSideRatio").value);

        sumRatio = leftLight.priority + upperLight.priority + rightLight.priority + lowerLight.priority
        if (sumRatio == 101) {
            lowerLight.priority -= 1;
        }
        else if (sumRatio == 99) {
            lowerLight.priority += 1;
        }
        console.log(leftLight.priority, upperLight.priority, rightLight.priority, lowerLight.priority);

    }
    startSignal();
    continueSignal();
}

function startSignal() {
    setTimeout(function () { leftSignalOpen() }, 0);
    setTimeout(function () { upperSignalOpen() }, Math.round(seconds * leftLight.priority / 100) * 1000);
    setTimeout(function () { rightSignalOpen() }, Math.round((seconds * leftLight.priority / 100) + (seconds * upperLight.priority / 100)) * 1000);
    setTimeout(function () { downSignalOpen() }, Math.round((seconds * leftLight.priority / 100) + (seconds * upperLight.priority / 100) +
        (seconds * rightLight.priority / 100)) * 1000);
    CalculateTiming();
}

function setRatio(current) {
    current.classList.remove("ratio");
    current.classList.add("changed");
    if (leftLight.ratio.value.length >= 3 || upperLight.ratio.value.length >= 3 ||
        lowerLight.ratio.value.length >= 3 || rightLight.ratio.value.length >= 3) {
        alert("set proper Light Ratio");
    }
}

function CalculateTiming() {

    leftLight.time.innerHTML = 0;
    upperLight.time.innerHTML = Math.round(seconds * leftLight.priority / 100) - 1;
    rightLight.time.innerHTML = Math.round((seconds * leftLight.priority / 100) + (seconds * upperLight.priority / 100)) - 1;
    lowerLight.time.innerHTML = Math.round((seconds * leftLight.priority / 100) + (seconds * upperLight.priority / 100) +
        (seconds * rightLight.priority / 100)) - 1;

    leftLight.yellow.classList.remove("lightYellow");
    upperLight.yellow.classList.remove("lightYellow");
    lowerLight.yellow.classList.remove("lightYellow");
    rightLight.yellow.classList.remove("lightYellow");

    timer = setInterval(function () {

        leftLight.time.innerHTML -= 1;
        if (leftLight.time.innerHTML < 0) {
            leftLight.time.style.color = "red";
            leftLight.green.style.backgroundColor = "azure";
            leftLight.red.style.backgroundColor = "red";
            leftLight.time.innerHTML = Math.round((seconds * lowerLight.priority / 100) + (seconds * upperLight.priority / 100) +
                (seconds * rightLight.priority / 100)) - 1;
        }

        upperLight.time.innerHTML -= 1;

        if (upperLight.time.innerHTML < 0) {
            upperLight.time.style.color = "red";
            upperLight.green.style.backgroundColor = "azure";
            upperLight.red.style.backgroundColor = "red";
            upperLight.time.innerHTML = Math.round((seconds * leftLight.priority / 100) + (seconds * lowerLight.priority / 100) +
                (seconds * rightLight.priority / 100));
        }

        rightLight.time.innerHTML -= 1;

        if (rightLight.time.innerHTML < 0) {
            rightLight.time.style.color = "red";
            rightLight.green.style.backgroundColor = "azure";
            rightLight.red.style.backgroundColor = "red";
            rightLight.time.innerHTML = Math.round((seconds * leftLight.priority / 100) + (seconds * upperLight.priority / 100) +
                (seconds * lowerLight.priority / 100));
        }

        lowerLight.time.innerHTML -= 1;

        if (lowerLight.time.innerHTML < 0) {
            lowerLight.time.style.color = "red";
            lowerLight.green.style.backgroundColor = "azure";
            lowerLight.red.style.backgroundColor = "red";
            lowerLight.time.innerHTML = Math.round((seconds * leftLight.priority / 100) + (seconds * upperLight.priority / 100) +
                (seconds * rightLight.priority / 100));
        }
    }, 1000);
    leftLight.time.style.color = "red";
    leftLight.green.style.backgroundColor = "azure";
    leftLight.red.style.backgroundColor = "red";
    upperLight.time.style.color = "red";
    upperLight.green.style.backgroundColor = "azure";
    upperLight.red.style.backgroundColor = "red";
    lowerLight.time.style.color = "red";
    lowerLight.green.style.backgroundColor = "azure";
    lowerLight.red.style.backgroundColor = "red";
    rightLight.time.style.color = "red";
    rightLight.green.style.backgroundColor = "azure";
    rightLight.red.style.backgroundColor = "red";
}

function continueSignal() {
    setInterval(function () {
        clearInterval(timer);
        startSignal();
    }, 1 + seconds * 1000)
}

function leftSignalOpen() {
    const openTime = Math.round(seconds * leftLight.priority / 100) - 1;
    leftLight.time.innerHTML = openTime;
    leftLight.time.style.color = "green";
    leftLight.green.style.backgroundColor = "green";
    leftLight.red.style.backgroundColor = "azure";
}

function upperSignalOpen() {
    const openTime = Math.round(seconds * upperLight.priority / 100);
    upperLight.time.innerHTML = openTime;
    upperLight.time.style.color = "green";
    upperLight.green.style.backgroundColor = "green";
    upperLight.red.style.backgroundColor = "azure";
}

function rightSignalOpen() {
    const openTime = Math.round(seconds * rightLight.priority / 100);
    rightLight.time.innerHTML = openTime;
    rightLight.time.style.color = "green";
    rightLight.green.style.backgroundColor = "green";
    rightLight.red.style.backgroundColor = "azure";
}

function downSignalOpen() {
    const openTime = Math.round(seconds * lowerLight.priority / 100);
    lowerLight.time.innerHTML = openTime;
    lowerLight.time.style.color = "green";
    lowerLight.green.style.backgroundColor = "green";
    lowerLight.red.style.backgroundColor = "azure";
}

// function defaultLight(){
//     leftLight.yellow.style.backgroundColor = "yellow";
//     upperLight.yellow.style.backgroundColor = "yellow";
//     lowerLight.yellow.style.backgroundColor = "yellow";
//     rightLight.yellow.style.backgroundColor = "yellow";
// }
// defaultLight()

function practice() {
    
    console.log(timeZone);

    var d = new Date();
    console.log(d.getHours(), d.getMinutes(), d.getSeconds());
}
practice()


apply.addEventListener("click", getTiming);







function stopTrafficLights() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// You can call stopTrafficLights() if needed

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

      const sideEndTime = sideStartTimes[index] + timePerSide;
      if (remainingTime > sideStartTimes[index] && remainingTime <= sideEndTime) {
        lightColor[2].classList.remove("close");
        side.querySelector(".score").textContent = remainingTime - sideStartTimes[index];
      } else {
        lightColor[0].classList.remove("close");
        side.querySelector(".score").textContent = 0;
      }
    });

    remainingTime--;
  } else {
    remainingTime = totalSeconds; 
  }
}
