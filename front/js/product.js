// Je récupère l'id de l'article dans l'URL
const params = new URL(document.location).searchParams;
// Je stocke l'id dans une variable
const id = params.get("id");
// Je vérifie si ça fonctionne bien
console.log("L'ID de cet article est : " + id);
// Je stocke l'URL de l'API dans une variable en y ajoutant l'id
const localUrl = `http://localhost:3000/api/products/${id}`;

const colorsSelect = document.getElementById("colors");
const quantity = document.getElementById("quantity");

// Je sélectionne les éléments du DOM
const titleElement = document.getElementById("title");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");
const containerImg = document.querySelector(".item__img");
const buttonCart = document.getElementById("addToCart");

// Fonction pour récupérer et afficher les détails de l'article
const fetchArticle = () => {
  fetch(localUrl)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);

      // J'ajoute l'image à l'élément img
      const photo = document.createElement("img");
      photo.src = data.imageUrl;
      containerImg.appendChild(photo);

      // J'affiche les données dans les éléments correspondants
      titleElement.textContent = data.name;
      priceElement.textContent = data.price;
      descriptionElement.textContent = data.description;

      // J'affiche les couleurs dans le select
      data.colors.forEach((color) => {
        let option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        colorsSelect.appendChild(option);
      });

      // Limites de la quantité à 100 articles
      for (let i = 1; i <= 100; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        quantity.appendChild(option);
      }
    })
    // Je récupère les erreurs du fetch et les affiche dans la console
    .catch((error) => {
      console.log(error);
    });
};

// Vérification ajout au panier
buttonCart.addEventListener("click", (e) => {
  if (validationCart() === "") {
    console.log("OK");
  } else {
    // Affichage d'un message d'erreur
    console.log(validationCart());
  }
});

function validationCart() {
  let message = "";
  // Validation quantité
  if (quantity.value < 1 || quantity.value > 100) {
    message = "La quantité doit être comprise entre 1 et 100";
  }
  return message;
}

// Ajout du produit au panier
buttonCart.addEventListener("click", () => {
  // Création d'un objet pour stocker les données du produit
  const addProduct = {
    id: id,
    quantity: quantity.value,
    color: colorsSelect.value,
  };

  // Test de l'ajout du produit sur la console
  // console.log(addProduct); 

  /* Stockage des données dans le local storage */

  // Création d'un tableau pour stocker les produits
  let products = [];
  if (localStorage.getItem("panier") !== null) {
    // Si le panier n'est pas vide, je récupère les données du panier
    // parse pour convertir une chaîne de caractères au format JSON en objet JS
    products = JSON.parse(localStorage.getItem("panier"));
  }

  // Vérifier si le produit existe déjà dans le panier
  const existingProduct = products.find(
    (product) => product.id === id && product.color === colorsSelect.value
  );

  if (existingProduct) {
    // Le produit existe déjà dans le panier, mettre à jour la quantité
    existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(quantity.value);
  } else {
    // Le produit n'existe pas dans le panier, l'ajouter
    products.push(addProduct);
  }

  // stringify pour convertir les données au format JSON en chaîne de caractères
  localStorage.setItem("panier", JSON.stringify(products));
  window.location.href = "cart.html";

});

// Appel de la fonction pour récupérer et afficher les détails de l'article
fetchArticle();
