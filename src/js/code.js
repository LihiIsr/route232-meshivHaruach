var finishBtn, alertDiv, shadow, flickeringLocation, videoLocations;
import { infosData } from "./data.js";


document.onreadystatechange = function()
{
    if (document.readyState === 'complete')
    {
        finishBtn = document.getElementById("finishBtn");
        alertDiv = document.getElementById("alertDiv");
        shadow = document.getElementById("shadow");
        videoLocations = [2,3,4];

        if(screen.width > 450){
            document.getElementById("mobileScreen").classList.add("visible");
        }
        else{
            createInfos();
            document.getElementById("loadScreen").classList.add("visible");

        }
    }
};

window.addEventListener('load', function() {
    document.getElementById("startBtn").addEventListener("click", hideStart);
})

function createInfos() {
    const container = document.getElementById("infosContainer");

    infosData.forEach(info => {

        const infoDiv = document.createElement("div");

        infoDiv.id = `info${info.id}`;
        infoDiv.className = "info";
        infoDiv.style.visibility = "hidden";

        let carouselHTML = "";

        if (info.images) {

            carouselHTML = `
                <div id="carousel${info.id}" 
                     class="carousel slide carouselSize">

                    <div class="carousel-inner">

                        ${info.images.map((img, index) => `
                            <div class="carousel-item ${index === 0 ? "active" : ""}">
                                <img src="${img}" class="d-block w-100">
                            </div>
                        `).join("")}

                    </div>

                    <button class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carousel${info.id}"
                        data-bs-slide="prev">

                        <span class="carousel-control-prev-icon"></span>
                    </button>

                    <button class="carousel-control-next"
                        type="button"
                        data-bs-target="#carousel${info.id}"
                        data-bs-slide="next">

                        <span class="carousel-control-next-icon"></span>
                    </button>

                </div>
            `;
        }

        infoDiv.innerHTML = `
            <p id="header${info.id}" class="header">
                ${info.title}
            </p>

            ${carouselHTML}

            <p id="infoText${info.id}" class="infoText">
                ${info.text}
            </p>

            <img
                id="closeBtn${info.id}"
                class="closeBtn"
                src="./src/assets/Images/close.png"
            >
        `;

        container.appendChild(infoDiv);
    });
}

function hideStart(){
    document.getElementById("startDiv").classList.add("hidden");
    document.getElementById("startDiv").classList.remove("visible");

    setTimeout(() => {
        alertDiv.classList.add("visible");
    }, 500);
    document.getElementById("alertBtn").addEventListener("click", hideAlert);

}

function hideAlert(){
    alertDiv.classList.remove("visible");
    alertDiv.classList.add("hidden");
    shadow.classList.remove("visible");
    shadow.classList.add("hidden");

    handleAddLocations();
   
    flickeringLocation = document.getElementById('location3');
    flickeringLocation.classList.add("animated");
}

function handleAddLocations(){
    const locationsContainer = document.getElementById("locationsContainer");

    for (let i = 1; i <= 5; i++) {
        const img = document.createElement("img");

        img.id = `location${i}`;
        img.classList.add("location");
        img.src = "./src/assets/Images/locationIcon.png";
        img.style.visibility = "visible";

        locationsContainer.appendChild(img);
        document.getElementById('location' + i).addEventListener("click", handleOpenInfo);

    }
}

function handleOpenInfo(event){
    finishBtn.classList.remove("hidden");
    finishBtn.classList.add("visible");
    finishBtn.addEventListener("click", handleFinish);

    var location = String(event.target.id);
    var locationId = Number(location[location.length-1]);
    console.log(locationId);
  
   flickeringLocation.classList.remove("animated");
    
    disableLocation();

    var image = document.getElementById('location' + locationId);
    image.src = './src/assets/Images/locationIcon3Pressed.png';

    shadow.classList.remove("hidden");
    shadow.classList.add("visible");

    if(videoLocations.includes(locationId)){
        if(locationId !== 2){
            document.getElementById('info' + locationId).style.visibility = "visible";
        }
        document.getElementById('header' + locationId).style.visibility = "visible";
        createFrame(locationId);
    }
    else{
    document.getElementById('info' + locationId).style.visibility = "visible";

    }
    document.getElementById('closeBtn' + locationId).style.visibility = "visible";
    document.getElementById('closeBtn' + locationId).addEventListener("click", handleCloseInfo);
}


function animatedLocation(id){
    document.getElementById('location' + id).classList.remove("animated");
}


function handleCloseInfo(event){
    var location = String(event.target.id);
    var locationId =Number(location[location.length-1]);

    if(videoLocations.includes(locationId)){
        if(locationId !== 2){
            document.getElementById('info' + locationId).style.visibility = "hidden";
        }
        document.getElementById('header' + locationId).style.visibility = "hidden";
        removeFrame(locationId);
    }
    else{
        document.getElementById('info' + locationId).style.visibility = "hidden";
    }
    document.getElementById('closeBtn' + locationId).style.visibility = "hidden";

    shadow.classList.remove("visible");
    shadow.classList.add("hidden");

    enableLocation();

}


function disableLocation(){
    for(let id=1; id<6; id++){
        document.getElementById('location' + id).classList.add("lowLocation"); //opacity
        document.getElementById('location' + id).removeEventListener("click", handleOpenInfo);

        if( document.getElementById('location' + id).classList.contains("animated")){
            document.getElementById('location' + id).classList.remove("animated");
            document.getElementById('location' + id).classList.remove("lowLocation");

            document.getElementById('location' + id).classList.add("lowAnimated");
        }
    }
    finishBtn.removeEventListener("click", handleFinish);
    finishBtn.classList.add("under");
}


function enableLocation(){
    for( let id=1; id<6; id++){
        document.getElementById('location' + id).classList.remove("lowLocation");
        document.getElementById('location' + id).addEventListener("click", handleOpenInfo);

        if( document.getElementById('location' + id).classList.contains("lowAnimated")){
            document.getElementById('location' + id).classList.add("animated");
            document.getElementById('location' + id).classList.remove("lowAnimated");
        }
    }
    finishBtn.addEventListener("click", handleFinish);
    finishBtn.classList.remove("under");
}



function createFrame(id){
    var ifrm = document.createElement("div");
    var srcArr = ["https://www.youtube-nocookie.com/embed/RU24Tl5AWsg?si=KtgFFE8yJ_354CWp", "https://www.youtube.com/embed/Cgf1W48siEo?si=a4IZyK4MEe5WUyYv", "https://www.youtube.com/embed/ZRXVP2mZ_V8?si=A6N2bfmN-zprGGrN"];
    ifrm.setAttribute("id", 'vidFrame' + id);
    ifrm.innerHTML = '<iframe id="vid'+ id + '" src=' + srcArr[id -2] + 'title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>';

    document.body.appendChild(ifrm);

}

function removeFrame(id){ 
    document.getElementById('vidFrame' + id).remove();
}


function handleFinish(){
    for( let locationId=1; locationId<6; locationId++){
        document.getElementById('location' + locationId).style.visibility  =  "hidden";
    }


    shadow.classList.add("visible");
    document.getElementById("credits").classList.add("visible");
    finishBtn.classList.remove("visible");
    finishBtn.classList.add("hidden");
}
