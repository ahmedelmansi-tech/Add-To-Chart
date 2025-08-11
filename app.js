// utilities

const log = console.log;
let shoppingIcon = document.querySelector(".shopping svg");
let body = document.querySelector("body");
let closeBtn = document.querySelector(".cartTab .btns .close");
let homeShowProducts = document.querySelector(".cont .productlist");
let asideCartTab = document.querySelector(".cartTab .listCart");
let purshasecProducts = document.querySelector(".cont .shopping .quantity");

let plusBtn = document.querySelector(".cartTab .listCart .product");
let minusBtn = document.querySelector(
  ".cartTab .listCart .product .quantity .minus"
);

let ProductList = [];
let card = [];

window.addEventListener("DOMContentLoaded", appinit);

// plusBtn.addEventListener("click" , ()=>{
//     log("+")
// })
// minusBtn.addEventListener("click" , ()=>{
//     log("-")
// })

// asideCartTab.addEventListener("click" , (e)=>{
//     let positionClicked = e.target

//     if (positionClicked.classList.contains("plus")){
//         log("+", positionClicked.parentElement.parentElement.dataset.id)
//     } else if (positionClicked.classList.contains("minus"))
//     log("-", log(positionClicked.parentElement.parentElement.dataset.id))
// })

function appinit() {
  shoppingIcon.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });

  closeBtn.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });

  // Showing Products After Fetching
  let injectDataIntoHtml = () => {
    homeShowProducts.innerHTML = "";
    ProductList.forEach((product) => {
      const { id, image, name, price } = product;
      let wrapperDiv = document.createElement("div");
      wrapperDiv.classList.add("item");
      wrapperDiv.dataset.id = id;
      wrapperDiv.innerHTML = `
                <img src="./${image}" alt="chair">
                <h2>${name}</h2>
                <h3>${price}$</h3>
                <button class="addtocart">
                   <span>Add To Cart</span> 
                   <span>  <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                </svg></span> 
                </button>
            `;
      homeShowProducts.appendChild(wrapperDiv);
    });
  };

  // Getting the Item ID
  homeShowProducts.addEventListener("click", (e) => {
    let position = e.target;
    if (position.classList.contains("addtocart")) {
      let itemProductId = position.parentElement.dataset.id;
      addToCart(itemProductId);
      //   console.log(itemProductId);
    }
  });

  // Storing Data in LocalStorage
  const storeData = () => {
    localStorage.setItem("card", JSON.stringify(card));
  };

  addToCart = (_id) => {
    let productPositionInCard = card.findIndex((val) => val.id == _id);

    if (card.length === 0) {
      card = [
        {
          id: _id,
          q: 1,
        },
      ];
    } else if (productPositionInCard < 0) {
      card.push({
        id: _id,
        q: 1,
      });
    } else {
      card[productPositionInCard].q += 1;
    }

    // log(card)
    handelProductTotal(card.length);
    addPurchasedProductToCartHtml();
    storeData();
  };

  let handelProductTotal = (total) => {
    purshasecProducts.innerHTML = total;
  };

  let addPurchasedProductToCartHtml = () => {
    log(card);
    asideCartTab.innerHTML = "";
    if (card.length > 0) {
      card.forEach((product) => {
        let productPosition = ProductList.findIndex(
          (val) => product.id == val.id
        );

        let moreInfo = ProductList[productPosition];
        log(moreInfo);

        let newProduct = document.createElement("div");
        newProduct.classList.add("product");
        newProduct.dataset.id = product.id;
        newProduct.innerHTML = `
            <div class="thumnail">
                    <img src="./${moreInfo.image}" alt="chair">
                </div>

                <div class="name">
                   ${moreInfo.name}
                </div>

                <div class="totalPrice">
                    ${moreInfo.price * product.q}$
                </div>

                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${product.q}</span>
                    <span class="plus">+</span>
                </div>
            `;
        asideCartTab.appendChild(newProduct);
      });
    }
  };

  // Fetchng Data From JSON File
  fetch("./products.json")
    .then((res) => res.json())
    .then((data) => {
      ProductList = data;
      // log(ProductList);
      injectDataIntoHtml();
      if (localStorage.getItem("card")) {
        card = JSON.parse(localStorage.getItem("card"));
        addPurchasedProductToCartHtml();
        handelProductTotal(card.length);
      }
    });
}
