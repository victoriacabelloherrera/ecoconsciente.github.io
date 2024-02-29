<?php

// Incluye los archivos de PHPMailer desde la carpeta src
require 'src/PHPMailer.php';
require 'src/SMTP.php';
require 'src/Exception.php';

// Importa las clases necesarias de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

echo "El formulario y el mensaje se ha enviado correctamente.";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibe los datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $mensaje = $_POST['mensaje'];
    
    // Crea una instancia de PHPMailer
    $mail = new PHPMailer(true); // El parámetro true habilita las excepciones en PHPMailer

    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';  // Puedes usar el host de tu proveedor de correo electrónico
        $mail->SMTPAuth = true;
        $mail->Username = 'vcabelloherrera@gmail.com'; // Tu dirección de correo electrónico
        $mail->Password = 'dyhxdlexpxjatrjm';           // Contraseña de tu correo electrónico
        $mail->SMTPSecure = 'tls';      // Puedes usar 'ssl' si tu servidor lo requiere
        $mail->Port = 587;              // Puerto SMTP

        // Destinatario y asunto
        $mail->setFrom($email, $nombre); // Email y nombre del remitente
        $mail->addAddress('vcabelloherrera@gmail.com'); // Email del destinatario
        $mail->Subject = 'Mensaje de contacto desde tu sitio web';

        // Cuerpo del mensaje
        $mail->Body = "Nombre: $nombre\nEmail: $email\nMensaje:\n$mensaje";

        // Enviar el correo electrónico
        $mail->send();
        
        echo '<br><a href="index.html">Volver al formulario de contacto</a>';
        
    } catch (Exception $e) {
        echo "Hubo un error al enviar el mensaje: {$mail->ErrorInfo}";
    }
}
?>
