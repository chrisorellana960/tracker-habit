# Habit Tracker

Aplicación web para la gestión de hábitos diarios con autenticación de usuarios, seguimiento de rachas (streaks) y persistencia en base de datos.

---

# Tecnologías utilizadas

## Backend
- Node.js
- Express
- MongoDB Atlas
- JWT 
- Vercel 

## Frontend
- Next.js
- Redux Toolkit
- Tailwind CSS
- Vercel (Hosting)

---

# Ejecución del proyecto de manera local

## 1. Clonar repositorio usando la terminal

```bash
git clone TU_REPO_URL
cd habit-tracker

## 2. Configurar backend

cd backend
npm install
npm run dev
 
### crea el archivo .env dentro del backend

MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_personalizacion

## 3. Configurar frontend

cd frontend
npm install
npm run dev

## 4. Accede a las aplicaciones

para frontend ingresa en tu navegador el url: https://localhost:3000
para backend ingresa en tu navegador el url: https://localhost:5000

### Nota

Para que el frontend funcione correctamente, asegúrate de que el backend esté corriendo y que la variable de entorno en el frontend apunte a:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

---

# Funciones Principales que puede realizar la app

- Registro de usuario
- Login seguro
- Crear hábitos
- Marcar hábitos como completados
- Seguimiento de rachas 
- Persistencia en base de datos

---

# Desarrollo durante las semanas

## Semana 1

- Creación del proyecto backend con Express
- Configuración de servidor y base de datos a mongoDB
- Instalación de dependencias
- Creación de endpoint de altas y bajas y cambios de hábitos.

## semana 2

- configuracion inicial del proyecto en NextJS e integracion de Redux
- integracion de request GET para ver todos los habitos

## Semana 3

- Integracion de libreria tailwindcss en el frontend con nextJS
- Integracion de lista dinamica 
- Integracion de barra de progeso del proyecto de nextJS
- Integracion del boton done en el proyecto de nextJS

## Semana 4

- Integracion de lógica en backend para el reinicio de días y seguimiento de días 
- Integracion de registro y login de usuarios utilizando hash para guardar la contraseña. 
- Integracion de front del boton “Done” para marcar un hábito como realizado o reiniciar el hábito en caso se pierda la racha de días. 
- Integración barra de progreso dinámica según cantidad de días en los que se lleva la racha del hábito Si el usuario no marca el hábito en un día, el conteo se reiniciará. La barra de progreso cambiará de rojo a verde a medida que el usuario se acerque a los 66 días.

## Semana 5

- Integracion de middleware desde backend para identificación y autorización de usuarios 
- Integracion de registro y login de usuarios desde el frontend - Next. 
- Integracion de envio de jwt desde el frontend al backend. 
- Integración de flujo para agregar hábitos.

## Semana 6

- Despliegue de backend y frontend en Vercel

---

# Enlaces

## Repositorio de Frontend y Backend: https://github.com/chrisorellana960/tracker-habit.git
## Frontend en Vercel: https://tracker-habit-frontend.vercel.app/
## Backend en Vercel: https://tracker-habit-three.vercel.app/
