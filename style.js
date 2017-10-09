/*wlo:Cflower*/
//
jQuery.divselect = function(divselectid,inputselectid){
    var inputselect = $(inputselectid);
    $(divselectid+" i").click(function(){
        var selC=$(this).siblings(".selC");
        if(selC.css("display")=="none"){
            selC.show();
        }else{
            selC.hide();
        }
    });
    $(divselectid+" .selC a").click(function(){
        var ZoneId=$(this).attr("value");
        var ZoneTex=$(this).html();
        $(this).addClass("selectedV").siblings().removeClass("selectedV");
        $(this).parent().siblings(".sel-ed").val(ZoneId);
        $(this).parent().siblings("i").html(ZoneTex);
        $(this).parent().hide();
    });
};

//关闭
function closeDiv(){
    $("#alertInfo").stop(true,true).animate({
        "top":"-100%",
        "opacity":"0"
    },"fast",function(){
        $("#maskLayer,#alertInfo").remove().hide();
    });
}
//遮罩
function maskLayer(){
    var maskLayer="<div id='maskLayer'></div>";
    var alertInfo="<div id='alertInfo'><span class='close'></span></div>";
    $("body").append(maskLayer,alertInfo);
    $("#maskLayer").height($(document).height()).show();
}
//显示提示信息框
function showInfo(alertHtml){
    maskLayer();
    var _winH=$(window).height();             //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┐
    var _scrollTop=$(document).scrollTop();   //　　　　　　　　　　　├→注意这2断代码的先后顺序
    $("#alertInfo").append(alertHtml).show(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┘
    var _thisDomWidth=$("#alertInfo").width()+2;
    var _thisDomHeight=$("#alertInfo").height()+2;
    var topD=parseInt(_scrollTop+(_winH-_thisDomHeight)/2);
    var mL=parseInt(_thisDomWidth/2);
    if(_thisDomHeight>=_winH){
        topD=_scrollTop;
        if(_scrollTop+_thisDomHeight>=$(document).height()){
            topD=$(document).height()-_thisDomHeight;
        }
    };
    $("#alertInfo").css({
        "margin-left":"-"+mL+"px"
    }).stop(true,true).animate({
        "top":topD+"px",
        "opacity":"1"
    },"fast");
    //console.log("点击弹层时窗口的高度："+_winH);
}
//改变窗口大小时改变弹出层的位置
function alertInfoPo(){
    var _winHResize=window.innerHeight||document.documentElement.clientHeight;
    var _scrollTopResize=$(document).scrollTop();
    var _thisDomHeightResize=$("#alertInfo").height()+2;
    var topResize=parseInt(_scrollTopResize+(_winHResize-_thisDomHeightResize)/2);
    if(_thisDomHeightResize>=_winHResize){
        topResize=_scrollTopResize;
        if(_scrollTopResize+_thisDomHeightResize>=$(document).height()){
            topResize=$(document).height()-_thisDomHeightResize;
        }
    };
    $("#alertInfo").css({
        "top":topResize+"px"
    })
    //console.log("改变大小时窗口的高度："+_winHResize);
}



function gtoDom(num){
    var winH=$(window).height();
    var fixJwH=$(".fix-jw").height();
    if(winH>=fixJwH){
        if(num>796-(winH-fixJwH)/2){
            $(".fix-jw").addClass("fix-p");
        }else{
            $(".fix-jw").removeClass("fix-p");
        }
    }
}






$(window).on("resize",function(){
    if($("#alertInfo").css("display")=="block") alertInfoPo();
}).on("scroll",function(){
    gtoDom($(document).scrollTop());
})

$(function(){

    gtoDom($(document).scrollTop());

    $(".medalScroll").jScrollPane();

    if($(".exchange").length>0){
        var scrollDom=$(".scrollD");
        scrollDom.on("scroll",function(){
            var _thisT=Math.abs(parseInt($(".jspPane").css("top")));
            var aLength=$(".exchangeMenu a").length;
            for(i=0;i<aLength;i++){
                cT=parseInt($(".jspPane h4.typeT").eq(i).position().top)-25;
                if(_thisT>=cT){
                    $(".exchangeMenu a").removeClass("curr").eq(i).addClass("curr");
                }
            }
        }).jScrollPane();
        //
        $(".exchangeMenu a").click(function(event){
            event.preventDefault();
            var _index=$(this).index();
            scrollDom.data("jsp").scrollToElement($(".jspPane h4.typeT").eq(_index),true,true);
            $(this).addClass("curr").siblings().removeClass("curr");
        })
    }
    $(".userInfo p:even").addClass("pBg");
    if($(".userCenter").length>0){
        $(".tabBtn a").click(function(event){
            if(!$(this).hasClass("curr")){
                event.preventDefault();
                var _index=$(this).index();
                $(this).addClass("curr").siblings().removeClass();
                $(this).parent().parent().next(".right").find(".tabList").eq(_index).show().siblings().hide();
            }
        }).eq(0).trigger("click");
        $(".medal li").hover(function(){
            if(!$(this).has("a").length){
                $(this).toggleClass("hover");
            }
        })
    }
    $(".listEvent dl dd").click(function(){
        if($(this).parent().hasClass("curr")) return;
        $(this).parent().addClass("curr").siblings().removeClass("curr");
        $(this).siblings("dt").slideDown("fast").parent().siblings().find("dt").slideUp("fast");
        $(this).parent().find(".scrollD").jScrollPane();
    }).eq(0).trigger("click");


    //关闭
    $(document).on("click","#alertInfo .close",closeDiv);


    /*---------------------------------------------------------------------------------------------------------------------*/
    /*------以下是相关弹出窗口实例，仅供参考-------------------------------------------------------------------------------------*/
    /*---------------------------------------------------------------------------------------------------------------------*/
    //错误提示实例
    $(".errorTs").click(function(event){
        event.preventDefault();
        showMsgDiv();
    })
    //登录实例
    $(".logBtn").click(function(event){
        event.preventDefault();
        showLoginDiv();
    })

    /*---------------------------------------------------------------------------------------------------------------------*/
})

function showMsgDiv(msg){
    $(".tsInfo").remove();
    showInfo("<div class='tsInfo'>"
        +" <p>"+msg+"</p>"
        +" <div class='infoBtn'><a class='click-btn' href='javascript:closeDiv();'>确 定</a></div>"
        +"</div>")
}



//封装登录弹出窗
function showLoginDiv(){
    $(".tsInfo").remove();
    showInfo("<div class='logInfo'>"
        +" <ul class='logUl clearfloat'>"
        +"  <li><label for='zH'>账　号：</label><input type='text' name='zH' id='zH'></li>"
        +"  <li><label for='mM'>密　码：</label><input type='password' name='mM' id='mM'></li>"
        +"  <li><label for=''>大　区：</label><div class='selBox'>"
        +"   <i>请选择大区</i><em><b></b></em>"
        +"   <div class='selC'>"
        +"    <a href='javascript:;' value=''>请选择大区</a>"
        +"    <a href='javascript:;' value='1500200'>电信南方区</a>"
        +"    <a href='javascript:;' value='1500100'>联通北方区</a>"
        +"   </div><input type='hidden' class='sel-ed' id='sel-ed' value=''>"
        +"  </div></li>"
        +"  <li class='yzM'><label for='yzM'>验证码：</label><input type='text' name='yzM' id='yzM' maxlength='4'><img src='"+httpurl + "/verifyCode?" + Math.random()+"' id='verifyImg' onclick='changeImg()'></li>"
        +"  <li class='tsli'><label for=''></label><span id='logmsg'></span></li>"
        +" </ul>"
        +" <div class='infoBtn'><a class='click-btn' href='javascript:login(1);'>登 录</a></div>"
        +"</div>");
    $.divselect(".selBox",".sel-ed");
}
//
