<?php
// Enable output buffering
ob_start();

// Set error reporting to maximum
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', '/tmp/php_errors.log');

// Custom error handler to log all errors
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    $logMessage = sprintf(
        "[%s] Error %d: %s in %s on line %d\n",
        date('Y-m-d H:i:s'),
        $errno,
        $errstr,
        $errfile,
        $errline
    );
    
    // Log to file
    file_put_contents('/tmp/php_contact_errors.log', $logMessage, FILE_APPEND);
    
    // Also output to response if not already sent
    if (!headers_sent()) {
        header('Content-Type: text/plain');
        echo $logMessage;
    }
    
    // Don't execute PHP internal error handler
    return true;
});

// Log all errors that cause script termination
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== null) {
        $logMessage = sprintf(
            "[%s] FATAL ERROR: %s in %s on line %d\n",
            date('Y-m-d H:i:s'),
            $error['message'],
            $error['file'],
            $error['line']
        );
        file_put_contents('/tmp/php_contact_errors.log', $logMessage, FILE_APPEND);
    }
});

// Clear the log file at the start of each request
@file_put_contents('/tmp/php_contact_errors.log', '');

// Handle CORS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    header('Access-Control-Max-Age: 3600');
    http_response_code(204);
    exit;
}

// Function to send JSON response and exit
function sendJsonResponse($success, $message = '', $data = null) {
    // Set CORS headers for actual requests
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    
    if (!headers_sent()) {
        header('Content-Type: application/json');
    }
    
    $response = ['success' => $success];
    if (!$success) {
        $response['error'] = $message;
    } else {
        $response['message'] = $message;
    }
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    $jsonResponse = json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
    // Log the response for debugging
    logError('Sending JSON response: ' . $jsonResponse);
    
    echo $jsonResponse;
    exit;
}

// Log function
function logError($message) {
    $logFile = '/tmp/php_contact_errors.log';
    $timestamp = date('[Y-m-d H:i:s] ');
    
    // Get the calling file and line
    $backtrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2);
    $caller = $backtrace[0] ?? [];
    $callerInfo = '';
    if (isset($caller['file'], $caller['line'])) {
        $callerInfo = basename($caller['file']) . ':' . $caller['line'] . ' - ';
    }
    
    // Convert arrays/objects to string
    if (is_array($message) || is_object($message)) {
        $message = print_r($message, true);
    }
    
    $logMessage = $timestamp . $callerInfo . $message . "\n";
    
    // Write to log file with error suppression
    @file_put_contents($logFile, $logMessage, FILE_APPEND);
    
    // For debugging, also output to response if not already sent
    if (!headers_sent()) {
        // Only set content type if not already set
        if (!headers_sent() && !in_array('Content-Type', headers_list())) {
            header('Content-Type: text/plain');
        }
        echo $logMessage;
    }
}

// Log the start of the request with detailed server info
logError('=== NEW REQUEST ===');
logError('PHP Version: ' . phpversion());
logError('Server Software: ' . ($_SERVER['SERVER_SOFTWARE'] ?? 'UNKNOWN'));
logError('Request Method: ' . ($_SERVER['REQUEST_METHOD'] ?? 'UNKNOWN'));
logError('Request URI: ' . ($_SERVER['REQUEST_URI'] ?? 'UNKNOWN'));
logError('Document Root: ' . ($_SERVER['DOCUMENT_ROOT'] ?? 'UNKNOWN'));
logError('Current Directory: ' . __DIR__);
logError('Script Name: ' . ($_SERVER['SCRIPT_NAME'] ?? 'UNKNOWN'));
logError('Script Filename: ' . ($_SERVER['SCRIPT_FILENAME'] ?? 'UNKNOWN'));
logError('Is Writable: ' . (is_writable(__DIR__) ? 'Yes' : 'No'));

// Test file writing in /tmp
$testFile = '/tmp/test_write_' . time() . '.txt';
$testContent = 'Test content ' . microtime(true);
if (file_put_contents($testFile, $testContent) !== false) {
    logError('Successfully wrote to test file: ' . $testFile);
    $readContent = file_get_contents($testFile);
    logError('Read back content: ' . $readContent);
    if ($readContent === $testContent) {
        logError('File content matches what was written');
    } else {
        logError('WARNING: File content does not match what was written');
    }
    unlink($testFile);
} else {
    $lastError = error_get_last();
    logError('Failed to write to test file: ' . $testFile);
    logError('Error details: ' . print_r($lastError, true));
    logError('Directory exists: ' . (is_dir(dirname($testFile)) ? 'Yes' : 'No'));
    logError('Is writable: ' . (is_writable(dirname($testFile)) ? 'Yes' : 'No'));
}

// Test file writing in current directory
$localTestFile = __DIR__ . '/test_write_' . time() . '.txt';
if (file_put_contents($localTestFile, $testContent) !== false) {
    logError('Successfully wrote to local test file: ' . $localTestFile);
    unlink($localTestFile);
} else {
    $lastError = error_get_last();
    logError('Failed to write to local test file: ' . $localTestFile);
    logError('Error details: ' . print_r($lastError, true));
    logError('Directory exists: ' . (is_dir(dirname($localTestFile)) ? 'Yes' : 'No'));
    logError('Is writable: ' . (is_writable(dirname($localTestFile)) ? 'Yes' : 'No'));
}

// Include PHPMailer files manually
$phpmailerPath = __DIR__ . '/../../vendor/phpmailer/phpmailer';
$exceptionFile = $phpmailerPath . '/src/Exception.php';
$phpmailerFile = $phpmailerPath . '/src/PHPMailer.php';
$smtpFile = $phpmailerPath . '/src/SMTP.php';

// Log directory structure for debugging
logError('PHPMailer directory structure:');
$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator(dirname($phpmailerPath)),
    RecursiveIteratorIterator::SELF_FIRST
);

foreach ($iterator as $path) {
    if ($path->isDir()) {
        logError('Directory: ' . $path->getPathname());
    } else {
        logError('File: ' . $path->getPathname() . ' (' . filesize($path->getPathname()) . ' bytes)');
    }
}

logError('PHPMailer paths:');
logError('- Exception: ' . $exceptionFile . ' - ' . (file_exists($exceptionFile) ? 'Exists' : 'Missing'));
logError('- PHPMailer: ' . $phpmailerFile . ' - ' . (file_exists($phpmailerFile) ? 'Exists' : 'Missing'));
logError('- SMTP: ' . $smtpFile . ' - ' . (file_exists($smtpFile) ? 'Exists' : 'Missing'));

if (!file_exists($exceptionFile) || !file_exists($phpmailerFile) || !file_exists($smtpFile)) {
    logError('ERROR: One or more PHPMailer files are missing!');
    logError('Directory contents: ' . print_r(scandir($phpmailerPath . '/src/PHPMailer/'), true));
    sendJsonResponse(false, 'Server configuration error: Missing required files');
}

require_once $exceptionFile;
require_once $phpmailerFile;
require_once $smtpFile;

// Use PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

logError('PHPMailer classes loaded successfully');

// Configuración de entorno
$environment = 'development'; // Cambiar a 'production' en producción

// Configuración de errores según el entorno
if ($environment === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    ini_set('log_errors', 1);
    $logFile = __DIR__ . '/php_errors.log';
    ini_set('error_log', $logFile);
    
    // Asegurarse de que el archivo de registro sea escribible
    if (!is_writable(dirname($logFile))) {
        die('El directorio de logs no tiene permisos de escritura: ' . dirname($logFile));
    }
    
    // Función para registrar errores
    function logError($message) {
        $logFile = __DIR__ . '/php_errors.log';
        $timestamp = date('[Y-m-d H:i:s] ');
        $logMessage = $timestamp . $message . "\n";
        
        // Imprimir también en la salida para depuración
        if (php_sapi_name() !== 'cli') {
            header('Content-Type: text/plain');
        }
        echo $logMessage;
        
        // Escribir en el archivo de registro
        file_put_contents($logFile, $logMessage, FILE_APPEND);
    }
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
    ini_set('log_errors', 0);
    
    function logError($message) {
        $logFile = __DIR__ . '/php_errors.log';
        file_put_contents($logFile, date('[Y-m-d H:i:s] ') . $message . "\n", FILE_APPEND);
    }
}

// Registrar el inicio de la solicitud
logError('Inicio de la solicitud: ' . $_SERVER['REQUEST_METHOD'] . ' ' . ($_SERVER['REQUEST_URI'] ?? '') . ' - PHP: ' . phpversion());

// Verificar si se puede escribir en el directorio
logError('Directorio actual: ' . __DIR__);
logError('¿Es escribible?: ' . (is_writable(__DIR__) ? 'Sí' : 'No'));

// Verificar si se pueden crear archivos
$testFile = __DIR__ . '/test_write.txt';
if (file_put_contents($testFile, 'test') !== false) {
    logError('Se pudo escribir en el archivo de prueba');
    unlink($testFile);
} else {
    logError('NO se pudo escribir en el archivo de prueba');
}

// Configuración del servidor SMTP
$smtpConfig = [
    'host' => 'mail.petgas.com.mx',
    'port' => 465,
    'username' => 'contacto@petgas.com.mx',
    'password' => 'TuContraseña',
    'from_email' => 'contacto@petgas.com.mx',
    'from_name' => 'Petgas Contacto',
    'to_email' => 'contacto@petgas.com.mx',
    'to_name' => 'Equipo Petgas'
];

// Configuración de CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Access-Control-Max-Age: 3600');

// Manejar solicitud OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Función para enviar respuestas JSON
function sendJsonResponse($success, $data = null, $statusCode = 200) {
    http_response_code($statusCode);
    
    $response = ['success' => $success];
    if ($success) {
        $response['message'] = $data;
    } else {
        $response['error'] = $data;
    }
    
    echo json_encode($response);
    exit();
}

// Si es una petición POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Obtener datos del POST
        $input = [];
        if (!empty($_POST)) {
            $input = $_POST;
        } else {
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Formato JSON inválido');
            }
        }

        // Validar campos requeridos
        $required = ['name', 'email', 'message'];
        $missing = [];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                $missing[] = $field;
            }
        }

        if (!empty($missing)) {
            sendJsonResponse(false, 'Faltan campos requeridos: ' . implode(', ', $missing), 400);
        }

        // Validar email
        if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            sendJsonResponse(false, 'El correo electrónico no es válido', 400);
        }

        // Validar política de privacidad
        if (empty($input['privacy']) || $input['privacy'] !== '1') {
            sendJsonResponse(false, 'Debes aceptar la política de privacidad', 400);
        }

        // Crear una nueva instancia de PHPMailer
        $mail = new PHPMailer(true);

        try {
            // Configuración del servidor SMTP
            $mail->isSMTP();
            $mail->Host = $smtpConfig['host'];
            $mail->SMTPAuth = true;
            $mail->Username = $smtpConfig['username'];
            $mail->Password = $smtpConfig['password'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = $smtpConfig['port'];
            $mail->CharSet = 'UTF-8';
            
            // Configurar remitente y destinatario
            $mail->setFrom($smtpConfig['from_email'], $smtpConfig['from_name']);
            $mail->addAddress($smtpConfig['to_email'], $smtpConfig['to_name']);
            
            // Configurar respuesta al remitente
            $mail->addReplyTo($input['email'], $input['name']);
            
            // Asunto
            $subject = 'Nuevo mensaje de contacto' . (!empty($input['subject']) ? ': ' . $input['subject'] : '');
            $mail->Subject = $subject;
            
            // Cuerpo del mensaje en formato HTML
            $message = "
            <html>
            <head>
                <title>Nuevo mensaje de contacto</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #f8f9fa; padding: 15px; border-bottom: 1px solid #e9ecef; }
                    .content { padding: 20px 15px; }
                    .footer { margin-top: 20px; padding-top: 15px; border-top: 1px solid #e9ecef; font-size: 0.9em; color: #6c757d; }
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <h2>Nuevo mensaje de contacto</h2>
                    </div>
                    <div class='content'>
                        <p><strong>Nombre:</strong> " . htmlspecialchars($input['name']) . "</p>
                        <p><strong>Email:</strong> " . htmlspecialchars($input['email']) . "</p>
                        <p><strong>Teléfono:</strong> " . (!empty($input['phone']) ? htmlspecialchars($input['phone']) : 'No proporcionado') . "</p>
                        <p><strong>Asunto:</strong> " . (!empty($input['subject']) ? htmlspecialchars($input['subject']) : 'No especificado') . "</p>
                        <p><strong>Mensaje:</strong></p>
                        <p>" . nl2br(htmlspecialchars($input['message'])) . "</p>
                    </div>
                    <div class='footer'>
                        <p>Este mensaje fue enviado desde el formulario de contacto del sitio web de Petgas.</p>
                    </div>
                </div>
            </body>
            </html>";
            
            $mail->isHTML(true);
            $mail->Body = $message;
            
            // Versión alternativa en texto plano
            $mail->AltBody = "Nuevo mensaje de contacto\n\n" .
                           "Nombre: " . $input['name'] . "\n" .
                           "Email: " . $input['email'] . "\n" .
                           "Teléfono: " . (!empty($input['phone']) ? $input['phone'] : 'No proporcionado') . "\n" .
                           "Asunto: " . (!empty($input['subject']) ? $input['subject'] : 'No especificado') . "\n\n" .
                           "Mensaje:\n" . $input['message'] . "\n\n" .
                           "---\n" .
                           "Este mensaje fue enviado desde el formulario de contacto del sitio web de Petgas.";
            
            // Enviar el correo
            $mail->send();
            
            // Registrar el envío exitoso
            error_log("Correo enviado exitosamente a: " . $smtpConfig['to_email']);
            
            // Enviar respuesta de éxito
            sendJsonResponse(true, '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            
        } catch (Exception $e) {
            error_log('Error al enviar el correo: ' . $mail->ErrorInfo);
            throw new Exception('No se pudo enviar el mensaje. Error: ' . $mail->ErrorInfo);
        }
        
    } catch (Exception $e) {
        error_log('Error en el formulario de contacto: ' . $e->getMessage());
        sendJsonResponse(false, 'Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.', 500);
    }
} else {
    sendJsonResponse(false, 'Método no permitido', 405);
}
?>
