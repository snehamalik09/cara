
let listproducthtml = document.querySelector(".procontainer");
let listproducts = [];
let carts = [];
let listcarthtml = document.querySelector(".listcart");
// let iconcartspan = document.querySelector("");

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function locate() {
    location.href = "index.html";
}

function closedialog() {
    document.getElementById("prediction").style.display = "none";
}


function predictByMonth() {
    // event.preventDefault;

    if ((document.getElementById("zodiac").value != "") && (document.getElementById("name").value != "") && (document.getElementById("age").value != "") && (document.getElementById("month").value != "")) {
        document.getElementById("prediction").style.display = "block";
    }

    let monthName = {
        "january": ["serpent stone", "Emerald"],
        "february": ["Pearl", "moonstone"],
        "march": ["aquamarine", "jasper"],
        "april": ["diamond", "sapphire", "opal"],
        "may": ["sapphire", "Emerald"],
        "june": ["pearl", "cat's eye", "Emerald"],
        "july": ["Ruby", "Sapphire"],
        "august": ["Ruby", "Diaomond"],
        "september": ["Sapphire"],
        "october": ["opal", "coral"],
        "november": ["Pearl", "Cat;s eye"],
        "december": ["Ruby", "Cat's eye"],
    }

    let a = document.getElementById("month").value
    let month = a.toLowerCase();

    for (item1 in monthName) {
        if (item1 == month) {
            let result1 = monthName[item1]
            for (i in result1) {
                document.getElementById("gems").innerHTML += result1[i]
                document.getElementById("gems").innerHTML += " , "
            }
        }
    }

}


// Adding products into html document

function addDataToHtml() {
    let listproducthtml = document.querySelector(".procontainer");
    listproducthtml.innerHTML = "";

    if (listproducts.length > 0) {
        listproducts.forEach(product => {
            let newproduct = document.createElement("div");
            newproduct.classList.add("product");
            newproduct.dataset.id = product.id;
            newproduct.innerHTML = `
                <img src=${product.image} alt="">
                    <p> <b> ${product.name} </b> </p>
                
                        <h4>${product.price}</h4>
                        <button class="addcartbtn"> Add to Cart </button>
                    
            `;
            listproducthtml.appendChild(newproduct);
        });
    }
}

// Fetching products.json
const initApp = () => {
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            listproducts = data;
            addDataToHtml();

            // get data from memory
            if (localStorage.getItem("cart")) {
                carts = JSON.parse(localStorage.getItem("cart"));
                addtocartHTML();
            }
        })
}

initApp();


function showcart() {
    let cartTab = document.getElementById("cart");
    document.getElementById("cart").style.display = "grid";
}

function closecart() {
    let cartTab = document.getElementById("cart");
    document.getElementById("cart").style.display = "none";
}

function showshop() {
    location.href = "shop.html";

}

listproducthtml.addEventListener('click', (event) => {
    let positionclick = event.target;
    if (positionclick.classList.contains("addcartbtn")) {
        let productid = positionclick.parentElement.dataset.id;
        addtocart(productid);
    }
});

const addtocart = (productid) => {
    let productincart = carts.findIndex((value) => value.productid == productid);
    if (carts.length <= 0) {
        carts = [
            {
                productid: productid,
                quantity: 1
            }
        ]
    }
    else if (productincart < 0) {
        carts.push({
            productid: productid,
            quantity: 1
        });
    }
    else {
        carts[productincart].quantity = carts[productincart].quantity + 1;
    }
    addtocartHTML();
    addtocartmemory();
}

const addtocartHTML = () => {
    listcarthtml.innerHTML = "";
    let totalquantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            let newcart = document.createElement("div");
            newcart.classList.add("item");
            let positionproduct = listproducts.findIndex((value) => value.id == cart.productid);

            let info = listproducts[positionproduct];
            totalquantity += cart.quantity;
            newcart.innerHTML = `
            <div class="image">
                <img src=${info.image} alt="">
            </div>

            <div class="name">
                ${info.name} 
            </div>

           

            <button id="removebtn" onclick="remove(this); ">x</button
            `;

            listcarthtml.appendChild(newcart);
        });
    }}

    function remove(item){
        item.parentElement.remove();
        removefromlocalstorage();
    }

    function  removefromlocalstorage(){
        localStorage.removeItem("cart");
    }


    const addtocartmemory = () => {
        localStorage.setItem("cart", JSON.stringify(carts));
    }













