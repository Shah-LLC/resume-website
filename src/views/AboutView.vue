<template>
  <!-- Enhanced loading state -->
  <div
    v-show="isLoading"
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
    <p class="text-lg font-extralight animate-pulse">Loading information...</p>
  </div>

  <!-- Main content with enhanced layout -->
  <div
    v-show="!isLoading"
    class="flex flex-col lg:flex-row justify-center gap-12 lg:gap-20 px-4 lg:px-8 max-w-7xl mx-auto"
  >
    <!-- Experience Section -->
    <section class="flex-1 space-y-8 fade-in-up delay-100">
      <div class="sticky top-24 z-10 bg-slate-200 dark:bg-gray-900 pb-4">
        <h1
          class="relative text-5xl lg:text-6xl font-extralight tracking-tight"
        >
          Experience
          <span
            class="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-pink-900 to-pink-700 dark:from-yellow-500 dark:to-yellow-400 rounded-full"
          ></span>
        </h1>
      </div>

      <ol
        class="relative border-l-2 border-pink-900/30 dark:border-yellow-500/30 ml-3"
      >
        <li
          v-for="(job, id) in jobs"
          :key="id"
          class="mb-12 ml-8 group fade-in-up"
          :style="`animation-delay: ${(id + 2) * 100}ms`"
        >
          <!-- Timeline dot with pulse effect -->
          <span
            class="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 bg-pink-900 dark:bg-yellow-500 ring-slate-200 dark:ring-gray-900 transition-all duration-300 group-hover:ring-8 group-hover:scale-110 group-hover:shadow-lg"
          >
            <CalendarIcon
              class="w-4 h-4 fill-slate-200 dark:fill-gray-900 transition-transform group-hover:scale-110"
            />
          </span>

          <!-- Job content card -->
          <div
            class="p-6 rounded-lg bg-slate-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-pink-900/10 dark:border-yellow-500/10 transition-all duration-300 hover:border-pink-900/30 dark:hover:border-yellow-500/30 hover:shadow-lg hover:-translate-y-1"
          >
            <h2
              class="flex flex-wrap items-baseline gap-2 mb-3 text-2xl font-semibold"
            >
              <span>{{ job.jobTitle }}</span>
              <span class="text-pink-900 dark:text-yellow-500 font-bold">
                @ {{ job.name }}
              </span>
            </h2>
            <div class="space-y-1 text-gray-700 dark:text-gray-300">
              <h3 class="text-base font-light">
                {{ job.jobCity }}, {{ job.jobState }}
              </h3>
              <time class="text-sm font-extralight italic">
                {{ job.startMonth }}, {{ job.startYear }}
                -
                {{ job.endMonth ? `${job.endMonth},` : "Present" }}
                {{ job.endYear }}
              </time>
            </div>
          </div>
        </li>
      </ol>
    </section>

    <!-- Education Section -->
    <section class="flex-1 space-y-8 fade-in-up delay-200">
      <div class="sticky top-24 z-10 bg-slate-200 dark:bg-gray-900 pb-4">
        <h1
          class="relative text-5xl lg:text-6xl font-extralight tracking-tight"
        >
          Education
          <span
            class="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-pink-900 to-pink-700 dark:from-yellow-500 dark:to-yellow-400 rounded-full"
          ></span>
        </h1>
      </div>

      <ol
        class="relative border-l-2 border-pink-900/30 dark:border-yellow-500/30 ml-3"
      >
        <li
          v-for="(edu, id) in education"
          :key="id"
          class="mb-12 ml-8 group fade-in-up"
          :style="`animation-delay: ${(id + 3) * 100}ms`"
        >
          <!-- Timeline dot with pulse effect -->
          <span
            class="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 bg-pink-900 dark:bg-yellow-500 ring-slate-200 dark:ring-gray-900 transition-all duration-300 group-hover:ring-8 group-hover:scale-110 group-hover:shadow-lg"
          >
            <AcademicCapIcon
              class="w-4 h-4 fill-slate-200 dark:fill-gray-900 transition-transform group-hover:scale-110"
            />
          </span>

          <!-- Education content card -->
          <div
            class="p-6 rounded-lg bg-slate-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-pink-900/10 dark:border-yellow-500/10 transition-all duration-300 hover:border-pink-900/30 dark:hover:border-yellow-500/30 hover:shadow-lg hover:-translate-y-1"
          >
            <h2
              class="mb-3 text-2xl font-bold text-pink-900 dark:text-yellow-500"
            >
              {{ edu.university }}
            </h2>
            <div class="space-y-1 text-gray-700 dark:text-gray-300">
              <time class="block text-sm font-extralight italic">
                {{ edu.graduationMonth }}, {{ edu.graduationYear }}
              </time>
              <p class="text-base font-light">
                {{ edu.degree }}, {{ edu.field }}
              </p>
            </div>
          </div>
        </li>
      </ol>
    </section>
  </div>
</template>
<script setup lang="ts">
import { CalendarIcon, AcademicCapIcon } from "@heroicons/vue/24/solid";
import { aboutStore } from "@/stores/about";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const about = aboutStore();
const { jobs, education, isLoading } = storeToRefs(aboutStore());

onMounted(() => {
  about.fetchJobs();

  about.fetchEducation();
});
</script>
