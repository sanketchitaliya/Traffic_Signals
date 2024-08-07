let stopSignalSign = false;
let signals = [];

const stopSignal = () => {
  setInterval(() => {
    if (stopSignalSign) {
      document.querySelectorAll(".yellowSignal").forEach(light => light.style.background = "rgb(247, 227, 0)");
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

setInterval(() => {
    if (time < 0) return;
  
    signalTimer.style.color = type == "red" ? "red" : "rgb(0, 255, 72)";
    signalLightRed.style.background = type == "red" ? "red" : "rgb(49, 0, 0)";
    signalLightGreen.style.background = (type == "green" ? "rgb(0, 255, 72)" : "rgb(0, 30, 0)");
    signalTimer.value = time.toString().length == 1 ? `0${time}` : time;
    time--;
  }, 1000);
};

//Set Signal Time Ratio
const setSignalTimeRatio = () => {
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
  setSignalTimer((firstSignalRatio + secondSignalRatio) , thirdSignal, "red");
  setSignalTimer((firstSignalRatio + secondSignalRatio + thirdSignalRatio) , fourthSignal, "red");

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

  setTimeout(() => setSignalTimeRatio() , ((firstSignalRatio + secondSignalRatio + thirdSignalRatio + fourthSignalRatio) * 1000));
};

//Watch Current Time
setInterval(() => {
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.querySelector(".curTime").textContent = time;
}, 1000);
