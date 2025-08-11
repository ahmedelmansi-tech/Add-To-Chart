// utilities

const log  = console.log;
let shoppingIcon = document.querySelector(".shopping svg");
let body = document.querySelector("body");
let closeBtn = document.querySelector(".cartTab .btns .close")
let homeShowProducts = document.querySelector(".cont .productlist")
let asideCartTab = document.querySelector(".cartTab .listCart")
let purshasecProducts = document.querySelector(".cont .shopping .quantity")

let plusBtn = document.querySelector(".cartTab .listCart .product")
// let minusBtn = document.querySelector(".cartTab .listCart .product .quantity .minus")




let ProductList = []
let card = []

window.addEventListener("DOMContentLoaded", appinit)



    // plusBtn.addEventListener("click" , ()=>{
    //     log("+")
    // })




    // minusBtn.addEventListener("click" , ()=>{
    //     log("-")
    // })


    asideCartTab.addEventListener("click" , (e)=>{
        let positionClicked = e.target

        if (positionClicked.classList.contains("plus")){
            log("+", positionClicked.parentElement.parentElement.dataset.id)
        } else if (positionClicked.classList.contains("minus"))
        log("-", log(positionClicked.parentElement.parentElement.dataset.id))
    })




function appinit(){

shoppingIcon.addEventListener("click", ()=>{
body.classList.toggle("showCart")
})

closeBtn.addEventListener("click", ()=>{
    body.classList.toggle("showCart")
    })


// Showing Products After Fetching
    let injectDataIntoHtml = ()=> {
        homeShowProducts.innerHTML = '';
        ProductList.forEach((product)=>{

            let wrapperDiv = document.createElement("div");
            wrapperDiv.classList.add("item");
            wrapperDiv.dataset.id=  product.id
            wrapperDiv.innerHTML = `
                <img src="./${product.image}" alt="chair">
                <h2>${product.name}</h2>
                <h3>${product.price}$</h3>
                <button class="addtocart">
                    Add To Cart
                </button>
            `
            homeShowProducts.appendChild(wrapperDiv)
        })
    }



// Getting the Item ID
homeShowProducts.addEventListener("click" , (e)=> {
let position = e.target
if (position.classList.contains("addtocart")){
    let itemProductId = position.parentElement.dataset.id
    addToCart(itemProductId)
}
})

// Storing Data in LocalStorage
const storeData = ()=>{
    localStorage.setItem("card", JSON.stringify(card))
}


addToCart  = (_id) =>{
    let productPositionInCard = card.findIndex((val) => val.id == _id)
    if (card.length <= 0 )
    {
        card = [{
            id : _id,
            q : 1
        }]
    } 
    else if 
    (productPositionInCard < 0 )
    {
        card.push({
            id: _id,
            q : 1
        })
    } 
    else 
    {
       card[productPositionInCard].q = card[productPositionInCard].q + 1
    }

    // log(card)
    handelProductTotal(card.length);
    addPurchasedProductToCartHtml();
    storeData();
}


let handelProductTotal = (total) =>{
    purshasecProducts.innerHTML = total
}


let addPurchasedProductToCartHtml = ()=>{
    // log(card)
    asideCartTab.innerHTML = ''
    if (card.length > 0) {
        card.forEach((product)=>{

            let productPosition = ProductList.findIndex((val)=> product.id == val.id);

            let moreInfo = ProductList[productPosition]

            let newProduct = document.createElement("div")
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
            `
            asideCartTab.appendChild(newProduct);

        }) 


    } 
  

}







// Fetchng Data From JSON File
fetch("./products.json")
.then(res => res.json())
.then(data => {
    ProductList = data;
    // log(ProductList);
    injectDataIntoHtml()
   if (localStorage.getItem("card")){
    card = JSON.parse(localStorage.getItem("card"))
    addPurchasedProductToCartHtml()
    handelProductTotal(card.length);
   }
}
    )




let allInOne = {
    name : "ahmed",
    age : 33
}

allInOne["name"] ? log("Yes") : log("No")







}





