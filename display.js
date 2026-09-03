import { getStockStatus } from "./inventoryUtils.js";

export function displayProducts(products) {
    const productList = document.getElementById("productList");
    const noResultsMessage = document.getElementById("noResultsMessage");

    productList.innerHTML = "";

    if (products.length === 0) {
        noResultsMessage.style.display = "block";
        return;
    }

    noResultsMessage.style.display = "none";

    products.forEach(product => {
        const {
            id,
            name,
            category,
            price,
            stock
        } = product;

        const stockStatus = getStockStatus(stock);

        const productCard = document.createElement("div");
        productCard.className = "product-card";

        let statusClass = "";

        if (stockStatus === "Out of Stock") {
            statusClass = "out";
        } else if (stockStatus === "Low Stock") {
            statusClass = "low";
        } else {
            statusClass = "in";
        }

        productCard.innerHTML = `
            <div class="card-number">#${id}</div>

            <div class="merch-icon">
                ✦
            </div>

            <div class="product-info">
                <h3>${name}</h3>

                <p class="category">
                    ${category}
                </p>

                <div class="details">
                    <div>
                        <span>Price</span>
                        <strong>₱${price.toLocaleString()}</strong>
                    </div>

                    <div>
                        <span>Stock</span>
                        <strong>${stock}</strong>
                    </div>
                </div>

                <div class="stock-status ${statusClass}">
                    ${stockStatus}
                </div>
            </div>
        `;

        productList.appendChild(productCard);
    });
}

export function displayTotalInventoryValue(value) {
    const totalInventoryValue =
        document.getElementById("totalInventoryValue");

    totalInventoryValue.textContent =
        `₱${value.toLocaleString()}`;
}

export function displayLowStockCount(count) {
    const lowStockCount =
        document.getElementById("lowStockCount");

    lowStockCount.textContent = count;
}

export function displayOutOfStockCount(count) {
    const outOfStockCount =
        document.getElementById("outOfStockCount");

    outOfStockCount.textContent = count;
}