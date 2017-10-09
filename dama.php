<?php

function dama()
{
    $damaUrl = 'http://api.ruokuai.com/create.json';
    $filename = 'test.jpg';	//img.jpg是测试用的打码图片，4位的字母数字混合码,windows下的PHP环境这里需要填写完整路径
    $ch = curl_init();
    $postFields = array('username' => '15724703695',
        'password' => '304237361',
        'typeid' => 3040,	//4位的字母数字混合码   类型表http://www.ruokuai.com/pricelist.aspx
        'timeout' => 60,	//中文以及选择题类型需要设置更高的超时时间建议90以上
        'softid' => 90052,	//改成你自己的
        'softkey' => '8e07b52793f8462f96bf879c252f1905',	//改成你自己的
        'image' => new CURLFILE($filename)
    );

    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_URL,$damaUrl);
    curl_setopt($ch, CURLOPT_TIMEOUT, 65);	//设置本机的post请求超时时间，如果timeout参数设置60 这里至少设置65
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);

    $result = curl_exec($ch);

    curl_close($ch);
    return json_decode($result,true);
}

