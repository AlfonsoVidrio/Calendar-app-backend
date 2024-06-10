import { dbConnection } from './database/config.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import auth from './routes/auth.js'
import events from './routes/events.js'

dotenv.config();

// Crear el servidor de express
const app = express();

app.use(morgan('dev'));
// Base de datos
dbConnection();

app.use(cors());

// Directorio público
app.use( express.static('public') );

// lectura y parseo del body
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/events', events);

// escuchar
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})
