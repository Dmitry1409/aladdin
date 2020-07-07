<?php
// Check for empty fields
//if(empty($_POST['name']) ||  empty($_POST['tel']) {
//  http_response_code(500);
//  exit();
//}

$name = strip_tags(htmlspecialchars($_POST['name']));
//$email = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['tel']));
//$message = strip_tags(htmlspecialchars($_POST['message']));
$price = strip_tags(htmlspecialchars($_POST['price']));
$square = strip_tags(htmlspecialchars($_POST['square']));

// Create the email and send the message
$to = "aladdin-nn@mail.ru"; // Add your email address inbetween the "" replacing yourname@yourdomain.com - This is where the form will send a message to.
$subject = "Заказ с сайта Аладдин";
$body = "Это заказ с сайта.\n\n"."Вот детали:\n\nИмя: $name\n\nТелефон: $phone\n\nПлощадь: $square\n\nСтоимость: $price";
$header = "From: zakaz@aladdin-nn.ru"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
	

if(!mail($to, $subject, $body, $header))
  http_response_code(500);

$fd = fopen("clients.txt", 'a') or die ("не удалось открыть файл");
$n = "    ";
$phone .= $n;
$phone .= $name;
$phone .= $n;
$date= date("H.i    d.m.y");
$phone .= $date;
$phone .= "\n";
fwrite($fd, $phone);
fclose($fd);
?>
