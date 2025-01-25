async function fetchProducts() {
    try {
        const response = await fetch('https://6753cdf4f3754fcea7bc806a.mockapi.io/idk/nah');
        const products = await response.json();
        console.log(products); // Kiểm tra dữ liệu nhận được
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.setAttribute('id', product.id);

        // Tạo chuỗi cho các thuộc tính bổ sung, bỏ qua các thuộc tính hình ảnh
        let additionalAttributes = '';
        for (const key in product) {
            if (!['id', 'name', 'description', 'price'].includes(key) && !key.startsWith('pic')) {
                additionalAttributes += `<span class="attribute">${key}: ${product[key]}</span>`;
            }
        }

        productItem.innerHTML = `
            <img src="${product.pic1}" alt="${product.name}">
            <div class="product-item1">
                <h3>${product.name}</h3>
                <p class="p-inbox">${product.description}</p>
                <p class="p-inbox">Price: $${product.price}</p>
                <p>${additionalAttributes}</p>
            </div>
            <div class="product-item1">
                <button class="buy-button" onclick="addToCart('${product.id}')">
                    Add to cart
                    <img src="./pic/icons8-fast-cart-90 (1).png" alt="Shopping Cart" style=" width:10%; height: auto;">
                </button>
            </div>
        `;
        productList.appendChild(productItem);

        // Xác định số lượng hình ảnh có sẵn
        let imageCount = 0;
        for (let i = 1; product[`pic${i}`]; i++) {
            imageCount++;
        }

        // Thay đổi hình ảnh mỗi 2.5 giây chỉ nếu có nhiều hơn 1 hình ảnh
        if (imageCount > 1) {
            let currentPic = 1;
            setInterval(() => {
                const imgElement = productItem.querySelector('img');
                imgElement.style.opacity = 0; // Mờ dần hình ảnh hiện tại

                setTimeout(() => {
                    currentPic = currentPic === imageCount ? 1 : currentPic + 1;
                    imgElement.src = product[`pic${currentPic}`];
                    imgElement.style.opacity = 1; // Hiện hình ảnh mới
                }, 1200); // Thời gian mờ dần (1 giây)
            }, 3500);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
    
     // Gọi hàm fetchProducts sau khi DOM đã sẵn sàng
});

fetchProducts();