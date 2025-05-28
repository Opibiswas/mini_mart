const products = [
    {
      id: 1,
      name: "Pran Chips",
      price: 25,
      image: "https://images.pexels.com/photos/13060679/pexels-photo-13060679.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 2,
      name: "Pepsi (500ml)",
      price: 35,
      image: "https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      name: "Igloo Ice Cream",
      price: 120,
      image: "https://images.pexels.com/photos/632470/pexels-photo-632470.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 4,
      name: "Dairy Milk Chocolate",
      price: 50,
      image: "https://images.pexels.com/photos/1586942/pexels-photo-1586942.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 5,
      name: "Kitkat Chocolate",
      price: 45,
      image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 6,
      name: "Coca Cola (1L)",
      price: 70,
      image: "https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 7,
      name: "Lays Potato Chips",
      price: 30,
      image: "https://images.pexels.com/photos/542607/pexels-photo-542607.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 8,
      name: "Maggi Noodles",
      price: 18,
      image: "https://images.pexels.com/photos/5908255/pexels-photo-5908255.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];
  
    const productsGrid = document.getElementById("productsGrid");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartBtn = document.getElementById("cartBtn");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");
    const ownerProfileBtn = document.getElementById("ownerProfileBtn");
    const ownerModal = document.getElementById("ownerModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
  
    let cart = [];
  
    function renderProducts() {
      productsGrid.innerHTML = "";
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h4 class="product-name">${product.name}</h4>
            <p class="product-price">৳${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          </div>
        `;
        productsGrid.appendChild(card);
      });
  
      document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", () => {
          const id = parseInt(button.dataset.id);
          addToCart(id);
        });
      });
    }
  
    function addToCart(id) {
      const product = products.find(p => p.id === id);
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      updateCart();
    }
  
    function updateCart() {
      cartItemsContainer.innerHTML = "";
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      } else {
        cart.forEach(item => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "cart-item";
          itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
              <p class="cart-item-name">${item.name}</p>
              <p class="cart-item-qty">Quantity: ${item.qty}</p>
            </div>
            <p class="cart-item-price">৳${item.price * item.qty}</p>
            <button class="remove-btn" data-id="${item.id}">&times;</button>
          `;
          cartItemsContainer.appendChild(itemDiv);
        });
  
        document.querySelectorAll(".remove-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            removeFromCart(id);
          });
        });
      }
  
      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      cartTotal.textContent = `Total: ৳${total.toFixed(2)}`;
      cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    }
  
    function removeFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      updateCart();
    }
  
    cartBtn.addEventListener("click", () => {
      cartSidebar.classList.add("open");
      cartSidebar.setAttribute("aria-hidden", "false");
    });
  
    closeCartBtn.addEventListener("click", () => {
      cartSidebar.classList.remove("open");
      cartSidebar.setAttribute("aria-hidden", "true");
    });
  
    // Owner profile modal handling
    ownerProfileBtn.addEventListener("click", () => {
      ownerModal.classList.add("open");
      ownerModal.setAttribute("aria-hidden", "false");
    });
  
    closeModalBtn.addEventListener("click", () => {
      ownerModal.classList.remove("open");
      ownerModal.setAttribute("aria-hidden", "true");
    });
  
    // Close modal when clicking outside
    ownerModal.addEventListener("click", (e) => {
      if (e.target === ownerModal) {
        ownerModal.classList.remove("open");
        ownerModal.setAttribute("aria-hidden", "true");
      }
    });
  
    // Close modal with escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && ownerModal.classList.contains("open")) {
        ownerModal.classList.remove("open");
        ownerModal.setAttribute("aria-hidden", "true");
      }
    });
  
    // Banner slider functionality
  let currentSlide = 0;
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.dot');
  const totalSlides = slides.length;
  
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Update dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }
  
  // Next slide function
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }
  
  // Previous slide function
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }
  
  // Set up event listeners
  document.querySelector('.banner-nav.next').addEventListener('click', nextSlide);
  document.querySelector('.banner-nav.prev').addEventListener('click', prevSlide);
  
  // Set up dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);
  
  // Search functionality
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const searchResults = document.getElementById("searchResults");
  const searchResultsGrid = document.getElementById("searchResultsGrid");
  const searchCount = document.getElementById("searchCount");
  const clearSearch = document.getElementById("clearSearch");
  
  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (query === "") {
      searchResults.classList.remove("active");
      return;
    }
    
    const results = products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.price.toString().includes(query)
    );
    
    // Display results
    searchResultsGrid.innerHTML = "";
    
    if (results.length === 0) {
      searchResultsGrid.innerHTML = `
        <div class="no-results">
          <p>No products found matching "${searchInput.value}"</p>
        </div>
      `;
    } else {
      results.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h4 class="product-name">${product.name}</h4>
            <p class="product-price">৳${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          </div>
        `;
        searchResultsGrid.appendChild(card);
      });
      
      // Re-attach event listeners for the Add to Cart buttons
      searchResultsGrid.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", () => {
          const id = parseInt(button.dataset.id);
          addToCart(id);
        });
      });
    }
    
    // Update count and show results
    searchCount.textContent = `(${results.length} ${results.length === 1 ? 'product' : 'products'} found)`;
    searchResults.classList.add("active");
    
    // Scroll to search results
    searchResults.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Event listeners for search
  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
  
  // Clear search
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    searchResults.classList.remove("active");
  });
  
  // Make search bar stick on mobile when scrolling
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
    } else {
      header.style.boxShadow = "none";
    }
  });
  
    // Initial rendering
    renderProducts();