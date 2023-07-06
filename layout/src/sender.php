<?php
    echo 'Тест';
    $name = $_POST['name'];
    $email = $_POST['email'];
    $tel = $_POST['tel'];

    $queryURL = 'https://intelwash.bitrix24.ru/rest/302624/p6xu3d4oej517h45/crm.lead.add.json'

    $queryData = http_build_query(array(
        'fields' => array(
            'TITLE'=> 'Заявка - Лендинг2',
            'NAME' => $name,
            'EMAIL'=> Array (
                'n0' => Array (
                    'VALUE' => '$email',
                    'VALUE_TYPE' => 'WORK',
                ),
            ),
            'PHONE' => Array (
                'n0' => Array (
                    'VALUE' => '$email',
                    'VALUE_TYPE' => 'WORK',
                ),
            ),
        ),
        'params' => array('REGISTER_SONET_EVENT'=>'Y')
    ));

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_SSL_VERIFYPERR => 0,
        CURLOPT_POST => 1,
        CURLOPT_HEADER => 0,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $queryURL,
        CURLOPT_POSTFIELDS => $queryData,
    ));

    $result = curl_exec($curl);
    curl_close($curl);
    $result = json_decode($result, 1);
    if (array_key_exists('error',$result)) echo 'Ошибка при сохранении лида: '.$result['error_description'].
    "<br/>";
?>