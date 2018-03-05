<?php
// читать json файл
// $json = file_get_contents('../goods.json');
// $json = json_decode($json, true);

//письмо
$message = '';
// $message .= '<h1>Зворотній звязок</h1>';
$message .='<p>Імя: '.$_POST['enameform'].'</p>';
$message .='<p>Телефон: '.$_POST['ephoneform'].'</p>';
$message .='<p>Пошта: '.$_POST['emailform'].'</p>';
$message .='<p>Повідомлення: '.$_POST['etextform'].'</p>';
// $message .='<p>Номер відділення: '.$_POST['epost'].'</p>';
// $message .='<p>Текст повідомлення: '.$_POST['etext'].'</p>';

// $cart = $_POST['cart'];
// $sum = 0;
// foreach ($cart as $id=>$count) {
//     $message .=$json[$id]['name'].' --- ';
//     $message .=$count.' --- ';
//     $message .=$count*$json[$id]['cost'];
//     $message .='<br>';
//     $sum = $sum +$count*$json[$id]['cost'];
// }
// $message .='Всего: '.$sum;

//print_r($message);

$to = 'dimka0somik@gmail.com'.','; //не забудь поменять!
// $to .=$_POST['email'];
$spectext = '<!DOCTYPE HTML><html><head><title>Заказ</title></head><body>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: mamyna_kv <mamyna_kv@gmail.com>';
$m = mail($to, 'Зворотній звязок', $spectext.$message.'</body></html>', $headers);

if ($m) {echo 1;} else {echo 0;}
