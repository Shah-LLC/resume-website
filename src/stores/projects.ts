import { Project } from "@/models/Project";
import { defineStore } from "pinia";
import { ref } from "vue";

// Cache expiry time in minutes
const CACHE_EXPIRY_TIME = 10;
// API timeout in milliseconds (30 seconds)
const API_TIMEOUT = 30000;

export const useProjectsStore = defineStore("projects", () => {
  // State
  const projects = ref<Project[]>([]);
  const isLoading = ref(false);
  const hasTimedOut = ref(false);
  const hasError = ref(false);

  // Actions
  async function fetchProjects(): Promise<void> {
    try {
      isLoading.value = true;
      hasTimedOut.value = false;
      hasError.value = false;

      // Check cache first
      const cachedProjects = JSON.parse(
        localStorage.getItem("projectsCached") || "null",
      );
      const currentTime = new Date().getTime();

      if (
        cachedProjects &&
        cachedProjects.timestamp &&
        (currentTime - cachedProjects.timestamp) / 1000 / 60 < CACHE_EXPIRY_TIME
      ) {
        // Use cached data
        projects.value = cachedProjects.data;
        isLoading.value = false;
        return;
      }

      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), API_TIMEOUT),
      );

      // Create fetch promise
      const fetchPromise = fetch(
        `https://us-central1-website-b674d.cloudfunctions.net/projects`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            connection: "keep-alive",
          },
        },
      );

      // Race between timeout and fetch
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      if (!response.ok) {
        throw new Error("Failed to get projects.");
      }

      const result = await response.json();
      projects.value = result as Project[];

      // Sort by id (newest first)
      projects.value = projects.value.sort((a, b) => {
        return a.id > b.id ? -1 : 1;
      });

      // Update cache
      localStorage.setItem(
        "projectsCached",
        JSON.stringify({
          data: projects.value,
          timestamp: currentTime,
        }),
      );
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error("Error fetching projects:", error);

      if (error instanceof Error && error.message === "Request timeout") {
        hasTimedOut.value = true;
      } else {
        hasError.value = true;
      }

      // Clear projects array on error/timeout
      projects.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  return {
    // State
    projects,
    isLoading,
    hasTimedOut,
    hasError,
    // Actions
    fetchProjects,
  };
});
