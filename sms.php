<?php
$body = $_POST['date'] ."  id".$_POST['id']. "\n" . $_POST['phone'] . "\n" . $_POST['msg'] . "\n\n";

mail("aladdin-nn@mail.ru", "sms", $body, "From: zakaz@aladdin-nn.ru");
$f = fopen('sms.txt', 'a');
fwrite($f, $body);
fclose($f);

?>