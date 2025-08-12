// src/services/favorites.js

export function getFavorites() {
  const favs = localStorage.getItem('favorites');
  return favs ? JSON.parse(favs) : [];
}

export function addFavorite(meal) {
  const favs = getFavorites();
  if (!favs.some((f) => f.idMeal === meal.idMeal)) {
    favs.push(meal);
    localStorage.setItem('favorites', JSON.stringify(favs));
  }
}

export function removeFavorite(idMeal) {
  let favs = getFavorites();
  favs = favs.filter((f) => f.idMeal !== idMeal);
  localStorage.setItem('favorites', JSON.stringify(favs));
}

export function isFavorite(idMeal) {
  const favs = getFavorites();
  return favs.some((f) => f.idMeal === idMeal);
}
