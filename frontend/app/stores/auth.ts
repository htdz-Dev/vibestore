import { defineStore } from 'pinia'

export interface User {
    id: number
    name: string
    email: string
    phone?: string
    address?: string
    city?: string
    wilaya?: string
    is_admin: boolean
}

interface AuthState {
    user: User | null
    token: string | null
    isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: null,
        isLoading: false,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token && !!state.user,
        isAdmin: (state) => state.user?.is_admin ?? false,
    },

    actions: {
        async register(data: { name: string; email: string; password: string; password_confirmation: string; phone?: string }) {
            const config = useRuntimeConfig()
            this.isLoading = true

            try {
                const response = await $fetch<{ user: User; token: string }>(`${config.public.apiBase}/register`, {
                    method: 'POST',
                    body: data,
                })

                this.user = response.user
                this.token = response.token
                this.saveToStorage()

                return { success: true }
            } catch (error: any) {
                return {
                    success: false,
                    error: error.data?.message || 'Registration failed'
                }
            } finally {
                this.isLoading = false
            }
        },

        async login(email: string, password: string) {
            const config = useRuntimeConfig()
            this.isLoading = true

            try {
                const response = await $fetch<{ user: User; token: string }>(`${config.public.apiBase}/login`, {
                    method: 'POST',
                    body: { email, password },
                })

                this.user = response.user
                this.token = response.token
                this.saveToStorage()

                return { success: true }
            } catch (error: any) {
                return {
                    success: false,
                    error: error.data?.message || 'Login failed'
                }
            } finally {
                this.isLoading = false
            }
        },

        async logout() {
            const config = useRuntimeConfig()

            if (this.token) {
                try {
                    await $fetch(`${config.public.apiBase}/logout`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    })
                } catch (e) {
                    // Ignore logout errors
                }
            }

            this.user = null
            this.token = null
            this.clearStorage()
        },

        async fetchUser() {
            const config = useRuntimeConfig()

            if (!this.token) return

            try {
                const response = await $fetch<{ user: User }>(`${config.public.apiBase}/user`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })

                this.user = response.user
            } catch (e) {
                this.logout()
            }
        },

        async updateProfile(data: Partial<User>) {
            const config = useRuntimeConfig()

            if (!this.token) return { success: false, error: 'Not authenticated' }

            try {
                const response = await $fetch<{ user: User }>(`${config.public.apiBase}/user/profile`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                    body: data,
                })

                this.user = response.user
                return { success: true }
            } catch (error: any) {
                return {
                    success: false,
                    error: error.data?.message || 'Update failed'
                }
            }
        },

        saveToStorage() {
            if (import.meta.client) {
                if (this.token) {
                    localStorage.setItem('auth_token', this.token)
                }
                if (this.user) {
                    localStorage.setItem('auth_user', JSON.stringify(this.user))
                }
            }
        },

        loadFromStorage() {
            if (import.meta.client) {
                const token = localStorage.getItem('auth_token')
                const user = localStorage.getItem('auth_user')

                if (token) {
                    this.token = token
                }
                if (user) {
                    try {
                        this.user = JSON.parse(user)
                    } catch (e) {
                        this.user = null
                    }
                }
            }
        },

        clearStorage() {
            if (import.meta.client) {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('auth_user')
            }
        },
    },
})
