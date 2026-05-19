const c = (name, colorKeys, fileName, stock = 10) => ({
  name,
  colorKeys,
  stock,
  images: {
    light: `img/light/${fileName}`
  }
});

const PRODUCT_TEMPLATE = [
  {
    id: 1,
    name: "X001",
    price: 16,
    design: "llamativo",
    featured: true,
    threadCount: 12,
    closureType: "corredizo",
    offerPercent: 0,
    description: "",
    variants: [c("Degrade de Rojo", ["blanco", "amarillo", "naranja", "rojo", "negro"], "T12-001-PAT.png", 14)]
  },
  {
    id: 2,
    name: "X002",
    price: 16,
    design: "llamativo",
    featured: true,
    threadCount: 12,
    closureType: "corredizo",
    offerPercent: 0,
    description: "",
    variants: [c("Verde y Lila", ["verde", "negro", "lila"], "T12-002-PAT.png", 10)]
  },
  {
    id: 3,
    name: "X003",
    price: 14,
    design: "llamativo",
    featured: true,
    threadCount: 10,
    closureType: "corredizo",
    offerPercent: 0,
    description: "",
    variants: [
      c("Rosa y Azul", ["azul", "celeste", "rosa", "fucsia", "negro"], "T10-001-PAT.png", 9),
      c("Morado y Amarillo", ["morado", "lila", "amarillo", "negro"], "T10-001-PAT-2.png", 7),
      c("Verde y Celeste", ["turquesa", "celeste", "verde", "lima", "negro"], "T10-001-PAT-3.png", 7)
    ]
  },
  {
    id: 4,
    name: "X004",
    price: 12,
    design: "casual",
    featured: true,
    threadCount: 10,
    closureType: "corredizo",
    offerPercent: 20,
    description: "",
    variants: [c("Coffe", ["marron", "dorado"], "T10-002-PAT.png", 8)]
  },
  {
    id: 5,
    name: "X005",
    price: 12,
    design: "casual",
    featured: true,
    threadCount: 8,
    closureType: "corredizo",
    offerPercent: 0,
    description: "",
    variants: [
      c("Bluish", ["azul", "celeste"], "T08-001-PAT.png", 12),
      c("Reddish", ["rojo", "marron"], "T08-001-PAT-2.png", 12)
    ]
  },
  {
    id: 6,
    name: "X006",
    price: 10,
    design: "casual",
    featured: true,
    threadCount: 10,
    closureType: "corredizo",
    offerPercent: 0,
    description: "",
    variants: [
      c("Pixel", ["azul", "verde", "rojo", "negro"], "T10-003-PAT.png", 11)
    ]
  },
  {
    id: 7,
    name: "X007",
    price: 10,
    design: "textura",
    featured: true,
    threadCount: 8,
    closureType: "corredizo",
    offerPercent: 0,
    description: "",
    variants: [
      c("Green", ["verde"], "T08-002-PAT.png", 11),
      c("Red", ["rojo"], "T08-002-PAT-2.png", 11),
      c("Blue", ["azul"], "T08-002-PAT-3.png", 11)
    ]
  },
  {
    id: 8,
    name: "X008",
    price: 5,
    design: "simple",
    featured: true,
    threadCount: 6,
    closureType: "corredizo",
    offerPercent: 0,
    description: "",
    variants: [
      c("PurpleGrade", ["morado", "lila"], "T06-001-PAT.png", 11)
    ]
  },
  {
    id: 9,
    name: "X009",
    price: 12,
    design: "elegante",
    featured: true,
    threadCount: 8,
    closureType: "corredizo",
    offerPercent: 0,
    description: "",
    variants: [
      c("GoldBlack", ["dorado", "negro"], "T08-003-PAT.png", 11)
    ]
  },
  {
    id: 10,
    name: "X010",
    price: 18,
    design: "llamativo",
    featured: true,
    threadCount: 12,
    closureType: "corredizo",
    offerPercent: 0,
    description: "",
    variants: [
      c("PinkGrade", ["rosa", "fucsia", "crema"], "T12-003-PAT.png", 11)
    ]
  },
  {
    id: 11,
    name: "X011",
    price: 5,
    design: "elegante",
    featured: true,
    threadCount: 4,
    closureType: "corredizo",
    offerPercent: 0,
    description: "",
    variants: [
      c("Pink", ["rosa"], "T04-001-PAT.png", 11)
    ]
  },
  {
    id: 12,
    name: "X012",
    price: 9,
    design: "casual",
    featured: true,
    threadCount: 8,
    closureType: "corredizo",
    offerPercent: 0,
    description: "",
    variants: [
      c("GrayGrade", ["negro", "gris", "blanco"], "T08-004-PAT.png", 11)
    ]
  }
];

function cloneProducts(list) {
  return list.map(product => ({
    ...product,
    variants: product.variants.map(variant => ({ ...variant, colorKeys: [...variant.colorKeys] }))
  }));
}

let products = cloneProducts(PRODUCT_TEMPLATE);

const STORAGE_KEYS = {
  favorites: "macrame_favorites",
  cart: "macrame_cart",
  theme: "macrame_theme",
  adminData: "macrame_admin_data",
  adminSession: "macrame_admin_session"
};

const ADMIN_PASSWORD = "elpapu12";
const WHATSAPP_NUMBER = "51933299897";

const state = {
  view: "catalog",
  search: "",
  sort: "featured",
  color: "all",
  design: "all",
  threads: "all",
  offer: "all",
  maxPrice: 50,
  favorites: [],
  cart: [],
  theme: "light",
  selectedProductId: null,
  selectedColorIndex: 0,
  adminData: {}
};

function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getProduct(id) {
  return products.find(product => product.id === id);
}

function getVariant(product, variantIndex) {
  return product?.variants?.[variantIndex] || product?.variants?.[0] || null;
}

function getThemeImage(variant) {
  return variant?.images?.[state.theme] || variant?.images?.light || "";
}

function isFavorite(id) {
  return state.favorites.includes(id);
}

function hasOffer(product) {
  return Number(product.offerPercent) > 0;
}

function getProductSalePrice(product) {
  const percent = Number(product.offerPercent) || 0;
  if (percent <= 0) return product.price;
  return Math.max(1, Math.round(product.price * (1 - percent / 100)));
}

function getProductStock(product) {
  return product.variants.reduce((sum, variant) => sum + Number(variant.stock || 0), 0);
}

function getVariantStock(product, variantIndex) {
  return Number(getVariant(product, variantIndex)?.stock || 0);
}

function cartCount() {
  return state.cart.reduce((acc, item) => acc + item.qty, 0);
}

function favoriteCount() {
  return state.favorites.length;
}

function cartQtyForVariant(productId, variantIndex) {
  return state.cart
    .filter(item => item.productId === productId && item.variantIndex === variantIndex)
    .reduce((acc, item) => acc + item.qty, 0);
}

function availableStock(productId, variantIndex) {
  const product = getProduct(productId);
  if (!product) return 0;
  return Math.max(0, getVariantStock(product, variantIndex) - cartQtyForVariant(productId, variantIndex));
}

function cartTotal() {
  return state.cart.reduce((acc, item) => {
    const product = getProduct(item.productId);
    if (!product) return acc;
    return acc + getProductSalePrice(product) * item.qty;
  }, 0);
}

function saveFavorites() {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(state.favorites));
}

function saveCart() {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(state.cart));
}

function saveTheme() {
  localStorage.setItem(STORAGE_KEYS.theme, state.theme);
}

function saveAdminData() {
  localStorage.setItem(STORAGE_KEYS.adminData, JSON.stringify(state.adminData));
}

function isAdminUnlocked() {
  return sessionStorage.getItem(STORAGE_KEYS.adminSession) === "1";
}

function setAdminUnlocked(value) {
  if (value) sessionStorage.setItem(STORAGE_KEYS.adminSession, "1");
  else sessionStorage.removeItem(STORAGE_KEYS.adminSession);
  refreshAdminVisibility();
}

function syncAdminStateFromProducts() {
  const next = {};
  products.forEach(product => {
    next[product.id] = {
      offerPercent: Number(product.offerPercent) || 0,
      variantStocks: product.variants.map(variant => Number(variant.stock) || 0)
    };
  });
  state.adminData = next;
  saveAdminData();
}

function applyAdminStateToProducts() {
  products = cloneProducts(PRODUCT_TEMPLATE).map(product => {
    const saved = state.adminData[product.id];
    if (saved) {
      product.offerPercent = Math.max(0, Math.min(90, Number(saved.offerPercent) || 0));
      if (Array.isArray(saved.variantStocks)) {
        product.variants = product.variants.map((variant, index) => ({
          ...variant,
          stock: Math.max(0, Number(saved.variantStocks[index] ?? variant.stock ?? 0))
        }));
      }
    }
    return product;
  });
}

function loadState() {
  try {
    state.favorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || "[]");
  } catch {
    state.favorites = [];
  }

  try {
    state.cart = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || "[]");
  } catch {
    state.cart = [];
  }

  try {
    state.adminData = JSON.parse(localStorage.getItem(STORAGE_KEYS.adminData) || "{}");
  } catch {
    state.adminData = {};
  }

  state.theme = localStorage.getItem(STORAGE_KEYS.theme) || "light";
  applyAdminStateToProducts();

  if (!localStorage.getItem(STORAGE_KEYS.adminData)) {
    syncAdminStateFromProducts();
  }
}

function ensureAdminButton() {
  let btn = document.getElementById("adminBtn");
  if (btn) return btn;

  const nav = document.querySelector(".top-menu");
  if (!nav) return null;

  btn = document.createElement("button");
  btn.id = "adminBtn";
  btn.className = "nav-btn";
  btn.dataset.viewBtn = "admin";
  btn.textContent = "Admin";
  btn.onclick = requestAdminAccess;
  nav.appendChild(btn);
  return btn;
}

function ensureAdminModal() {
  let modal = document.getElementById("adminLoginModal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.className = "admin-login-modal";
  modal.id = "adminLoginModal";
  modal.style.display = "none";
  modal.innerHTML = `
    <div class="admin-login-box" onclick="event.stopPropagation()">
      <h2>Panel Admin</h2>
      <p>Ingresa la contraseña para acceder.</p>
      <input type="password" id="adminPassword" placeholder="Contraseña" />
      <div class="admin-login-actions">
        <button class="primary-btn" onclick="loginAdmin()">Entrar</button>
        <button class="secondary-btn" onclick="closeAdminLogin()">Cancelar</button>
      </div>
    </div>
  `;
  modal.addEventListener("click", closeAdminLogin);
  document.body.appendChild(modal);
  return modal;
}

function refreshAdminVisibility() {
  const btn = ensureAdminButton();
  if (!btn) return;
  btn.style.display = isAdminUnlocked() ? "inline-flex" : "none";
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  const btn = document.getElementById("themeToggleBtn");
  if (btn) btn.textContent = state.theme === "light" ? "Tema oscuro" : "Tema claro";
  refreshPreviewImage();
  updatePriceRangeVisual();
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  saveTheme();
  applyTheme();
  render();
}

function updateSearch(value) {
  state.search = value;
  render();
}

function updateMaxPrice(value) {
  state.maxPrice = Number(value);
  const label = document.getElementById("maxPriceLabel");
  if (label) label.textContent = `S/ ${value}`;
  updatePriceRangeVisual();
  render();
}

function updatePriceRangeVisual() {
  const range = document.getElementById("priceRange");
  if (!range) return;

  const min = Number(range.min || 0);
  const max = Number(range.max || 100);
  const val = Number(range.value || 0);
  const percent = max > min ? ((val - min) / (max - min)) * 100 : 0;

  range.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percent}%, rgba(255,255,255,0.18) ${percent}%, rgba(255,255,255,0.18) 100%)`;
}

function applyFilters() {
  const sortSelect = document.getElementById("sortSelect");
  const colorSelect = document.getElementById("colorSelect");
  const designSelect = document.getElementById("designSelect");
  const threadSelect = document.getElementById("threadSelect");
  const offerSelect = document.getElementById("offerSelect");

  if (sortSelect) state.sort = sortSelect.value;
  if (colorSelect) state.color = colorSelect.value;
  if (designSelect) state.design = designSelect.value;
  if (threadSelect) state.threads = threadSelect.value;
  if (offerSelect) state.offer = offerSelect.value;

  render();
}

function clearFilters() {
  state.search = "";
  state.sort = "featured";
  state.color = "all";
  state.design = "all";
  state.threads = "all";
  state.offer = "all";
  state.maxPrice = 50;

  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const colorSelect = document.getElementById("colorSelect");
  const designSelect = document.getElementById("designSelect");
  const threadSelect = document.getElementById("threadSelect");
  const offerSelect = document.getElementById("offerSelect");
  const priceRange = document.getElementById("priceRange");
  const maxPriceLabel = document.getElementById("maxPriceLabel");

  if (searchInput) searchInput.value = "";
  if (sortSelect) sortSelect.value = "featured";
  if (colorSelect) colorSelect.value = "all";
  if (designSelect) designSelect.value = "all";
  if (threadSelect) threadSelect.value = "all";
  if (offerSelect) offerSelect.value = "all";
  if (priceRange) priceRange.value = 50;
  if (maxPriceLabel) maxPriceLabel.textContent = "S/ 50";

  updatePriceRangeVisual();
  render();
}

function getFilteredProducts(baseList = products) {
  let list = [...baseList];

  if (state.search) {
    const q = normalizeText(state.search);
    list = list.filter(product => {
      const haystack = normalizeText([
        product.name,
        product.description,
        product.design,
        `${product.threadCount} hilos`,
        product.closureType,
        ...product.variants.map(variant => variant.name),
        ...product.variants.flatMap(variant => variant.colorKeys)
      ].join(" "));
      return haystack.includes(q);
    });
  }

  if (state.color !== "all") {
    list = list.filter(product => product.variants.some(variant => variant.colorKeys.includes(state.color)));
  }

  if (state.design !== "all") {
    list = list.filter(product => normalizeText(product.design) === state.design);
  }

  if (state.threads !== "all") {
    list = list.filter(product => product.threadCount === Number(state.threads));
  }

  if (state.offer === "offers") {
    list = list.filter(product => hasOffer(product));
  }

  if (state.offer === "withoutOffer") {
    list = list.filter(product => !hasOffer(product));
  }

  list = list.filter(product => product.price <= state.maxPrice);

  switch (state.sort) {
    case "priceAsc":
      list.sort((a, b) => getProductSalePrice(a) - getProductSalePrice(b));
      break;
    case "priceDesc":
      list.sort((a, b) => getProductSalePrice(b) - getProductSalePrice(a));
      break;
    default:
      list.sort((a, b) => {
        const featuredDiff = Number(b.featured) - Number(a.featured);
        return featuredDiff !== 0 ? featuredDiff : getProductSalePrice(a) - getProductSalePrice(b);
      });
  }

  return list;
}

function openFilters() {
  const panel = document.getElementById("filtersPanel");
  const backdrop = document.getElementById("filtersBackdrop");
  if (panel) panel.classList.add("open");
  if (backdrop) backdrop.classList.add("open");
  document.body.classList.add("filters-open");
}

function closeFilters() {
  const panel = document.getElementById("filtersPanel");
  const backdrop = document.getElementById("filtersBackdrop");
  if (panel) panel.classList.remove("open");
  if (backdrop) backdrop.classList.remove("open");
  document.body.classList.remove("filters-open");
}

function requestAdminAccess() {
  if (isAdminUnlocked()) {
    setView("admin");
    return;
  }
  openAdminLogin();
}

function setView(view) {
  if (view === "admin" && !isAdminUnlocked()) {
    openAdminLogin();
    return;
  }

  state.view = view;
  document.querySelectorAll("[data-view-btn]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.viewBtn === view);
  });
  closeFilters();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateCounters() {
  const favCount = document.getElementById("favCount");
  const count = document.getElementById("count");
  const countFloat = document.getElementById("countFloat");
  if (favCount) favCount.textContent = favoriteCount();
  if (count) count.textContent = cartCount();
  if (countFloat) countFloat.textContent = cartCount();
}

function updateCatalogControls() {
  const controls = document.getElementById("catalogControls");
  if (!controls) return;
  controls.style.display = state.view === "catalog" ? "flex" : "none";
}

function renderPriceBlock(product) {
  const sale = getProductSalePrice(product);
  if (hasOffer(product)) {
    return `
      <div class="price-row price-row-centered">
        <span class="price-sale">S/ ${sale}</span>
        <span class="price-original">S/ ${product.price}</span>
      </div>
    `;
  }
  return `<p class="price centered-price">S/ ${product.price}</p>`;
}

function renderProductCard(product) {
  const favClass = isFavorite(product.id) ? "active" : "";
  const totalStock = getProductStock(product);
  const soldOut = totalStock <= 0;
  const imageVariant = product.variants.find(variant => Number(variant.stock) > 0) || product.variants[0];

  return `
    <div class="card ${soldOut ? "sold-out" : ""}" onclick="openPreview(${product.id})">
      ${hasOffer(product) ? `<div class="mini-offer-badge">OFERTA</div>` : ""}
      <button class="fav-icon ${favClass}" onclick="toggleFavorite(${product.id}, event)">
        ${isFavorite(product.id) ? "♥" : "♡"}
      </button>

      <div class="card-image-wrap">
        <img src="${getThemeImage(imageVariant)}" alt="${product.name}" />
      </div>

      <div class="card-bottom">
        ${renderPriceBlock(product)}
        <div class="card-actions">
          <button class="secondary-btn" onclick="openPreview(${product.id}); event.stopPropagation();">Ver detalles</button>
          <button class="whatsapp-btn" onclick="openProductWhatsApp(${product.id}, event)">WhatsApp</button>
        </div>
      </div>
    </div>
  `;
}

function renderProductGrid(list) {
  if (!list.length) return `<div class="empty-state">No hay productos con esos filtros.</div>`;
  return `<div class="grid-products">${list.map(renderProductCard).join("")}</div>`;
}

function renderCart() {
  if (!state.cart.length) {
    return `<div class="empty-state">Tu carrito está vacío. Agrega una pulsera desde el catálogo.</div>`;
  }

  const itemsHtml = state.cart.map(item => {
    const product = getProduct(item.productId);
    if (!product) return "";
    const variant = getVariant(product, item.variantIndex);
    const salePrice = getProductSalePrice(product);

    return `
      <div class="cart-item">
        <img src="${getThemeImage(variant)}" alt="${product.name}" />
        <div>
          <h4>${product.name}</h4>
          <small>${variant?.name || "Versión"} · ${product.threadCount} hilos</small>
          <p><span class="price-sale">S/ ${salePrice}</span> <span class="cart-unit">x${item.qty}</span></p>
          <div class="qty-controls">
            <button onclick="decreaseQty(${item.productId}, ${item.variantIndex})">−</button>
            <span>${item.qty}</span>
            <button onclick="increaseQty(${item.productId}, ${item.variantIndex})">+</button>
          </div>
        </div>
        <div class="cart-actions-mini">
          <button class="danger-btn" onclick="removeFromCart(${item.productId}, ${item.variantIndex})">Quitar</button>
        </div>
      </div>
    `;
  }).join("");

  return `
    <div class="cart-list">${itemsHtml}</div>
    <div class="cart-side">
      <div class="total-box">
        <h3>Total: S/ ${cartTotal()}</h3>
        <p>${cartCount()} producto${cartCount() !== 1 ? "s" : ""} en tu carrito</p>
      </div>
      <div class="cart-actions">
        <button class="whatsapp-btn" onclick="cartWhatsApp()">WhatsApp carrito</button>
        <button class="secondary-btn" onclick="clearCart()">Vaciar carrito</button>
      </div>
    </div>
  `;
}

function renderHelp() {
  return `
    <div class="help-grid">
      <div class="help-card">
        <div class="badge-row"><span class="badge">Envíos</span><span class="badge">Rápidos</span></div>
        <h3>Entrega y recojo</h3>
        <p>Coordina tu pedido por WhatsApp y recibe detalles de entrega o recojo.</p>
      </div>
      <div class="help-card">
        <div class="badge-row"><span class="badge">Pagos</span><span class="badge">Seguros</span></div>
        <h3>Métodos de pago</h3>
        <p>Yape - Plin - transferencia.</p>
      </div>
      <div class="help-card">
        <div class="badge-row"><span class="badge">Pedidos</span><span class="badge">Seguimiento</span></div>
        <h3>Estado del pedido</h3>
        <p>Escríbenos por WhatsApp para revisar disponibilidad y confirmar tu compra.</p>
      </div>
      <div class="help-card">
        <div class="badge-row"><span class="badge">Soporte</span><span class="badge">Contacto</span></div>
        <h3>Atención al cliente</h3>
        <p>Te ayudamos a elegir colores, versiones y cantidades.</p>
      </div>
    </div>
  `;
}

function renderAdminCard(product) {
  const totalStock = getProductStock(product);
  const salePrice = getProductSalePrice(product);

  return `
    <section class="admin-card">
      <div class="admin-card-head">
        <img src="${getThemeImage(product.variants[0])}" alt="${product.name}" />
        <div>
          <h3>${product.name}</h3>
          <p>Base S/ ${product.price} · Venta S/ ${salePrice} · Stock total ${totalStock}</p>
        </div>
        <span class="badge ${hasOffer(product) ? "offer-on" : "offer-off"}">${hasOffer(product) ? `Oferta -${product.offerPercent}%` : "Sin oferta"}</span>
      </div>
      <div class="admin-forms">
        <div class="admin-field">
          <label>Oferta %</label>
          <input type="number" min="0" max="90" value="${Number(product.offerPercent) || 0}" onchange="setProductOffer(${product.id}, this.value)" />
        </div>
        <div class="admin-stock-list">
          ${product.variants.map((variant, index) => `
            <div class="stock-row">
              <div>
                <strong>${variant.name}</strong>
                <small>Etiquetas: ${variant.colorKeys.join(" · ")}</small>
                <small>Stock disponible: ${variant.stock}</small>
              </div>
              <div class="stock-controls">
                <button onclick="adjustVariantStock(${product.id}, ${index}, -1)">−</button>
                <input type="number" min="0" value="${variant.stock}" onchange="setVariantStock(${product.id}, ${index}, this.value)" />
                <button onclick="adjustVariantStock(${product.id}, ${index}, 1)">+</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderAdmin() {
  const totalStock = products.reduce((acc, product) => acc + getProductStock(product), 0);
  const totalOffers = products.filter(hasOffer).length;

  return `
    <div class="admin-panel">
      <div class="admin-summary">
        <div class="admin-stat"><strong>${products.length}</strong><span>Productos</span></div>
        <div class="admin-stat"><strong>${totalStock}</strong><span>Stock total</span></div>
        <div class="admin-stat"><strong>${totalOffers}</strong><span>Con oferta</span></div>
      </div>
      <div class="admin-note">
        Cambios en stock y ofertas se guardan automáticamente en este navegador.
        <button class="secondary-btn" style="margin-left:12px;" onclick="logoutAdmin()">Salir de admin</button>
      </div>
      <div class="admin-grid">${products.map(renderAdminCard).join("")}</div>
    </div>
  `;
}

function render() {
  loadState();
  applyTheme();
  updateCounters();
  updateCatalogControls();
  refreshAdminVisibility();

  const body = document.getElementById("viewBody");
  const viewTitle = document.getElementById("viewTitle");
  const viewSubtitle = document.getElementById("viewSubtitle");
  const resultsCount = document.getElementById("resultsCount");
  if (!body || !viewTitle || !viewSubtitle) return;

  if (state.view === "catalog") {
    const filtered = getFilteredProducts();
    viewTitle.textContent = "Catálogo";
    viewSubtitle.textContent = "Explora pulseras de macramé hechas a mano.";
    body.innerHTML = renderProductGrid(filtered);
    if (resultsCount) resultsCount.textContent = `${filtered.length} producto${filtered.length !== 1 ? "s" : ""}`;
  } else if (state.view === "favorites") {
    const favProducts = getFilteredProducts().filter(product => isFavorite(product.id));
    viewTitle.textContent = "Favoritos";
    viewSubtitle.textContent = "Tus pulseras marcadas con corazón.";
    body.innerHTML = favProducts.length
      ? renderProductGrid(favProducts)
      : `<div class="empty-state">No tienes favoritos todavía. Marca un corazón para guardarlos aquí.</div>`;
    if (resultsCount) resultsCount.textContent = `${favProducts.length} producto${favProducts.length !== 1 ? "s" : ""}`;
  } else if (state.view === "cart") {
    viewTitle.textContent = "Carrito";
    viewSubtitle.textContent = "Revisa tus productos y coordina tu pedido por WhatsApp.";
    body.innerHTML = renderCart();
    if (resultsCount) resultsCount.textContent = `${cartCount()} en carrito`;
  } else if (state.view === "help") {
    viewTitle.textContent = "Ayuda";
    viewSubtitle.textContent = "Información útil para tus pedidos.";
    body.innerHTML = renderHelp();
    if (resultsCount) resultsCount.textContent = "Soporte";
  } else if (state.view === "admin") {
    viewTitle.textContent = "Panel admin";
    viewSubtitle.textContent = "Stock, variantes y ofertas desde un solo lugar.";
    body.innerHTML = renderAdmin();
    if (resultsCount) resultsCount.textContent = `${products.length} productos`;
  }

  updateCounters();
}

function toggleFavorite(id, ev) {
  if (ev) ev.stopPropagation();
  const index = state.favorites.indexOf(id);
  if (index >= 0) state.favorites.splice(index, 1);
  else state.favorites.push(id);
  saveFavorites();
  updateCounters();
  render();
}

function toggleSelectedFavorite() {
  if (state.selectedProductId == null) return;
  toggleFavorite(state.selectedProductId);
  openPreview(state.selectedProductId);
}

function renderPreviewColorTags(product) {
  const tags = document.getElementById("previewColorTags");
  if (!tags) return;
  const variant = getVariant(product, state.selectedColorIndex);
  tags.innerHTML = (variant?.colorKeys || []).map(colorKey => `<span class="color-tag-chip">${colorKey}</span>`).join("");
}

function renderPreviewColors(product) {
  const colors = document.getElementById("previewColors");
  if (!colors) return;
  renderPreviewColorTags(product);
  colors.innerHTML = product.variants.map((variant, index) => `
    <span class="color-pill ${index === state.selectedColorIndex ? "active" : ""}" onclick="selectColor(${index})">${variant.name}</span>
  `).join("");
}

function updatePreviewFavoriteButton() {
  const btn = document.getElementById("previewFavBtn");
  if (!btn) return;
  btn.textContent = state.selectedProductId != null && isFavorite(state.selectedProductId) ? "♥ Favorito" : "♡ Favorito";
}

function refreshPreviewImage() {
  const product = getProduct(state.selectedProductId);
  if (!product) return;
  const variant = getVariant(product, state.selectedColorIndex);
  const img = document.getElementById("previewMainImg");
  if (img) img.src = getThemeImage(variant);
}

function openPreview(id) {
  const product = getProduct(id);
  if (!product) return;

  state.selectedProductId = id;
  state.selectedColorIndex = 0;

  const title = document.getElementById("previewTitle");
  const set = document.getElementById("previewSet");
  const price = document.getElementById("previewPrice");
  const desc = document.getElementById("previewDesc");
  const badges = document.getElementById("previewBadges");
  const modal = document.getElementById("previewModal");

  if (title) title.textContent = product.name;
  if (set) set.textContent = `${product.threadCount} hilos · ${product.closureType}`;
  if (price) {
    price.innerHTML = hasOffer(product)
      ? `<span class="price-sale">S/ ${getProductSalePrice(product)}</span> <span class="price-original">S/ ${product.price}</span>`
      : `S/ ${product.price}`;
  }
  if (desc) desc.textContent = product.description;
  if (badges) {
    badges.innerHTML = `
      <span class="badge">${product.threadCount} hilos</span>
      <span class="badge">${product.closureType}</span>
      ${hasOffer(product) ? `<span class="badge offer-on">Oferta -${product.offerPercent}%</span>` : `<span class="badge offer-off">Sin oferta</span>`}
    `;
  }

  renderPreviewColors(product);
  updatePreviewFavoriteButton();
  refreshPreviewImage();
  if (modal) modal.style.display = "flex";
}

function closePreview() {
  const modal = document.getElementById("previewModal");
  if (modal) modal.style.display = "none";
}

function selectColor(index) {
  state.selectedColorIndex = index;
  const product = getProduct(state.selectedProductId);
  if (!product) return;
  renderPreviewColors(product);
  refreshPreviewImage();
}

function addSelectedToCart() {
  if (state.selectedProductId == null) return;
  addToCart(state.selectedProductId, state.selectedColorIndex);
}

function addToCart(productId, variantIndex = 0) {
  const product = getProduct(productId);
  if (!product) return;
  const variant = getVariant(product, variantIndex);
  if (!variant) return;

  if (availableStock(productId, variantIndex) <= 0) {
    alert("No hay más stock para esta versión.");
    return;
  }

  const item = state.cart.find(x => x.productId === productId && x.variantIndex === variantIndex);
  if (item) item.qty += 1;
  else state.cart.push({ productId, variantIndex, qty: 1 });

  saveCart();
  updateCounters();
  render();
}

function openWhatsAppMessage(text) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
}

function openProductWhatsApp(productId, ev) {
  if (ev) ev.stopPropagation();
  const product = getProduct(productId);
  if (!product) return;
  const variant = getVariant(product, 0);
  const salePrice = getProductSalePrice(product);
  const message = `Hola, quiero pedir ${product.name}${variant ? ` (${variant.name})` : ""}. Precio: S/ ${salePrice}.`;
  openWhatsAppMessage(message);
}

function buySelectedWhatsApp() {
  const product = getProduct(state.selectedProductId);
  if (!product) return;
  const variant = getVariant(product, state.selectedColorIndex);
  const salePrice = getProductSalePrice(product);
  const message = `Hola, quiero pedir ${product.name}${variant ? ` (${variant.name})` : ""}. Precio: S/ ${salePrice}.`;
  openWhatsAppMessage(message);
}

function cartWhatsApp() {
  if (!state.cart.length) {
    alert("Tu carrito está vacío.");
    return;
  }

  const lines = state.cart.map(item => {
    const product = getProduct(item.productId);
    if (!product) return null;
    const variant = getVariant(product, item.variantIndex);
    const price = getProductSalePrice(product);
    return `- ${product.name}${variant ? ` (${variant.name})` : ""} x${item.qty} — S/ ${price * item.qty}`;
  }).filter(Boolean);

  const total = cartTotal();
  const message = `Hola, quiero hacer este pedido:%0A${lines.join("%0A")}%0A%0ATotal: S/ ${total}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener");
}

function increaseQty(productId, variantIndex) {
  const product = getProduct(productId);
  const item = state.cart.find(x => x.productId === productId && x.variantIndex === variantIndex);
  if (!product || !item) return;
  if (availableStock(productId, variantIndex) <= 0) {
    alert("No hay más stock para esta versión.");
    return;
  }
  item.qty++;
  saveCart();
  updateCounters();
  render();
}

function decreaseQty(productId, variantIndex) {
  const item = state.cart.find(x => x.productId === productId && x.variantIndex === variantIndex);
  if (!item) return;
  item.qty--;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(x => !(x.productId === productId && x.variantIndex === variantIndex));
  }
  saveCart();
  updateCounters();
  render();
}

function removeFromCart(productId, variantIndex) {
  state.cart = state.cart.filter(x => !(x.productId === productId && x.variantIndex === variantIndex));
  saveCart();
  updateCounters();
  render();
}

function clearCart() {
  state.cart = [];
  saveCart();
  updateCounters();
  render();
}

function setProductOffer(productId, value) {
  const product = getProduct(productId);
  if (!product) return;
  product.offerPercent = Math.max(0, Math.min(90, Number(value) || 0));
  syncAdminStateFromProducts();
  render();
}

function adjustVariantStock(productId, variantIndex, delta) {
  const product = getProduct(productId);
  if (!product) return;
  const variant = getVariant(product, variantIndex);
  if (!variant) return;
  variant.stock = Math.max(0, Number(variant.stock || 0) + delta);
  syncAdminStateFromProducts();
  render();
}

function setVariantStock(productId, variantIndex, value) {
  const product = getProduct(productId);
  if (!product) return;
  const variant = getVariant(product, variantIndex);
  if (!variant) return;
  variant.stock = Math.max(0, Number(value) || 0);
  syncAdminStateFromProducts();
  render();
}

function openAdminLogin() {
  ensureAdminModal();
  const modal = document.getElementById("adminLoginModal");
  const input = document.getElementById("adminPassword");
  if (modal) modal.style.display = "flex";
  if (input) {
    input.value = "";
    setTimeout(() => input.focus(), 0);
  }
}

function closeAdminLogin() {
  const modal = document.getElementById("adminLoginModal");
  if (modal) modal.style.display = "none";
}

function loginAdmin() {
  const input = document.getElementById("adminPassword");
  const password = input ? input.value : "";
  if (password === ADMIN_PASSWORD) {
    setAdminUnlocked(true);
    closeAdminLogin();
    setView("admin");
    return;
  }
  alert("Contraseña incorrecta");
}

function logoutAdmin() {
  setAdminUnlocked(false);
  setView("catalog");
}

function attachSecretAdminTrigger() {
  const logo = document.querySelector(".main-logo");
  if (!logo || logo.dataset.adminBound === "1") return;
  logo.dataset.adminBound = "1";
  let clicks = 0;
  let timer = null;
  logo.addEventListener("click", () => {
    clicks += 1;
    clearTimeout(timer);
    timer = setTimeout(() => { clicks = 0; }, 1200);
    if (clicks >= 5) {
      clicks = 0;
      clearTimeout(timer);
      requestAdminAccess();
    }
  });
}

function attachKeyboardShortcut() {
  document.addEventListener("keydown", event => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
      event.preventDefault();
      requestAdminAccess();
    }
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) closeFilters();
});

window.addEventListener("DOMContentLoaded", () => {
  loadState();
  ensureAdminButton();
  ensureAdminModal();
  attachSecretAdminTrigger();
  attachKeyboardShortcut();
  applyTheme();

  const maxPriceLabel = document.getElementById("maxPriceLabel");
  const priceRange = document.getElementById("priceRange");
  if (maxPriceLabel) maxPriceLabel.textContent = `S/ ${state.maxPrice}`;
  if (priceRange) {
    priceRange.value = state.maxPrice;
    updatePriceRangeVisual();
  }

  const sortSelect = document.getElementById("sortSelect");
  const colorSelect = document.getElementById("colorSelect");
  const designSelect = document.getElementById("designSelect");
  const threadSelect = document.getElementById("threadSelect");
  const offerSelect = document.getElementById("offerSelect");

  if (sortSelect) sortSelect.value = state.sort;
  if (colorSelect) colorSelect.value = state.color;
  if (designSelect) designSelect.value = state.design;
  if (threadSelect) threadSelect.value = state.threads;
  if (offerSelect) offerSelect.value = state.offer;

  updateCounters();
  updateCatalogControls();
  refreshAdminVisibility();
  render();
});