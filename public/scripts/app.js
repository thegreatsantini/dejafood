
$(document).ready(function () {

    $('.save').on('click', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/profile',
            data: e.target.dataset,
            success: saveNewRecipe(e.target),
            error: console.log('ignore me')
        }).then(function (data) {

        })
    })

    $('#get-started').on('click', () => {
        $('#get-started').toggleClass('hide')
        $('.ingredients').toggleClass('ingredients')
        $('.ingredients').toggleClass('animation-slideframe')
    })

});

function saveNewRecipe(savedRecipe) {
    console.log(savedRecipe.dataset)
}