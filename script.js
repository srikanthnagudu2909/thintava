// ✅ Product Data
const products = [
  { name: "Cheese Burger", price: 120, category: "Burger", img: "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg" },
  { name: "Double Chicken Burger", price: 200, category: "Burger", img: "https://cdn.uengage.io/uploads/6670/image-257742-1677054193.jpeg" },
  { name: "Veggie Burger", price: 100, category: "Burger", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNESDDA5entUo5alm29tnPmgaIz1BdFRaTFQ&s" },
  { name: "Margherita Pizza", price: 250, category: "Pizza", img: "https://ooni.com/cdn/shop/articles/20220211142347-margherita-9920_ba86be55-674e-4f35-8094-2067ab41a671.jpg?v=1737104576&width=1080" },
  { name: "White Sauce Pasta", price: 180, category: "Pizza", img: "https://www.kannammacooks.com/wp-content/uploads/white-sauce-pasta-with-cheese.jpg" },
  { name: "French Fries", price: 90, category: "Burger", img: "https://www.seriouseats.com/thmb/Il7mv9ZSDh7n0cZz3t3V-28ImkQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2018__04__20180309-french-fries-vicky-wasik-15-5a9844742c2446c7a7be9fbd41b6e27d.jpg" },
  { name: "Chocolate Brownie", price: 150, category: "Dessert", img: "https://icecreambakery.in/wp-content/uploads/2024/12/Brownie-Recipe-with-Cocoa-Powder-1200x821.jpg" },
  { name: "Vanilla Ice Cream", price: 120, category: "Dessert", img: "https://b.zmtcdn.com/data/dish_photos/cad/831fdf227eb763dc9ee1144a4e375cad.jpeg" },
  { name: "Cold Coffee", price: 80, category: "Drinks", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPg5JowFsGBE7iiMri8Zwx0RhwQUto8ceYXg&s" },
  { name: "Lemonade", price: 70, category: "Drinks", img: "https://www.jocooks.com/wp-content/uploads/2023/05/lemonade-1-28.jpg" },
  { name: "Iced Tea", price: 90, category: "Drinks", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH4-A0IzG2Zom8XywgR9pi1-4yAX-yw9sf0Q&s" },
  { name: "Oreo Shake", price: 150, category: "Shakes", img: "https://cdn.dotpe.in/longtail/store-items/8635073/mnp5Fai5.webp" },
  { name: "Strawberry Shake", price: 140, category: "Shakes", img: "https://www.chilitochoc.com/wp-content/uploads/2025/02/strawberry-cheesecake-milkshake-recipe-500x500.jpg" },
  { name: "Chocolate Shake", price: 160, category: "Shakes", img: "https://www.organicvalley.coop/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F5dqbssss%2Fproduction-v3%2F3ba3f137c02a6f320c156bb7c39e362bdbd87bb8-1356x1576.jpg&w=3840&q=75" },
  { name: "Banana Shake", price: 130, category: "Shakes", img: "https://insanelygoodrecipes.com/wp-content/uploads/2024/02/Banana-Milkshake-in-Glass.jpg" },
  { name: "Mango Smoothie", price: 120, category: "Shakes", img: "https://www.worldofvegan.com/wp-content/uploads/2020/05/mango-banana-smoothie.jpg" },
  { name: "Coca-cola", price: 40, category: "Drinks", img: "https://img.freepik.com/free-psd/refreshing-ice-cold-cola-drink-glass-with-splash_632498-25634.jpg?semt=ais_hybrid&w=740&q=80" },
];

let cart = [];
let total = 0;
let currentCategory = "all";

// 🛍 Render Products
function renderProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  list.forEach((p) => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
      </div>
    `;
  });
}
renderProducts(products);

// 🛒 Cart System
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");

  cartList.innerHTML = "LIST";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
  });

  totalElement.textContent = `Total: ₹${total}`;
}

// 🔍 Search Filter
function filterProducts() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchValue) &&
      (currentCategory === "all" || p.category === currentCategory)
  );
  renderProducts(filtered);
}

// 🧭 Category Filter
function filterByCategory(category) {
  currentCategory = category;
  document.querySelectorAll(".categories button").forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
  filterProducts();
}

// 💳 Razorpay Payment
function submitOrder(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const options = {
    key: "rzp_test_1234567890abcdef", // Replace with your Razorpay key
    amount: total * 100,
    currency: "INR",
    name: "Modern Food Order",
    description: "Order Payment",
    handler: function (response) {
      alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
      cart = [];
      total = 0;
      updateCart();
      document.getElementById("orderForm").reset();
    },
    prefill: { name, contact: phone },
    theme: { color: "#ff4d4d" },
  };

  const rzp = new Razorpay(options);
  rzp.open();
}

// 🌙 Theme Toggle
function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const themeButton = document.getElementById("themeToggle");
  if (body.classList.contains("dark-mode")) {
    themeButton.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeButton.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

// 🧠 Remember Theme
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggle").textContent = "☀️ Light Mode";
  }
};
// Assume you already have cart[], total, etc.
function generateQRCode(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Hide main content
  const mainContent = document.getElementById("main-content");
  mainContent.style.transition = "opacity 0.4s ease";
  mainContent.style.opacity = "0";

  setTimeout(() => {
    mainContent.style.display = "none";

    const qrSection = document.getElementById("qr-section");
    qrSection.classList.add("active");

    document.getElementById("qr-amount").textContent = total;
    document.getElementById("success-name").textContent = name;

    alert(`✅ Your total is ₹${total}\nPlease scan the QR code to pay.`);

    // ⏱️ After 30 seconds, show success animation
    setTimeout(() => {
      showSuccessPopup();
    }, 30000); // 30,000ms = 30 seconds
  }, 400);
}

function showSuccessPopup() {
  const qrSection = document.getElementById("qr-section");
  const qrBox = document.getElementById("qr-box");
  const successPopup = document.getElementById("success-popup");

  // Dim background QR and show success popup
  qrSection.classList.add("dimmed");
  successPopup.classList.add("active");

  // After 5 seconds, go back to home
  setTimeout(() => {
    successPopup.classList.remove("active");
    goBack();
    alert("✅ Payment confirmed successfully!");
    cart = [];
    total = 0;
    updateCart();
    document.getElementById("orderForm").reset();
  }, 5000);
}

// Back to main content
function goBack() {
  const qrSection = document.getElementById("qr-section");
  qrSection.classList.remove("active", "dimmed");

  setTimeout(() => {
    const mainContent = document.getElementById("main-content");
    mainContent.style.display = "block";
    setTimeout(() => (mainContent.style.opacity = "1"), 100);
  }, 500);
}
// ====================
// USER AUTH SYSTEM
// ====================

// Register
function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  const user = { name, email, password };

  // Save user to localStorage
  localStorage.setItem("user", JSON.stringify(user));

  alert("✅ Registration successful! Please login now.");
  window.location.href = "index.html";
}

// Login
function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No user found. Please register first!");
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    localStorage.setItem("loggedIn", "true");
    alert("✅ Login successful!");
    window.location.href = "order.html";
  } else {
    alert("❌ Invalid email or password!");
  }
}

// Logout
function logoutUser() {
  localStorage.removeItem("loggedIn");
  alert("👋 Logged out successfully!");
  window.location.href = "index.html";
}

// Restrict access to order.html
if (window.location.pathname.includes("order.html")) {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (!isLoggedIn) {
    alert("🚫 Please login first!");
    window.location.href = "index.html";
  }
}
// ====================
// USER AUTH SYSTEM
// ====================

// Register
function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  const user = { name, email, password };

  // Save user to localStorage
  localStorage.setItem("user", JSON.stringify(user));

  alert("✅ Registration successful! Please login now.");
  window.location.href = "index.html";
}

// Login
function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No user found. Please register first!");
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    localStorage.setItem("loggedIn", "true");
    alert("✅ Login successful!");
    window.location.href = "order.html";
  } else {
    alert("❌ Invalid email or password!");
  }
}

// Logout
function logoutUser() {
  localStorage.removeItem("loggedIn");
  alert("👋 Logged out successfully!");
  window.location.href = "index.html";
}

// Restrict access to order.html
if (window.location.pathname.includes("order.html")) {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (!isLoggedIn) {
    alert("🚫 Please login first!");
    window.location.href = "index.html";
  }
}
