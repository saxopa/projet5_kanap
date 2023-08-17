//adresse API
const url = "http://localhost:3000/api/products";

//fetch API

const getInfo = () => {
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      for (product in data) {
        //Je créer les élements en JS
        //Mélanger html et js n'est pas conseillé il vaut mieux créer le
        let container = document.querySelector("#items");
        let liens = document.createElement("a");
        let article = document.createElement("article");
        let image = document.createElement("img");
        let nom = document.createElement("h3");
        let description = document.createElement("p");

        //j'intègre' les éléments créer en JS à l'article
        container.appendChild(liens);
        liens.appendChild(article);
        article.appendChild(image);
        article.appendChild(nom);
        article.appendChild(description);
        liens.setAttribute("href", "./product.html?id=" + data[product]._id);
        article.setAttribute("class", "product");
        image.setAttribute("src", data[product].imageUrl);
        image.setAttribute("alt", data[product].altTxt);
        nom.setAttribute("class", "productName");
        nom.textContent = data[product].name;
        description.textContent = data[product].description;
      }
    });
};

getInfo();
