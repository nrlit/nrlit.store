export async function scheduleSync() {
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    const registration = await navigator.serviceWorker.ready;
    try {
      await registration.sync.register("sync-data");
      console.log("Sync registered");
    } catch (err) {
      console.error("Sync registration failed:", err);
    }
  } else {
    console.log("Background Sync not supported");
  }
}
