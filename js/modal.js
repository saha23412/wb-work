const basketElement = document.querySelector(".basket");
const street = document.querySelectorAll("#street");
const deliveryText = document.querySelector(".total__delivery__point p");
const streetButton = document.querySelector(".modal-delivery__button");
const selectButton = document.querySelector(".modal-payment__button");
const paymentMethodImg = document.querySelectorAll("#payment__method");
let streetChecked = document.querySelector('input[name="street"]:checked');
let paymentMethod = document.querySelector('input[name="payment"]:checked');
let deliveryChecked = document.querySelector('input[name="delivery"]:checked');
const modalDeliveryElement = document.querySelector(".modal-delivery");
const modalPaymentElement = document.querySelector(".modal-payment");
const buttonPayment = document.querySelectorAll("#payment__modal");
const buttonDelivery = document.querySelectorAll("#delivery__method");
const closeDelivery = document.querySelector("#close__delivery");
const closePayment = document.querySelector("#close__payment");
const modalDeliveryContent = document.querySelector(".modal-delivery-content");
const modalOverlay = document.querySelector(".modal-overlay");
buttonDelivery.forEach((button) => {
    button.addEventListener("click", () => {
        basketElement.classList.add("background");
        modalDeliveryElement.style.display = "block";
        modalOverlay.style.display = "block";
        document.querySelector(".modals").style.display = "block";
        closeDelivery.addEventListener("click", () => {
            modalDeliveryElement.style.display = "none";
            modalOverlay.style.display = "none";

            document.querySelector(".modals").style.display = "none";
            basketElement.classList.remove("background");
        });
    });
});
selectButton.addEventListener("click", () => {
    paymentMethod = document.querySelector('input[name="payment"]:checked');
    paymentMethodImg.forEach(
        (image) => (image.src = `images/icons/${paymentMethod.value}.svg`)
    );
    modalDeliveryElement.style.display = "none";
    modalOverlay.style.display = "none";
    document.querySelector(".modals").style.display = "none";
    basketElement.classList.remove("background");
});
streetButton.addEventListener("click", () => {
    deliveryChecked = document.querySelector('input[name="delivery"]:checked');
    streetChecked = document.querySelector('input[name="street"]:checked');
    street.forEach(
        (streetText) => (streetText.innerHTML = `${streetChecked.value}`)
    );
    deliveryText.innerHTML = `Доствка ${deliveryChecked.value}`;
    modalDeliveryElement.style.display = "none";
    modalOverlay.style.display = "none";
    document.querySelector(".modals").style.display = "none";
    basketElement.classList.remove("background");
});
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalDeliveryElement.style.display = "none";
        modalOverlay.style.display = "none";
        modalPaymentElement.style.display = "none";
        document.querySelector(".modals").style.display = "none";
        basketElement.classList.remove("background");
    }
});
buttonPayment.forEach((button) => {
    button.addEventListener("click", () => {
        basketElement.classList.add("background");
        modalPaymentElement.style.display = "block";
        modalOverlay.style.display = "block";
        document.querySelector(".modals").style.display = "block";
        closePayment.addEventListener("click", () => {
            modalDeliveryElement.style.display = "none";
            modalOverlay.style.display = "none";

            document.querySelector(".modals").style.display = "none";
            basketElement.classList.remove("background");
        });
    });
});
