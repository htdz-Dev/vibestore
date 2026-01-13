<template>
  <header class="header-brutal">
    <!-- Top marquee banner -->
    <div class="marquee-banner">
      <div class="marquee-content">
        <span>FREE SHIPPING ON ALL ORDERS</span>
        <span class="mx-8">★</span>
        <span>PREMIUM STREETWEAR</span>
        <span class="mx-8">★</span>
        <span>CASH ON DELIVERY</span>
        <span class="mx-8">★</span>
        <span>FREE SHIPPING ON ALL ORDERS</span>
        <span class="mx-8">★</span>
        <span>PREMIUM STREETWEAR</span>
        <span class="mx-8">★</span>
        <span>CASH ON DELIVERY</span>
        <span class="mx-8">★</span>
      </div>
    </div>

    <div class="container-custom">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="logo-brutal">
          VIBE
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <NuxtLink 
            to="/" 
            class="nav-link-brutal"
            active-class="nav-link-active"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/shop" 
            class="nav-link-brutal"
            active-class="nav-link-active"
          >
            Shop
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="nav-link-brutal"
            active-class="nav-link-active"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="nav-link-brutal"
            active-class="nav-link-active"
          >
            Contact
          </NuxtLink>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center space-x-2">
          <!-- Search toggle -->
          <button 
            @click="toggleSearch"
            class="icon-btn-brutal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- User menu -->
          <div class="relative">
            <button 
              @click="toggleUserMenu"
              class="icon-btn-brutal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            
            <!-- User dropdown -->
            <Transition name="fade">
              <div 
                v-if="showUserMenu" 
                class="dropdown-brutal"
              >
                <template v-if="authStore.isAuthenticated">
                  <NuxtLink to="/account" class="dropdown-item-brutal">
                    My Account
                  </NuxtLink>
                  <NuxtLink to="/orders" class="dropdown-item-brutal">
                    My Orders
                  </NuxtLink>
                  <button @click="logout" class="dropdown-item-brutal w-full text-left text-[#ff5c00]">
                    Logout
                  </button>
                </template>
                <template v-else>
                  <NuxtLink to="/login" class="dropdown-item-brutal">
                    Login
                  </NuxtLink>
                  <NuxtLink to="/register" class="dropdown-item-brutal">
                    Register
                  </NuxtLink>
                </template>
              </div>
            </Transition>
          </div>

          <!-- Cart button -->
          <button 
            @click="cartStore.toggleCart"
            class="cart-btn-brutal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span 
              v-if="cartStore.itemCount > 0"
              class="cart-badge-brutal"
            >
              {{ cartStore.itemCount }}
            </span>
          </button>

          <!-- Mobile menu button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden icon-btn-brutal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div v-if="showMobileMenu" class="md:hidden mobile-menu-brutal">
        <nav class="container-custom py-4 space-y-2">
          <NuxtLink 
            to="/" 
            @click="showMobileMenu = false"
            class="mobile-nav-brutal"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/shop" 
            @click="showMobileMenu = false"
            class="mobile-nav-brutal"
          >
            Shop
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            @click="showMobileMenu = false"
            class="mobile-nav-brutal"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            @click="showMobileMenu = false"
            class="mobile-nav-brutal"
          >
            Contact
          </NuxtLink>
        </nav>
      </div>
    </Transition>

    <!-- Search overlay -->
    <Transition name="fade">
      <div v-if="showSearch" class="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-32">
        <div class="w-full max-w-2xl mx-4">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="input w-full text-lg py-4 pl-12 pr-12"
              @keyup.enter="performSearch"
              @keyup.escape="showSearch = false"
              ref="searchInput"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-4 top-1/2 -translate-y-1/2 text-[#525252]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button @click="showSearch = false" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#525252] hover:text-[#1a1a1a]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const showMobileMenu = ref(false)
const showUserMenu = ref(false)
const showSearch = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/shop?search=${encodeURIComponent(searchQuery.value)}`)
    showSearch.value = false
    searchQuery.value = ''
  }
}

const logout = async () => {
  await authStore.logout()
  showUserMenu.value = false
  router.push('/')
}

// Close dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      showUserMenu.value = false
    }
  })
})
</script>

<style scoped>
.header-brutal {
  @apply sticky top-0 z-50;
  background: #fffef0;
  border-bottom: 3px solid #1a1a1a;
}

.marquee-banner {
  @apply overflow-hidden whitespace-nowrap py-2;
  background: #facc15;
  border-bottom: 3px solid #1a1a1a;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
}

.marquee-content {
  display: inline-block;
  animation: marquee 30s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.logo-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 2rem;
  color: #1a1a1a;
  letter-spacing: -0.05em;
  transition: all 0.15s ease;
}

.logo-brutal:hover {
  color: #ff5c00;
}

.nav-link-brutal {
  @apply px-4 py-2 font-bold uppercase transition-all duration-150;
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  color: #1a1a1a;
  border: 2px solid transparent;
}

.nav-link-brutal:hover {
  background: #facc15;
  border-color: #1a1a1a;
}

.nav-link-active {
  background: #ff5c00;
  color: white;
  border-color: #1a1a1a;
}

.icon-btn-brutal {
  @apply p-2 transition-all duration-150;
  color: #1a1a1a;
  border: 2px solid transparent;
}

.icon-btn-brutal:hover {
  background: #facc15;
  border-color: #1a1a1a;
}

.cart-btn-brutal {
  @apply relative p-2 transition-all duration-150;
  color: #1a1a1a;
  background: #facc15;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
}

.cart-btn-brutal:hover {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0px #1a1a1a;
}

.cart-badge-brutal {
  @apply absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-xs font-bold;
  background: #ff5c00;
  color: white;
  border: 2px solid #1a1a1a;
  font-family: 'Space Mono', monospace;
}

.dropdown-brutal {
  @apply absolute right-0 mt-2 w-48 overflow-hidden;
  background: #fffef0;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
}

.dropdown-item-brutal {
  @apply block px-4 py-3 font-bold transition-all duration-150;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #1a1a1a;
  border-bottom: 2px solid #1a1a1a;
}

.dropdown-item-brutal:last-child {
  border-bottom: none;
}

.dropdown-item-brutal:hover {
  background: #facc15;
}

.mobile-menu-brutal {
  background: #fffef0;
  border-top: 3px solid #1a1a1a;
}

.mobile-nav-brutal {
  @apply block py-3 px-4 font-bold uppercase transition-all duration-150;
  font-family: 'Space Mono', monospace;
  color: #1a1a1a;
  border: 2px solid transparent;
}

.mobile-nav-brutal:hover {
  background: #facc15;
  border-color: #1a1a1a;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
