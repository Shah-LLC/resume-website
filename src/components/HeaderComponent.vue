<template>
  <header
    role="banner"
    class="flex items-center justify-between p-8 sticky bg-slate-200 dark:bg-gray-900 text-gray-900 dark:text-slate-200"
  >
    <h1 class="sr-only">Personal website of Parth Shah, Software Engineer.</h1>
    <RouterLink to="/" class="justify-center">
      <div
        class="h-14 w-14 flex justify-center items-center text-4xl bg-pink-900 dark:bg-yellow-400 text-slate-200 dark:text-gray-900"
      >
        S
      </div>
    </RouterLink>
    <nav
      class="flex flex-wrap justify-center gap-x-20"
      aria-label="main navigation"
    >
      <template v-for="(n, i) in nav" :key="{ i }">
        <RouterLink
          :to="n.path"
          class="pt-8 uppercase hover:-translate-y-2 transition-transform duration-300 ease-in-out"
          :aria-label="n.ariaLabel"
          :aria-current="n.path === $route.path ? 'page' : null"
        >
          {{ n.name }}</RouterLink
        >
      </template>
    </nav>
    <button
      @click="toggleTheme"
      type="button"
      aria-label="Toggle dark mode"
      class="p-2 rounded-lg hover:bg-pink-900/10 dark:hover:bg-yellow-500/10 transition-colors duration-200"
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
</template>
<script setup lang="ts">
import "@/assets/css/main.css";
import { RouterLink } from "vue-router";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/solid";
import { useDarkMode } from "@/composables/useDarkMode";

const { isDark, toggleTheme } = useDarkMode();

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
