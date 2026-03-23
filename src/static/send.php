<?php 
// ОТПРАВКА В ТЕЛЕГРАММ
// ==================================================================================================================
   $site = 'Ханская Усадьба';
   $name = $_POST['name'];
   $phone = $_POST['phone'];
  
// ОТПРАВКА НА ПОЧТУ
// ==================================================================================================================
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Формирование самого письма
$title = "Заявка с сайта Ханская Усадьба";
$body = "
<b>Имя:</b> $name<br>
<b>Телефон:</b> $phone<br>
";
// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    $mail->Host       = 'smtp.mail.ru'; 
    $mail->Username   = 'sitesendad@mail.ru'; 
    // 
    $mail->Password   = 'QQf68M1L8aw0hTdcWk9o';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('sitesendad@mail.ru', 'Ханская Усадьба'); 
    // Получатель письма
    // $mail->addAddress('danikoktysyk@gmail.com');  
    $mail->addAddress('lead@han-usadba.ru'); 
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}



// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
?>



<!-- 
// ОТПРАВКА В БИТРИКС
// ==================================================================================================================
  // формируем URL, на который будем отправлять запрос в битрикс24
	$queryURL = "https://vitamingarden.bitrix24.ru/rest/170/ipajrteundmoc6n1/crm.lead.add.json";	

  //собираем данные из формы
  $sPhone = htmlspecialchars($_POST["PHONE"]);
  $sName = htmlspecialchars($_POST["NAME"]);
  $sLastName = htmlspecialchars($_POST["LAST_NAME"]);
  $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'MOBILE')) : array();
	
	// формируем параметры для создания лида	
	$queryData = http_build_query(array(
		"fields" => array(
      "TITLE" => "Заявка с сайта GARDEN-CTM,\nТелефон: $phone,\n Имя: $name", // имя сайта
			"NAME" => $name,	// имя
			"PHONE" => Array(
        "n0" => Array(
          "VALUE" => $phone,      // телефон
          "VALUE_TYPE" => "WORK",
        ),
      ),
      "EMAIL" => Array(
        "n0" => Array(
          "VALUE" => $phone,      // почта
          "VALUE_TYPE" => "WORK",
        ),
      ),
		),
		'params' => array("REGISTER_SONET_EVENT" => "Y")	// Y = произвести регистрацию события добавления лида в живой ленте. Дополнительно будет отправлено уведомление ответственному за лид.	
	));

	// отправляем запрос в Б24 и обрабатываем ответ
	$curl = curl_init();
	curl_setopt_array($curl, array(
		CURLOPT_SSL_VERIFYPEER => 0,
		CURLOPT_POST => 1,
		CURLOPT_HEADER => 0,
		CURLOPT_RETURNTRANSFER => 1,
		CURLOPT_URL => $queryURL,
		CURLOPT_POSTFIELDS => $queryData,
	));
	$result = curl_exec($curl);
	curl_close($curl);
	$result = json_decode($result,1); 
 
	// если произошла какая-то ошибка - выведем её
	if(array_key_exists('error', $result))
	{      
		die("Ошибка при сохранении лида: ".$result['error_description']);
	} -->


<!-- 

//Отправка в Telegram
  
   $token = "6175032800:AAEjE6ZY2gFttQ6RC4peVyi7mou72IHciA4";
   
   $chat_id = "-862719183";
  
   // Формирование текста сообщения
  $message = "Заявка с сайта: $site\n";
  $message .= "Имя пользователя: $name\n";
  $message .= "Телефон: $phone\n";
  // Добавьте еще необходимые поля в сообщение, если нужно
  
  // Отправка запроса в Телеграм
  $url = "https://api.telegram.org/bot$token/sendMessage";
  $data = array(
      'chat_id' => $chat_id,
      'text' => $message
  );
  
  $options = array(
      'http' => array(
          'method' => 'POST',
          'header' => "Content-Type:application/x-www-form-urlencoded\r\n",
          'content' => http_build_query($data)
      )
  );
  
  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  
  if ($result === false) {
    // Обработка ошибки
    echo "Ошибка при отправке заявки в Телеграм.";
  } else {
    // Успешная отправка
    echo "Заявка успешно отправлена в Телеграм.";
  }
 -->
