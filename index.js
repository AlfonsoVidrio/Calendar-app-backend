import express from 'express';
import dotenv from 'dotenv';
import router from './routes/auth.js'

dotenv.config();

// crear el servidor de express
const app = express();

// Directorio público
app.use( express.static('public') );

app.use('/api/auth', router)

// escuchar
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})
