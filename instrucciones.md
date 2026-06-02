EXAMEN UNIDAD II
Curso: Desarrollo de Aplicaciones Móviles II (Móviles II)

 

1. PRESENTACIÓN Y CONTEXTO
Para esta evaluación, el estudiante trabajará de manera individual sobre el código fuente de la aplicación móvil que viene desarrollando junto a su equipo de proyecto final. La solución planteada debe acoplarse de forma nativa a la interfaz y flujo actual del proyecto base, asegurando que compila y se ejecuta localmente antes de iniciar el examen.

2. HISTORIA DE USUARIO Y CRITERIOS DE ACEPTACIÓN
 
Historia de Usuario
Como usuario de la aplicación móvil,

Quiero que la aplicación valide de forma estricta y en tiempo real los datos que ingreso en los formularios,

Para evitar errores de formato, asegurar la robustez de mis datos y prevenir fallos en el sistema antes de que la información sea procesada.

Criterios de Aceptación (CA)
CA1 - Validación Dinámica con FormState:

Se debe implementar o reestructurar un formulario existente (registro, login, perfil, inserción de datos, etc.) utilizando obligatoriamente los widgets nativos Form, GlobalKey<FormState> y TextFormField.

Las validaciones no deben mostrarse en cuadros de diálogo emergentes; deben renderizarse como texto de error nativo de color rojo directamente debajo de cada campo de texto correspondiente, activándose únicamente al presionar el botón de envío mediante la llamada a _formKey.currentState!.validate().

CA2 - Aplicación de RegEx Avanzado:

Al menos dos (2) campos del formulario elegido deben validarse de manera estricta utilizando expresiones regulares (RegExp) en Dart.

Campo 1 (Correo Electrónico): Debe exigir un formato estándar válido de correo electrónico (ej. usuario@dominio.com) utilizando una expresión regular precisa.

Campo 2 (Contraseña o Identificación Especial):

Si es contraseña: Debe exigir un mínimo de 8 caracteres, al menos una letra mayúscula, una letra minúscula y un número.

Si es DNI/Teléfono/RUC: Debe validar que contenga únicamente caracteres numéricos y posea la longitud exacta oficial de su región (ej. 8 dígitos para DNI, 9 para celular, etc.).

CA3 - Experiencia de Usuario (UX) en la Entrada de Datos:

Cada campo de entrada de texto del formulario debe utilizar el tipo de teclado virtual óptimo para el usuario empleando la propiedad keyboardType (ej. TextInputType.emailAddress, TextInputType.number, TextInputType.visiblePassword, etc.).

Si se trata de un campo de contraseña, este debe ocultar los caracteres de manera dinámica utilizando la propiedad obscureText (se valora positivamente añadir un botón tipo "ojo" para alternar la visibilidad).

El botón de procesamiento/envío del formulario debe cambiar visualmente de estado inmediatamente después de que la validación sea exitosa. Durante 2 segundos, el botón debe deshabilitarse o mostrar un widget indicador de carga (CircularProgressIndicator o similar) simular la conexión/registro de datos, para luego retornar a su estado normal.

3. INSTRUCCIONES DEL PROCESO DE EVALUACIÓN
Fase 1: Creación del Repositorio en GitHub
Acceda a su cuenta personal de GitHub y cree un nuevo repositorio público.

El nombre exacto del repositorio debe ser: SM2_EXAMEN_VALIDACIONES.

Inicialice el repositorio agregando un archivo README.md base.

Fase 2: Implementación y Control de Versiones
Modifique o construya la pantalla del formulario en Flutter siguiendo los Criterios de Aceptación (CA1, CA2 y CA3).

Deberá realizar un mínimo de tres (3) commits significativos durante el transcurso de la hora y media para validar la autoría y el avance progresivo en el examen (ej. feat: Formulario estructurado, feat: RegExp y validaciones completadas, style: UX, inputs y simulación de envío).

Fase 3: Documentación obligatoria (README.md)
El archivo README.md del repositorio debe estar estructurado de la siguiente forma:

Información General: Nombre del curso, Nombre completo del alumno, Código de estudiante, Fecha y la URL del repositorio público.

Detalle de la Implementación: Explicación técnica de la pantalla seleccionada y las expresiones regulares (RegExp) implementadas en Dart para la validación.

Evidencias de Funcionamiento (Capturas o GIFs):

Captura 1: Formulario vacío o con datos erróneos mostrando los mensajes de validación nativos activos debajo de los campos de texto.

Captura 2: Formulario con datos correctamente ingresados y el botón en estado de carga o deshabilitado simulando el envío.