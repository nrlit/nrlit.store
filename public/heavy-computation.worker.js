self.addEventListener("message", (event) => {
  const result = performHeavyComputation(event.data);
  self.postMessage(result);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function performHeavyComputation(data) {
  // Your heavy computation logic here
  return result;
}
