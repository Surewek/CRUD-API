import { createServer, IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {

})

server.listen(PORT, async () => {
  console.log(`Server started on port ${PORT} successfully.`);
})