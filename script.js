// Elementos del DOM
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector("#cart-modal");
const closeCartBtn = document.querySelector("#close-cart-btn");
const clearCartBtn = document.querySelector("#clear-cart-btn");
const cartList = document.querySelector("#cart-list");

// Carrito almacenado en el localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Actualizar el número de artículos en el carrito
function updateCartCount() {
  const cartCount = cart.reduce((acc, product) => acc + product.quantity, 0);
  cartBtn.textContent = `Carrito (${cartCount})`;
}

// Actualizar el contenido del carrito
function updateCartModal() {
  cartList.innerHTML = ""; // Limpiar el contenido del carrito

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Tu carrito está vacío.</p>";
  } else {
    cart.forEach(product => {
      const li = document.createElement("li");
      li.textContent = `${product.name} - $${product.price} x ${product.quantity}`;
      cartList.appendChild(li);
    });
  }
}

// Agregar un producto al carrito
function addToCart(product) {
  const productIndex = cart.findIndex(item => item.name === product.name);

  if (productIndex === -1) {
    cart.push(product);
  } else {
    cart[productIndex].quantity += product.quantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Guardar en el localStorage
  updateCartCount(); // Actualizar la cantidad en el carrito
  updateCartModal(); // Actualizar la vista del carrito
}

// Manejar el click en los botones "Añadir al Carrito"
addToCartBtns.forEach(button => {
  button.addEventListener("click", (e) => {
    const courseElement = e.target.closest(".course");
    const courseName = courseElement.querySelector("h3").textContent;
    const coursePrice = parseFloat(courseElement.querySelector(".price").textContent.replace('$', ''));

    const product = {
      name: courseName,
      price: coursePrice,
      quantity: 1
    };

    addToCart(product);
  });
});

// Abrir el carrito
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "block"; // Mostrar la ventana modal
  updateCartModal(); // Actualizar el contenido del carrito
});

// Cerrar el carrito
closeCartBtn.addEventListener("click", () => {
  cartModal.style.display = "none"; // Cerrar la ventana modal
});

// Vaciar el carrito
clearCartBtn.addEventListener("click", () => {
  cart = []; // Vaciar el carrito
  localStorage.setItem("cart", JSON.stringify(cart)); // Guardar el carrito vacío en el localStorage
  updateCartCount(); // Actualizar la cantidad en el carrito
  updateCartModal(); // Actualizar la vista del carrito
});

// Inicializar el carrito al cargar la página
updateCartCount();
