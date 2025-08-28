# Cómo Implementar un Formulario de Contacto Funcional en Otras Aplicaciones

## Resumen

Este documento explica cómo replicar la implementación exitosa del formulario de contacto que hemos creado. La solución incluye validación, almacenamiento de datos, envío de correos electrónicos con métodos de respaldo y una interfaz de usuario completa.

## Arquitectura de la Solución

### Componentes Frontend (React/TypeScript)
1. **Componente de Formulario** - Interfaz de usuario con validación
2. **Servicio de Contacto** - Maneja la comunicación con el backend
3. **Gestión de Estado** - Manejo de datos del formulario y estados de carga
4. **Mensajes de Usuario** - Feedback visual para éxito/errores

### Componentes Backend (PHP)
1. **Endpoint de Contacto** - Procesa las solicitudes del formulario
2. **Validación de Datos** - Limpieza y verificación de entradas
3. **Envío de Correos** - Múltiples métodos con respaldo
4. **Almacenamiento de Datos** - Guarda envíos en archivos JSON

## Paso 1: Crear el Componente Frontend

### 1.1 Estructura del Formulario
```tsx
// ContactForm.tsx
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy: boolean;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ show: boolean; success: boolean; message: string }>({ 
    show: false, 
    success: false, 
    message: '' 
  });

  // Funciones de manejo de cambios y envío
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    } as FormData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showAlert('Por favor, completa todos los campos requeridos.', false);
      return;
    }
    
    if (!formData.privacy) {
      showAlert('Debes aceptar la política de privacidad.', false);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await submitContactForm(formData);
      showAlert(response.message, true);
      
      // Limpiar formulario en caso de éxito
      if (response.success) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          privacy: false
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al enviar el mensaje';
      showAlert(errorMessage, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showAlert = (message: string, success: boolean) => {
    setSubmitStatus({
      show: true,
      success,
      message
    });
    
    // Ocultar alerta después de 5 segundos
    setTimeout(() => {
      setSubmitStatus(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
      <div>
        <label htmlFor="name">Nombre Completo *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <label htmlFor="email">Correo Electrónico *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <label htmlFor="phone">Teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <label htmlFor="subject">Asunto *</label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        >
          <option value="">Selecciona un asunto</option>
          <option value="consulta">Consulta General</option>
          <option value="soporte">Soporte Técnico</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message">Mensaje *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          rows={5}
        ></textarea>
      </div>
      
      <div>
        <input
          type="checkbox"
          id="privacy"
          name="privacy"
          checked={formData.privacy}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
        <label htmlFor="privacy">Acepto la política de privacidad *</label>
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
      
      {/* Mostrar mensajes de estado */}
      {submitStatus.show && (
        <div className={submitStatus.success ? 'success-message' : 'error-message'}>
          {submitStatus.message}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
```

### 1.2 Servicio de Contacto
```ts
// contactService.ts
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy?: boolean;
}

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    // Crear datos del formulario
    const body = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      subject: formData.subject,
      message: formData.message,
      privacy: formData.privacy ? '1' : '0',
    });

    // Enviar solicitud al backend
    const response = await fetch('/api/contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    // Verificar si la respuesta es OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Intentar parsear la respuesta como JSON
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      // Si falla el parseo JSON, obtener como texto
      const text = await response.text();
      throw new Error(`Respuesta inválida: ${text}`);
    }

    // Verificar si la solicitud fue exitosa
    if (!data.success) {
      throw new Error(data.message || 'Error al enviar el mensaje');
    }
    
    return { success: true, message: data.message || '¡Mensaje enviado con éxito!' };
  } catch (error) {
    console.error('Error al enviar el formulario de contacto:', error);
    
    // Proporcionar un mensaje de error más amigable
    let errorMessage = 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
    
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.';
      } else if (error.message.includes('HTTP error!')) {
        errorMessage = 'Error de conexión con el servidor. Por favor, inténtalo de nuevo más tarde.';
      } else {
        errorMessage = error.message;
      }
    }
    
    throw new Error(errorMessage);
  }
};
```

## Paso 2: Crear el Backend PHP

### 2.1 Endpoint Principal de Contacto
```php
<?php
// api/contact.php
// Habilitar reporte de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Manejar CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Manejar solicitudes preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir PHPMailer si está disponible
$mailerAvailable = false;
if (file_exists('./PHPMailer/src/Exception.php') && 
    file_exists('./PHPMailer/src/PHPMailer.php') && 
    file_exists('./PHPMailer/src/SMTP.php')) {
    require './PHPMailer/src/Exception.php';
    require './PHPMailer/src/PHPMailer.php';
    require './PHPMailer/src/SMTP.php';
    $mailerAvailable = true;
}

$response = ['success' => false, 'message' => 'Error: Datos no recibidos.'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitizar datos de entrada
    $name = isset($_POST['name']) ? trim(filter_var($_POST['name'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
    $email = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
    $phone = isset($_POST['phone']) ? trim(filter_var($_POST['phone'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
    $subject = isset($_POST['subject']) ? trim(filter_var($_POST['subject'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
    $message = isset($_POST['message']) ? trim(filter_var($_POST['message'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
    $privacy = isset($_POST['privacy']) ? filter_var($_POST['privacy'], FILTER_VALIDATE_BOOLEAN) : false;

    // Validar campos requeridos
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
      $response = ['success' => false, 'message' => 'Por favor, completa todos los campos requeridos.'];
    } elseif (!$privacy) {
      $response = ['success' => false, 'message' => 'Debes aceptar la política de privacidad.'];
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $response = ['success' => false, 'message' => 'Por favor, ingresa un correo electrónico válido.'];
    } else {
      // Guardar envío en archivo (respaldo)
      $submission = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'subject' => $subject,
        'message' => $message
      ];
      
      $json = json_encode($submission, JSON_PRETTY_PRINT);
      $filename = 'contact_submissions_' . date('Y-m-d') . '.json';
      
      // Agregar al archivo
      file_put_contents('./' . $filename, $json . ",\n", FILE_APPEND | LOCK_EX);
      
      // También guardar en un archivo único para fácil acceso
      $allSubmissions = [];
      $allSubmissionsFile = './all_contact_submissions.json';
      
      if (file_exists($allSubmissionsFile)) {
        $existingContent = file_get_contents($allSubmissionsFile);
        if (!empty($existingContent)) {
          $allSubmissions = json_decode($existingContent, true);
          if (!is_array($allSubmissions)) {
            $allSubmissions = [];
          }
        }
      }
      
      $allSubmissions[] = $submission;
      file_put_contents($allSubmissionsFile, json_encode($allSubmissions, JSON_PRETTY_PRINT));

      // Intentar enviar correo usando múltiples métodos
      $emailSent = false;
      $errorMessage = '';

      // Método 1: Intentar PHPMailer con credenciales proporcionadas
      if ($mailerAvailable) {
        try {
          $mail = new PHPMailer\PHPMailer\PHPMailer(true);

          // Configuración del servidor
          $mail->isSMTP();
          $mail->Host = 'tu-servidor-smtp.com'; // Reemplazar con tu servidor SMTP
          $mail->SMTPAuth = true;
          $mail->Username = 'tu-usuario@dominio.com'; // Reemplazar con tu usuario
          $mail->Password = 'tu-contraseña'; // Reemplazar con tu contraseña
          $mail->SMTPSecure = 'ssl'; // O 'tls' según tu configuración
          $mail->Port = 465; // O 587 según tu configuración
          $mail->CharSet = 'UTF-8';

          // Destinatarios
          $mail->setFrom('tu-usuario@dominio.com', 'Nombre de tu sitio');
          $mail->addAddress('destinatario@dominio.com', 'Nombre del destinatario');
          $mail->addReplyTo($email, $name);

          // Contenido
          $mail->isHTML(true);
          $mail->Subject = 'Nuevo mensaje de contacto: ' . $subject;
          
          // Crear cuerpo del correo
          $emailBody = "
          <html>
          <head>
              <title>Nuevo mensaje de contacto</title>
          </head>
          <body>
              <h2>Nuevo mensaje de contacto</h2>
              <p><strong>Nombre:</strong> {$name}</p>
              <p><strong>Email:</strong> {$email}</p>
              <p><strong>Teléfono:</strong> {$phone}</p>
              <p><strong>Asunto:</strong> {$subject}</p>
              <p><strong>Mensaje:</strong></p>
              <p>{$message}</p>
          </body>
          </html>
          ";
          
          $mail->Body = $emailBody;
          $mail->AltBody = "Nombre: {$name}\nEmail: {$email}\nTeléfono: {$phone}\nAsunto: {$subject}\nMensaje: {$message}";

          // Enviar correo
          if ($mail->send()) {
            $emailSent = true;
          }
        } catch (Exception $e) {
          // Registrar el error para depuración
          error_log("Error de PHPMailer: " . $e->getMessage());
          $errorMessage = $e->getMessage();
        }
      }

      // Método 2: Intentar función mail() de PHP si PHPMailer falló
      if (!$emailSent) {
        try {
          $to = 'destinatario@dominio.com'; // Reemplazar con tu destinatario
          $emailSubject = 'Nuevo mensaje de contacto: ' . $subject;
          
          $emailBody = "
          Nuevo mensaje de contacto
          
          Nombre: $name
          Email: $email
          Teléfono: $phone
          Asunto: $subject
          
          Mensaje:
          $message
          ";
          
          $headers = "From: tu-usuario@dominio.com\r\n"; // Reemplazar con tu remitente
          $headers .= "Reply-To: $email\r\n";
          $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
          
          // Intentar enviar correo usando la función mail() de PHP
          if (mail($to, $emailSubject, $emailBody, $headers)) {
            $emailSent = true;
          }
        } catch (Exception $e) {
          error_log("Error de mail() de PHP: " . $e->getMessage());
          $errorMessage = $e->getMessage();
        }
      }

      // Establecer respuesta basada en si el correo fue enviado
      if ($emailSent) {
        $response = ['success' => true, 'message' => '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.'];
      } else {
        // Incluso si el correo falla, guardamos en archivo
        $response = ['success' => true, 'message' => '¡Mensaje recibido con éxito! Nos pondremos en contacto contigo pronto.'];
      }
    }
} else {
    $response = ['success' => false, 'message' => 'Método de solicitud no válido.'];
}

// Devolver respuesta JSON
echo json_encode($response);
?>
```

### 2.2 Endpoint para Ver Envíos
```php
<?php
// api/view-submissions.php
// API endpoint para ver envíos del formulario de contacto
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $file = './all_contact_submissions.json';
    
    if (file_exists($file)) {
        $content = file_get_contents($file);
        if (!empty($content)) {
            echo $content;
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode([]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
?>
```

## Paso 3: Configuración del Servidor

### 3.1 Configuración de Vite (para desarrollo)
```js
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

### 3.2 Iniciar Servidores de Desarrollo
```bash
# Iniciar servidor PHP (puerto 8080)
php -S localhost:8080 -t api

# En otra terminal, iniciar servidor Vite (puerto 3000)
npm run dev
```

## Paso 4: Instalar Dependencias

### 4.1 Frontend
```bash
npm install
```

### 4.2 Backend (PHPMailer)
Descargar PHPMailer desde https://github.com/PHPMailer/PHPMailer o usar Composer:

```bash
composer require phpmailer/phpmailer
```

## Paso 5: Personalizar la Implementación

### 5.1 Configurar Credenciales SMTP
En `api/contact.php`, actualiza las siguientes variables:
```php
$mail->Host = 'tu-servidor-smtp.com';
$mail->Username = 'tu-usuario@dominio.com';
$mail->Password = 'tu-contraseña';
$mail->SMTPSecure = 'ssl'; // o 'tls'
$mail->Port = 465; // o 587
```

### 5.2 Configurar Destinatarios
```php
$mail->setFrom('tu-usuario@dominio.com', 'Nombre de tu sitio');
$mail->addAddress('destinatario@dominio.com', 'Nombre del destinatario');
```

### 5.3 Personalizar Mensajes
Actualiza los mensajes de éxito y error según las necesidades de tu aplicación.

## Paso 6: Pruebas

### 6.1 Prueba de Funcionalidad Básica
```bash
curl -X POST http://localhost:8080/contact.php \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Test User&email=test@example.com&subject=Test&message=This is a test&privacy=1"
```

### 6.2 Verificar Almacenamiento de Datos
```bash
cat api/all_contact_submissions.json
```

## Paso 7: Despliegue en Producción

### 7.1 Configuración del Servidor Web
Asegúrate de que tu servidor web pueda:
1. Ejecutar PHP
2. Acceder a los archivos en el directorio `api/`
3. Escribir en el directorio `api/` (para guardar envíos)

### 7.2 Configuración de Seguridad
1. Protege el directorio `api/` si es necesario
2. Implementa límites de tasa para prevenir abusos
3. Valida y sanitiza todas las entradas

### 7.3 Monitoreo
1. Verifica regularmente los archivos de envíos
2. Monitorea los logs de errores de PHP
3. Confirma que los correos se están enviando correctamente

## Características Clave de Esta Implementación

1. **Múltiples Métodos de Envío**: Intenta PHPMailer primero, luego mail() de PHP como respaldo
2. **Persistencia de Datos**: Guarda todos los envíos en archivos JSON
3. **Validación Robusta**: Verifica todos los campos requeridos y formatos
4. **Manejo de Errores**: Proporciona mensajes claros al usuario
5. **Seguridad**: Sanitiza todas las entradas del usuario
6. **Respuesta Amigable**: Interfaz de usuario con feedback visual
7. **Compatibilidad**: Funciona en la mayoría de entornos de hosting compartido

## Solución de Problemas Comunes

### Error: "SMTP Error: Could not authenticate"
1. Verifica que las credenciales SMTP sean correctas
2. Asegúrate de que el servidor SMTP esté accesible
3. Confirma que el puerto y método de encriptación sean correctos

### Error: "Failed to fetch"
1. Verifica que el servidor backend esté corriendo
2. Confirma que la configuración del proxy sea correcta
3. Asegúrate de que no haya conflictos de puertos

### Los correos no llegan
1. Revisa la carpeta de spam
2. Verifica los logs de errores del servidor
3. Confirma que el servidor tenga permisos para enviar correos

## Mejoras Adicionales Sugeridas

1. **Base de Datos**: Reemplazar almacenamiento en archivos por base de datos
2. **Validación Avanzada**: Agregar verificación de CAPTCHA
3. **Notificaciones**: Enviar confirmación automática al usuario
4. **Administración**: Crear panel de administración para ver envíos
5. **Exportación**: Agregar funcionalidad para exportar envíos a CSV/Excel
6. **Internacionalización**: Soporte para múltiples idiomas

Esta implementación proporciona una solución robusta y confiable para formularios de contacto que funcionará en la mayoría de entornos web modernos.