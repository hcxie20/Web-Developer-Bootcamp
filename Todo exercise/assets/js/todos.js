$("ul").on("click", "li", function(){
    // // if($(this).css("color") === "gray"){} this one donsnt work
    // console.log($(this).css("color"))
    // if($(this).css("color") === "rgb(128, 128, 128)"){
    //     $(this).css({
    //         "color": "black",
    //         "textDecoration": "none",
    //     })
    // } else {
    // $(this).css({
    //     "color": "gray",
    //     "textDecoration": "line-through",
    // })}
    $(this).toggleClass("completed");
})
$("ul").on("click", "span", function(event){
    event.stopPropagation();
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
})
$("input[type='text']").keypress(function(event){
    if (event.which === 13){
        text = $(this).val();
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + text + "</li>");
        $(this).val("");
    }
})

$("span#plus").click(function(){
    $("input").fadeToggle()
})