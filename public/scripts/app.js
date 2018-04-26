
$(document).ready(function () {

    $('.save').on('click', function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/myrecipes',
            data: e.target,
            success: saveNewRecipe(e.target.dataset.recipe),
            error: console.log('ignore me')
        })
    })

    $('#get-started').on('click', ()=>{
        $('#get-started').toggleClass('hide')
        $('.ingredients').toggleClass('ingredients')
        $('.ingredients').toggleClass('animation-slideframe')
    })
    
});

function saveNewRecipe(recipeId) {
    console.log(recipeId)
}