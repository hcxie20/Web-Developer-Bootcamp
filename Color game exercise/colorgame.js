var colors = generateRandomColors(6)

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var bgColor = "#232323";
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1")
var h1Color = "#steelblue";
var btn_reset = document.querySelector("button#reset")
var btn_easy = document.querySelector("button#easy")
var btn_hard = document.querySelector("button#hard")
var square_hard = document.querySelector("div.hard")
var nums = 6

btn_easy.addEventListener("click", function(){
    btn_easy.classList.add("selected");
    btn_hard.classList.remove("selected");
    nums = 3;
    reset();
    square_hard.classList.add("hide");
})

btn_hard.addEventListener("click", function(){
    btn_hard.classList.add("selected");
    btn_easy.classList.remove("selected");
    nums = 6
    reset();
    square_hard.classList.remove("hide");
})


colorDisplay.textContent = pickedColor;

for (var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = colors[i];

    squares[i].addEventListener("click", function(){
        var clickedColor = this.style.backgroundColor;
        if (clickedColor == pickedColor){
            messageDisplay.textContent = "Correct";
            changeColors(clickedColor)
            h1.style.backgroundColor = clickedColor;
            btn_reset.textContent = "Try again"
        } else {
            this.style.backgroundColor = bgColor;
            messageDisplay.textContent = "Try Again";
        }
    })
}

function changeColors(color){
    for (var i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num){
    var arr = [];
    for (var i = 0; i < num; i++){
        r = Math.floor(Math.random() * 256)
        g = Math.floor(Math.random() * 256)
        b = Math.floor(Math.random() * 256)
        var rgb =  "rgb(" + r + ", " + g + ", " + b + ")";
        arr.push(rgb);
    }
    return arr;
}

btn_reset.addEventListener("click", function(){reset()})

function reset(){
    colors = generateRandomColors(nums);
    pickedColor = pickColor();
    for (var i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = colors[i]
    }
    h1.style.backgroundColor = h1Color;
    colorDisplay.textContent = pickedColor;
    btn_reset.textContent = "New Colors";
    messageDisplay.textContent = "";
}
