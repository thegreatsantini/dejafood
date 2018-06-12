$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.parallax').parallax();

    // Feature Discovery
    $('.menu').on('click', function () {
        $('.tap-target').open();
    })

    $('.save').on('click', function (e) {
        e.preventDefault();

        // Toasts
        // $(this).toast({html: 'Saved'})

        $.ajax({
            method: 'POST',
            url: '/profile',
            data: e.target.dataset
            // success: saveNewRecipe(e.target),
        }).done(function (data) {
            console.log(data)
        }).catch( function(error) {
            console.log('**Error**',error)
        })
    })

    $('.remove').on('click', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'DELETE',
            url: '/profile',
            data: e.target.dataset,
            success: removeSavedRecipe(e.target),
            error: runError
        }).then((data) => {
            $(this).parent().parent().parent().remove();
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
    console.log('why is the error message logging?')
}

function runError(error) {
    console.log('why is the error message logging?', error)
}