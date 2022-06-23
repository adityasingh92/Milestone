import express, {Express} from 'express';

// routers import
import authRouters from './routers/auth.routes';

const app = express();
app.use(express.json());
app.use('/auth', authRouters);

export default app;