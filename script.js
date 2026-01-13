let flowerarray = [
    {
        "id": 1,
        "name": "Jasmine",
        "Price": 950,
        "Quantity": 15,
        "image": "https://i.pinimg.com/736x/01/60/49/01604904de9bdf2e927674bc851fd9d8.jpg",
    },
    {
        "id": 2,
        "name": "Red Rose",
        "Price": 550,
        "Quantity": 15,
        "image": "banner2.jpg",
    },
    {
        "id": 3,
        "name": "Lily",
        "Price": "1,990",
        "Quantity": 15,
        "image": "banner3.jpg",
    },
    {
        "id": 4,
        "name": "Pink Rose",
        "Price": "1,000",
        "Quantity": 15,
        "image": "flower1.jpg",
    },
    {
        "id": 5,
        "name": "Yellow Rose",
        "Price": 390,
        "Quantity": 15,
        "image": "flower2.jpg",
    },
    {
        "id": 6,
        "name": "White Crystal Rose",
        "Price": 990,
        "Quantity": 15,
        "image": "flower3.jpg",
    },
    {
        "id": 7,
        "name": " Butterfly Roses",
        "Price": 390,
        "Quantity": 15,
        "image": "https://i.pinimg.com/736x/45/6a/33/456a3384cd9c2491d6cf026b12461589.jpg",
    },
    {
        "id": 8,
        "name": "Crystal Rose",
        "Price": 390,
        "Quantity": 15,
        "image": "https://i.pinimg.com/1200x/f8/18/87/f8188760e4742b03f5c7728529f01ce6.jpg",
    },
]

let cartsection = "";

flowerarray.forEach((data, index) => {
    cartsection += `
    <div class="col-lg-3 col-md-4 col-sm-6 mb-5">
                <div class="card">
                    <img src="${data.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${data.name}</h5>
                      <h5 class="card-title">${data.Price}.Rs</h5>
                      <h5 class="card-title">Quantity: ${data.Quantity}</h5>
                      <a href="#" class="btn" onclick="AddToCart(event,${data.id})">AddToCart</a>
                    </div>
                  </div>
            </div>
    `
})
document.getElementById("row").innerHTML = cartsection;

let carts = JSON.parse(localStorage.getItem("cartitem")) || [];
update();
addingproducts();
function AddToCart(event, id) {
    event.preventDefault();
    let product = flowerarray.find(item => item.id === id);
    let existingcart = carts.find(cart => cart.id === id);
    if (existingcart) {
        existingcart.qty += 1;
    }
    else {
        carts.push({
            id: product.id,
            name: product.name,
            Price: product.Price,
            Quantity: product.Quantity,
            image: product.image,
            qty: 1,
        })
    }

    update();
    addingproducts();
    localStorage.setItem("cartitem", JSON.stringify(carts));

}
function update() {
    document.getElementById("cartlen").innerHTML = carts.length;
}
function addingproducts() {
    let products = "";

    carts.forEach((data, index) => {
        products += `
        <div class="d-flex justify-content-between mb-3">
           <img src="${data.image}">
            <div class="mt-4">
               <h6>${data.name}</h6>
            <p>${data.Price * data.qty}</p>
            </div>
            <div id="btns" class="d-flex justify-content-center gap-3 align-items-center">
              <button class="btn btn-primary" onclick="changingqty(${index},1)">+</button>
              <p class="m-0">${data.qty}</p>
              <button class="btn btn-danger" onclick="changingqty(${index},-1)">-</button>
            </div>
          </div>
        `
    });
    document.getElementById("productlist").innerHTML = products;
    let total = 0;
    carts.forEach((data, index) => [
        total += data.Price * data.qty
    ])
    document.getElementById("totalprice").innerHTML = "Total Amount : " + total;
}
function changingqty(index, change) {
    carts[index].qty += change;
    if (carts[index].qty === 0) {
        carts.splice(index, 1);
    }
    update();
    addingproducts();
    localStorage.setItem("cartitem", JSON.stringify(carts));
}
