let orderID = window.location.search.slice(2);
let orderIdSpan = document.getElementById("orderId");
orderIdSpan.innerHTML = orderID;

// Écoute l'événement "beforeunload" sur la fenêtre
window.addEventListener('beforeunload', function(event) {
    // Efface le contenu du localStorage
    localStorage.clear();
  });
  
  
  