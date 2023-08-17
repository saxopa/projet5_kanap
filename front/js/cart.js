//adresse API
const url = "http://localhost:3000/api/products";
// Création des éléments affichés dans le panier
// Récupération des produits commandés depuis le local storage
const orderedProducts = localStorage.getItem("panier");
if (orderedProducts) {
  let products = JSON.parse(orderedProducts);

  // Affichage des produits dans le panier
  const cartContainer = document.getElementById("cartContainer");

  products.forEach((product) => {
    //fetch
    const fetchArticle = () => {
      fetch(url + "/" + product.id)
        .then((res) => res.json())
        .then((data) => {
          const section = document.getElementById("cart__items");

          // Création de l'article du panier
          const article = document.createElement("article");
          article.classList.add("cart__item");
          article.setAttribute("data-id", "{product-ID}");
          article.setAttribute("data-color", "{product-color}");

          // Création de la div pour l'image du produit
          const imgDiv = document.createElement("div");
          imgDiv.classList.add("cart__item__img");
          article.appendChild(imgDiv);

          // Création de l'image du produit
          const img = document.createElement("img");
          img.src = data.imageUrl;
          img.alt = data.altTxt;
          imgDiv.appendChild(img);

          // Création de la div pour le contenu du produit
          const contentDiv = document.createElement("div");
          contentDiv.classList.add("cart__item__content");
          article.appendChild(contentDiv);

          // Création de la div pour la description du produit
          const descriptionDiv = document.createElement("div");
          descriptionDiv.classList.add("cart__item__content__description");
          contentDiv.appendChild(descriptionDiv);

          // Création du titre du produit
          const productName = document.createElement("h2");
          productName.textContent = data.name;
          descriptionDiv.appendChild(productName);

          // Création du paragraphe pour la couleur du produit
          const productColor = document.createElement("p");
          productColor.textContent = product.color;
          descriptionDiv.appendChild(productColor);

          // Création du paragraphe pour le prix du produit
          const productPrice = document.createElement("p");
          productPrice.textContent = data.price + " €";
          descriptionDiv.appendChild(productPrice);

          // Création de la div pour les paramètres du produit
          const settingsDiv = document.createElement("div");
          settingsDiv.classList.add("cart__item__content__settings");
          contentDiv.appendChild(settingsDiv);

          // Création de la div pour la quantité du produit
          const quantityDiv = document.createElement("div");
          quantityDiv.classList.add("cart__item__content__settings__quantity");
          settingsDiv.appendChild(quantityDiv);

          // Création du paragraphe pour la quantité
          const quantityText = document.createElement("p");
          quantityText.textContent = "Qté : ";
          quantityDiv.appendChild(quantityText);

          // Création de l'input pour la quantité du produit
          const quantityInput = document.createElement("input");
          quantityInput.type = "number";
          quantityInput.classList.add("itemQuantity");
          quantityInput.name = "itemQuantity";
          quantityInput.min = "1";
          quantityInput.max = "100";
          quantityInput.value = product.quantity;
          quantityDiv.appendChild(quantityInput);

          quantityDiv.addEventListener("change", (e) => {
            if (e.target.value > 0&&e.target.value<100) {
              product.quantity = e.target.value;
              //mettre à jour le localStorage
              localStorage.setItem("panier", JSON.stringify(products));
              calculateCart(products);
            } else {
              e.target.value = product.quantity;
              alert("La quantité doit être supérieure à 0 et inferieure à 100");
            }
          });
          // Création de la div pour la suppression du produit
          const deleteDiv = document.createElement("div");
          deleteDiv.classList.add("cart__item__content__settings__delete");
          settingsDiv.appendChild(deleteDiv);

          // Création du paragraphe pour la suppression du produit
          const deleteText = document.createElement("p");
          deleteText.classList.add("deleteItem");
          deleteText.textContent = "Supprimer";
          deleteDiv.appendChild(deleteText);

          // Supprimer l'élément du panier
          deleteText.addEventListener("click", () => {
            // Supprimer l'élément du panier

            // Supprimer l'élément du localStorage
            for (let i = 0; i < products.length; i++) {
              if (
                products[i].id === product.id &&
                products[i].color === product.color
              ) {
                products.splice(i, 1);
                localStorage.setItem("panier", JSON.stringify(products));
                // Supprimer l'élément du DOM
                const cartItem = deleteText.closest(".cart__item");
                cartItem.remove();
              }
            }
            calculateCart(products);
          });

          // Ajout de l'article au conteneur du panier
          section.appendChild(article);
        })
        // Je récupère les erreurs du fetch et les affiche dans la console
        .catch((error) => {
          console.log(error);
        });
    };
    fetchArticle();

    // Création de l'élément <article> avec la classe "cart__item" et les attributs data-id et data-color
    const article = document.createElement("article");
    article.className = "cart__item";
    article.setAttribute("data-id", product.id);
    article.setAttribute("data-color", product.color);

    // Création de l'élément <div> avec la classe "cart__item__img"
    const divImg = document.createElement("div");
    divImg.className = "cart__item__img";

    calculateCart(products);
  });
}
function calculateCart(products) {
  let totalPrice = 0;
  let totalQuantity = 0;

  //afficher le prix total dans le panier quand il est vide

  let totalPriceElement = document.getElementById("totalPrice");
  totalPriceElement.textContent = totalPrice;

  products.forEach((product) => {
    totalQuantity += parseInt(product.quantity, 10);

    getProductById(product.id).then((data) => {
      totalPrice += parseInt(data.price) * parseInt(product.quantity);
      totalPriceElement.textContent = totalPrice;
    });
  });
  //afficher le totalQuantity dans le panier
  let totalQuantityElement = document.getElementById("totalQuantity");
  totalQuantityElement.textContent = totalQuantity;

  

}

function getProductById(id) {
  return fetch(url + "/" + id)
    .then((res) => res.json())
    .then((product) => {
      return product;
    })
    .catch((error) => {
      console.log(error);
    });
}
//***********************************************Formulaire***********************************************//

// Créer les expressions régulières pour chaque champ du formulaire
const nameRegex = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$");
const addressRegex = new RegExp("^\\d+\\s[\\w\\s-]+$", "gm");
const cityRegex = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$");
const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");



// Récupérer les éléments du formulaire
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");

// Valider le formulaire lors de la soumission
const form = document.querySelector(".cart__order__form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Empêcher l'envoi du formulaire pour l'exemple

  // Valider les champs du formulaire
  if (!nameRegex.test(firstNameInput.value)) {
    displayErrorMessage("firstNameErrorMsg", "Le prénom est invalide.");
    return;
  }

  if (!nameRegex.test(lastNameInput.value)) {
    displayErrorMessage("lastNameErrorMsg", "Le nom de famille est invalide.");
    return;
  }

  if (!addressRegex.test(addressInput.value)) {
    displayErrorMessage("addressErrorMsg", "L'adresse est invalide.");
    return;
  }

  if (!cityRegex.test(cityInput.value)) {
    displayErrorMessage("cityErrorMsg", "La ville est invalide.");
    return;
  }

  if (!emailRegex.test(emailInput.value)) {
    displayErrorMessage("emailErrorMsg", "L'email est invalide.");
    return;
  }

  //***********************************************Envoi des données***********************************************//
  // Récupérer les données du formulaire
  const contact = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    address: addressInput.value,
    city: cityInput.value,
    email: emailInput.value,
  };

 

  // Récupérer les données du panier
  const productsId = [];
  const products = JSON.parse(localStorage.getItem("panier"));
  for (let i = 0; i < products.length; i++) {
    productsId.push(products[i].id);
  }
  //form.submit();
  // Si tout est valide, soumettre le formulaire
  const order = {
    contact: contact,
    products: productsId,
  };
  getOrders(order);
});
// Fonction pour envoyer les données du formulaire et du panier au serveur
function getOrders(order) {
  fetch(url+"/order", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },

    body: JSON.stringify(order),
    
  }
  
  )
  .then((res) => res.json())
    .then((data) => {
      window.location.href = `confirmation.html?=${data.orderId}`;
});
}
// Fonction pour afficher le message d'erreur pour chaque champ
function displayErrorMessage(errorMsgId, message) {
  const errorMessage = document.getElementById(errorMsgId);
  errorMessage.textContent = message;
}