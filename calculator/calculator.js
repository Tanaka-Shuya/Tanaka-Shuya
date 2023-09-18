var total=0;
var input="";
var judge=1; /*直前に入力したのは 数字(0) or 演算子(1) or イコール(2) */
var flag=0; /*今表示されている演算子は なし(0)or +(1) or -(2) or ×(3) or ÷(4) */
var memory=0;
var error=0;
var konstante=0;


function flag_color(){
    var object1=document.getElementById("flag1");
    var object2=document.getElementById("flag2");
    var object3=document.getElementById("flag3");
    var object4=document.getElementById("flag4");
    if(flag==1){
        object1.style.backgroundColor='#383c3c';
        object2.style.backgroundColor='#9ba88d';
        object3.style.backgroundColor='#9ba88d';
        object4.style.backgroundColor='#9ba88d';
    }
    else if(flag==2){
        object1.style.backgroundColor='#9ba88d';
        object2.style.backgroundColor='#383c3c';
        object3.style.backgroundColor='#9ba88d';
        object4.style.backgroundColor='#9ba88d';
    }
    else if(flag==3){
        object1.style.backgroundColor='#9ba88d';
        object2.style.backgroundColor='#9ba88d';
        object3.style.backgroundColor='#383c3c';
        object4.style.backgroundColor='#9ba88d';  
    }
    else if(flag==4){
        object1.style.backgroundColor='#9ba88d';
        object2.style.backgroundColor='#9ba88d';
        object3.style.backgroundColor='#9ba88d';
        object4.style.backgroundColor='#383c3c';
    }
    else{
        object1.style.backgroundColor='#9ba88d';
        object2.style.backgroundColor='#9ba88d';
        object3.style.backgroundColor='#9ba88d';
        object4.style.backgroundColor='#9ba88d';
    }
}

function option_color(num){
    if(num==1){
        var object=document.getElementById("memory")
        if(memory==0){object.style.color='#9ba88d'}
        else{object.style.color='#383c3c'}
    }
    else if(num==2){
        var object=document.getElementById("error")
        if(error==0){object.style.color='#9ba88d'}
        else{object.style.color='#383c3c'}
    }
    else{  /*numは3*/
        var object=document.getElementById("konstante")
        if(konstante==0){object.style.color='#9ba88d'}
         else{object.style.color='#383c3c'}
    }
}

function cancel(){
    if(input==""){}
    else if(input.toString().length==1){
        input="";
        document.getElementById("result").innerText=0;
    }
    else{
        input=input.toString().slice(0,-1);
        document.getElementById("result").innerText=input;
    }
}

function num_detail(num){
    input+=num;
    var digits=input.toString().length;
    if(digits>15){
        input=input.toString().slice(0,15-digits);   /*桁数を15桁まで下げる*/        
    }
    else{}
    document.getElementById("result").innerText=input;
}

function number(num){
    if(judge==1){
        total=input; /*演算子入力後に数字→totalに移してinputを一旦空に*/
        input="";
    }
    if(judge==2){
        input="";
    }
    else{}
    num_detail(num);
    judge=0;
}

function number_zero(){
    if(judge!=0){
        if(judge==1){
            total=input;
        }
        else{}
        input=""
        document.getElementById("result").innerText=0;
    }
    else if(input==""){}
    else{
        num_detail(0);
    }
    judge=0;
}

function number_doublezero(){
    number_zero();
    number_zero();
}

function dot(){
    if(input.toString().indexOf('.')!=-1){}   /*既に小数点があるとき*/
    else{
        if(input==""){
            input+="0.";
        }
        else{
            input+=".";
        }
    }
    document.getElementById("result").innerText=input;
}


function plus_minus(){
    if(konstante==1&&judge==2){     /*K表示中かつイコール直後→totalを表示中(この後の処理は実際の電卓でもおかしな結果が表示される)*/
        total=total*(-1);
        document.getElementById("result").innerText=total;
    }
    else{
        input=Number(input)*(-1)
        input=input.toString();
        document.getElementById("result").innerText=input;
    }
}


function memory_clear(){
    memory=0;
    judge=1;
    option_color(1);
}
function memory_recall(){
    judge=1;
    input=memory;
    document.getElementById("result").innerText=input;
}
function memory_minus(){
    if(flag==0){
        memory=memory-Number(input);
        input="";
    }
    else if(judge==1){}
    else{
        cal_detail();
        memory=memory-Number(input);
    }
    judge=2;
    flag=0;
    flag_color();
    option_color(1);
}
function memory_plus(){
    if(flag==0){
        memory=memory+Number(input);
        input="";
    }
    else if(judge==1){}
    else{
        cal_detail();
        memory=memory+Number(input);
    }
    judge=2;
    flag=0;
    flag_color();
    option_color(1);
}


function cal_detail(){
    if(flag==0){}
    else if(flag==1){input=Number(total)+Number(input)}
    else if(flag==2){input=Number(total)-Number(input)}
    else if(flag==3){input=Number(total)*Number(input)}
    else{
        if(input==0){
            input=0;
            Error();
        }
        else{
            input=Number(total)/Number(input);
        }
    }
    total=0;

    var digits=input.toString().length;
    if(digits>15){
        input=input.toString().slice(0,15-digits);   /*桁数を15桁まで下げる*/ 
        if(input.toString().indexOf('.')!=-1){}     /*小数点あり→精度を落とすだけでエラーは表示しない*/
        else{
            Error();
        }
    }
    else{}
    document.getElementById("result").innerText=input;
}

function calculate(num){  /*四則演算子*/
    if(flag==0){
        konstante=0;
    }
    else if(judge==0){
        konstante=0;
        cal_detail(); /*flagあり&直前に数字→flagの計算は実行*/
    }
    else if(flag==num&&konstante==0){
        konstante=1;    /*Kを表示*/
    }
    else if(konstante==1){
        konstante=0;
        input=total.toString();
        total=0;
    }
    else{
        konstante=0;
    }
    judge=1;
    flag=num;
    flag_color();
    option_color(3);
}

function Equal(){
    if(konstante==1){
        if(flag==1){total=Number(total)+Number(input)}
        else if(flag==2){total=Number(total)-Number(input)}
        else if(flag==3){total=Number(total)*Number(input)}
        else{
            if(input==0){
                Error();
            }
            else{total=Number(total)/Number(input)}
        }
        var digits=total.toString().length;
        if(digits>15){
            total=total.toString().slice(0,15-digits);   /*桁数を15桁まで下げる*/           
            if(total.toString().indexOf('.')!=-1){}     /*小数点あり→精度を落とすだけでエラーは表示しない*/
            else{
                Error();
            }
        }
        else{}
        document.getElementById("result").innerText=total;
    }
    else if(judge==0&&flag!=0){ /*flagありでjudgeは0→計算する*/
        cal_detail();
    }
    else{}

    judge=2;
    if(konstante==0){
        flag=0;
        flag_color();
    }
    else{}
}
        
function Error(){
    error=1;
    option_color(2);
    for(var j=1; j<3; j++){     /*C,AC以外全て非活性化*/
        var object=document.getElementsByClassName("button"+j);  
        for(var i=0; i<object.length; i++){
            object[i].disabled=true;
        }
    }   
}

function Error_cancel(){
    error=0;
    option_color(2);
    var object=document.getElementsByTagName("button");
    for(var i=0; i<object.length; i++){
        object[i].disabled=false;
    }
}

function Clear(){
    if(judge!=0){}
    else{ /*数字入力中*/
        input="";
        judge=0;
        document.getElementById("result").innerText=0; 
    }
    Error_cancel();
}

function AllClear(){
    total=0;
    input="";
    document.getElementById("result").innerText=0;
    judge=1;
    flag=0;  /*フラグ解除*/
    flag_color();
    Error_cancel(); /*E解除*/
    konstante=0;      /*K解除*/
    option_color(3);
}


function audio(){
    var x=Math.random();    /*10種の打鍵音からランダム*/
    var y=Math.floor(x*10);
   
    document.getElementById("btn_audio"+y).play(); /*クリックしたら音を再生*/
    document.getElementById("btn_audio"+y).currentTime=0; /*連続クリックに対応*/
}
function mute(){
    if(document.getElementById("btn_audio0").muted){
        for(var i=0; i<10; i++){
            document.getElementById("btn_audio"+i).muted=false;
        }
    }else{
        for(var i=0; i<10; i++){
            document.getElementById("btn_audio"+i).muted=true;
        }
    }
}