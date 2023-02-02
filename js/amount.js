import formatNumber from "./utils.js";
//Мобильная версия
const mobilePrice = document.querySelector(".mobile__price");
const mobileDiscount = document.querySelector(".mobile__discount");
const mobileTotalAmount = document.querySelector(".mobile__total__amount");
const mobileTotalDiscount = document.querySelector(".mobile__total__discount");
const mobileCheckbox = document.querySelector(".mobile__checkbox");
const mobileButton = document.querySelector(".mobile__total__order");
const mobileLabelAmount = document.querySelector(".mobile__label__amount");
//Для пк
const buttonOrder = document.querySelector(".total__order");
const labelAmount = document.querySelector(".label__amount");
const orderConditions = document.querySelector(".order__conditions");
const checboxAll = document.querySelector("#checkbox_all");
const checboxPayment = document.querySelector(".total__info__checkbox input");
const checboxProduct = document.querySelectorAll(".input__checkbox input");
const totalQuantityProduct = document.querySelector("#amount__product");
const totalDiscount = document.querySelector("#price_product_not_dictount");
const discountProductPrice = document.querySelector("#discount_price_product");
const totalPrice = document.querySelector("#price");
const amountProductArray = document.querySelectorAll(".item__amount__text");
const discountProductArray = document.querySelectorAll(".item__discount__text");
const pricepProductArray = document.querySelectorAll(".cummon_price_style");
const leftAmountArray = document.querySelectorAll(".item__left");
const buttonArray = document.querySelectorAll(".button_amount");
const wrapperImg = document.querySelector(".place__delivery__wrapper__img");
let Image = document.querySelectorAll(".place__delivery__wrapper__img img");
const ProductArray = [];
let counterChecbox = 0;
let ProductCheckArray = [];
//Заполняем массив ProductArray[] товарами
//В зависимости от имени товара добавляем ему цену за 1 шт. и оставшееся количество товара
amountProductArray.forEach((product, productIndex) => {
    let price = 0;
    let leftProduct = 0;
    let discount = 0;
    let sumDiscount = 0;
    switch (product.dataset.name) {
        case "t-shirt":
            {
                price = 522;
                leftProduct = 1;
                discount = 50;
                sumDiscount = (price * 100) / discount;
            }
            break;
        case "telephone":
            {
                price = 10000;
                leftProduct = 200;
                discount = 40;
                sumDiscount = (price * 100) / discount;
            }
            break;
        case "book":
            {
                price = 247;
                leftProduct = 4;
                discount = 50;
                sumDiscount = (price * 100) / discount;
            }
            break;
    }
    ProductArray.push({
        id: `${new Date().getSeconds() + productIndex}`,
        name: product.dataset.name,
        price,
        leftProduct,
        amountPrice: price,
        amount: 1,
        discount,
        sumDiscount,
    });
});

//Получаем информацию о товарах
function getTotalProduct(productArr) {
    let amountProduct = 0;
    let priceProduct = 0;
    let discountProduct = 0;
    let nameProduct = "";
    ProductArray.forEach((product) => {
        if (
            productArr.find(
                (productAmount) => productAmount.name === product.name
            )
        ) {
            amountProduct += product.amount;
            priceProduct += product.price * product.amount;
            discountProduct += product.sumDiscount;
            nameProduct = product.name;
        }
    });
    return {
        amountProduct,
        priceProduct,
        discountProduct,
        nameProduct,
    };
}

//Увеличиваем общую стоимость товаров и общее количество
function amountTotalPrice() {
    const totalPrice = ProductArray;
    let amountProduct = 0;
    let priceProduct = 0;
    let sumDiscount = 0;
    totalPrice.forEach((product) => {
        priceProduct += product.amountPrice;
        amountProduct += product.amount;
        sumDiscount += product.sumDiscount;
    });
    return {
        amountProduct,
        priceProduct,
        sumDiscount,
    };
}

//У нужного элемента заменяем текст
function editElementInnerHTML(htmlElementArray, nameElement, valueProduct) {
    htmlElementArray.forEach((htmlElement) => {
        if (htmlElement.dataset.name === nameElement)
            htmlElement.innerHTML = valueProduct;
    });
}

//Взаимодействие с товаром (добавить в корзину|удалить из корзины)
//Ведем подсчет о количестве товара,цене
function amountProduct(event, product, amountProductArray) {
    if (event.target.id === "plus") {
        amountProductArray.forEach((amountProduct) => {
            if (
                event.target.dataset.name === amountProduct.dataset.name &&
                product.leftProduct > 0
            ) {
                product.amount += 1;
                product.amountPrice += product.price;
                product.leftProduct -= 1;
                product.sumDiscount += (product.price * 100) / product.discount;
            }
        });
    } else if (product.amount > 0) {
        amountProductArray.forEach((amountProduct) => {
            if (event.target.dataset.name === amountProduct.dataset.name) {
                product.amount -= 1;
                product.amountPrice -= product.price;
                product.leftProduct += 1;
                product.sumDiscount -= (product.price * 100) / product.discount;
            }
        });
    }
    if (product.amount < 1) {
        checboxAll.checked = false;
        const productProperties = getTotalProduct(ProductCheckArray);
        totalPrice.innerHTML = `${formatNumber(
            productProperties.priceProduct
        )} сом`;
        totalDiscount.innerHTML = `${formatNumber(
            productProperties.discountProduct
        )} сом`;
        totalQuantityProduct.innerHTML = `${productProperties.amountProduct} товара`;
        labelAmount.innerHTML = +labelAmount.innerHTML - 1;
        mobileLabelAmount.innerHTML = +mobileLabelAmount.innerHTML - 1;
        discountProductPrice.innerHTML = `-${formatNumber(
            productProperties.discountProduct - productProperties.priceProduct
        )} сом`;
        if (window.innerWidth <= 1024) {
            mobilePrice.innerHTML = `${formatNumber(
                productProperties.priceProduct
            )} сом`;
            mobileDiscount.innerHTML = `${formatNumber(
                productProperties.discountProduct
            )} сом`;
            mobileTotalAmount.innerHTML = `${productProperties.amountProduct} товара`;
            mobileTotalDiscount.innerHTML = `-${formatNumber(
                productProperties.discountProduct -
                    productProperties.priceProduct
            )} сом`;
        }
        if (checboxPayment.checked || mobileCheckbox.checked) {
            buttonOrder.innerHTML = `${formatNumber(
                productProperties.priceProduct
            )} сом`;
            if (window.innerWidth <= 1024) {
                mobileButton.innerHTML = `${formatNumber(
                    productProperties.priceProduct
                )} сом`;
            }
        }
    }
    checboxProduct.forEach((checbox) => {
        if (
            checbox.checked === true &&
            checbox.dataset.name === product.name &&
            product.amount === 0
        ) {
            checbox.checked = false;
            counterChecbox--;
        }
    });
}

//Получаем нужный товар с помощью имя товара
function getProduct(products, nameProduct) {
    let productElement = products.find(
        (product) => product.name === nameProduct
    );
    return productElement;
}
mobileCheckbox.addEventListener("change", (event) => {
    if (event.target.checked) {
        const productProperties = getTotalProduct(ProductCheckArray);
        if (window.innerWidth <= 1024) {
            mobileButton.innerHTML = `${formatNumber(
                productProperties.priceProduct
            )} сом`;
            orderConditions.style.display = "none";
            document.querySelector(
                ".payment__method__write__conditions"
            ).style.display = "none";
        }
    } else {
        if (window.innerWidth <= 1024) {
            mobileButton.innerHTML = "Заказать";
            orderConditions.style.display = "block";
            document.querySelector(
                ".payment__method__write__conditions"
            ).style.display = "block";
        }
    }
});
checboxPayment.addEventListener("change", (event) => {
    if (event.target.checked) {
        const productProperties = getTotalProduct(ProductCheckArray);
        buttonOrder.innerHTML = `${formatNumber(
            productProperties.priceProduct
        )} сом`;

        orderConditions.style.display = "none";
        document.querySelector(
            ".payment__method__write__conditions"
        ).style.display = "none";
    } else {
        buttonOrder.innerHTML = "Заказать";
        orderConditions.style.display = "block";
        document.querySelector(
            ".payment__method__write__conditions"
        ).style.display = "block";
    }
});

//Событие change для выбрать все
checboxAll.addEventListener("change", (event) => {
    if (event.target.checked) {
        checboxProduct.forEach((checbox) => (checbox.checked = true));
        ProductCheckArray = [...ProductArray];
        if (window.innerWidth <= 325) {
            mobileLabelAmount.innerHTML = ProductCheckArray.length;
            mobileLabelAmount.style.opacity = 1;
        }
        labelAmount.innerHTML = ProductCheckArray.length;
        labelAmount.style.opacity = 1;

        Image = document.querySelectorAll(".place__delivery__wrapper__img img");
        Image.forEach((product) => product.remove());
        ProductCheckArray.forEach((product, index) => {
            const block = document.createElement("div");
            const notification = document.createElement("div");
            const image = document.createElement("img");
            block.className = "notification__block";
            block.dataset.name = product.name;
            notification.className = "notification__product";
            notification.innerHTML = product.amount;
            image.src = `images/product/${product.name}.svg`;
            image.dataset.name = product.name;
            block.appendChild(notification);
            block.appendChild(image);
            if (index === 2) {
                if (window.innerWidth <= 660) {
                    document.querySelector("#delivery__2").style.display =
                        "block";
                } else {
                    document.querySelector("#delivery__2").style.display =
                        "flex";
                }
                document.querySelector("#delivery__2").appendChild(block);
            } else {
                wrapperImg.appendChild(block);
            }
        });
        counterChecbox = ProductArray.length;
        const productProperties = amountTotalPrice();
        if (checboxPayment.checked || mobileCheckbox.checked) {
            buttonOrder.innerHTML = `${formatNumber(
                productProperties.priceProduct
            )} сом`;
            if (window.innerWidth <= 1024) {
                mobileButton.innerHTML = `${formatNumber(
                    productProperties.priceProduct
                )} сом`;
            }
        }
        if (window.innerWidth <= 1024) {
            mobilePrice.innerHTML = `${formatNumber(
                productProperties.priceProduct
            )} сом`;
            mobileDiscount.innerHTML = `${formatNumber(
                productProperties.sumDiscount
            )} сом`;
            mobileTotalAmount.innerHTML = `${productProperties.amountProduct} товара`;

            mobileTotalDiscount.innerHTML = `-${formatNumber(
                productProperties.sumDiscount - productProperties.priceProduct
            )} сом`;
        }
        totalPrice.innerHTML = `${formatNumber(
            productProperties.priceProduct
        )} сом`;
        totalDiscount.innerHTML = `${formatNumber(
            productProperties.sumDiscount
        )} сом`;
        totalQuantityProduct.innerHTML = `${productProperties.amountProduct} товара`;
        discountProductPrice.innerHTML = `-${formatNumber(
            productProperties.sumDiscount - productProperties.priceProduct
        )} сом`;
    } else {
        checboxProduct.forEach((checbox) => (checbox.checked = false));
        if (checboxPayment.checked || mobileCheckbox.checked) {
            buttonOrder.innerHTML = `0 сом`;
            if (window.innerWidth <= 1024) {
                mobileButton.innerHTML = `0 сом`;
            }
        }
        if (window.innerWidth <= 1024) {
            mobilePrice.innerHTML = `${0} сом`;
            mobileDiscount.innerHTML = `${0} сом`;
            mobileTotalAmount.innerHTML = `${0} товара`;

            mobileTotalDiscount.innerHTML = `${0} сом`;
        }
        Image = document.querySelectorAll(".place__delivery__wrapper__img img");
        Image.forEach((product) => product.remove());
        document
            .querySelectorAll(".notification__block")
            .forEach((notification) => {
                console.log(notification.dataset.name);
                notification.remove();
            });
        document.querySelector("#delivery__2").style = "none";
        if (window.innerWidth <= 325) {
            mobileLabelAmount.innerHTML = 0;
            mobileLabelAmount.style.opacity = 0;
        }
        labelAmount.innerHTML = 0;
        labelAmount.style.opacity = 0;
        counterChecbox = 0;
        ProductCheckArray.length = 0;
        totalPrice.innerHTML = `${0} сом`;
        totalDiscount.innerHTML = `${0} сом`;
        totalQuantityProduct.innerHTML = `${0} товара`;
        discountProductPrice.innerHTML = `${0} сом`;
    }
});

//Событие чекбокс на товары,пересчитываем стоимость товаров
checboxProduct.forEach((checbox) => {
    checbox.addEventListener("change", (event) => {
        const self = event.target;
        if (self.checked) {
            counterChecbox++;
            ProductArray.forEach((product, index) => {
                if (product.name === self.dataset.name) {
                    ProductCheckArray.push(product);
                    labelAmount.style.opacity = 1;
                    labelAmount.innerHTML = ProductCheckArray.length;
                    if (window.innerWidth <= 325) {
                        mobileLabelAmount.innerHTML = ProductCheckArray.length;
                        mobileLabelAmount.style.opacity = 1;
                    }
                    const block = document.createElement("div");
                    const notification = document.createElement("div");
                    const image = document.createElement("img");
                    block.className = "notification__block";
                    notification.className = "notification__product";
                    notification.innerHTML = product.amount;
                    block.dataset.name = self.dataset.name;
                    image.dataset.name = self.dataset.name;
                    image.src = `images/product/${self.dataset.name}.svg`;
                    block.appendChild(notification);
                    block.appendChild(image);
                    if (ProductCheckArray.length>2) {
                        console.log(ProductArray.length) 
                        if (window.innerWidth <= 660) {
                            document.querySelector(
                                "#delivery__2"
                            ).style.display = "block";
                        } else {
                            document.querySelector(
                                "#delivery__2"
                            ).style.display = "flex";
                        }
                        document
                            .querySelector("#delivery__2")
                            .appendChild(block);
                    } else {
                        wrapperImg.appendChild(block);
                    }
                    Image = document.querySelectorAll(
                        ".place__delivery__wrapper__img img"
                    );
                    const productProperties =
                        getTotalProduct(ProductCheckArray);
                    if (checboxPayment.checked || mobileCheckbox.checked) {
                        buttonOrder.innerHTML = `${formatNumber(
                            productProperties.priceProduct
                        )} сом`;
                        if (window.innerWidth <= 1024) {
                            mobileButton.innerHTML = `${formatNumber(
                                productProperties.priceProduct
                            )} сом`;
                        }
                    }
                    if (window.innerWidth <= 1024) {
                        mobilePrice.innerHTML = `${formatNumber(
                            productProperties.priceProduct
                        )} сом`;
                        mobileDiscount.innerHTML = `${formatNumber(
                            productProperties.discountProduct
                        )} сом`;
                        mobileTotalAmount.innerHTML = `${productProperties.amountProduct} товара`;
                        mobileTotalDiscount.innerHTML = `-${formatNumber(
                            productProperties.discountProduct -
                                productProperties.priceProduct
                        )} сом`;
                    }
                    totalPrice.innerHTML = `${formatNumber(
                        productProperties.priceProduct
                    )} сом`;
                    totalDiscount.innerHTML = `${formatNumber(
                        productProperties.discountProduct
                    )} сом`;
                    totalQuantityProduct.innerHTML = `${productProperties.amountProduct} товара`;
                    discountProductPrice.innerHTML = `-${formatNumber(
                        productProperties.discountProduct -
                            productProperties.priceProduct
                    )} сом`;
                }
            });
        } else {
            ProductCheckArray = ProductCheckArray.filter(
                (product) => product.name !== self.dataset.name
            );
            
            labelAmount.innerHTML = ProductCheckArray.length;
            mobileLabelAmount.innerHTML = ProductCheckArray.length;
            if (window.innerWidth <= 325) {
                if (mobileLabelAmount.innerHTML === "0") {
                    mobileLabelAmount.style.opacity = 0;
                }
            }
            if (labelAmount.innerHTML === "0") {
                labelAmount.style.opacity = 0;
            }
            Image = document.querySelectorAll(
                ".place__delivery__wrapper__img img"
            );

            document
                .querySelectorAll(".notification__block")
                .forEach((notification) => {
                    console.log(notification.dataset.name);
                    if (notification.dataset.name === self.dataset.name) {
                        notification.remove();
                    }
                });
            Image.forEach((img) => {
                if (img.dataset.name === self.dataset.name) {
                    img.remove();
                }
            });
            document.querySelector("#delivery__2").style.display = "none";
            const productProperties = getTotalProduct(ProductCheckArray);
            if (checboxPayment.checked || mobileCheckbox.checked) {
                buttonOrder.innerHTML = `${formatNumber(
                    productProperties.priceProduct
                )} сом`;
                if (window.innerWidth <= 1024) {
                    mobileButton.innerHTML = `${formatNumber(
                        productProperties.priceProduct
                    )} сом`;
                }
            }
            if (window.innerWidth <= 1024) {
                mobilePrice.innerHTML = `${formatNumber(
                    productProperties.priceProduct
                )} сом`;
                mobileDiscount.innerHTML = `${formatNumber(
                    productProperties.discountProduct
                )} сом`;
                mobileTotalAmount.innerHTML = `${productProperties.amountProduct} товара`;

                mobileTotalDiscount.innerHTML = `-${formatNumber(
                    productProperties.discountProduct -
                        productProperties.priceProduct
                )} сом`;
            }
            totalPrice.innerHTML = `${formatNumber(
                productProperties.priceProduct
            )} сом`;
            totalDiscount.innerHTML = `${formatNumber(
                productProperties.discountProduct
            )} сом`;
            totalQuantityProduct.innerHTML = `${productProperties.amountProduct} товара`;
            discountProductPrice.innerHTML = `-${formatNumber(
                productProperties.discountProduct -
                    productProperties.priceProduct
            )} сом`;
            counterChecbox--;
        }
        if (checboxProduct.length === counterChecbox) {
            checboxAll.checked = true;
        } else if (counterChecbox < checboxProduct.length)
            checboxAll.checked = false;
    });
});
//Событие клик на кнопку,которая увеличивает или уменьшает количество ,стоимость товара и скидку
buttonArray.forEach((button) => {
    button.addEventListener("click", (event) => {
        const self = event.target;
        const product = getProduct(ProductArray, self.dataset.name);
        amountProduct(event, product, amountProductArray);
        checboxProduct.forEach((checbox) => {
            if (checbox.checked === true) {
                if (self.dataset.name === checbox.dataset.name) {
                    const productProperties =
                        getTotalProduct(ProductCheckArray);
                    if (checboxPayment.checked || mobileCheckbox.checked) {
                        buttonOrder.innerHTML = `${formatNumber(
                            productProperties.priceProduct
                        )} сом`;
                        if (window.innerWidth <= 1024) {
                            mobileButton.innerHTML = `${formatNumber(
                                productProperties.priceProduct
                            )} сом`;
                        }
                    }
                    totalPrice.innerHTML = `${formatNumber(
                        productProperties.priceProduct
                    )} сом`;
                    totalDiscount.innerHTML = `${formatNumber(
                        productProperties.discountProduct
                    )} сом`;
                    totalQuantityProduct.innerHTML = `${productProperties.amountProduct} товара`;
                    discountProductPrice.innerHTML = `-${formatNumber(
                        productProperties.discountProduct -
                            productProperties.priceProduct
                    )} сом`;
                    if (window.innerWidth <= 1024) {
                        mobilePrice.innerHTML = `${formatNumber(
                            productProperties.priceProduct
                        )} сом`;
                        mobileDiscount.innerHTML = `${formatNumber(
                            productProperties.discountProduct
                        )} сом`;
                        mobileTotalAmount.innerHTML = `${productProperties.amountProduct} товара`;
                        mobileTotalDiscount.innerHTML = `-${formatNumber(
                            productProperties.discountProduct -
                                productProperties.priceProduct
                        )} сом`;
                    }
                }
            } else {
            }
        });
        editElementInnerHTML(
            amountProductArray,
            self.dataset.name,
            product.amount
        );
        editElementInnerHTML(
            pricepProductArray,
            self.dataset.name,
            `${formatNumber(product.amountPrice)} coм`
        );
        editElementInnerHTML(
            leftAmountArray,
            self.dataset.name,
            `Осталось ${product.leftProduct} шт.`
        );
        editElementInnerHTML(
            discountProductArray,
            self.dataset.name,
            `${formatNumber(product.sumDiscount)} сом`
        );
    });
});
export default amountTotalPrice;
