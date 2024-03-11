// Element Selectors
const allSeats = document.querySelectorAll("#allSeats input");
const availableSeats = document.getElementById("availableSeats");
const perSeats = document.getElementById("perSeats");
const selectedSeats = document.getElementById("selectedSeats");
const seatsInfo = document.getElementById("seatsInfo");
const Price = document.getElementById("totalPrice");
const grand = document.getElementById("grandPrice");
const couponField = document.getElementById("couponField");
const couponBtn = document.getElementById("applyCoupon");
const submitBtn = document.getElementById("submitForm");

// Coupon Codes
const coupon1 = "NEW15"; // for 15% Discount
const coupon2 = "Couple 20"; // for 20% Discount
const basicPrice = 550;

// changeable counting info
let totalSeats = 20;
let seatCounter = 0;
let totalPrice = 0;
let grandPrice = 0;
let discountCoupon = false;
let discount = 0;

// Event-Listeners
couponBtn.addEventListener("click", function () {
  if (couponField.value == coupon1) {
    discountCoupon = true;
    discount = 0.15;
    return grandPriceCalculate(discount);
  } else if (couponField.value == coupon2) {
    discountCoupon = true;
    discount = 0.2;
    return grandPriceCalculate(discount);
  } else {
    couponField.classList.add("border-red-400");
  }
});

// All Functions
function setInitialValue() {
  availableSeats.textContent = totalSeats;
  perSeats.textContent = basicPrice;
  selectedSeats.textContent = seatCounter;
  Price.textContent = totalPrice;
  grand.textContent = grandPrice;
}
setInitialValue();

function checkingSeat() {
  for (let seats of allSeats) {
    seats.addEventListener("click", function (e) {
      if (e.target.classList.contains("bg-green-500")) {
        return removeInfo(e);
      }
      if (seatCounter < 4) {
        return addInfo(e);
      } else {
        alert("You are not eligible for more");
      }
    });
  }
}
checkingSeat();

function submitForm() {
  if (seatCounter > 0) {
    return (submitBtn.disabled = false);
  } else {
    return (submitBtn.disabled = true);
  }
}

function addInfo(e) {
  seatCounter += 1;
  console.log(seatCounter);
  totalSeats -= 1;
  totalPrice = basicPrice * seatCounter;
  grandPrice = basicPrice * seatCounter;
  const eTarget = e.target;
  eTarget.classList.add("bg-green-500");
  // element creations
  const parensDiv = document.createElement("div");
  parensDiv.setAttribute("id", eTarget.value);
  parensDiv.className += "flex justify-between items-center py-2";
  const seatsName = document.createElement("p");
  seatsName.innerText = eTarget.value;
  const seatsClass = document.createElement("p");
  seatsClass.innerText = "Economy";
  const seatsPrice = document.createElement("p");
  seatsPrice.innerText = basicPrice;
  parensDiv.append(seatsName);
  parensDiv.append(seatsClass);
  parensDiv.append(seatsPrice);
  seatsInfo.appendChild(parensDiv);

  if (discountCoupon == true && seatCounter === 4) {
    grandPriceCalculate(discount);
  }

  setInitialValue();
  discountBtn();
  submitForm();
}

function removeInfo(e) {
  totalSeats++;
  seatCounter--;
  totalPrice = basicPrice * seatCounter;
  grandPrice = basicPrice * seatCounter;
  e.target.classList.remove("bg-green-500");
  // remove element
  document.getElementById(e.target.value).remove();

  setInitialValue();
  discountBtn();
  submitForm();
}

function grandPriceCalculate(discount) {
  parseInt(grandPrice);
  grandPrice = grandPrice - grandPrice * discount;
  document.getElementById(
    "discountField"
  ).innerHTML = `<p class="text-2xl text-center text-green-500 w-[100%] font-bold">You got ${
    discount * 100
  }% discount for 4 Seats</p>`;
  setInitialValue();
}

function discountBtn() {
  if (seatCounter === 4) {
    return (couponBtn.disabled = false);
  } else {
    return (couponBtn.disabled = true);
  }
}
