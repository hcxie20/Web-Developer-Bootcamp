var btn = document.querySelector("button");
var text = document.querySelector("p");
var btn_back = document.querySelector("button#changeBackground")
var isBGWhite = true

btn.addEventListener("click", function(){
    text.textContent = "Someone clicked me";
})

btn_back.addEventListener("click", changeBG);


// function changeBG(){
//     if (isBGWhite){
//         document.body.style.backgroundColor = "black";
//         isBGWhite = false;
//     } else {
//         document.body.style.backgroundColor = "white";
//         isBGWhite = true;
//     }
// }

function changeBG(){
    document.body.classList.toggle("purple");
}

// ------------------------------------------
// score game:

var btn_p1 = document.querySelector("button#btn_p1")
var btn_p2 = document.querySelector("button#btn_p2")
var btn_reset = document.querySelector("button#btn_reset")
var input_text = document.querySelector("input#games")
var games = 5;
var end_flag = false;

btn_p1.addEventListener("click", function(){
    btn_p_clicked(1);
});

btn_p2.addEventListener("click", function(){
    btn_p_clicked(2)
})

function btn_p_clicked(p_num){
    if (!end_flag){
        var target = undefined
        if (p_num == 1){
            target = document.querySelector("span#score1");
        } else {
            target = document.querySelector("span#score2")
        }
        tmp = parseInt(target.textContent) + 1;
        if (tmp != games + 1){
            target.textContent = tmp;
        } 
        if (tmp == games) {
            end_flag = true;
        }
    }
}

btn_reset.addEventListener("click", function(){
    end_flag = false;
    document.querySelector("span#score1").textContent = 0
    document.querySelector("span#score2").textContent = 0
})

input_text.addEventListener("keyup", function(){
    games = parseInt(input_text.value)
    document.querySelector("span#num_game").textContent = games
})
