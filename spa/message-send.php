<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Gunner - Enviar Mensajes</title>
    </head>
     <body>
     	<?php
			$from = 'gunner@gunnerband.com';
			$emails=array(
				'geer'=>'geer@gunnerband.com', 
				'roxx'=>'roxx@gunnerband.com', 
				'mark'=>'mark@gunnerband.com', 
				'izzy'=>'izzy@gunnerband.com', 
				'pyper'=>'pyper@gunnerband.com');
				
			$nombre = $_POST['name'];
			$mail = $_POST['email'];
			$header = 'From: ' . $from . " \r\n";
			$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
			$header .= "Mime-Version: 1.0 \r\n";
			$header .= "Content-Type: text/plain";
			$mensaje = "Este mensaje fue enviado por " . $nombre . " \r\n";
			$mensaje .= "Su e-mail es: " . $mail . " \r\n";
			$mensaje .= "Mensaje: " . $_POST['body'] . " \r\n";
			$mensaje .= "Enviado el " . date('d/m/Y', time());
			$para = $emails[$_POST['to']];
			$asunto= 'Contacto desde la web';
			if (mail($para, $asunto, utf8_decode($mensaje), $header)) header('Location: contacts.html?success=true');
			else header('Location: contacts.html?success=false');
		?>
    </body>
</html>