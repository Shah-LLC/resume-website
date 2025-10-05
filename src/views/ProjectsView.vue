<template>
  <!-- Loading State -->
  <div
    v-show="store.isLoading"
    class="flex flex-col justify-center items-center min-h-[60vh] space-y-4"
  >
    <div class="flex space-x-2">
      <div
        class="w-3 h-3 bg-pink-900 dark:bg-yellow-500 rounded-full animate-bounce"
        style="animation-delay: 0ms"
      ></div>
      <div
        class="w-3 h-3 bg-pink-900 dark:bg-yellow-500 rounded-full animate-bounce"
        style="animation-delay: 150ms"
      ></div>
      <div
        class="w-3 h-3 bg-pink-900 dark:bg-yellow-500 rounded-full animate-bounce"
        style="animation-delay: 300ms"
      ></div>
    </div>
    <p class="text-lg font-extralight animate-pulse">Loading projects...</p>
  </div>

  <!-- Coming Soon / Timeout State -->
  <div
    v-show="
      !store.isLoading &&
      (store.hasTimedOut || store.hasError || store.projects.length === 0)
    "
    class="flex flex-col items-center justify-center min-h-[60vh] px-4 sm:px-6 md:px-8 max-w-3xl mx-auto text-center space-y-8 fade-in-up"
  >
    <!-- Icon -->
    <div
      class="w-24 h-24 rounded-full bg-gradient-to-br from-pink-900/10 to-pink-700/5 dark:from-yellow-500/10 dark:to-yellow-400/5 flex items-center justify-center border-2 border-pink-900/20 dark:border-yellow-500/20"
    >
      <RocketLaunchIcon class="w-12 h-12 text-pink-900 dark:text-yellow-500" />
    </div>

    <!-- Heading -->
    <div class="space-y-4">
      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight"
      >
        Projects Coming Soon
      </h1>
      <p class="text-lg md:text-xl font-extralight leading-relaxed">
        I'm currently working on some exciting projects! In the meantime, check
        out my work on GitHub or get in touch to learn more about what I'm
        building.
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <a
        href="https://github.com/Shah-Parth"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-pink-900 dark:bg-yellow-500 text-slate-200 dark:text-gray-900 rounded hover:bg-pink-900/90 dark:hover:bg-yellow-500/90 transition-colors duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-900 dark:focus-visible:ring-yellow-400 min-h-[44px]"
      >
        <CodeBracketIcon class="w-5 h-5" />
        View GitHub
      </a>
      <a
        href="mailto:contact@shahparth.me"
        class="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-pink-900 dark:border-yellow-500 text-pink-900 dark:text-yellow-500 rounded hover:bg-pink-900 dark:hover:bg-yellow-500 hover:text-slate-200 dark:hover:text-gray-900 transition-colors duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-900 dark:focus-visible:ring-yellow-400 min-h-[44px]"
      >
        <InboxIcon class="w-5 h-5" />
        Get in Touch
      </a>
    </div>
  </div>

  <!-- Projects Grid (when data is available) -->
  <div
    v-show="!store.isLoading && store.projects.length > 0"
    class="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto"
  >
    <!-- Page Header -->
    <section class="mb-8 md:mb-12 fade-in-up">
      <div
        class="sticky top-16 md:top-20 z-10 bg-slate-200 dark:bg-gray-900 pb-3 md:pb-4"
      >
        <h1
          class="relative text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight"
        >
          Projects
          <span
            class="absolute -bottom-2 left-0 w-16 md:w-20 h-1 bg-gradient-to-r from-pink-900 to-pink-700 dark:from-yellow-500 dark:to-yellow-400 rounded-full"
          ></span>
        </h1>
      </div>
      <p
        class="mt-6 text-lg md:text-xl font-extralight leading-relaxed max-w-3xl"
      >
        A collection of projects showcasing my expertise in building scalable,
        efficient, and user-focused solutions.
      </p>
    </section>

    <!-- Projects Grid -->
    <section
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-12"
    >
      <article
        v-for="(project, index) in store.projects"
        :key="project.id"
        class="group relative bg-slate-200 dark:bg-gray-900 border-2 border-pink-900/20 dark:border-yellow-500/20 rounded-lg overflow-hidden hover:border-pink-900 dark:hover:border-yellow-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 fade-in-up"
        :style="`animation-delay: ${index * 100}ms`"
      >
        <!-- Project Image/Icon -->
        <div
          class="h-48 bg-gradient-to-br from-pink-900/10 to-pink-700/5 dark:from-yellow-500/10 dark:to-yellow-400/5 flex items-center justify-center border-b-2 border-pink-900/20 dark:border-yellow-500/20 group-hover:border-pink-900 dark:group-hover:border-yellow-500 transition-colors duration-300"
        >
          <component
            :is="getIconComponent(project.iconName)"
            class="w-16 h-16 text-pink-900 dark:text-yellow-500 group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <!-- Project Content -->
        <div class="p-6 space-y-4">
          <!-- Title -->
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-slate-200">
            {{ project.title }}
          </h2>

          <!-- Description -->
          <p
            class="text-base font-extralight leading-relaxed text-gray-900 dark:text-slate-200"
          >
            {{ project.description }}
          </p>

          <!-- Tech Stack -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(tech, i) in project.technologies"
              :key="i"
              class="px-3 py-1 text-xs font-medium rounded-full bg-pink-900/10 dark:bg-yellow-500/10 text-pink-900 dark:text-yellow-500 border border-pink-900/20 dark:border-yellow-500/20"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Links -->
          <div class="flex gap-3 pt-2">
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 bg-pink-900 dark:bg-yellow-500 text-slate-200 dark:text-gray-900 rounded hover:bg-pink-900/90 dark:hover:bg-yellow-500/90 transition-colors duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-900 dark:focus-visible:ring-yellow-400"
            >
              <CodeBracketIcon class="w-4 h-4" />
              Code
            </a>
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 border-2 border-pink-900 dark:border-yellow-500 text-pink-900 dark:text-yellow-500 rounded hover:bg-pink-900 dark:hover:bg-yellow-500 hover:text-slate-200 dark:hover:text-gray-900 transition-colors duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-900 dark:focus-visible:ring-yellow-400"
            >
              <ArrowTopRightOnSquareIcon class="w-4 h-4" />
              Live
            </a>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  CodeBracketIcon,
  ArrowTopRightOnSquareIcon,
  CommandLineIcon,
  ServerIcon,
  CubeIcon,
  CloudIcon,
  CircleStackIcon,
  DevicePhoneMobileIcon,
  RocketLaunchIcon,
  InboxIcon,
} from "@heroicons/vue/24/solid";
import type { FunctionalComponent } from "vue";
import { useProjectsStore } from "@/stores/projects";
import { onMounted } from "vue";

const store = useProjectsStore();

// Icon mapping function
const iconMap: Record<string, FunctionalComponent> = {
  ServerIcon,
  CommandLineIcon,
  CubeIcon,
  CloudIcon,
  CircleStackIcon,
  DevicePhoneMobileIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
};

const getIconComponent = (iconName: string): FunctionalComponent => {
  return iconMap[iconName] || CubeIcon; // Default to CubeIcon if not found
};

// Fetch projects on mount
onMounted(() => {
  store.fetchProjects();
});
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}
</style>
