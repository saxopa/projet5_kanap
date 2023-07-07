console.log("hello");
// récupération des données du local storage
let cart = JSON.parse(localStorage.getItem("panier"));
console.log(cart);



// Création des éléments affichés dans le panier
/// Récupération des produits commandés depuis le local storage
const orderedProducts = localStorage.getItem("panier");
if (orderedProducts) {
  const products = JSON.parse(orderedProducts);
  console.log("Produits commandés : ", products);

  // Affichage des produits dans le panier
  const cartContainer = document.getElementById("cartContainer");

  products.forEach((product) => {
    // Création de l'élément <article> avec la classe "cart__item" et les attributs data-id et data-color
    const article = document.createElement('article');
    article.className = 'cart__item';
    article.setAttribute('data-id', product.id);
    article.setAttribute('data-color', product.color);

    // Création de l'élément <div> avec la classe "cart__item__img"
    const divImg = document.createElement('div');
    divImg.className = 'cart__item__img';

});
}

