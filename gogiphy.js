function createBtn (name){
    var btn = $("<button>");

    btn.text(name);
    btn.attr("data-type", name);
    btn.addClass("btn btn-primary search-btn");

    $(".button-container").append(btn);
}

$("#create-btn").on("click", function(){
    event.preventDefault();

    var btnName = $("#form-input").val();
    console.log(btnName);
    createBtn(btnName);
})