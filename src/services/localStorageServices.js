export const saveLocalStorage = (object) => {
  const atualStorage = [];
  const keyLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (keyLocalStorage === null || keyLocalStorage === undefined) {
    atualStorage.push(object);
    localStorage.setItem('favoriteRecipes', JSON.stringify(atualStorage));
    console.log(keyLocalStorage);
  } else {
    const arrLocaStorage = [...keyLocalStorage, object];
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrLocaStorage));
    console.log(keyLocalStorage);
  }
};

export function removeLocalStorage(item) {
  console.log(item.id);
  const keyLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const arrRemoved = keyLocalStorage.filter((recipe) => recipe.id !== item.id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(arrRemoved));
}
