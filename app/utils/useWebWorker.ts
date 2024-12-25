import { useState, useEffect } from "react";

export function useWebWorker<T, R>(workerScript: string, initialData: T) {
  const [result, setResult] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const worker = new Worker(workerScript);

    worker.onmessage = (event) => {
      setResult(event.data);
    };

    worker.onerror = (error) => {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    };

    worker.postMessage(initialData);

    return () => {
      worker.terminate();
    };
  }, [workerScript, initialData]);

  return { result, error };
}
