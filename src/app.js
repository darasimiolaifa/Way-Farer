import { config } from 'dotenv';
import server from './server';

config();

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`App started on port ${port}`));
