// Je récupère l'id de l'article dans l'URL
const params = new URL(document.location).searchParams;
// Je stocke l'id dans une variable
const id = params.get("id");
// Je stocke l'URL de l'API dans une variable en y ajoutant l'id
const localUrl = `http://localhost:3000/api/products/${id}`;

// Sélection des éléments du DOM
const colorsSelect = document.getElementById("colors");
const quantity = document.getElementById("quantity");
const titleElement = document.getElementById("title");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");
const containerImg = document.querySelector(".item__img");
const buttonCart = document.getElementById("addToCart");
const itemContentSettings = document.querySelector(".item__content__settings");

// Création de l'élément pour afficher les erreurs
const errorElement = document.createElement("p");
errorElement.classList.add("message_error");
itemContentSettings.appendChild(errorElement);

// Fonction pour récupérer et afficher les détails de l'article
const fetchArticle = () => {
  fetch(localUrl)
    .then((res) => res.json())
    .then((data) => {
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
buttonCart.addEventListener("click", () => {
  if (validationCart() === "") {
    console.log("OK");
  } else {
    // Affichage d'un message d'erreur
    console.log(validationCart());
  }
});

// Fonction de validation pour le panier
function validationCart() {
  let message = "";
  // Validation quantité
  if (quantity.value === "") {
    message = "Veuillez choisir une quantité entre 1 et 100";
  } else if (quantity.value < 1 || quantity.value > 100) {
    message = "La quantité doit être comprise entre 1 et 100";
  }

  // Validation couleur
  if (colorsSelect.value === "") {
    message = "Veuillez choisir une couleur";
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
    // Si Le produit existe déjà dans le panier, mettre à jour la quantité
    existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(quantity.value);
  } else {
    // Sinon Ajout du produit dans le tableau
    products.push(addProduct);
  }

  // Vérification qu'une couleur et une quantité ont bien été sélectionnées
  const errorMessage = validationCart();
  if (errorMessage !== "") {
    // Affichage d'un message d'erreur
    errorElement.textContent = errorMessage;
  } else {
    // stringify pour convertir les données au format JSON en chaîne de caractères
    localStorage.setItem("panier", JSON.stringify(products));
    window.location.href = "index.html";
  }
});

// Récupération de la valeur du select
colorsSelect.addEventListener("change", () => {
  // Effacer le message d'erreur lorsqu'une nouvelle couleur est sélectionnée
  errorElement.textContent = "";
});

// Récupération de la valeur du quantity
quantity.addEventListener("change", () => {
  // Effacer le message d'erreur lorsqu'une nouvelle quantité est sélectionnée
  errorElement.textContent = "";
});

// Appel de la fonction pour récupérer et afficher les détails de l'article
fetchArticle();
