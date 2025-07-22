
document.onreadystatechange = function()
{
    if (document.readyState === 'complete')
    {
        if(screen.width > 500){
            document.getElementById("unavailable").style.visibility = "visible";
        }
    }
};

window.addEventListener('load', function() {

    document.getElementById("startBtn").addEventListener("click", hideStart);
})


function hideStart(){
    document.getElementById("startDiv").style.visibility  =  "hidden";
    setTimeout(() => {
        document.getElementById("alertDiv").style.visibility  =  "visible";
    }, 500);
    document.getElementById("alertBtn").addEventListener("click", hideAlert);

}

function hideAlert(){
    document.getElementById("alertDiv").style.visibility  =  "hidden";
    document.getElementById("shadow").style.visibility  =  "hidden";
    for(i=1;i<6;i++){
        showLocation(i);
    }

}

function showLocation(num){
    document.getElementById('location' + num).style.visibility  =  "visible";
    document.getElementById('location' + 3).classList.add("animated");
    document.getElementById('location' + num).addEventListener("click", clickedLocation);
}

function clickedLocation(event){
    document.getElementById("finishBtn").style.visibility  =  "visible";
    document.getElementById("finishBtn").addEventListener("click", endFunction);

    var strNum = String(event.target.id);
    var  num = strNum[strNum.length-1];
  
    if(num == 3){
        document.getElementById('location' + num).classList.remove("animated");
    }
    disableLocation();

    var image = document.getElementById('location' + num);
    image.src = 'Images/locationIcon3Pressed.png';

    document.getElementById("shadow").style.visibility  =  "visible";
    if(num == 2 || num == 3 || num == 4){
        if(num == 3 || num == 4){
            document.getElementById('info' + num).style.visibility = "visible";
        }
        document.getElementById('header' + num).style.visibility = "visible";
        createFrame(num);
    }
    else{
    document.getElementById('info' + num).style.visibility = "visible";

    }
    document.getElementById('closeInfo' + num).style.visibility = "visible";

    handleInfo(num);
}


function animatedLocation(num){
    document.getElementById('location' + num).classList.remove("animated");
}

function handleInfo(num){
    document.getElementById('closeInfo' + num).addEventListener("click", closeInfo);
}

function closeInfo(event){
    var strNum = String(event.target.id);
    var  num = strNum[strNum.length-1];
    if(num == 2 || num == 3|| num == 4){
        if(num == 3 || num == 4){
            document.getElementById('info' + num).style.visibility = "hidden";
        }
        document.getElementById('header' + num).style.visibility = "hidden";
        deleteFrame(num);
    }
    else{
        document.getElementById('info' + num).style.visibility = "hidden";
    }
    document.getElementById('closeInfo' + num).style.visibility = "hidden";

    document.getElementById("shadow").style.visibility  =  "hidden";
    enableLocation();

}


function disableLocation(){
    for(num=1;num<6;num++){
        document.getElementById('location' + num).classList.add("lowLocation"); //opacity
        document.getElementById('location' + num).removeEventListener("click", clickedLocation);

        if( document.getElementById('location' + num).classList.contains("animated")){
            document.getElementById('location' + num).classList.remove("animated");
            document.getElementById('location' + num).classList.remove("lowLocation");

            document.getElementById('location' + num).classList.add("lowAnimated");
        }
    }
    document.getElementById("finishBtn").removeEventListener("click", endFunction);
    document.getElementById("finishBtn").classList.add("under");
}


function enableLocation(){
    for(num=1;num<6;num++){
        document.getElementById('location' + num).classList.remove("lowLocation");
        document.getElementById('location' + num).addEventListener("click", clickedLocation);

        if( document.getElementById('location' + num).classList.contains("lowAnimated")){
            document.getElementById('location' + num).classList.add("animated");
            document.getElementById('location' + num).classList.remove("lowAnimated");
        }
    }
    document.getElementById("finishBtn").addEventListener("click", endFunction);
    document.getElementById("finishBtn").classList.remove("under");
}



function createFrame(num){
    var ifrm = document.createElement("div");
    var srcArr = ["https://www.youtube-nocookie.com/embed/RU24Tl5AWsg?si=KtgFFE8yJ_354CWp", "https://www.youtube.com/embed/Cgf1W48siEo?si=a4IZyK4MEe5WUyYv", "https://www.youtube.com/embed/ZRXVP2mZ_V8?si=A6N2bfmN-zprGGrN"];
    ifrm.setAttribute("id", 'vidFrame' + num);
    ifrm.innerHTML = '<iframe id="vid'+ num + '" src=' + srcArr[num -2] + 'title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>';

    document.body.appendChild(ifrm);

}

function deleteFrame(num){ 
    document.getElementById('vidFrame' + num).remove();
}


function endFunction(){
    for(num=1;num<6;num++){
        document.getElementById('location' + num).style.visibility  =  "hidden";
    }

    document.getElementById("shadow").style.visibility  =  "visible";
    document.getElementById("credits").style.visibility  =  "visible";
    document.getElementById("finishBtn").style.visibility  =  "hidden";
}
