"use strict";

const basketEl = document.querySelector('.cartIconWrap');
const basketCounterEl = basketEl.querySelector('span');
const basketOpenEl = document.querySelector('.basket');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');

basketEl.addEventListener('click', () => {
    basketOpenEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.btn-add')) {
        return;
    }
    const featuredItem = event.target.closest('.featuredItem');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount();
    basketTotalValueEl.textContent = getTotalBasketPrice();
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductInBasket(id) {
    const basketRowEl = basketOpenEl
        .querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRowEl) {
        renderOneProductInBasket(id);
        return;
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow')
        .textContent = basket[id].price * basket[id].count;
}

function renderOneProductInBasket(productId) {
    const productRow = `
        <div class="basketRow" data-productId="${productId}">
            <div>${basket[productId].name}</div>
            <div>
                <span class="productCount">${basket[productId].count}</span> шт.
            </div>
            <div>$${basket[productId].price}</div>
            <div>
            $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
            </div>
        </div>
    `;
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}