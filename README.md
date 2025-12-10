SGCM Project bundle
================
Carpetas:
- backend: Express API (use .env.example to configure)
- frontend: React app (basic)
- tests: Selenium pytest tests

Pasos para ejecutar localmente (resumen):
1. Backend:
   - cd backend
   - npm install
   - copiar .env.example a .env y ajustar credenciales
   - ejecutar el script SQL en mysql para crear la BD (archivo: backend/sql/schema.sql)
   - npm start
2. Frontend:
   - cd frontend
   - npm install
   - npm start (por defecto corre en http://localhost:3000)
3. Tests:
   - Preparar chromedriver compatible y asegurarse selenium puede usarlo
   - cd tests
   - pip install -r requirements.txt
   - pytest -q

Observaciones:
- El proyecto es una base mínima para cumplir con el entregable. Puedes pedirme que genere más endpoints, validaciones o un README más detallado.


Additional resources added: Docker Compose, extra backend routes, Azure DevOps stories, and video script. See Historias_AzureDevOps.md and VIDEO_Guion.md
