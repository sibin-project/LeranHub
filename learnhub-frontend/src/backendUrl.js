const BACKEND_URL =
  window.location.hostname.includes("localhost")
    ? "http://localhost:5000"
    : "https://nphgd72w-5000.inc1.devtunnels.ms";

export default BACKEND_URL;