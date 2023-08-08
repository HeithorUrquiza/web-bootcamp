$("h1").attr("class", "big-title margin-50")

$(document).keydown(function (event) {
    $("h1").text(event.key)
})