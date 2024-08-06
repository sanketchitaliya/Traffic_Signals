const getSecondAll = document.getElementById("getSecondAll");
const side1 = document.getElementById("side1");
const side2 = document.getElementById("side2");
const side3 = document.getElementById("side3");
const side4 = document.getElementById("side4");
const side = document.querySelectorAll(".same");

function calculation(){
    let num = getSecondAll.value;
     let divide = Math.floor(num/4);
    return divide;
}

let firstNumber;

function calculationSide(){

     firstNumber = side1.value;
    let secondNumber = side2.value;
    let thirdNumber = side3.value;
    let fourNumber = side4.value;
    console.log(firstNumber);
}

//const time = 25000;
function lightToggle(){
   
    let count = 0;

    function updateLight(){
       side.forEach((side,index)=>{
           const lightColor = side.querySelectorAll(".light");
           lightColor.forEach((light)=>{
              light.classList.add("close");
           });
           if (index === count) {
            lightColor[2].classList.remove('close'); 
        } else {
            lightColor[0].classList.remove('close'); 
        }
       })
       count = count + 1;
       if(count>4){
         count = 0;
       }
    }
   
    
    updateLight();

    setInterval(updateLight,1000);

}

lightToggle();
//setInterval(lightToggle,4000)
 


































