const favoritesIcons = document.querySelectorAll('.favorites')
const trashIcons = document.querySelectorAll('.trash')
favoritesIcons.forEach(favorite => {

    favorite.addEventListener("mouseover", (event => {
        favorite.src = '../images/icons/favorite_color.svg'
    }))
    favorite.addEventListener("mouseout", (event => {
        favorite.src = '../images/icons/favorites-icon.svg'

    }))
})
trashIcons.forEach(trash => {
    trash.addEventListener("mouseover", (event => {
        trash.src = '../images/icons/trash_color.svg'
    }))
    trash.addEventListener("mouseout", (event => {
        trash.src = '../images/icons/trash-icon.svg'

    }))
})