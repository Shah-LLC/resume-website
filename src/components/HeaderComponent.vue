<template>
  <header
    role="banner"
    class="flex items-center justify-between p-4 md:p-8 sticky top-0 z-50 bg-slate-200 dark:bg-gray-900 text-gray-900 dark:text-slate-200 shadow-sm"
  >
    <h1 class="sr-only">Personal website of Parth Shah, Software Engineer.</h1>
    <RouterLink to="/" class="justify-center flex-shrink-0">
      <div
        class="h-12 w-12 md:h-14 md:w-14 flex justify-center items-center text-3xl md:text-4xl bg-pink-900 dark:bg-yellow-400 text-slate-200 dark:text-gray-900"
      >
        S
      </div>
    </RouterLink>

    <!-- Desktop Navigation -->
    <nav
      class="hidden md:flex flex-wrap justify-center gap-x-12 lg:gap-x-20"
      aria-label="main navigation"
    >
      <template v-for="(n, i) in nav" :key="{ i }">
        <RouterLink
          :to="n.path"
          class="pt-8 uppercase hover:-translate-y-2 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-900 dark:focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-200 dark:focus-visible:ring-offset-gray-900 rounded-sm px-2 relative"
          :class="
            $route.path === n.path
              ? 'font-semibold text-pink-900 dark:text-yellow-400'
              : ''
          "
          :aria-label="n.ariaLabel"
          :aria-current="n.path === $route.path ? 'page' : null"
        >
          {{ n.name }}
          <!-- Active indicator dot -->
          <span
            v-if="$route.path === n.path"
            class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-pink-900 dark:bg-yellow-400 rounded-full"
          ></span>
        </RouterLink>
      </template>
    </nav>

    <!-- Mobile Navigation Toggle -->
    <button
      @click="toggleMobileMenu"
      type="button"
      aria-label="Toggle mobile menu"
      class="md:hidden p-2 rounded-lg hover:bg-pink-900/10 dark:hover:bg-yellow-500/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-900 dark:focus-visible:ring-yellow-400"
    >
      <Bars3Icon
        v-if="!isMobileMenuOpen"
        class="w-6 h-6 text-gray-900 dark:text-slate-200"
      />
      <XMarkIcon v-else class="w-6 h-6 text-gray-900 dark:text-slate-200" />
    </button>

    <!-- Theme Toggle -->
    <button
      @click="toggleTheme"
      type="button"
      aria-label="Toggle dark mode"
      class="hidden md:block p-2 rounded-lg hover:bg-pink-900/10 dark:hover:bg-yellow-500/10 transition-colors duration-200 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-900 dark:focus-visible:ring-yellow-400"
    >
      <!-- Sun icon (shown in dark mode) -->
      <SunIcon
        v-if="isDark"
        class="w-6 h-6 text-yellow-500 transition-transform duration-300 hover:rotate-12"
      />
      <!-- Moon icon (shown in light mode) -->
      <MoonIcon
        v-else
        class="w-6 h-6 text-pink-900 transition-transform duration-300 hover:-rotate-12"
      />
    </button>
  </header>

  <!-- Mobile Menu Overlay -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isMobileMenuOpen"
      @click="toggleMobileMenu"
      class="md:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
    ></div>
  </Transition>

  <!-- Mobile Menu Slide-in -->
  <Transition
    enter-active-class="transition-transform duration-300"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-300"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <nav
      v-if="isMobileMenuOpen"
      class="md:hidden fixed top-0 right-0 bottom-0 w-64 bg-slate-200 dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
      aria-label="mobile navigation"
    >
      <div
        class="flex items-center justify-between p-4 border-b border-pink-900/20 dark:border-yellow-500/20"
      >
        <span class="font-semibold text-lg text-gray-900 dark:text-slate-200"
          >Menu</span
        >
        <button
          @click="toggleMobileMenu"
          type="button"
          aria-label="Close mobile menu"
          class="p-2 rounded-lg hover:bg-pink-900/10 dark:hover:bg-yellow-500/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-900 dark:focus-visible:ring-yellow-400"
        >
          <XMarkIcon class="w-6 h-6 text-gray-900 dark:text-slate-200" />
        </button>
      </div>

      <div class="flex-1 flex flex-col p-6 space-y-4">
        <RouterLink
          v-for="(n, i) in nav"
          :key="i"
          :to="n.path"
          @click="toggleMobileMenu"
          class="text-lg uppercase py-3 px-4 rounded-lg hover:bg-pink-900/10 dark:hover:bg-yellow-500/10 transition-all duration-200 text-gray-900 dark:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-900 dark:focus-visible:ring-yellow-400 relative"
          :class="
            $route.path === n.path
              ? 'font-bold text-pink-900 dark:text-yellow-400 border-l-4 border-pink-900 dark:border-yellow-400'
              : ''
          "
          :aria-label="n.ariaLabel"
          :aria-current="n.path === $route.path ? 'page' : null"
        >
          {{ n.name }}
        </RouterLink>
      </div>

      <div class="p-6 border-t border-pink-900/20 dark:border-yellow-500/20">
        <button
          @click="toggleTheme"
          type="button"
          aria-label="Toggle dark mode"
          class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-pink-900/10 dark:hover:bg-yellow-500/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-900 dark:focus-visible:ring-yellow-400"
        >
          <span
            class="text-sm uppercase font-semibold text-gray-900 dark:text-slate-200"
            >Theme</span
          >
          <SunIcon
            v-if="isDark"
            class="w-6 h-6 text-yellow-500 transition-transform duration-300"
          />
          <MoonIcon
            v-else
            class="w-6 h-6 text-pink-900 transition-transform duration-300"
          />
        </button>
      </div>
    </nav>
  </Transition>
</template>
<script setup lang="ts">
import "@/assets/css/main.css";
import { RouterLink } from "vue-router";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import { useDarkMode } from "@/composables/useDarkMode";
import { ref, watch, onMounted, onUnmounted } from "vue";

const { isDark, toggleTheme } = useDarkMode();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Handle escape key to close mobile menu
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isMobileMenuOpen.value) {
    toggleMobileMenu();
  }
};

// Lock/unlock body scroll when mobile menu opens/closes
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Add/remove keyboard event listener
onMounted(() => {
  document.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscapeKey);
  // Clean up body style on unmount
  document.body.style.overflow = "";
});

const nav = [
  {
    name: "Home",
    path: "/",
    ariaLabel: "Navigate to Home",
  },
  {
    name: "About",
    path: "/about",
    ariaLabel: "Navigate to About",
  },
  {
    name: "Projects",
    path: "/projects",
    ariaLabel: "Navigate to Projects",
  },
];
</script>
