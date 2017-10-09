<?php
/**
 * Created by PhpStorm.
 * User: zh4
 * Date: 2017/10/5
 * Time: 16:23
 */

//function getCookie($url)
//{
//
//    $ch = curl_init($url); //初始化
//    curl_setopt($ch, CURLOPT_HEADER, 1); //不返回header部分
//    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //返回字符串，而非直接输出
//    curl_setopt($ch, CURLOPT_COOKIEJAR, COOKIE_FILE); //存储cookies
//    curl_setopt($ch, CURLOPT_HTTPHEADER, [
//        'Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//        'Accept-Encoding:gzip, deflate, sdch',
//        'Accept-Language:zh-CN,zh;q=0.8',
//        'Cache-Control:max-age=0',
//        'Host:wot.kongzhong.com',
//        'User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
//    ]);
//    $content = curl_exec($ch);
//    curl_close($ch);
//    return $content;
//}

function getVerify()
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, VERIFY_URL .'?'. randFloat());
    curl_setopt($ch, CURLOPT_HEADER, 0); //不返回header部分
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_COOKIEJAR, COOKIE_FILE); //存储cookies
    curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE); //存储cookies
    curl_setopt($ch, CURLOPT_TIMEOUT, 10); //存储cookies
    $result = curl_exec($ch);
    curl_close($ch);
    if(empty($result)){
        return false;
    }
    $filename = 'test.jpg';
    $fp= fopen($filename,"w"); //将文件绑定到流
    fwrite($fp,$result); //写入文件
    return true;

}

function login($user,$pass,$verify)
{
    $params = [
        'jsonpcallback' => 'jQuery183022437245576281017_1507190952630',
        'op' => 'login',
        'login' => $user,
        'password' => $pass,
        'verifyCode' => $verify,
        'zoneId' => '1500200',
        'type' => '1',
        '_' => time()*1000,
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, LOGIN_URL.'?'.http_build_query($params));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_COOKIEJAR, COOKIE_FILE); //存储cookies
    curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE); //存储cookies
    curl_setopt($ch, CURLOPT_TIMEOUT, 10); //存储cookies
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Host:hg.wot.kongzhong.com',
        'Referer:http://wot.kongzhong.com/ztm/warhonor/index.html'
    ]);
    $result = curl_exec($ch);
    curl_close($ch);
    return getJsonResult($result);

}

function getPrize()
{
    $params = [
        'jsonpcallback' => 'jQuery183022437245576281017_1507190952630',
        'op' => 'getPrizes',
        '_' => time()*1000,
    ];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, PRIZE_URL.'?'.http_build_query($params));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_COOKIEJAR, COOKIE_FILE); //存储cookies
    curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE); //存储cookies
    curl_setopt($ch, CURLOPT_TIMEOUT, 10); //存储cookies
    $result = curl_exec($ch);
    curl_close($ch);
    return getJsonResult($result);
}

//function get($url)
//{
//    $ch = curl_init();
//    curl_setopt($ch, CURLOPT_URL, $url);
//    curl_setopt($ch, CURLOPT_HEADER, 0); //不返回header部分
//    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//    $result = curl_exec($ch);
//    curl_close($ch);
//    var_dump($result);
//    return $result;
//    //return getJsonResult($result);
//
//}
//
//function post($url,$param = [])
//{
//    $ch = curl_init();
//    curl_setopt($ch, CURLOPT_URL, $url);
//    curl_setopt($ch, CURLOPT_HEADER, 0); //不返回header部分
//    curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
//    $result = curl_exec($ch);
//    curl_close($ch);
//    return $result;
//}

function getJsonResult($string)
{
    $left = strpos($string,'(');
    $right = strrpos($string,')');
    $result = substr($string,$left+1,$right-$left-1);
    return json_decode($result,true);
}

function randFloat($min=0, $max=1){
    return $min + mt_rand()/mt_getrandmax() * ($max-$min);
}