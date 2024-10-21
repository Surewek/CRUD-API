import { createServer, IncomingMessage, ServerResponse } from 'http';
import router from './routers/user-router';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    await router(req, res);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end();
  }
})

server.listen(PORT, async () => {
  console.log(`Server started on port ${PORT} successfully.`);
})