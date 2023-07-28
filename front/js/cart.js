//adresse API
const url = "http://localhost:3000/api/products";
// Création des éléments affichés dans le panier
// Récupération des produits commandés depuis le local storage
const orderedProducts = localStorage.getItem("panier");
if (orderedProducts) {
  let products = JSON.parse(orderedProducts);
  console.log("Le panier contient : ", products);

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
            product.quantity = e.target.value;
            //mettre à jour le localStorage
            localStorage.setItem("panier", JSON.stringify(products));
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

    //afficher le totalQuantity dans le panier
    let totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.textContent = products.totalQuantity;
  });
  function calculateCart(products) {
    let totalPrice = 0;
    let totalQuantity = 0;
  
    products.forEach((product) => {
      const quantity = parseInt(product.quantity, 10); // Convertir la quantité en nombre
      totalPrice += product.price * quantity;
      totalQuantity += quantity;
    });
  
    console.log("Quantité totale :", totalQuantity);
    console.log("Prix total :", totalPrice);
  
    return { totalPrice, totalQuantity };
  }
  calculateCart(products);
}



