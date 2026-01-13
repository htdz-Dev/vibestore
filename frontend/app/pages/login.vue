<template>
  <div class="pt-24 min-h-screen flex items-center">
    <div class="container-custom py-12">
      <div class="max-w-md mx-auto">
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-block mb-6">
            <span class="text-3xl font-bold gradient-text">VIBE</span>
          </NuxtLink>
          <h1 class="text-3xl font-bold">Welcome Back</h1>
          <p class="text-[#a0a0a0] mt-2">Sign in to your account</p>
        </div>

        <div class="glass rounded-2xl p-8">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div v-if="error" class="p-4 rounded-xl bg-red-500/20 text-red-400 text-sm">
              {{ error }}
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <input 
                v-model="form.email"
                type="email"
                class="input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Password</label>
              <input 
                v-model="form.password"
                type="password"
                class="input"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              :disabled="authStore.isLoading"
              class="btn btn-primary w-full"
            >
              <span v-if="authStore.isLoading">Signing in...</span>
              <span v-else>Sign In</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-[#a0a0a0]">
              Don't have an account?
              <NuxtLink to="/register" class="text-[#e94560] hover:underline">
                Sign up
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const error = ref('')
const form = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
  error.value = ''
  
  const result = await authStore.login(form.email, form.password)
  
  if (result.success) {
    const redirect = route.query.redirect as string || '/'
    router.push(redirect)
  } else {
    error.value = result.error || 'Login failed'
  }
}

// Redirect if already logged in
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/')
  }
})

// SEO
useSeoMeta({
  title: 'Login - VIBE',
  description: 'Sign in to your VIBE account',
})
</script>
