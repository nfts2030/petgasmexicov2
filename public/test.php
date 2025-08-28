<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', '/tmp/php_test_errors.log');

// Test basic PHP functionality
echo "PHP Version: " . phpversion() . "\n";
echo "Current Directory: " . __DIR__ . "\n";
echo "Is Writable: " . (is_writable(__DIR__) ? 'Yes' : 'No') . "\n";

// Test file writing
$testFile = '/tmp/php_test_write.txt';
if (file_put_contents($testFile, 'test') !== false) {
    echo "Successfully wrote to test file\n";
    unlink($testFile);
} else {
    echo "Failed to write to test file\n";
}

// Test Composer autoloader
$autoloadPath = __DIR__ . '/../../vendor/autoload.php';
echo "Autoloader path: $autoloadPath\n";

if (file_exists($autoloadPath)) {
    echo "Autoloader file exists\n";
    require $autoloadPath;
    echo "Autoloader loaded successfully\n";
    
    // Test PHPMailer class exists
    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        echo "PHPMailer class found\n";
    } else {
        echo "PHPMailer class NOT found\n";
    }
} else {
    echo "Autoloader file does not exist\n";
    echo "Directory contents: " . print_r(scandir(dirname($autoloadPath)), true) . "\n";
}

// Test SMTP connection
$smtpHost = 'mail.petgas.com.mx';
$smtpPort = 465;
$timeout = 5; // seconds

$fp = @fsockopen($smtpHost, $smtpPort, $errno, $errstr, $timeout);
if ($fp) {
    echo "Successfully connected to $smtpHost:$smtpPort\n";
    fclose($fp);
} else {
    echo "Failed to connect to $smtpHost:$smtpPort - $errstr ($errno)\n";
}
?>
