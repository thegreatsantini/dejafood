$(document).ready(function () {
    $('.modal1').on('click', ()=> {
        console.log('that tickles')
    })
    $('.modal1').modal();

    $('#get-started').on('click', ()=>{
        $('#get-started').toggleClass('hide')
        $('.ingredients').toggleClass('ingredients')
        $('.ingredients').toggleClass('animation-slideframe')
    })
});