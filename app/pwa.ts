export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered:", registration);

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            newWorker?.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New content is available, show update prompt
                showUpdatePrompt();
              }
            });
          });
        })
        .catch((registrationError) => {
          console.log("SW registration failed:", registrationError);
        });
    });
  }
}

function showUpdatePrompt() {
  // Implement a user interface to prompt for app update
  // For example, you could use a custom modal or toast notification
  if (confirm("A new version of the app is available. Reload to update?")) {
    window.location.reload();
  }
}
