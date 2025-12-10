SGCM - Guion para video demostrativo (5-8 minutos)
-------------------------------------------------

1) Introducción (20s)
- Nombre del proyecto y objetivo: Sistema de Gestión de Citas Médicas.
- Indicar que se mostrará el primer Release.

2) Repositorio y tablero (40s)
- Abrir GitHub y mostrar la estructura de carpetas (backend, frontend, tests).
- Abrir Azure DevOps (Boards) y mostrar épicas + 10 historias creadas.

3) Mostrar la app funcionando (2:30)
- Iniciar frontend y backend (o si están en Docker, mencionar docker-compose up).
- Registrar un usuario nuevo (mostrar formulario y resultado).
- Iniciar sesión.
- Crear una cita: seleccionar doctor (o usar doctor existente) y fecha/hora.
- Mostrar que la cita aparece en 'Mis citas'.
- Cancelar la cita y mostrar cambio de estado.

4) Código y endpoints (1:00)
- Mostrar los archivos clave: routes/auth.js, routes/appointments.js, routes/doctors.js.
- Ejecutar una petición en Postman o curl a un endpoint (e.g., GET /api/doctors).

5) Pruebas automatizadas (1:00)
- Mostrar la carpeta tests y el test principal.
- Ejecutar pytest y mostrar que el test pasa (o explicar si falla por entorno).
- Si usas CI, mostrar pipeline que ejecuta tests.

6) Cierre (20s)
- Resumen de lo entregado: doc PDF, repositorio, tablero, tests, video.
- Contacto / correos para acceso: ktejada@itla.edu.do / 20186927@itla.edu.do
