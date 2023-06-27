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
  //console.log(addProduct); 

                                            /* Stockage des données dans le local storage */

  // Création d'un tableau pour stocker les produits
  let products = [];
  if (localStorage.getItem("buttonCart") !== null) {
    products = JSON.parse(localStorage.getItem("buttonCart"));
    products.push(addProduct);
    localStorage.setItem("buttonCart", JSON.stringify(products));
  } else {
    console.log("Le panier est vide");
  }
});

// Appel de la fonction pour récupérer et afficher les détails de l'article
fetchArticle();