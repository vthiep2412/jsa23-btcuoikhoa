let products = []; // Array to hold the fetched products

async function fetchProducts() {
    try {
        const response = await fetch('https://6753cdf4f3754fcea7bc806a.mockapi.io/idk/nah');
        products = await response.json(); // Store products in the global array
        console.log('Fetched Products:', products); // Check the fetched data
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function filterProducts(searchTerm) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    const tempScreen = document.getElementById('temp-screen');
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = ''; // Clear previous results

    if (filteredProducts.length === 0) {
        searchResults.innerHTML = '<p>No products found.</p>'; // Message if no products match
        tempScreen.style.display = 'block'; // Show the temp screen
        return;
    }

    filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'search-product-item'; // Use the new class
        productItem.style.display = 'flex'; // Use flexbox for layout
        productItem.style.margin = '5px'; // Add margin
        productItem.setAttribute('id', product.id); // Ensure this is set correctly

        productItem.innerHTML = `
            <div style="flex: 1; padding-right: 10px;">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
            </div>
            <div style="flex: 0 0 100px;">
                <img src="${product.pic1}" alt="${product.name}" style="width: fit-content; height: auto;">
                <button class="buy-button" onclick="addToCart('${product.id}')">
                    Add to cart
                    <img src="./pic/icons8-fast-cart-90 (1).png" alt="Shopping Cart" style=" width:10%; height: auto;">
                </button>
            </div>
        `;
        searchResults.appendChild(productItem);
    });

    tempScreen.style.display = 'block'; // Show the temp screen
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(); // Fetch products when the DOM is ready

    const searchInput = document.querySelector('.form-control'); // Select the search input
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value; // Get the current input value
        if (searchTerm === '') {
            displayFilteredProducts(products); // Show all products if search is empty
        } else {
            filterProducts(searchTerm); // Filter products based on input
        }
    });

    // Close button functionality
    document.getElementById('close-search').addEventListener('click', () => {
        const tempScreen = document.getElementById('temp-screen');
        tempScreen.style.display = 'none'; // Hide the temp screen
    });

    // Search button functionality
    document.getElementById('search-button').addEventListener('click', () => {
        const tempScreen = document.getElementById('temp-screen');
        if (tempScreen.style.display != 'none') {
            tempScreen.style.display = 'none'; // Hide the temp screen
        } else {
            const searchTerm = searchInput.value; // Get the current input value
            if (searchTerm === '') {
                displayFilteredProducts(products); // Show all products if search is empty
            } else {
                filterProducts(searchTerm); // Filter products based on input
            }
        }
    });
});
