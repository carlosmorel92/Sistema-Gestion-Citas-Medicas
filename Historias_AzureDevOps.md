# Historias de Usuario - SGCM (listas para pegar en Azure DevOps)

## Épica: Autenticación del sistema
- **HU-01**: Como usuario quiero registrarme para poder acceder al sistema.
  - Criterios: Campos obligatorios (nombre, email, password). Se crea usuario en BD. Punto: 3
- **HU-02**: Como usuario quiero iniciar sesión para acceder a mis funciones.
  - Criterios: Autenticación con JWT, error en credenciales. Punto: 2

## Épica: Gestión de citas médicas
- **HU-03**: Como paciente quiero crear una cita para reservar un horario con un doctor.
  - Criterios: Validar disponibilidad, crear registro. Punto: 5
- **HU-04**: Como paciente quiero cancelar una cita para liberar el horario.
  - Criterios: Estado a 'cancelled'. Punto: 2
- **HU-05**: Como paciente quiero ver mis citas para conocer mis próximas visitas.
  - Criterios: Listado paginado, mostrar estado y doctor. Punto: 3

## Épica: Gestión de horarios médicos
- **HU-06**: Como doctor quiero definir mi disponibilidad para recibir citas.
  - Criterios: Guardar franjas horarias. Punto: 5
- **HU-07**: Como administrador quiero crear y gestionar perfiles de doctores.
  - Criterios: CRUD de doctores. Punto: 3

## Épica: Panel administrativo / reportes
- **HU-08**: Como administrador quiero ver un listado de todos los usuarios.
  - Criterios: Paginado, filtro por rol. Punto: 2
- **HU-09**: Como administrador quiero ver estadísticas simples (citas hoy, pendientes).
  - Criterios: Endpoint que devuelve conteos. Punto: 3
- **HU-10**: Como QA quiero que existan pruebas automatizadas que validen los flujos críticos.
  - Criterios: Tests de registro, login y crear cita. Punto: 5
