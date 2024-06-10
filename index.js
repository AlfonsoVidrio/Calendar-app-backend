import { dbConnection } from './database/config.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import auth from './routes/auth.js'
import events from './routes/events.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Todas las rutas no manejadas explícitamente serán redirigidas al index.html
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

// escuchar
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})