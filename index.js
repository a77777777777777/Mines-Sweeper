var minesgrid=[];
var minescountgrid=[];
var minesoppenedgrid=[];
var height,width;
var mines=13;
var minutes=0;
var seconds=0;
var size;
var timerid=0;
var menuvisible=0;
var currenttheme="blue";
height=10;
width=10;
var isStarted=false;
var touchcount=0;
resetgridboxsize();
createGrid(height,width);

hidemenu();
document.addEventListener("contextmenu",(e)=>{e.preventDefault();});

window.onclick = function(event) {
    if (!event.target.matches('.menulink')) {
      var dropdowns = document.getElementsByClassName("menuitems-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (!openDropdown.classList.contains('hide')) {
          openDropdown.classList.add('hide');
        }
      }
    }
}
window.addEventListener("resize",()=>{
    resetgridboxsize();
});

function resetgridboxsize(){
    if(window.innerHeight>window.innerWidth){ //window.innerHeight>window.innerWidth screen.height>screen.width
        size=window.innerWidth;
        size=Math.floor(size*92/100);
    }else{
        size=window.innerHeight;
        size=Math.floor(size*70/100);
    }
}

function timer(){
    seconds=seconds+1;
    if(seconds===60){   
    minutes=minutes+1;
    seconds=0;
    }
    var second=seconds;
    if(seconds<10)second="0"+seconds;
    var minute=minutes;
    if(minute<10)minute="0"+minutes;
    document.getElementById("time").innerText=minute+":"+second;
}
function begin(){
    menuvisible=0;
    //hidemenu();
    height=10;
    width=10;
    mines=13;
    isStarted=false;
    createGrid(height,width);
}
function inter(){
    menuvisible=0;
    //hidemenu();
    height=16;
    width=16;
    mines=50;
    isStarted=false;
    createGrid(height,width);
}
function hard(){
    menuvisible=0;
    //hidemenu();
    height=20;
    width=20;
    mines=80;
    isStarted=false;
    createGrid(height,width);
}
function showdialog(dialog){
    menuvisible=0;
    document.getElementById(dialog).style.top=document.getElementById("gamegrid").offsetTop+"px";
    document.getElementById(dialog).classList.remove("hide");
}
function hidedialog(){
    document.getElementById("new").classList.add("hide");
}
function hidemenu(){
    document.getElementById("settings1").classList.toggle("hide");
}
function menushow(){
    menuvisible=1;
    hidemenu();
}
function creategame(){
    menuvisible=0;
    height=document.getElementById("newheight").value*1;
    width=document.getElementById("newwidth").value*1;
    mines=document.getElementById("newmines").value*1;
    hidedialog();
    isStarted=false;
    createGrid(height,width);
}
function validatenumber(element){
    if(!(document.getElementById(element).value*1)>=1) document.getElementById(element).value=1;
}
function swapheightwidth(){
    var a=document.getElementById("newheight").value;
    document.getElementById("newheight").value=document.getElementById("newwidth").value;
    document.getElementById("newwidth").value=a;
}
function createGrid(h,w){
    var boxsize;
    document.getElementById("footer").innerText="";
    if(h>w){
        boxsize=Math.floor(size/h)-2;
    }else boxsize=Math.floor(size/w)-2;
    if(boxsize>44) boxsize=44;
    if(mines>(height*width))mines=Math.floor((height*width)/3);
    if(mines===0)mines=Math.floor((height*width)/3);
    if(timerid>0){clearInterval(timerid); timerid=0;}
    minutes=0;
    seconds=0;
    document.getElementById("w1").classList.remove("hide");
    minesgrid=[];
    minescountgrid=[];
    minesoppenedgrid=[];
    for(var a=0;a<height;a++){
        minesgrid[a]=new Array(width);
        minescountgrid[a]=new Array(width);
        minesoppenedgrid[a]=new Array(width);
    }
    document.querySelector("div.set").innerHTML="";
    var row="",column="";
 for(var a=0;a<h;a++){
    row=row+" 1fr";
    column="";
    for(var b=0;b<w;b++){
        column=column+" 1fr";
        document.querySelector("div.set").innerHTML+="<button class='btnbox "+currenttheme+"' id='"+a+","+b+"' style='height:"+boxsize+"px;width:"+boxsize+"px;font-size:"+boxsize/2+"px;'></button>";
        //document.getElementById(a+""+b).addEventListener("click",open);
    }
 }
 for(var a=0;a<h;a++){
    for(var b=0;b<w;b++){
        document.getElementById(a+","+b).addEventListener("click",open);
        document.getElementById(a+","+b).addEventListener("mousedown",function(e){
            if(e.button==2 && isStarted){ 
                if(document.getElementById(this.id).innerText=="🚩") document.getElementById(this.id).innerText="";
                else document.getElementById(this.id).innerText="🚩";
            }
            return;
        });
        document.getElementById(a+","+b).addEventListener("touchstart",function(e){
            touchcount=1;
        });
        document.getElementById(a+","+b).addEventListener("touchmove",function(e){
            touchcount=0;
        });
        document.getElementById(a+","+b).addEventListener("touchend",function(e){
            if(isStarted){
                setTimeout(()=>{ 
                    if(touchcount===1){
                        touchcount=0;
                        if(document.getElementById(this.id).innerText=="🚩") document.getElementById(this.id).innerText="";
                        else document.getElementById(this.id).innerText="🚩";
                    }
                },700);
            }
        });
    }
 }
 document.getElementById("gamegrid").style.setProperty("grid-template-columns",column);
 document.getElementById("gamegrid").style.setProperty("grid-template-rows",row);
 document.getElementById("gamegrid").style.setProperty("width",(w*(boxsize))+"px");
 timerid=setInterval(timer,1000);
 document.getElementById('w1').classList.add("hide");
}

function open(){
    touchcount=0;
    var tmpid=this.id+"";
    if(!isStarted){
    for(var a=0;a<height;a++){
        for(var b=0;b<width;b++){
            minesgrid[a][b]=0;
            minescountgrid[a][b]=0;
            minesoppenedgrid[a][b]=0;
        }
    }
    setStyle(this.id+"");
    var tempBool=true;
    var count=0;
    var h,w;
    while(tempBool){
        h=Math.floor(Math.random()*height);
        w=Math.floor(Math.random()*width);
        if(minesgrid[h][w]===0 && this.id!=(h+","+w)){
            minesgrid[h][w]=1;
            count++;
        }
        if(count===mines) tempBool=false;
    }
    isStarted=true;
    countMines();
    //minesoppenedgrid[(tmpid.slice(0,tmpid.indexOf(","))*1)][(tmpid.slice(tmpid.indexOf(",")+1,tmpid.length)*1)]=1;
    //for(var a=0;a<height;a++){
    //    for(var b=0;b<width;b++)
            //document.getElementById(a+","+b).innerText=minescountgrid[a][b];
    //}
    }
   openBox((tmpid.slice(0,tmpid.indexOf(","))*1),(tmpid.slice(tmpid.indexOf(",")+1,tmpid.length)*1));
}
function openBox(h1,w1){
    //alert(minesgrid[h][w]);
    //alert(h1+","+w1);
    document.getElementById(h1+","+w1).innerText="";
    var isempty=true;
    if(minesgrid[h1][w1]===1){
        document.getElementById(h1+","+w1).innerText="💥";
        document.getElementById(h1+","+w1).classList.remove(currenttheme);
        var tmpaud=new Audio("sounds/wrong.mp3");
        tmpaud.play();
        for(var a=0;a<height;a++){
            for(var b=0;b<width;b++){
                if(minesgrid[a][b]===1){
                    document.getElementById(a+","+b).innerText="💥";
                    //document.getElementById(a+","+b).classList.remove("btnbox");
                    //document.getElementById(a+","+b).style.setProperty("background-color","white");
                }
                document.getElementById(a+","+b).disabled=true;
            }
        }
        isStarted=false;
        document.getElementById("footer").innerText="Game over!";
        clearInterval(timerid);
    }
    else{
      if(minescountgrid[h1][w1]>0){
        minesoppenedgrid[h1][w1]=2;
        setStyle(h1+","+w1);
        document.getElementById(h1+","+w1).innerText=minescountgrid[h1][w1];
        }
      else
      {
        minesoppenedgrid[h1][w1]=1;
        setStyle(h1+","+w1);
        var minesoppened=0;
        while(isempty){
            for(var h=0;h<height;h++){
                for(var w=0;w<width;w++){
                    if(minesoppenedgrid[h][w]===1){
                        if(h===0){
                            if(w===0){
                                if(minescountgrid[h+1][w]===0 && minesoppenedgrid[h+1][w]!=1){setStyle((h+1)+","+w);minesoppenedgrid[h+1][w]=1; minesoppened++;}
                                if(minescountgrid[h+1][w+1]===0 && minesoppenedgrid[h+1][w+1]!=1){setStyle((h+1)+","+(w+1));minesoppenedgrid[h+1][w+1]=1; minesoppened++;}
                                if(minescountgrid[h][w+1]===0 && minesoppenedgrid[h][w+1]!=1){setStyle((h)+","+(w+1));minesoppenedgrid[h][w+1]=1; minesoppened++;}
                            }else if(w===(width-1)){
                                if(minescountgrid[h+1][w]===0 && minesoppenedgrid[h+1][w]!=1){setStyle((h+1)+","+w);minesoppenedgrid[h+1][w]=1; minesoppened++;}
                                if(minescountgrid[h+1][w-1]===0 && minesoppenedgrid[h+1][w-1]!=1){setStyle((h+1)+","+(w-1));minesoppenedgrid[h+1][w-1]=1; minesoppened++;}
                                if(minescountgrid[h][w-1]===0 && minesoppenedgrid[h][w-1]!=1){setStyle((h)+","+(w-1));minesoppenedgrid[h][w-1]=1; minesoppened++;}
                            }
                            else{
                                if(minescountgrid[h][w-1]===0 && minesoppenedgrid[h][w-1]!=1){setStyle((h)+","+(w-1));minesoppenedgrid[h][w-1]=1; minesoppened++;}
                                if(minescountgrid[h][w+1]===0 && minesoppenedgrid[h][w+1]!=1){setStyle((h)+","+(w+1));minesoppenedgrid[h][w+1]=1; minesoppened++;}
                                if(minescountgrid[h+1][w-1]===0 && minesoppenedgrid[h+1][w-1]!=1){setStyle((h+1)+","+(w-1));minesoppenedgrid[h+1][w-1]=1; minesoppened++;}
                                if(minescountgrid[h+1][w]===0 && minesoppenedgrid[h+1][w]!=1){setStyle((h+1)+","+w);minesoppenedgrid[h+1][w]=1; minesoppened++;}
                                if(minescountgrid[h+1][w+1]===0 && minesoppenedgrid[h+1][w+1]!=1){setStyle((h+1)+","+(w+1));minesoppenedgrid[h+1][w+1]=1; minesoppened++;}
                            }
                        }else if(h===(height-1)){
                            if(w===0){
                               if(minescountgrid[h-1][w]===0 && minesoppenedgrid[h-1][w]!=1){setStyle((h-1)+","+w);minesoppenedgrid[h-1][w]=1; minesoppened++;}
                               if(minescountgrid[h-1][w+1]===0 && minesoppenedgrid[h-1][w+1]!=1){setStyle((h-1)+","+(w+1));minesoppenedgrid[h-1][w+1]=1; minesoppened++;}
                               if(minescountgrid[h][w+1]===0 && minesoppenedgrid[h][w+1]!=1){setStyle((h)+","+(w+1));minesoppenedgrid[h][w+1]=1; minesoppened++;}
                            }else if(w===(width-1)){
                                if(minescountgrid[h-1][w]===0 && minesoppenedgrid[h-1][w]!=1){setStyle((h-1)+","+w);minesoppenedgrid[h-1][w]=1; minesoppened++;}
                                if(minescountgrid[h-1][w-1]===0 && minesoppenedgrid[h-1][w-1]!=1){setStyle((h-1)+","+(w-1));minesoppenedgrid[h-1][w-1]=1; minesoppened++;}
                                if(minescountgrid[h][w-1]===0 && minesoppenedgrid[h][w-1]!=1){setStyle((h)+","+(w-1));minesoppenedgrid[h][w-1]=1; minesoppened++;}
                            }
                            else{
                                if(minescountgrid[h][w-1]===0 && minesoppenedgrid[h][w-1]!=1){setStyle((h)+","+(w-1));minesoppenedgrid[h][w-1]=1; minesoppened++;}
                                if(minescountgrid[h][w+1]===0 && minesoppenedgrid[h][w+1]!=1){setStyle((h)+","+(w+1));minesoppenedgrid[h][w+1]=1; minesoppened++;}
                                if(minescountgrid[h-1][w-1]===0 && minesoppenedgrid[h-1][w-1]!=1){setStyle((h-1)+","+(w-1));minesoppenedgrid[h-1][w-1]=1; minesoppened++;}
                                if(minescountgrid[h-1][w]===0 && minesoppenedgrid[h-1][w]!=1){setStyle((h-1)+","+w);minesoppenedgrid[h-1][w]=1; minesoppened++;}
                                if(minescountgrid[h-1][w+1]===0 && minesoppenedgrid[h-1][w+1]!=1){setStyle((h-1)+","+(w+1));minesoppenedgrid[h-1][w+1]=1; minesoppened++;}
                            }
                        }else if(w===0){
                                if(minescountgrid[h-1][w]===0 && minesoppenedgrid[h-1][w]!=1){setStyle((h-1)+","+w);minesoppenedgrid[h-1][w]=1; minesoppened++;}
                                if(minescountgrid[h+1][w]===0 && minesoppenedgrid[h+1][w]!=1){setStyle((h+1)+","+w);minesoppenedgrid[h+1][w]=1; minesoppened++;}
                                if(minescountgrid[h-1][w+1]===0 && minesoppenedgrid[h-1][w+1]!=1){setStyle((h-1)+","+(w+1));minesoppenedgrid[h-1][w+1]=1; minesoppened++;}
                                if(minescountgrid[h][w+1]===0 && minesoppenedgrid[h][w+1]!=1){setStyle((h)+","+(w+1));minesoppenedgrid[h][w+1]=1; minesoppened++;}
                                if(minescountgrid[h+1][w+1]===0 && minesoppenedgrid[h+1][w+1]!=1){setStyle((h+1)+","+(w+1));minesoppenedgrid[h+1][w+1]=1; minesoppened++;}
                            }
                        else if(w===(width-1)){
                            if(minescountgrid[h-1][w]===0 && minesoppenedgrid[h-1][w]!=1){setStyle((h-1)+","+w);minesoppenedgrid[h-1][w]=1; minesoppened++;}
                            if(minescountgrid[h+1][w]===0 && minesoppenedgrid[h+1][w]!=1){setStyle((h+1)+","+w);minesoppenedgrid[h+1][w]=1; minesoppened++;}
                            if(minescountgrid[h-1][w-1]===0 && minesoppenedgrid[h-1][w-1]!=1){setStyle((h-1)+","+(w-1));minesoppenedgrid[h-1][w-1]=1; minesoppened++;}
                            if(minescountgrid[h][w-1]===0 && minesoppenedgrid[h][w-1]!=1){setStyle((h)+","+(w-1));minesoppenedgrid[h][w-1]=1; minesoppened++;}
                            if(minescountgrid[h+1][w-1]===0 && minesoppenedgrid[h+1][w-1]!=1){setStyle((h+1)+","+(w-1));minesoppenedgrid[h+1][w-1]=1; minesoppened++;}
                        }else{
                            if(minescountgrid[h-1][w]===0 && minesoppenedgrid[h-1][w]!=1){setStyle((h-1)+","+w);minesoppenedgrid[h-1][w]=1; minesoppened++;}
                            if(minescountgrid[h-1][w+1]===0 && minesoppenedgrid[h-1][w+1]!=1){setStyle((h-1)+","+(w+1));minesoppenedgrid[h-1][w+1]=1; minesoppened++;}
                            if(minescountgrid[h-1][w-1]===0 && minesoppenedgrid[h-1][w-1]!=1){setStyle((h-1)+","+(w-1));minesoppenedgrid[h-1][w-1]=1; minesoppened++;}
                            if(minescountgrid[h+1][w]===0 && minesoppenedgrid[h+1][w]!=1){setStyle((h+1)+","+w);minesoppenedgrid[h+1][w]=1; minesoppened++;}
                            if(minescountgrid[h+1][w+1]===0 && minesoppenedgrid[h+1][w+1]!=1){setStyle((h+1)+","+(w+1));minesoppenedgrid[h+1][w+1]=1; minesoppened++;}
                            if(minescountgrid[h+1][w-1]===0 && minesoppenedgrid[h+1][w-1]!=1){setStyle((h+1)+","+(w-1));minesoppenedgrid[h+1][w-1]=1; minesoppened++;}
                            if(minescountgrid[h][w+1]===0 && minesoppenedgrid[h][w+1]!=1){setStyle((h)+","+(w+1));minesoppenedgrid[h][w+1]=1; minesoppened++;}
                            if(minescountgrid[h][w-1]===0 && minesoppenedgrid[h][w-1]!=1){setStyle((h)+","+(w-1));minesoppenedgrid[h][w-1]=1; minesoppened++;}
                        }
                    }
                        if(minesoppened>0){
                        break;
                        }
                }
                        if(minesoppened>0){
                        break;
                        }
            }
            if(minesoppened>0){
                minesoppened=0;
            }else{
                isempty=false;
            }
        }
        for(var h=0;h<height;h++){
            for(var w=0;w<width;w++){
                if(minesoppenedgrid[h][w]===1){
                    if(h===0){
                        if(w===0){
                            if(minescountgrid[h+1][w]!=9 && minesoppenedgrid[h+1][w] ===0){minesoppenedgrid[h+1][w] =2;setStyle((h+1)+","+w);document.getElementById((h+1)+","+w).innerText=minescountgrid[h+1][w]; }
                            if(minescountgrid[h+1][w+1]!=9 && minesoppenedgrid[h+1][w+1] ===0){minesoppenedgrid[h+1][w+1] =2;setStyle((h+1)+","+(w+1));document.getElementById((h+1)+","+(w+1)).innerText=minescountgrid[h+1][w+1]; }
                            if(minescountgrid[h][w+1]!=9 && minesoppenedgrid[h][w+1] ===0){minesoppenedgrid[h][w+1] =2;setStyle((h)+","+(w+1));document.getElementById((h)+","+(w+1)).innerText=minescountgrid[h][w+1]; }
                        }else if(w===(width-1)){
                            if(minescountgrid[h+1][w]!=9 && minesoppenedgrid[h+1][w] ===0){minesoppenedgrid[h+1][w] =2;setStyle((h+1)+","+w);document.getElementById((h+1)+","+w).innerText=minescountgrid[h+1][w]; }
                            if(minescountgrid[h+1][w-1]!=9 && minesoppenedgrid[h+1][w-1] ===0){minesoppenedgrid[h+1][w-1] =2;setStyle((h+1)+","+(w-1));document.getElementById((h+1)+","+(w-1)).innerText=minescountgrid[h+1][w-1]; }
                            if(minescountgrid[h][w-1]!=9 && minesoppenedgrid[h][w-1] ===0){minesoppenedgrid[h][w-1] =2;setStyle((h)+","+(w-1));document.getElementById((h)+","+(w-1)).innerText=minescountgrid[h][w-1]; }
                        }
                        else{
                            if(minescountgrid[h][w-1]!=9 && minesoppenedgrid[h][w-1] ===0){minesoppenedgrid[h][w-1] =2;setStyle((h)+","+(w-1));document.getElementById((h)+","+(w-1)).innerText=minescountgrid[h][w-1]; }
                            if(minescountgrid[h][w+1]!=9 && minesoppenedgrid[h][w+1] ===0){minesoppenedgrid[h][w+1] =2;setStyle((h)+","+(w+1));document.getElementById((h)+","+(w+1)).innerText=minescountgrid[h][w+1]; }
                            if(minescountgrid[h+1][w-1]!=9 && minesoppenedgrid[h+1][w-1] ===0){minesoppenedgrid[h+1][w-1] =2;setStyle((h+1)+","+(w-1));document.getElementById((h+1)+","+(w-1)).innerText=minescountgrid[h+1][w-1]; }
                            if(minescountgrid[h+1][w]!=9 && minesoppenedgrid[h+1][w] ===0){minesoppenedgrid[h+1][w] =2;setStyle((h+1)+","+w);document.getElementById((h+1)+","+w).innerText=minescountgrid[h+1][w]; }
                            if(minescountgrid[h+1][w+1]!=9 && minesoppenedgrid[h+1][w+1] ===0){minesoppenedgrid[h+1][w+1] =2;setStyle((h+1)+","+(w+1));document.getElementById((h+1)+","+(w+1)).innerText=minescountgrid[h+1][w+1]; }
                        }
                    }else if(h===(height-1)){
                        if(w===0){
                           if(minescountgrid[h-1][w]!=9 && minesoppenedgrid[h-1][w] ===0){minesoppenedgrid[h-1][w] =2;setStyle((h-1)+","+w);document.getElementById((h-1)+","+w).innerText=minescountgrid[h-1][w]; }
                           if(minescountgrid[h-1][w+1]!=9 && minesoppenedgrid[h-1][w+1] ===0){minesoppenedgrid[h-1][w+1] =2;setStyle((h-1)+","+(w+1));document.getElementById((h-1)+","+(w+1)).innerText=minescountgrid[h-1][w+1]; }
                           if(minescountgrid[h][w+1]===9 && minesoppenedgrid[h][w+1] ===0){minesoppenedgrid[h][w+1] =2;setStyle((h)+","+(w+1));document.getElementById((h)+","+(w+1)).innerText=minescountgrid[h][w+1]; }
                        }else if(w===(width-1)){
                            if(minescountgrid[h-1][w]!=9 && minesoppenedgrid[h-1][w] ===0){minesoppenedgrid[h-1][w] =2;setStyle((h-1)+","+w);document.getElementById((h-1)+","+w).innerText=minescountgrid[h-1][w]; }
                            if(minescountgrid[h-1][w-1]!=9 && minesoppenedgrid[h-1][w-1] ===0){minesoppenedgrid[h-1][w-1] =2;setStyle((h-1)+","+(w-1));document.getElementById((h-1)+","+(w-1)).innerText=minescountgrid[h-1][w-1]; }
                            if(minescountgrid[h][w-1]!=9 && minesoppenedgrid[h][w-1] ===0){minesoppenedgrid[h][w-1] =2;setStyle((h)+","+(w-1));document.getElementById((h)+","+(w-1)).innerText=minescountgrid[h][w-1]; }
                        }
                        else{
                            if(minescountgrid[h][w-1]!=9 && minesoppenedgrid[h][w-1] ===0){minesoppenedgrid[h][w-1] =2;setStyle((h)+","+(w-1));document.getElementById((h)+","+(w-1)).innerText=minescountgrid[h][w-1]; }
                            if(minescountgrid[h][w+1]!=9 && minesoppenedgrid[h][w+1] ===0){minesoppenedgrid[h][w+1] =2;setStyle((h)+","+(w+1));document.getElementById((h)+","+(w+1)).innerText=minescountgrid[h][w+1]; }
                            if(minescountgrid[h-1][w-1]!=9 && minesoppenedgrid[h-1][w-1] ===0){minesoppenedgrid[h-1][w-1] =2;setStyle((h-1)+","+(w-1));document.getElementById((h-1)+","+(w-1)).innerText=minescountgrid[h-1][w-1]; }
                            if(minescountgrid[h-1][w]!=9 && minesoppenedgrid[h-1][w] ===0){minesoppenedgrid[h-1][w] =2;setStyle((h-1)+","+w);document.getElementById((h-1)+","+w).innerText=minescountgrid[h-1][w]; }
                            if(minescountgrid[h-1][w+1]!=9 && minesoppenedgrid[h-1][w+1] ===0){minesoppenedgrid[h-1][w+1] =2;setStyle((h-1)+","+(w+1));document.getElementById((h-1)+","+(w+1)).innerText=minescountgrid[h-1][w+1]; }
                        }
                    }else if(w===0){
                            if(minescountgrid[h-1][w]!=9 && minesoppenedgrid[h-1][w] ===0){minesoppenedgrid[h-1][w] =2;setStyle((h-1)+","+w);document.getElementById((h-1)+","+w).innerText=minescountgrid[h-1][w]; }
                            if(minescountgrid[h+1][w]!=9 && minesoppenedgrid[h+1][w] ===0){minesoppenedgrid[h+1][w] =2;setStyle((h+1)+","+w);document.getElementById((h+1)+","+w).innerText=minescountgrid[h+1][w]; }
                            if(minescountgrid[h-1][w+1]!=9 && minesoppenedgrid[h-1][w+1] ===0){minesoppenedgrid[h-1][w+1] =2;setStyle((h-1)+","+(w+1));document.getElementById((h-1)+","+(w+1)).innerText=minescountgrid[h-1][w+1]; }
                            if(minescountgrid[h][w+1]!=9 && minesoppenedgrid[h][w+1] ===0){minesoppenedgrid[h][w+1] =2;setStyle((h)+","+(w+1));document.getElementById((h)+","+(w+1)).innerText=minescountgrid[h][w+1]; }
                            if(minescountgrid[h+1][w+1]!=9 && minesoppenedgrid[h+1][w+1] ===0){minesoppenedgrid[h+1][w+1] =2;setStyle((h+1)+","+(w+1));document.getElementById((h+1)+","+(w+1)).innerText=minescountgrid[h+1][w+1]; }
                        }
                    else if(w===(width-1)){
                        if(minescountgrid[h-1][w]!=9 && minesoppenedgrid[h-1][w] ===0){minesoppenedgrid[h-1][w] =2;setStyle((h-1)+","+w);document.getElementById((h-1)+","+w).innerText=minescountgrid[h-1][w]; }
                        if(minescountgrid[h+1][w]!=9 && minesoppenedgrid[h+1][w] ===0){minesoppenedgrid[h+1][w] =2;setStyle((h+1)+","+w);document.getElementById((h+1)+","+w).innerText=minescountgrid[h+1][w]; }
                        if(minescountgrid[h-1][w-1]!=9 && minesoppenedgrid[h-1][w-1] ===0){minesoppenedgrid[h-1][w-1] =2;setStyle((h-1)+","+(w-1));document.getElementById((h-1)+","+(w-1)).innerText=minescountgrid[h-1][w-1]; }
                        if(minescountgrid[h][w-1]!=9 && minesoppenedgrid[h][w-1] ===0){minesoppenedgrid[h][w-1] =2;setStyle((h)+","+(w-1));document.getElementById((h)+","+(w-1)).innerText=minescountgrid[h][w-1]; }
                        if(minescountgrid[h+1][w-1]!=9 && minesoppenedgrid[h+1][w-1] ===0){minesoppenedgrid[h+1][w-1] =2;setStyle((h+1)+","+(w-1));document.getElementById((h+1)+","+(w-1)).innerText=minescountgrid[h+1][w-1]; }
                    }else{
                        if(minescountgrid[h-1][w]!=9 && minesoppenedgrid[h-1][w] ===0){minesoppenedgrid[h-1][w] =2;setStyle((h-1)+","+w);document.getElementById((h-1)+","+w).innerText=minescountgrid[h-1][w]; }
                        if(minescountgrid[h-1][w+1]!=9 && minesoppenedgrid[h-1][w+1] ===0){minesoppenedgrid[h-1][w+1] =2;setStyle((h-1)+","+(w+1));document.getElementById((h-1)+","+(w+1)).innerText=minescountgrid[h-1][w+1]; }
                        if(minescountgrid[h-1][w-1]!=9 && minesoppenedgrid[h-1][w-1] ===0){minesoppenedgrid[h-1][w-1] =2;setStyle((h-1)+","+(w-1));document.getElementById((h-1)+","+(w-1)).innerText=minescountgrid[h-1][w-1]; }
                        if(minescountgrid[h+1][w]!=9 && minesoppenedgrid[h+1][w] ===0){minesoppenedgrid[h+1][w] =2;setStyle((h+1)+","+w);document.getElementById((h+1)+","+w).innerText=minescountgrid[h+1][w]; }
                        if(minescountgrid[h+1][w+1]!=9 && minesoppenedgrid[h+1][w+1] ===0){minesoppenedgrid[h+1][w+1] =2;setStyle((h+1)+","+(w+1));document.getElementById((h+1)+","+(w+1)).innerText=minescountgrid[h+1][w+1]; }
                        if(minescountgrid[h+1][w-1]!=9 && minesoppenedgrid[h+1][w-1] ===0){minesoppenedgrid[h+1][w-1] =2;setStyle((h+1)+","+(w-1));document.getElementById((h+1)+","+(w-1)).innerText=minescountgrid[h+1][w-1]; }
                        if(minescountgrid[h][w+1]!=9 && minesoppenedgrid[h][w+1] ===0){minesoppenedgrid[h][w+1] =2;setStyle((h)+","+(w+1));document.getElementById((h)+","+(w+1)).innerText=minescountgrid[h][w+1]; }
                        if(minescountgrid[h][w-1]!=9 && minesoppenedgrid[h][w-1] ===0){minesoppenedgrid[h][w-1] =2;setStyle((h)+","+(w-1));document.getElementById((h)+","+(w-1)).innerText=minescountgrid[h][w-1]; }
                    }
                }
            }
        }
      }
    }
    minesoppened=0;
    for(var h=0;h<height;h++){
        for(var w=0;w<width;w++){
            if(minesoppenedgrid[h][w]===0) minesoppened+=1;
        }
    }
    if(minesoppened===mines){
        for(var h=0;h<height;h++){
            for(var w=0;w<width;w++){
                if(minesgrid[h][w]===1){ 
                    document.getElementById(h+","+w).innerText="🚩";
                    document.getElementById(h+","+w).disabled=true;
                }
            }
        }
        isStarted=false;
        document.getElementById("footer").innerText="You win!";
        clearInterval(timerid);
    }
}

function setStyle(tmpid){
    document.getElementById(tmpid).classList.remove(currenttheme);
    document.getElementById(tmpid).style.setProperty("background-color","#283149");
    document.getElementById(tmpid).innerText="";
    document.getElementById(tmpid).disabled=true;
}

function countMines(){
    for(var h=0;h<height;h++){
        for(var w=0;w<width;w++){
            if(minesgrid[h][w]!=1){
                if(h===0){
                    if(w===0){
                        minescountgrid[h][w]=minesgrid[h+1][w]+minesgrid[h+1][w+1]+minesgrid[h][w+1];
                    }else if(w===(width-1)){
                        minescountgrid[h][w]=minesgrid[h+1][w]+minesgrid[h+1][w-1]+minesgrid[h][w-1];
                    }
                    else{
                        minescountgrid[h][w]=minesgrid[h][w-1]+minesgrid[h][w+1]+minesgrid[h+1][w-1]+minesgrid[h+1][w]+minesgrid[h+1][w+1];
                    }
                }else if(h===(height-1)){
                    if(w===0){
                        minescountgrid[h][w]=minesgrid[h-1][w]+minesgrid[h-1][w+1]+minesgrid[h][w+1];
                    }else if(w===(width-1)){
                        minescountgrid[h][w]=minesgrid[h-1][w]+minesgrid[h-1][w-1]+minesgrid[h][w-1];
                    }
                    else{
                        minescountgrid[h][w]=minesgrid[h][w-1]+minesgrid[h][w+1]+minesgrid[h-1][w-1]+minesgrid[h-1][w]+minesgrid[h-1][w+1];
                    }
                }else if(w===0){
                        minescountgrid[h][w]=minesgrid[h-1][w]+minesgrid[h+1][w]+minesgrid[h-1][w+1]+minesgrid[h][w+1]+minesgrid[h+1][w+1];
                    }
                else if(w===(width-1)){
                    minescountgrid[h][w]=minesgrid[h-1][w]+minesgrid[h+1][w]+minesgrid[h-1][w-1]+minesgrid[h][w-1]+minesgrid[h+1][w-1];
                }else{
                    minescountgrid[h][w]=minesgrid[h-1][w]+minesgrid[h-1][w+1]+minesgrid[h-1][w-1]+minesgrid[h+1][w]+minesgrid[h+1][w+1]+minesgrid[h+1][w-1]+minesgrid[h][w+1]+minesgrid[h][w-1];
                }
            }
            else minescountgrid[h][w]=9;
        }
    }
}
function reset(){
    if(!isStarted){
        createGrid(height,width);
    }
    document.getElementById("reset").blur();
}
function changecolor(theme){
    if(!(currenttheme===theme)){
        for(var h=0;h<height;h++){
            for(var w=0;w<width;w++){
                if(document.getElementById(h+","+w).classList.contains(currenttheme)){
                document.getElementById(h+","+w).classList.remove(currenttheme);
                document.getElementById(h+","+w).classList.add(theme);
                }
            }
        }
        currenttheme=theme;
    }
}