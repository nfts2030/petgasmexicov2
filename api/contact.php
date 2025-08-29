<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Load environment variables from .env file
if (file_exists(__DIR__ . '/.env')) {
    $lines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        if (!array_key_exists($name, $_ENV)) {
            putenv("$name=$value");
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

// Handle CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include PHPMailer if available
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
    // Sanitize input data (using FILTER_SANITIZE_FULL_SPECIAL_CHARS instead of deprecated FILTER_SANITIZE_STRING)
    $name = isset($_POST['name']) ? trim(filter_var($_POST['name'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
    $email = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
    $phone = isset($_POST['phone']) ? trim(filter_var($_POST['phone'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
    $subject = isset($_POST['subject']) ? trim(filter_var($_POST['subject'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
    $message = isset($_POST['message']) ? trim(filter_var($_POST['message'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
    $privacy = isset($_POST['privacy']) ? filter_var($_POST['privacy'], FILTER_VALIDATE_BOOLEAN) : false;

    // Validate required fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $response = ['success' => false, 'message' => 'Por favor, completa todos los campos requeridos.'];
    } elseif (!$privacy) {
        $response = ['success' => false, 'message' => 'Debes aceptar la política de privacidad.'];
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response = ['success' => false, 'message' => 'Por favor, ingresa un correo electrónico válido.'];
    } else {
        // Save form submission to a file (backup)
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
        
        // Append to file
        file_put_contents('./' . $filename, $json . ",
", FILE_APPEND | LOCK_EX);
        
        // Also save to a single file for easier access
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

        // Try to send email using PHPMailer first
        if ($mailerAvailable) {
            try {
                $mail = new PHPMailer\PHPMailer\PHPMailer(true);

                // Server settings from environment variables
                $mail->isSMTP();
                $mail->Host = getenv('SMTP_HOST') ?: 'mail.petgas.com.mx';
                $mail->SMTPAuth = true;
                $mail->Username = getenv('SMTP_USERNAME') ?: 'contacto@petgas.com.mx';
                $mail->Password = getenv('SMTP_PASSWORD');
                $mail->SMTPSecure = getenv('SMTP_SECURE') ?: 'ssl';
                $mail->Port = getenv('SMTP_PORT') ?: 465;
                $mail->CharSet = 'UTF-8';
                
                // Debugging
                $mail->SMTPDebug = 2; // Enable verbose debug output
                $mail->Debugoutput = function($str, $level) {
                    error_log("PHPMailer: $str");
                };

                // Recipients
                $fromEmail = getenv('MAIL_FROM') ?: 'contacto@petgas.com.mx';
                $toEmail = getenv('MAIL_TO') ?: 'contacto@petgas.com.mx';
                $mail->setFrom($fromEmail, 'PETGAS Web');
                $mail->addAddress($toEmail, 'Contacto PETGAS');
                $mail->addReplyTo($email, $name);

                // Content
                $mail->isHTML(true);
                $mail->Subject = 'Nuevo mensaje de contacto: ' . $subject;
                
                // Create email body
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

                // Send email
                if ($mail->send()) {
                    $response = [
                        'success' => true, 
                        'sent' => true,
                        'message' => '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.'
                    ];
                } else {
                    // Email failed to send
                    error_log("Failed to send email: " . $mail->ErrorInfo);
                    $response = [
                        'success' => true, 
                        'sent' => false,
                        'stored' => true,
                        'message' => '¡Mensaje recibido! Sin embargo, hubo un problema al enviar la notificación. Hemos guardado tu mensaje y nos pondremos en contacto contigo pronto.'
                    ];
                }
            } catch (Exception $e) {
                // Log the error for debugging
                error_log("PHPMailer Error: " . $e->getMessage());
                // Even if email fails, we still saved to file
                $response = ['success' => true, 'message' => '¡Mensaje recibido con éxito! Nos pondremos en contacto contigo pronto.'];
            }
        } else {
            // If PHPMailer is not available, just save to file
            $response = ['success' => true, 'message' => '¡Mensaje recibido con éxito! Nos pondremos en contacto contigo pronto.'];
        }
    }
} else {
    $response = ['success' => false, 'message' => 'Método de solicitud no válido.'];
}

// Return JSON response
echo json_encode($response);
?>