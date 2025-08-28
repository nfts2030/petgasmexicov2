<?php
// Test email sending with detailed debugging
require './api/PHPMailer/src/Exception.php';
require './api/PHPMailer/src/PHPMailer.php';
require './api/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    // Enable verbose debug output
    $mail->SMTPDebug = 3;
    $mail->Debugoutput = 'html';

    // Server settings
    $mail->isSMTP();
    $mail->Host = 'mail.petgas.com.mx';
    $mail->SMTPAuth = true;
    $mail->Username = 'contacto@petgas.com.mx';
    $mail->Password = 'NyeaR[QcW;tP';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    // Recipients
    $mail->setFrom('contacto@petgas.com.mx', 'PETGAS Web');
    $mail->addAddress('contacto@petgas.com.mx', 'Contacto PETGAS');

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Test Email from Contact Form';
    $mail->Body = '<h1>Test Email</h1><p>This is a test email from the contact form.</p>';

    echo "Attempting to send email...\n";
    
    // Send email
    if ($mail->send()) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}\n";
    echo "Exception: " . $e->getMessage() . "\n";
}
?>