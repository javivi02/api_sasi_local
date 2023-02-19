import { config } from 'dotenv'
import express, { Router } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { exec } from 'child_process'

// Inicio configuración de variables de entorno
config()

// initialization
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routes
app.post('/api/vnc', async (req, res) => {

  const equipo = req.body
  const comando = `C:\\ErviConnect\\bin\\VNC\\Vncviewer.exe ${equipo.ip} -password inf2017`

  exec(comando, (error, stdout, stderr) => {

    if (error) {
      console.log({ stderr })
      console.error(`exec error: ${error}`)
      res.status(200).json({ estado: false, info: 'Fallo al iniciar VNC 😞' })
    } else {
      res.status(200).json({ estado: true, info: 'VNC iniciado 😃' })
      console.log({ stdout })
    }

  })

})

// starting the server web and Rest API
app.listen(3003)
console.log('Server on port ...', 3003)