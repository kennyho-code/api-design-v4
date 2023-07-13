import express from 'express';
import router from './router';
import morgan from 'morgan';
import { protect } from './modules/auth';
import { createUser, login } from './handlers/user';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res, next) => {
    // setTimeout(() => { next(new Error('async time out')) }, 1000);
    res.json({ message: 'hello world' });

});

app.use('/api', protect, router);

// auth
app.use('/user', createUser);
app.use('/signin', login);

app.use((err, req, res, next) => {
    res.json({ message: err.message });
  });



export default app;