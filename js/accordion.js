import amountTotalPrice from "./amount.js";
import formatNumber from "./utils.js";
const accordionProduct = document.querySelector(".accordion__content-product");
const accordionInfoText = document.querySelector(".basket__accordion__text")
const accordionInfoBlock = document.querySelector(".basket__accordion__info")
const basketInf = document.querySelector('.basket__all')
const accordionMissingProduct = document.querySelector(".accordion__content-missing-product");
const accordionProductButton = document.querySelector(".accordion__button-product");
const accordionMissingProductButton = document.querySelector(".accordion__button-missing-product");
const total = document.querySelector(".total");
let flagAccordionProduct = true;
let flagAccordionMissingProduct = true;

accordionProductButton.addEventListener("click", () => {
    const productInformation = amountTotalPrice()
    if (flagAccordionProduct) {
        total.classList.toggle("total__position");
        basketInf.style.display = "none"
        accordionInfoBlock.style.display = "block"
        accordionInfoText.innerHTML = `  ${formatNumber(productInformation.amountProduct)} товаров · ${formatNumber(productInformation.priceProduct)} сом`
        accordionProduct.style.display = "none";
        accordionProductButton.style.transform = "rotate(180deg)";
    } else {
        total.classList.remove("total__position");
        accordionInfoBlock.style.display = "none"
        accordionProduct.style.display = "block";
        basketInf.style.display = "flex"
        accordionProductButton.style.transform = "rotate(0deg)";
    }
    flagAccordionProduct = !flagAccordionProduct;
});
accordionMissingProductButton.addEventListener("click", () => {
    console.log("вызов");
    if (flagAccordionMissingProduct) {
        accordionMissingProduct.style.display = "none";
        accordionMissingProductButton.style.transform = "rotate(180deg)";
    } else {
        accordionMissingProduct.style.display = "block";
        accordionMissingProductButton.style.transform = "rotate(0deg)";
    }
    flagAccordionMissingProduct = !flagAccordionMissingProduct;
});
