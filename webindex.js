$(function() {

    $("#loginbef").show();
    $("#loginaft").hide();



    login(0);
    changeImg();
});

function loginInterface(json){
    initUserEntry();
}
//领取可以领取的奖品
function getMissionPrizes(){
    $("#maskLayer,#alertInfo").remove();
    var loginState = $("#loginState").val();
    if (loginState == 0) {
        closeDiv();// 关闭全部弹出层
        showLoginDiv();// 弹出登录层
        return;
    }
    ////
    $.ajax({
        url : httpurl + "mission",
        type : "post",
        dataType : "jsonp",
        data : {
            op : "getPrizes"
        },
        jsonp : "jsonpcallback",
        success : function(json) {
            if(json.vcode==0){
                //领取成功清空记录
                cacheentry={};
                initUserEntry();
            }
            showMsgDiv(json.msg);
        }

    });



}
var cacheentry={};
//
function initUserEntry(){
    $.ajax({
        url : httpurl + "user",
        type : "post",
        dataType : "jsonp",
        data : {
            op : "getUserEntry"
        },
        jsonp : "jsonpcallback",
        success : function(json) {
            //用户任务中心的流水日志
            cacheentry=json;
        }

    });
}
function showMessionEntry(){
    var loginState = $("#loginState").val();
    if (loginState == 0) {
        closeDiv();// 关闭全部弹出层
        showLoginDiv();// 弹出登录层
        return;
    }
    if(cacheentry=={}){
        showMsgDiv("数据加载中请稍等。");
        return;
    }
    eval("var entry = cacheentry.missionEntry");
    //<p>可领取物品</p>
    //
    var pstr="<table>";
    pstr+="<tr><td style='width: 420px;' >活动名称</td><td style='width: 400px;'>奖励内容</td><tr>"
    var mst="";
    for(var loop=0;loop<entry.length;loop++){
        if("未领取"==entry[loop].d){
            mst+="<tr><td style='width: 420px;' >"+entry[loop].b+"</td><td style='width: 400px;'>"+entry[loop].c+"</td><tr>";
        }
    }

    if(mst==""){
        showMsgDiv("没有可以领取的奖品。");
        return;
    }
    pstr+=mst;
    pstr+="</table>";

    var htmlstr="<div class='getAllInfo'>"
        +" <h4>可领取物品</h4>"
        +" <div class='getAllContent'><div class='contP'>"
        +pstr
        +" </div></div>"
        +" <div class='getAllBtn'><a href='javascript:getMissionPrizes();'>一键领取</a><a href='javascript:closeDiv();'>取消</a></div>"
        +"</div>";
    showInfo(htmlstr);
    $("#alertInfo").addClass("getAll").find(".getAllContent").jScrollPane();
}
function loginerror(json,type){

}
