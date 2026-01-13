import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
    const cartStore = useCartStore()
    const authStore = useAuthStore()

    // Load persisted data on client side
    if (import.meta.client) {
        cartStore.loadFromStorage()
        authStore.loadFromStorage()

        // Optionally refresh user data if token exists
        if (authStore.token) {
            authStore.fetchUser()
        }
    }
})
