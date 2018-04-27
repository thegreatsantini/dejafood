
$(document).ready(function () {

    $('.save').on('click', function (e) {
        console.log('save me')
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/profile',
            data: e.target.dataset,
            success: saveNewRecipe(e.target),
            error: runError
        }).then(function (data) {
        })
    })

    $('.remove').on('click', function (e)  {
        e.preventDefault();

        $.ajax({
            method: 'DELETE',
            url: '/profile',
            data: e.target.dataset,
            success: removeSavedRecipe(e.target),
            error: runError
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

function removeSavedRecipe() {
    console.log('ingore me')
}

function runError() {
    console.log('ignore me')
}