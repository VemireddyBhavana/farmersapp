import { createServer } from "./index";

const port = Number(process.env.PORT) || 5002;
const app = createServer();

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 [Agri Server] Running at http://localhost:${port} - Last Reload: ${new Date().toLocaleTimeString()}`);
});
