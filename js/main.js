// Cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

//Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//Cart Working
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//Making Function
function ready() {
  //Function Remove Items From Cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i]
    button.addEventListener('click', removeCartButtons);
  }
}

//Remove Items From Cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = document.getElementsByClassName('cart-box')
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    
        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

//Authentication
let clientID = "oacid-clcvxhhay574d03isevfbco35";
let clientSecret =
  "f80721c22a86f31e756da2ccf18dfeba2b26d913875000d6ec4131fc299f7e32";
let grantType = "client_credentials";

const authButton = document.querySelector("#authButton");

var token;

let total = document.querySelector("#total").text;

authButton.addEventListener("click", async () => {
  const response = await fetch("https://api.triple-a.io/api/v2/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: "oacid-clcvxhhay574d03isevfbco35",
      client_secret:
        "f80721c22a86f31e756da2ccf18dfeba2b26d913875000d6ec4131fc299f7e32",
      grant_type: "client_credentials",
    }),
  });
  const data = await response.json();
  token = data;
});

let buyButton = document.querySelector("#buyButton");

var testBTC;

buyButton.addEventListener("click", async () => {
  const response = await fetch(
    "https://api.triple-a.io/api/v2/payment/account/HA16736995280xPdDnzbfd_t",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body: new URLSearchParams({
        type: "triplea",
        order_currency: "USD",
        order_amount: total,
        payer_id: "pvbazilio@gmail.com",
        success_url: "https://www.success.io/success.html",
        cancel_url: "https://www.failure.io/cancel.html",
      }),
    }
  );
  const data = await response.json();
  testBTC = data;
  console.log(testBTC);
});
