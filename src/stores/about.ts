import { Education } from "@/models/Education";
import { Job } from "@/models/Job";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Cache expiry time in minutes
const CACHE_EXPIRY_TIME = 10;

export const useAboutStore = defineStore("about", () => {
  // State
  const jobs = ref<Job[]>([]);
  const education = ref<Education[]>([]);
  const jobLoading = ref(false);
  const educationLoading = ref(false);

  // Getters
  const isLoading = computed(() => jobLoading.value || educationLoading.value);

  // Actions
  async function fetchJobs(): Promise<void> {
    try {
      jobLoading.value = true;
      const cachedJobs = JSON.parse(
        localStorage.getItem("jobsCached") || "null",
      );
      const currentTime = new Date().getTime();
      if (
        cachedJobs &&
        cachedJobs.timestamp &&
        (currentTime - cachedJobs.timestamp) / 1000 / 60 < CACHE_EXPIRY_TIME
      ) {
        // Use cached data
        jobs.value = cachedJobs.data;
      } else {
        const response = await fetch(
          `https://us-central1-website-b674d.cloudfunctions.net/jobs`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              connection: "keep-alive",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to get jobs.");
        }
        const result = await response.json();
        jobs.value = result as Job[];
        jobs.value = jobs.value.sort((a, b) => {
          return a.id > b.id ? -1 : 1;
        });

        // Update cache
        localStorage.setItem(
          "jobsCached",
          JSON.stringify({
            data: jobs.value,
            timestamp: currentTime,
          }),
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error:", error);
    } finally {
      jobLoading.value = false;
    }
  }

  async function fetchEducation(): Promise<void> {
    try {
      educationLoading.value = true;
      const cachedEducation = JSON.parse(
        localStorage.getItem("educationCached") || "null",
      );
      const currentTime = new Date().getTime();
      if (
        cachedEducation &&
        cachedEducation.timestamp &&
        (currentTime - cachedEducation.timestamp) / 1000 / 60 <
          CACHE_EXPIRY_TIME
      ) {
        // Use cached data
        education.value = cachedEducation.data;
      } else {
        const response = await fetch(
          `https://us-central1-website-b674d.cloudfunctions.net/education`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              connection: "keep-alive",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to get education.");
        }
        const result = await response.json();
        education.value = result as Education[];

        // Update cache
        localStorage.setItem(
          "educationCached",
          JSON.stringify({
            data: education.value,
            timestamp: currentTime,
          }),
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error:", error);
    } finally {
      educationLoading.value = false;
    }
  }

  return {
    // State
    jobs,
    education,
    jobLoading,
    educationLoading,
    // Getters
    isLoading,
    // Actions
    fetchJobs,
    fetchEducation,
  };
});
