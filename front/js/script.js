const url = 'http://localhost:3000/api/products';

const container = document.querySelector('.items');

const fetchProducts =  () => {
    fetch(url) 
    