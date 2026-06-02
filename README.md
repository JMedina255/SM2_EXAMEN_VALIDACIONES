# 🎓 Red Colaborativa Estudiantil (RCE UPT)
> **"Democratizando el apoyo académico inmediato mediante el aprendizaje entre pares."**

RCE UPT es una plataforma integral diseñada para estudiantes universitarios que buscan resolver dudas académicas de forma rápida y organizada. Al conectar a estudiantes expertos con aquellos que necesitan ayuda, transformamos el campus en un ecosistema de apoyo mutuo.

---

## 📌 Información General

*   **Nombre del curso:** `Soluciones Moviles II`
*   **Nombre completo del alumno:** `Joan Cristian Medina Quispe`
*   **Código de estudiante:** `2022074255`
*   **Fecha:** `02/06/2026`
*   **URL del repositorio público:** `https://github.com/JMedina255/SM2_EXAMEN_VALIDACIONES`

---

## 🛠️ Detalle de la Implementación

### Pantalla Seleccionada
`[Explicación técnica de la pantalla seleccionada]`

### Validaciones RegExp (Dart)
`[Explicación de las expresiones regulares (RegExp) implementadas en Dart para la validación]`

```dart
// Ejemplo o código de validación RegExp
// [Código de validación aquí]
```

---

## 📸 Evidencias de Funcionamiento

### Captura 1: Formulario Inválido
*Formulario vacío o con datos erróneos mostrando los mensajes de validación nativos activos debajo de los campos de texto.*

![Captura 1 - Formulario con Errores]([Enlace o ruta a la Captura 1])

### Captura 2: Formulario Válido (Simulación de Envío)
*Formulario con datos correctamente ingresados y el botón en estado de carga o deshabilitado simulando el envío.*

![Captura 2 - Formulario Válido y Cargando]([Enlace o ruta a la Captura 2])

---

## 🚀 Características Principales

*   **📸 Consultas Visuales:** Sube fotos de tus ejercicioss para obtener ayuda rápida sin redactar fórmulas complejas.
*   **🎮 Gamificación (Sistema XP):** Gana experiencia ayudando a otros. Sube de nivel desde *Novato* hasta *Mentor Académico*.
*   **💬 Chat en Tiempo Real:** Comunicación instantánea con otros estudiantes a través de WebSockets.
*   **🛡️ Moderación Anti-Monetización:** Filtros NLP y detección de QRs para mantener la red 100% colaborativa y libre de cobros externos.
*   **📅 Integración Académica:** Sincronización con Jitsi Meet para tutorías programadas y videollamadas directas.
*   **⭐ Reputación Dinámica:** Sistema de validación de respuestas basado en la comunidad.

---

## 🛠️ Stack Tecnológico

La plataforma utiliza una arquitectura moderna y escalable:

| Capa | Tecnología |
| :--- | :--- |
| **Frontend Mobile** | [React Native (Expo)](https://reactnative.dev/) |
| **Backend API** | [FastAPI (Python 3.10+)](https://fastapi.tiangolo.com/) |
| **Base de Datos** | [PostgreSQL](https://www.postgresql.org/) + [SQLAlchemy](https://www.sqlalchemy.org/) |
| **Real-time & Auth** | [Firebase](https://firebase.google.com/) (Firestore, Auth, Cloud Messaging) |
| **Despliegue** | [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) |

---

## 📊 Estado del Proyecto (Sprint 1)

| Funcionalidad | Estado |
| :--- | :---: |
| Autenticación Institucional (Google) | ✅ |
| Feed de Dudas (Publicación y Filtros) | ✅ |
| Perfil de Usuario y Rangos XP | ✅ |
| Chat Privado (WebSockets) | ✅ |
| Lógica de Créditos y Recompensas | ✅ |

---

## ⚙️ Configuración Rápida

### Backend
1. Navega a `backend/`.
2. Configura tu `.env` (usa `.env.example` como guía).
3. Levanta los servicios: `docker-compose up --build`.

### Mobile
1. Navega a `mobile/`.
2. Instala dependencias: `npm install`.
3. Inicia el proyecto: `npx expo start`.

---

## 📄 Documentación Adicional
Para más detalles sobre las reglas de negocio, sistema de XP y roadmap completo, consulta la [Documentación Maestra](file:///DOCUMENTACION_PROYECTO.md).

---
© 2026 - Proyecto de Móviles II - UPT

