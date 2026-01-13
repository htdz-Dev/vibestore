<template>
  <div>
    <!-- Page header -->
    <div class="container-custom py-12">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 class="text-4xl font-bold font-mono">
            <span v-if="selectedCategory">{{ selectedCategory.name }}</span>
            <span v-else-if="searchQuery">🔍 "{{ searchQuery }}"</span>
            <span v-else>ALL PRODUCTS</span>
          </h1>
          <p class="text-[#525252] mt-2">
            {{ products?.length || 0 }} products found
          </p>
        </div>

        <!-- Sort -->
        <div class="flex items-center gap-4">
          <select 
            v-model="sortBy"
            class="input font-mono"
          >
            <option value="created_at-desc">⏰ Newest</option>
            <option value="created_at-asc">📅 Oldest</option>
            <option value="price-asc">💰 Price: Low → High</option>
            <option value="price-desc">💰 Price: High → Low</option>
            <option value="name-asc">🔤 Name: A→Z</option>
            <option value="name-desc">🔤 Name: Z→A</option>
          </select>
        </div>
      </div>
    </div>

    <div class="container-custom pb-16">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar filters -->
        <aside class="lg:w-72 flex-shrink-0">
          <div class="filter-sidebar sticky top-28">
            <h3 class="font-bold font-mono text-lg mb-4">📁 CATEGORIES</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink 
                  to="/shop"
                  :class="[
                    'filter-item',
                    !route.query.category ? 'active' : ''
                  ]"
                >
                  All Products
                </NuxtLink>
              </li>
              <li v-for="cat in categories" :key="cat.slug">
                <NuxtLink 
                  :to="`/shop?category=${cat.slug}`"
                  :class="[
                    'filter-item',
                    route.query.category === cat.slug ? 'active' : ''
                  ]"
                >
                  {{ cat.name }}
                  <span class="text-sm text-[#525252]">({{ cat.products_count || 0 }})</span>
                </NuxtLink>
              </li>
            </ul>

            <!-- Clear filters -->
            <button 
              v-if="route.query.category || route.query.search"
              @click="clearFilters"
              class="mt-6 w-full btn-clear"
            >
              ✕ Clear filters
            </button>
          </div>
        </aside>

        <!-- Products grid -->
        <div class="flex-grow">
          <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="i in 6" :key="i" class="product-skeleton">
              <div class="skeleton-img"></div>
              <div class="p-4 space-y-3">
                <div class="skeleton-text w-20"></div>
                <div class="skeleton-text w-full"></div>
                <div class="skeleton-text w-24"></div>
              </div>
            </div>
          </div>

          <div v-else-if="products?.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProductCard 
              v-for="product in products" 
              :key="product.id"
              :product="product"
            />
          </div>

          <div v-else class="empty-state">
            <span class="text-6xl mb-4">😔</span>
            <h3 class="text-xl font-bold mb-2">No products found</h3>
            <p class="text-[#525252] mb-6">Try adjusting your filters or search terms</p>
            <NuxtLink to="/shop" class="btn btn-primary">
              View All Products →
            </NuxtLink>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-12 flex justify-center gap-2">
            <button 
              v-for="page in totalPages" 
              :key="page"
              @click="goToPage(page)"
              :class="[
                'pagination-btn',
                currentPage === page ? 'active' : ''
              ]"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const sortBy = ref('created_at-desc')
const currentPage = ref(1)

// Build API URL based on filters
const apiUrl = computed(() => {
  const params = new URLSearchParams()
  
  if (route.query.category) {
    params.set('category', route.query.category as string)
  }
  if (route.query.search) {
    params.set('search', route.query.search as string)
  }
  
  const [sort, order] = sortBy.value.split('-')
  params.set('sort', sort)
  params.set('order', order)
  params.set('page', currentPage.value.toString())
  
  return `${config.public.apiBase}/products?${params.toString()}`
})

// Fetch products
const { data: productsData, pending, refresh } = await useFetch<any>(apiUrl, {
  lazy: true,
  server: false,
  watch: [apiUrl],
})

const products = computed(() => productsData.value?.data || [])
const totalPages = computed(() => productsData.value?.last_page || 1)
const searchQuery = computed(() => route.query.search as string)

// Fetch categories
const { data: categoriesData } = await useFetch<{ data: any[] }>(`${config.public.apiBase}/categories`, {
  lazy: true,
  server: false,
})

const categories = computed(() => categoriesData.value?.data || [])

const selectedCategory = computed(() => {
  if (!route.query.category) return null
  return categories.value.find((c: any) => c.slug === route.query.category)
})

const clearFilters = () => {
  router.push('/shop')
}

const goToPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Watch for route changes
watch(() => route.query, () => {
  currentPage.value = 1
  refresh()
}, { deep: true })

// Watch sort changes
watch(sortBy, () => {
  currentPage.value = 1
})

// SEO
useSeoMeta({
  title: () => selectedCategory.value 
    ? `${selectedCategory.value.name} - VIBE` 
    : searchQuery.value 
      ? `Search: ${searchQuery.value} - VIBE`
      : 'Shop - VIBE',
  description: 'Browse our collection of premium streetwear. Hoodies, t-shirts, and more.',
})
</script>

<style scoped>
.filter-sidebar {
  @apply p-6;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
}

.filter-item {
  @apply flex items-center justify-between py-3 px-4 font-mono font-bold transition-all duration-150;
  border: 2px solid transparent;
}

.filter-item:hover {
  background: #fef6e0;
  border-color: #1a1a1a;
}

.filter-item.active {
  background: #facc15;
  border: 2px solid #1a1a1a;
  box-shadow: 2px 2px 0px #1a1a1a;
}

.btn-clear {
  @apply py-2 px-4 font-mono font-bold text-sm;
  background: #fee2e2;
  border: 2px solid #1a1a1a;
  color: #dc2626;
}

.btn-clear:hover {
  background: #fca5a5;
}

.pagination-btn {
  @apply w-10 h-10 font-mono font-bold transition-all duration-150;
  background: white;
  border: 2px solid #1a1a1a;
}

.pagination-btn:hover {
  background: #fef6e0;
  box-shadow: 2px 2px 0px #1a1a1a;
}

.pagination-btn.active {
  background: #ff5c00;
  color: white;
  box-shadow: 2px 2px 0px #1a1a1a;
}

.empty-state {
  @apply text-center py-16;
}

.product-skeleton {
  background: white;
  border: 3px solid #1a1a1a;
}

.skeleton-img {
  @apply h-80;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-text {
  @apply h-4 rounded;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
