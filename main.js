import { products } from "./products.js";

import {
    searchProducts,
    filterProductsByCategory,
    calculateTotalInventoryValue,
    countLowStockProducts,
    countOutOfStockProducts
} from "./inventoryUtils.js";

import {
    displayProducts,
    displayTotalInventoryValue,
    displayLowStockCount,
    displayOutOfStockCount
} from "./display.js";

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

function updateInventoryDisplay() {
    const query = searchInput.value;
    const category = categoryFilter.value;

    let filteredProducts = searchProducts(products, query);

    filteredProducts = filterProductsByCategory(
        filteredProducts,
        category
    );

    displayProducts(filteredProducts);
}

function displayInventorySummary() {
    const totalValue =
        calculateTotalInventoryValue(products);

    const lowStock =
        countLowStockProducts(products);

    const outOfStock =
        countOutOfStockProducts(products);

    displayTotalInventoryValue(totalValue);
    displayLowStockCount(lowStock);
    displayOutOfStockCount(outOfStock);
}

searchBtn.addEventListener("click", () => {
    updateInventoryDisplay();
});

categoryFilter.addEventListener("change", () => {
    updateInventoryDisplay();
});

searchInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        updateInventoryDisplay();
    }
});

resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "All";

    displayProducts(products);
    displayInventorySummary();
});

displayProducts(products);
displayInventorySummary();