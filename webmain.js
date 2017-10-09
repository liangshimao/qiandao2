//公用js 提供登录 ，登出 初始接口调用
var httpurl="http://hg.wot.kongzhong.com/";
//var httpurl = "http://test.kongzhong.com:8080/WotArmyFeats/";//测试用


function changeImg() {
    $("#verifyImg").attr("src", httpurl + "verifyCode?" + Math.random());
}

function logout() {
    $.ajax({
        url : httpurl + "login",
        type : "post",
        dataType : "jsonp",
        data : {
            op : "loginOut"
        },
        jsonp : "jsonpcallback",
        success : function(json) {
            $("#lbt").show();
            $("#lbo").hide();
            $("#nickName").html("");
            $("#zoneName").html("");
            $("#loginState").val("0")
            window.location.href="index.html";
        }

    });
    $("#beaft").val("");
    $("#bpaft").val("");
}

function showLoginMsg(msg){
    $("#logmsg").html(msg);
}

//根据提供的编号查看是否已经登录，如果没有登录自动跳转到第一页，否则不进行自动跳转
function toWbe(webNum){
    var loginState = $("#loginState").val();
    var nowWebNum=$("#webNum").val();
    if(webNum==5){
        window.open("http://wot.kongzhong.com/ztm/GQ2017/index.html");
        return;
    }
    if (loginState == 0) {

        if(nowWebNum==1){
            //第一页
            closeDiv();// 关闭全部弹出层
            showLoginDiv();// 弹出登录层
            return;
        }else{
            //不是第一页 跳转到第一页
            window.location.href="index.html";
            return;
        }
    }
    if(webNum==1){
        window.location.href="index.html";

    }else if(webNum==2){
        window.location.href="userCenter.html";
    }else if(webNum==3){
        window.location.href="getWelfare.html";
    }else if(webNum==4){
        window.location.href="exchangeRewards.html";
    }
}



function login(type) {
    var loginName = $("#zH").val();
    var password = $("#mM").val();
    var verifyCode = $("#yzM").val();
    var dataType=$("#dataType").val();
    var zid=$("#sel-ed").val();
    if (type == '1' && loginName == "") {
        showLoginMsg("请输入用户名。");
        return ;
    }

    if (type == '1' && password == "") {
        showLoginMsg("请输入密码。");
        return ;
    }
    if(type == '1' && (zid!=1500100&&zid!=1500200)){
        showLoginMsg("请选择大区。");
        return ;
    }
    if (type == '1' && verifyCode == "") {
        showLoginMsg("输入验证码。");
        return ;
    }

    if(password==null){
        password="";
    }
    $.ajax({
        url : httpurl + "login",
        type : "post",
        dataType : "jsonp",
        data : {
            op : "login",
            login : loginName,
            password : hex_md5(password),
            verifyCode : verifyCode,
            zoneId : zid,
            type : type,
            dataType :dataType
        },
        jsonp : "jsonpcallback",
        success : function(json) {
            if (json.vcode == 0) {

                // 登录成功
                $("#nickName").html(json.nickName);//20150222 问题修改

                $("#loginState").val(1);
                if(json.zoneId==1500100){
                    $("#zoneName").html("联通北方区");
                }else{
                    $("#zoneName").html("电信南方区");
                }
                $("#lbt").hide();
                $("#lbo").show();
                initUserInfo(json);
                // 关闭弹出层
                closeDiv();


            } else {


                if (type == '1') {
                    // alert("用户名密码错误请重新输入");
                    showLoginMsg(json.msg);
                    changeImg();
                }
                // 用户名密码错误
                loginerror(json,type);
            }
        }
    });
}
//只刷新页面基本信息并调用接口
function initUserInfo(json){
    loginInterface(json);
}