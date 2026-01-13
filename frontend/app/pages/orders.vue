<template>
  <div class="pt-24">
    <div class="container-custom py-12">
      <h1 class="text-4xl font-bold mb-8">My Orders</h1>

      <div v-if="pending" class="space-y-4">
        <div v-for="i in 3" :key="i" class="glass rounded-2xl p-6">
          <div class="skeleton h-6 w-48 mb-4"></div>
          <div class="skeleton h-4 w-full"></div>
        </div>
      </div>

      <div v-else-if="orders?.length > 0" class="space-y-6">
        <div 
          v-for="order in orders" 
          :key="order.id"
          class="glass rounded-2xl p-6"
        >
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            <div>
              <p class="text-sm text-[#a0a0a0]">Order Number</p>
              <p class="font-bold text-lg">{{ order.order_number }}</p>
            </div>
            <div>
              <p class="text-sm text-[#a0a0a0]">Date</p>
              <p>{{ formatDate(order.created_at) }}</p>
            </div>
            <div>
              <p class="text-sm text-[#a0a0a0]">Total</p>
              <p class="font-bold text-[#e94560]">{{ formatPrice(order.total) }} DA</p>
            </div>
            <div>
              <span :class="getStatusClass(order.status)">
                {{ order.status }}
              </span>
            </div>
          </div>

          <!-- Order items -->
          <div class="border-t border-[#2a2a4a] pt-4">
            <div class="flex flex-wrap gap-4">
              <div 
                v-for="item in order.items" 
                :key="item.id"
                class="flex items-center gap-3 bg-[#1a1a2e] rounded-xl p-3"
              >
                <div class="w-12 h-12 rounded-lg bg-[#2a2a4a]"></div>
                <div>
                  <p class="font-medium text-sm">{{ item.product_name }}</p>
                  <p class="text-xs text-[#a0a0a0]">
                    {{ item.variant_info || 'Default' }} × {{ item.quantity }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-[#a0a0a0] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h2 class="text-xl font-bold mb-4">No orders yet</h2>
        <p class="text-[#a0a0a0] mb-6">Start shopping to see your orders here</p>
        <NuxtLink to="/shop" class="btn btn-primary">
          Start Shopping
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const config = useRuntimeConfig()
const router = useRouter()
const authStore = useAuthStore()

// Redirect if not authenticated
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login?redirect=/orders')
  }
})

// Fetch orders
const { data: ordersData, pending } = await useFetch<any>(`${config.public.apiBase}/orders`, {
  lazy: true,
  server: false,
  headers: computed(() => ({
    Authorization: authStore.token ? `Bearer ${authStore.token}` : '',
  })),
})

const orders = computed(() => ordersData.value?.data || [])

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-DZ').format(price)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getStatusClass = (status: string) => {
  const base = 'badge capitalize'
  switch (status) {
    case 'pending':
      return `${base} bg-yellow-500/20 text-yellow-400`
    case 'confirmed':
      return `${base} bg-blue-500/20 text-blue-400`
    case 'processing':
      return `${base} bg-purple-500/20 text-purple-400`
    case 'shipped':
      return `${base} bg-indigo-500/20 text-indigo-400`
    case 'delivered':
      return `${base} bg-green-500/20 text-green-400`
    case 'cancelled':
      return `${base} bg-red-500/20 text-red-400`
    default:
      return `${base} bg-gray-500/20 text-gray-400`
  }
}

// SEO
useSeoMeta({
  title: 'My Orders - VIBE',
  description: 'View your order history',
})
</script>
