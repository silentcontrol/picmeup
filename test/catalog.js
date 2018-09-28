function listProducts() {
  // list all products and their price
  fetch('http://localhost:3001/products')
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
    .then(productList => {
      productList.forEach(product => {
        var row = document.createElement("tr");
        var dataName = document.createElement("td");
        var dataPrice = document.createElement("td");

        dataName.appendChild(document.createTextNode(product.product_name));
        dataPrice.appendChild(document.createTextNode(product.price_in_cents));

        row.appendChild(dataName);
        row.appendChild(dataPrice);

        document.querySelector(".productlist").appendChild(row);
      });
    })
    .catch(error => console.error(error));

}

listProducts();

document.getElementById("searchproduct").addEventListener("click", function (event) {
  event.preventDefault();
  var productName = document.getElementById("searchfield").value;

  fetch("http://localhost:3001/search", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ product: productName }), // body data type must match "Content-Type" header
  })
    .then(response => response.json())
    .then(product => {
      if (product.length === 0) {
        alert('product cannot be found');
      } else {
        var productList = document.querySelector(".productlist");

        // clear product list table
        while (productList.firstChild) {
          productList.removeChild(productList.firstChild);
        }

        var row = document.createElement("tr");
        var dataName = document.createElement("td");
        var dataPrice = document.createElement("td");

        dataName.appendChild(document.createTextNode(product[0].product_name));
        dataPrice.appendChild(document.createTextNode(product[0].price_in_cents));

        row.appendChild(dataName);
        row.appendChild(dataPrice);

        productList.appendChild(row)
      }
    })
    .catch(error => console.error(error));
});