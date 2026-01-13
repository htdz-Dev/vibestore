<template>
  <div class="pt-24">
    <div v-if="pending" class="container-custom py-16">
      <div class="grid lg:grid-cols-2 gap-12">
        <div class="skeleton h-[600px] rounded-2xl"></div>
        <div class="space-y-6">
          <div class="skeleton h-8 w-32"></div>
          <div class="skeleton h-12 w-3/4"></div>
          <div class="skeleton h-10 w-40"></div>
          <div class="skeleton h-24 w-full"></div>
          <div class="skeleton h-12 w-full"></div>
        </div>
      </div>
    </div>

    <div v-else-if="product" class="container-custom py-12">
      <!-- Breadcrumb -->
      <nav class="mb-8 text-sm">
        <ol class="flex items-center gap-2 text-[#a0a0a0]">
          <li><NuxtLink to="/" class="hover:text-white">Home</NuxtLink></li>
          <li>/</li>
          <li><NuxtLink to="/shop" class="hover:text-white">Shop</NuxtLink></li>
          <li v-if="product.category">/</li>
          <li v-if="product.category">
            <NuxtLink :to="`/shop?category=${product.category.slug}`" class="hover:text-white">
              {{ product.category.name }}
            </NuxtLink>
          </li>
          <li>/</li>
          <li class="text-white">{{ product.name }}</li>
        </ol>
      </nav>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Image gallery -->
        <div class="space-y-4">
          <!-- Main image -->
          <div class="aspect-square rounded-2xl overflow-hidden bg-[#1a1a2e]">
            <img 
              v-if="selectedImage"
              :src="selectedImage" 
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-[#a0a0a0]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <!-- Thumbnails -->
          <div v-if="productImages.length > 1" class="grid grid-cols-4 gap-4">
            <button 
              v-for="(img, index) in productImages" 
              :key="index"
              @click="selectedImageIndex = index"
              :class="[
                'aspect-square rounded-xl overflow-hidden border-2 transition-colors',
                selectedImageIndex === index ? 'border-[#e94560]' : 'border-transparent hover:border-[#a0a0a0]'
              ]"
            >
              <img :src="img" :alt="`${product.name} - ${index + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Product info -->
        <div>
          <!-- Category -->
          <p v-if="product.category" class="text-sm text-[#a0a0a0] uppercase tracking-wider mb-2">
            {{ product.category.name }}
          </p>

          <!-- Name -->
          <h1 class="text-4xl font-bold mb-4">{{ product.name }}</h1>

          <!-- Price -->
          <div class="mb-6">
            <span class="text-3xl font-bold text-[#e94560]">
              {{ formatPrice(currentPrice) }} DA
            </span>
          </div>

          <!-- Description -->
          <p class="text-[#a0a0a0] mb-8 leading-relaxed">
            {{ product.description || 'No description available.' }}
          </p>

          <!-- Variants -->
          <div v-if="product.variants?.length > 0" class="space-y-6 mb-8">
            <!-- Size selector -->
            <div v-if="availableSizes.length > 0">
              <label class="block font-mono font-bold mb-3">📐 SIZE</label>
              <div class="flex flex-wrap gap-3">
                <button 
                  v-for="size in availableSizes" 
                  :key="size"
                  @click="selectedSize = size"
                  :class="[
                    'variant-btn',
                    selectedSize === size ? 'active' : ''
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Color selector -->
            <div v-if="availableColors.length > 0">
              <label class="block font-mono font-bold mb-3">🎨 COLOR</label>
              <div class="flex flex-wrap gap-3">
                <button 
                  v-for="color in availableColors" 
                  :key="color"
                  @click="selectedColor = color"
                  :class="[
                    'variant-btn',
                    selectedColor === color ? 'active' : ''
                  ]"
                >
                  {{ color }}
                </button>
              </div>
            </div>
          </div>

          <!-- Stock status -->
          <div class="mb-6">
            <span 
              v-if="selectedVariant?.stock_quantity > 0"
              class="stock-badge in-stock"
            >
              ✓ IN STOCK ({{ selectedVariant.stock_quantity }} available)
            </span>
            <span 
              v-else-if="!product.variants?.length"
              class="stock-badge in-stock"
            >
              ✓ IN STOCK
            </span>
            <span v-else class="stock-badge out-of-stock">
              ✗ OUT OF STOCK
            </span>
          </div>

          <!-- Quantity -->
          <div class="mb-8">
            <label class="block font-mono font-bold mb-3">📦 QUANTITY</label>
            <div class="flex items-center gap-4">
              <button 
                @click="quantity > 1 && quantity--"
                class="qty-btn"
              >
                −
              </button>
              <span class="text-2xl font-bold font-mono w-12 text-center">{{ quantity }}</span>
              <button 
                @click="quantity++"
                class="qty-btn"
              >
                +
              </button>
            </div>
          </div>

          <!-- Add to cart button -->
          <button 
            @click="addToCart"
            :disabled="!canAddToCart"
            :class="[
              'btn w-full text-lg py-4',
              canAddToCart ? 'btn-primary' : 'bg-[#2a2a4a] text-[#a0a0a0] cursor-not-allowed'
            ]"
          >
            <span v-if="canAddToCart">Add to Cart - {{ formatPrice(currentPrice * quantity) }} DA</span>
            <span v-else>Select options</span>
          </button>

          <!-- Features -->
          <div class="mt-8 pt-8 border-t border-[#2a2a4a] space-y-4">
            <div class="flex items-center gap-3 text-[#a0a0a0]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#e94560]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Free shipping across Algeria</span>
            </div>
            <div class="flex items-center gap-3 text-[#a0a0a0]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#e94560]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Cash on delivery available</span>
            </div>
            <div class="flex items-center gap-3 text-[#a0a0a0]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#e94560]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Premium quality materials</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container-custom py-16 text-center">
      <h1 class="text-2xl font-bold mb-4">Product not found</h1>
      <NuxtLink to="/shop" class="btn btn-primary">
        Back to Shop
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const config = useRuntimeConfig()
const cartStore = useCartStore()

const quantity = ref(1)
const selectedSize = ref<string | null>(null)
const selectedColor = ref<string | null>(null)
const selectedImageIndex = ref(0)

// Fetch product
const { data: productData, pending } = await useFetch<{ data: any }>(`${config.public.apiBase}/products/${route.params.slug}`, {
  lazy: true,
  server: false,
})

const product = computed(() => productData.value?.data)

// Product images linked to selected color
const productImages = computed(() => {
  if (!product.value?.images?.length) return []
  const base = config.public.apiBase.replace('/api/v1', '')
  
  // Filter images by selected color if one is chosen
  let images = product.value.images
  if (selectedColor.value) {
    const colorImages = images.filter((img: any) => img.color === selectedColor.value)
    if (colorImages.length > 0) {
      images = colorImages
    }
  }
  
  return images.map((img: any) => `${base}/storage/${img.path}`)
})

const selectedImage = computed(() => {
  return productImages.value[selectedImageIndex.value] || null
})

// Available sizes and colors
const availableSizes = computed(() => {
  if (!product.value?.variants) return []
  const sizes = new Set(
    product.value.variants
      .filter((v: any) => v.stock_quantity > 0 && v.size)
      .map((v: any) => v.size)
  )
  return Array.from(sizes)
})

const availableColors = computed(() => {
  if (!product.value?.variants) return []
  const colors = new Set(
    product.value.variants
      .filter((v: any) => v.stock_quantity > 0 && v.color)
      .map((v: any) => v.color)
  )
  return Array.from(colors)
})

// Selected variant
const selectedVariant = computed(() => {
  if (!product.value?.variants?.length) return null
  
  return product.value.variants.find((v: any) => {
    const sizeMatch = !availableSizes.value.length || v.size === selectedSize.value
    const colorMatch = !availableColors.value.length || v.color === selectedColor.value
    return sizeMatch && colorMatch && v.stock_quantity > 0
  })
})

// Current price
const currentPrice = computed(() => {
  const base = parseFloat(product.value?.price) || 0
  const adjustment = parseFloat(selectedVariant.value?.price_adjustment) || 0
  return base + adjustment
})

// Can add to cart
const canAddToCart = computed(() => {
  if (!product.value) return false
  if (!product.value.variants?.length) return true
  return !!selectedVariant.value
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-DZ').format(price)
}

const addToCart = () => {
  if (!canAddToCart.value || !product.value) return

  const variantInfo = []
  if (selectedSize.value) variantInfo.push(`Size: ${selectedSize.value}`)
  if (selectedColor.value) variantInfo.push(`Color: ${selectedColor.value}`)

  cartStore.addItem({
    productId: product.value.id,
    variantId: selectedVariant.value?.id,
    name: product.value.name,
    variant: variantInfo.join(', ') || undefined,
    price: currentPrice.value,
    quantity: quantity.value,
    image: productImages.value[0] || undefined,
  })
}

// Reset image index when color changes
watch(selectedColor, () => {
  selectedImageIndex.value = 0
})

// Auto-select first available options
watch(product, (p) => {
  if (p?.variants?.length) {
    const firstAvailable = p.variants.find((v: any) => v.stock_quantity > 0)
    if (firstAvailable) {
      selectedSize.value = firstAvailable.size || null
      selectedColor.value = firstAvailable.color || null
    }
  }
}, { immediate: true })

// SEO
useSeoMeta({
  title: () => product.value ? `${product.value.name} - VIBE` : 'Product - VIBE',
  description: () => product.value?.description || 'Premium streetwear product',
})
</script>

<style scoped>
.variant-btn {
  @apply px-6 py-3 font-mono font-bold transition-all duration-150;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
  color: #1a1a1a;
}

.variant-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px #1a1a1a;
}

.variant-btn.active {
  background: #facc15;
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px #1a1a1a;
}

.stock-badge {
  @apply inline-block px-4 py-2 font-mono font-bold text-sm;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
}

.stock-badge.in-stock {
  background: #bbf7d0;
  color: #166534;
}

.stock-badge.out-of-stock {
  background: #fecaca;
  color: #dc2626;
}

.qty-btn {
  @apply w-12 h-12 flex items-center justify-center text-xl font-bold transition-all duration-150;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
  color: #1a1a1a;
}

.qty-btn:hover {
  background: #fef6e0;
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px #1a1a1a;
}

.qty-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px #1a1a1a;
}
</style>

