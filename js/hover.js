const favoritesIcons = document.querySelectorAll(".favorites");
const trashIcons = document.querySelectorAll(".trash");
favoritesIcons.forEach((favorite) => {
    favorite.addEventListener("mouseover", () => {
        favorite.src = "images/icons/favorite_color.svg";
    });
    favorite.addEventListener("mouseout", () => {
        favorite.src = "images/icons/favorites-icon.svg";
    });
});
trashIcons.forEach((trash) => {
    trash.addEventListener("mouseover", () => {
        trash.src = "images/icons/trash_color.svg";
    });
    trash.addEventListener("mouseout", () => {
        trash.src = "images/icons/trash-icon.svg";
    });
});
