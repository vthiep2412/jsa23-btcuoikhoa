// cart.js

// Hàm để lấy địa chỉ IP của người dùng (giả định có một API để lấy IP)
async function getUserIp() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

// Hàm để thêm sản phẩm vào giỏ hàng
async function addToCart(productId) {
    const userIp = await getUserIp();
    const cartData = await fetchCartData();

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    if (cartData[userIp]) {
        if (cartData[userIp][productId]) {
            // Nếu sản phẩm đã có, tăng biến đếm
            cartData[userIp][productId].cnt += 1;
        } else {
            // Nếu sản phẩm chưa có, thêm mới
            cartData[userIp][productId] = { id: productId, cnt: 1 };
        }
    } else {
        // Nếu chưa có giỏ hàng cho IP này, tạo mới
        cartData[userIp] = {
            [productId]: { id: productId, cnt: 1 }
        };
    }

    // Lưu dữ liệu vào file JSON
    await saveCartData(cartData);
}

// Hàm để lấy dữ liệu giỏ hàng từ file JSON
async function fetchCartData() {
    const response = await fetch('cart.json'); // Đường dẫn đến file JSON
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.text(); // Lấy dữ liệu dưới dạng văn bản
    if (data) {
        return JSON.parse(data); // Chỉ phân tích nếu có dữ liệu
    } else {
        return {}; // Trả về một đối tượng rỗng nếu không có dữ liệu
    }
}

// Hàm để lưu dữ liệu giỏ hàng vào file JSON
async function saveCartData(data) {
    // Ghi dữ liệu vào file JSON (cần một server để thực hiện việc này)
    await fetch('cart.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}