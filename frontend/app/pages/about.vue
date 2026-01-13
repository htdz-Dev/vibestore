<template>
  <div>
    <!-- Hero -->
    <section class="hero-about-brutal">
      <div class="container-custom text-center">
        <div class="sticker-brutal-large">✦ EST. 2024 ✦</div>
        <h1 class="hero-title-about">
          ABOUT <span class="text-[#ff5c00]">VIBE</span>
        </h1>
        <p class="text-xl text-[#525252] max-w-2xl mx-auto">
          Premium streetwear for those who dare to stand out
        </p>
      </div>
    </section>

    <!-- Story -->
    <section class="py-20 bg-white border-y-3 border-[#1a1a1a]">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="section-title-brutal mb-6">
              OUR <span class="text-[#ff5c00]">STORY</span>
            </h2>
            <div class="space-y-4 text-[#525252] leading-relaxed text-lg">
              <p>
                <strong class="text-[#1a1a1a]">VIBE was born from a passion for self-expression through fashion.</strong> We believe that what you wear is a statement about who you are and what you stand for.
              </p>
              <p>
                Founded in <span class="highlight-brutal">Algeria</span>, we set out to create a brand that combines premium quality with bold, urban designs. Every piece in our collection is carefully crafted to help you express your unique style.
              </p>
              <p>
                Our mission is simple: to provide streetwear that makes you feel confident, comfortable, and <span class="highlight-brutal-alt">unapologetically yourself</span>.
              </p>
            </div>
          </div>
          <div>
            <div class="story-image-brutal">
              <div class="story-image-placeholder">
                <span class="text-6xl">👕</span>
                <p class="mt-4 font-bold">PREMIUM QUALITY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-20 bg-[#fffef0]">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="section-title-brutal">
            WHAT WE <span class="text-[#7c3aed]">STAND FOR</span>
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="value-card-brutal value-card-1">
            <span class="value-icon">🛡️</span>
            <h3 class="value-title-brutal">QUALITY FIRST</h3>
            <p class="text-[#525252]">
              We never compromise on quality. Every piece is made with premium materials for lasting comfort and durability.
            </p>
          </div>

          <div class="value-card-brutal value-card-2">
            <span class="value-icon">⭐</span>
            <h3 class="value-title-brutal">UNIQUE DESIGNS</h3>
            <p class="text-[#525252]">
              Our designs are bold, original, and made for those who want to stand out from the crowd.
            </p>
          </div>

          <div class="value-card-brutal value-card-3">
            <span class="value-icon">🤝</span>
            <h3 class="value-title-brutal">COMMUNITY</h3>
            <p class="text-[#525252]">
              We're building more than a brand – we're building a community of individuals who share our passion.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 bg-[#facc15] border-y-3 border-[#1a1a1a]">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="stat-brutal">
            <span class="stat-number">500+</span>
            <span class="stat-label">Happy Customers</span>
          </div>
          <div class="stat-brutal">
            <span class="stat-number">50+</span>
            <span class="stat-label">Products</span>
          </div>
          <div class="stat-brutal">
            <span class="stat-number">48</span>
            <span class="stat-label">Wilayas Covered</span>
          </div>
          <div class="stat-brutal">
            <span class="stat-number">100%</span>
            <span class="stat-label">Satisfaction</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-white">
      <div class="container-custom text-center">
        <h2 class="section-title-brutal mb-6">
          READY TO JOIN THE <span class="text-[#ff5c00]">MOVEMENT</span>?
        </h2>
        <p class="text-xl text-[#525252] mb-8 max-w-2xl mx-auto">
          Explore our collection and find pieces that speak to your style.
        </p>
        <NuxtLink to="/shop" class="btn btn-primary text-lg px-10 py-4">
          Shop Now →
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO
useSeoMeta({
  title: 'About Us - VIBE',
  description: 'Learn about VIBE - Premium streetwear brand from Algeria. Quality, style, and community.',
})
</script>

<style scoped>
.hero-about-brutal {
  @apply py-24;
  background: #fffef0;
  border-bottom: 3px solid #1a1a1a;
}

.sticker-brutal-large {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #facc15;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  transform: rotate(-1deg);
}

.hero-title-about {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 4rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .hero-title-about {
    font-size: 5rem;
  }
}

.section-title-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 2.5rem;
  color: #1a1a1a;
}

.highlight-brutal {
  background: #facc15;
  padding: 0.125rem 0.5rem;
  border: 2px solid #1a1a1a;
  font-weight: 700;
}

.highlight-brutal-alt {
  background: #ff5c00;
  color: white;
  padding: 0.125rem 0.5rem;
  border: 2px solid #1a1a1a;
  font-weight: 700;
}

.story-image-brutal {
  @apply aspect-square;
  background: #fef6e0;
  border: 3px solid #1a1a1a;
  box-shadow: 8px 8px 0px #1a1a1a;
}

.story-image-placeholder {
  @apply w-full h-full flex flex-col items-center justify-center;
  font-family: 'Space Mono', monospace;
  color: #1a1a1a;
}

.value-card-brutal {
  @apply p-8 text-center;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
  transition: all 0.15s ease;
}

.value-card-brutal:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #1a1a1a;
}

.value-card-1 { background: #fff7ed; }
.value-card-2 { background: #f5f3ff; }
.value-card-3 { background: #ecfdf5; }

.value-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.value-title-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 1.125rem;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.stat-brutal {
  @apply text-center;
}

.stat-number {
  display: block;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 3rem;
  color: #1a1a1a;
}

.stat-label {
  display: block;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 0.75rem;
  color: #1a1a1a;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.border-y-3 {
  border-top-width: 3px;
  border-bottom-width: 3px;
}
</style>
