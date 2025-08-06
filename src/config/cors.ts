import { CorsOptions } from "cors";
import dotenv from 'dotenv'

dotenv.config()

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whitelist = [process.env.FRONTEND_URL]

    // Para desarrollo, permitimos peticiones sin origin (como Postman)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      console.log('❌ CORS rechazado:', origin)
      callback(new Error('Error de CORS'))
    }
  },
  credentials: true
}

