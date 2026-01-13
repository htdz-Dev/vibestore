<template>
  <div class="pt-24 min-h-screen flex items-center">
    <div class="container-custom py-12">
      <div class="max-w-md mx-auto">
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-block mb-6">
            <span class="text-3xl font-bold gradient-text">VIBE</span>
          </NuxtLink>
          <h1 class="text-3xl font-bold">Create Account</h1>
          <p class="text-[#a0a0a0] mt-2">Join the VIBE community</p>
        </div>

        <div class="glass rounded-2xl p-8">
          <form @submit.prevent="handleRegister" class="space-y-6">
            <div v-if="error" class="p-4 rounded-xl bg-red-500/20 text-red-400 text-sm">
              {{ error }}
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Full Name</label>
              <input 
                v-model="form.name"
                type="text"
                class="input"
                placeholder="John Doe"
                required
              />
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
              <label class="block text-sm font-medium mb-2">Phone (Optional)</label>
              <input 
                v-model="form.phone"
                type="tel"
                class="input"
                placeholder="0XXX XXX XXX"
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
                minlength="8"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Confirm Password</label>
              <input 
                v-model="form.password_confirmation"
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
              <span v-if="authStore.isLoading">Creating account...</span>
              <span v-else>Create Account</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-[#a0a0a0]">
              Already have an account?
              <NuxtLink to="/login" class="text-[#e94560] hover:underline">
                Sign in
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
const authStore = useAuthStore()

const error = ref('')
const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
})

const handleRegister = async () => {
  error.value = ''
  
  if (form.password !== form.password_confirmation) {
    error.value = 'Passwords do not match'
    return
  }
  
  const result = await authStore.register(form)
  
  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error || 'Registration failed'
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
  title: 'Register - VIBE',
  description: 'Create your VIBE account',
})
</script>
