let productDetails = []; // Array to hold the fetched product details
let basicProducts = []; // Array to hold the basic product details

async function fetchProductDetails() {
    try {
        const response = await fetch('https://6753cdf4f3754fcea7bc806a.mockapi.io/idk/neh'); // Update with the correct path for the second API
        productDetails = await response.json(); // Store product details in the global array
        console.log('Fetched Product Details:', productDetails); // Check the fetched data
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

async function fetchBasicProducts() {
    try {
        const response = await fetch('https://6753cdf4f3754fcea7bc806a.mockapi.io/idk/nah'); // First API URL
        basicProducts = await response.json(); // Store basic product details in the global array
        console.log('Fetched Basic Products:', basicProducts); // Check the fetched data
    } catch (error) {
        console.error('Error fetching basic products:', error);
    }
}

function showProductDetail(productId) {
    const product = productDetails.find(p => p.id === productId);
    const basicProduct = basicProducts.find(p => p.id === productId); // Get basic product details

    if (!product || !basicProduct) {
        console.error('Product not found');
        return;
    }

    const detailScreen = document.createElement('div');
    detailScreen.id = 'detail-screen';
    let PicSrc = basicProduct.pic1;
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '20px';
    closeButton.style.fontSize = '24px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => {
        detailScreen.classList.remove('show'); // Trigger fade-out
        setTimeout(() => {
            document.body.removeChild(detailScreen); // Remove from DOM after fade-out
        }, 2000); // Match this with the CSS transition duration
    };

    let buttonContent = ''; // Khởi tạo biến để chứa nội dung nút
    let i = 1;
    while (basicProduct[`pic${i}`]) {
        buttonContent += `
            <button id="imageChange-thumbnails" onclick="document.getElementById('detail-img').src='${basicProduct[`pic${i}`]}';">
                <img src="${basicProduct[`pic${i}`]}" alt="Image ${i}">
            </button>
        `;
        i++;
    }
    const productContent = `
        <div class="item1" style="flex: 0 0 200px; text-align: left;">
            <img id="detail-img" src="${PicSrc}" alt="${basicProduct.name}">
        </div>
        <div class="item4">
            ${buttonContent}
        </div>
        <div class="item2" style="flex: 1; padding-right: 20px; max-width: 600px; text-align: left">
            <h2 class="responsive-text2">${basicProduct.name}</h2>
            <p class="responsive-text1"><strong>Brand:</strong> ${basicProduct.Brand}<br>
                <strong>Price:</strong> $${basicProduct.price}<br>
                <strong>Ammo Type:</strong> ${product.ammoType}<br>
                <strong>Weight:</strong> ${product.weight}<br>
                <strong>Length:</strong> ${product.length}<br>
                <strong>Fire Rate:</strong> ${product.fireRate}<br>
                <strong>Capacity:</strong> ${product.capacity}<br>
            </p>
        </div>
        <div class="item3" style="flex: 0 0 200px; text-align: left;">
            <div class="buy-button-space">
                <h3 class="responsive-text25">Product description:</h3>
                <button class="buy-button" onclick="addToCart('${basicProduct.id}')">
                    Add to cart
                    <img src="./pic/icons8-fast-cart-90 (1).png" alt="Shopping Cart" style=" width:10%; height: auto;">
                </button>
            </div>
            <p class="responsive-text3">${product.description}</p>
        </div>
    `;


    const contentContainer = document.createElement('div');
    contentContainer.className = 'Detail-screen-content';
    contentContainer.innerHTML = productContent;
    detailScreen.appendChild(contentContainer);
    detailScreen.appendChild(closeButton);
    document.body.appendChild(detailScreen);

    // Trigger fade-in
    setTimeout(() => {
        detailScreen.classList.add('show');
    }, 10); // Small timeout to allow the element to be added to the DOM
}

// let checkClickBuy = false;
// document.getElementsByClassName(buy-button).addEventListener('click', (event) => {
//         checkClickBuy = true;
//     });

document.addEventListener('DOMContentLoaded', () => {
    fetchBasicProducts(); // Fetch basic product details when the DOM is ready
    fetchProductDetails(); // Fetch detailed product information

    // Add event listeners to product items in the main and search results
    document.getElementById('product-list').addEventListener('click', (event) => {
        // Kiểm tra xem click có phải trên nút "Add to cart" không
        if (event.target.closest('.buy-button')) {
            return; // Nếu click vào nút "Add to cart", không làm gì cả
        }
        
        const productId = parseInt(event.target.closest('.product-item').id); // Use the id attribute directly
        showProductDetail(productId);
    });

    document.getElementById('search-results').addEventListener('click', (event) => {
        // Kiểm tra xem click có phải trên nút "Add to cart" không
        if (event.target.closest('.buy-button')) {
            return; // Nếu click vào nút "Add to cart", không làm gì cả
        }
        
        const productId = parseInt(event.target.closest('.search-product-item').id); // Use the id attribute directly
        showProductDetail(productId);
    });
}); 