window.onload = function(){
    var menu = document.getElementById("main_menu");
    var main = document.getElementsByTagName("main");
    //——————————————————————————————————————————————————————————————————————————————————————————
    //实现菜单栏和消息栏分别滚动时另外一边不动
    menu.onmouseover = function(){
        menu.style.position = "absolute";
        main[0].style.position = "fixed";
        menu.onmousewheel = function(){
            menu.style.height = "1020px";
            menu.style.overflow = "auto";
        }
    }

    menu.onmouseleave = function(){
        menu.style.position = "fixed";
        menu.style.height = "100vh";
        menu.style.overflow = "hidden";
    }

    main[0].onmouseover = function(){
        this.style.position = "relative";
    }

    //——————————————————————————————————————————————————————————————————————————————————
    //点击菜单栏第二栏，旁边的小三角形指向对应的位置
    var second = document.getElementById("second");
    var dd = second.getElementsByTagName("dd");
    var highlightSec = document.getElementById("highlightSec");

    for(var i = 0; i < dd.length; i++){
        dd[i].onclick = function(){
            // alert(i);
            highlightSec.parentNode.removeChild(highlightSec);
            this.appendChild(highlightSec);
        }
    }

    //——————————————————————————————————————————————————————————————————————————————————————
    //点击菜单栏中的按钮栏，旁边的小三角形指向对应的位置
    var primary = document.getElementById("primary");
    var icon = primary.getElementsByClassName("icon");
    var highlightPri = document.getElementById("highlightPri");
    
    for(var i = 0; i < icon.length; i++){
        icon[i].onclick = function(){
            highlightPri.parentNode.removeChild(highlightPri);
            this.parentNode.parentNode.appendChild(highlightPri);
        }
    }

    //——————————————————————————————————————————————————————————————————————————————————————————————————————————————
    //点击隐藏按钮菜单
    var showHide = document.getElementById("show_hide");
    var width1 = this.parseInt(getStyle(main[0], "width")) + 100;
    var width2 = this.parseInt(getStyle(main[0], "width"));

    // var label = 1;
    // showHide.onclick = function(){
    //     if(label == 1){
    //         startMove(menu, "marginLeft", -100);
    //         startMove(main[0], "marginLeft", -100, function(){
    //             startMove(main[0], "width", width);
    //         });
    //         label = 2;
    //         return 1;
    //     }

    //     if(label == 2){
    //         startMove(menu, "marginLeft", 0);
    //         startMove(main[0], "width", width1, function(){
    //             startMove(main[0], "marginLeft", 0);
    //         });
    //         label = 1;
    //         return 1;
    //     }
    // }

    showHide.onclick = function hide(){
        startMove(menu, {marginLeft: -100});
        startMove(main[0], {marginLeft: -100, width: width1});
        
        showHide.onclick = function show(){
            startMove(menu, {marginLeft: 0});
            startMove(main[0], {marginLeft: 0, width: width2});
             
            showHide.onclick = hide.bind(this); 
        }
    }
}

//————————————————————————————————————————————————————————————————————————————————————————————————————————
function startMove(node, json){
    //将定时器timer当做是每个node对象的属性
    //先将定时器关闭
    clearInterval(node.timer);

    node.timer = setInterval(function(){
        for(attr in json){
            var oTarget = json[attr];
            var iCur = null;
            if(attr == "opacity"){
                iCur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
            }else{
                iCur = parseInt(getStyle(node, attr));
            }
            var speed = (oTarget - iCur) / 8;
            speed = (speed > 0)? Math.ceil(speed): Math.floor(speed);

            if(iCur == oTarget){
                clearInterval(node.timer);
            }else{
                if(attr == "opacity"){
                    iCur += speed;
                    node.style.opacity = iCur / 100;
                    node.style.filter = `alpha(opacity = ${iCur})`;
                }else{
                    node.style[attr] = iCur + speed + "px";
                }
            }
        }
        
    }, 30);

} 

//获取元素节点当前属性的值
function getStyle(node, cssStyle){
    if(node.currentStyle){
        return node.currentStyle[cssStyle];
    }else{
        return getComputedStyle(node)[cssStyle];
    }
}
