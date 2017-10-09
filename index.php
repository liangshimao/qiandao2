<?php

require_once 'function.php';
require_once 'constant.php';
require_once 'dama.php';
header('Content-Type: text/html; charset=utf-8');
//$string = file_get_contents('zhanghao.txt');
//$array = explode('\n',$string);
//var_dump($array);die;

$begin = 1618;

$fp = fopen('2000zhanghao.txt','r');
$n = 1;
while (!feof($fp))
{
    $loginError = 0;
    $line = fgets($fp);
    echo '第'.$n.'条数据,';
    if($n < $begin) continue;
    $userArray = explode('----',trim($line));
    if(count($userArray) != 5){
        continue;
    }
    echo '账号'.$userArray[0].'密码'.$userArray[1].',正在登录.....';
    echo "\n";

    //获取验证码
    do{
        do{
            $verifyResult = getVerify();
        }while(!$verifyResult);

        $ver = dama();

        if(!empty($ver['Result'])){
            $loginResult = login($userArray[0],$userArray[1],$ver['Result']);
            if($loginResult['vcode'] == '0'){
                echo '登录成功，正在领取！.....';
                echo "\n";
            }else{
                echo '登录失败，正在重新登录！......';
                echo "\n";
                $loginError++;
            }
        }else{
            echo '若快服务器错误！';
            break;die;
        }
    }while((!isset($loginResult['vcode']) || $loginResult['vcode'] != '0') && $loginError < 10);

//    $r = getPrize();
//    echo '领取结果：';
//    echo($r['msg']);
//    echo "\n";
    $n++;

}
fclose($fp);
echo '所有账号已经都运行！';




