let finishBtn, alertDiv, shadow, flickeringLocation, videoLocations;
import { infosData } from "./data.js";
const locationElements = {};
const TOTAL_LOCATIONS = 5;
const HAS_SPECIAL_VIDEO = 2;

document.onreadystatechange = function()
{
    if (document.readyState === 'complete')
    {
        finishBtn = document.getElementById("finishBtn");
        alertDiv = document.getElementById("alertDiv");
        shadow = document.getElementById("shadow");
        videoLocations = [2,3,4];

        if(screen.width > 450){
            showElement( document.getElementById("mobileScreen"));
        }
        else{
            createInfos();
            showElement(document.getElementById("loadScreen"));
        }
    }
};

window.addEventListener('load', function() {
    document.getElementById("startBtn").addEventListener("click", hideStart);    
    finishBtn.addEventListener("click", handleFinish);

})

function createInfos() {
    const container = document.getElementById("infosContainer");

    infosData.forEach(info => {

        const infoDiv = document.createElement("div");

        infoDiv.id = `info${info.id}`;
        infoDiv.className = "info";
        infoDiv.classList.add('hidden');

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

function showElement(element) {
    element.classList.remove("hidden");
    element.classList.add("visible");
}

function hideElement(element) {
    element.classList.remove("visible");
    element.classList.add("hidden");
}

function hideStart(){
    hideElement(document.getElementById("startDiv"));

    setTimeout(() => {
        showElement(alertDiv)
    }, 500);
    document.getElementById("alertBtn").addEventListener("click", hideAlert);

}

function hideAlert(){
    hideElement(alertDiv);
    hideElement(shadow)

    handleAddLocations();
   
    flickeringLocation = document.getElementById('location3');
    flickeringLocation.classList.add("animated");
}

function handleAddLocations(){
    const locationsContainer = document.getElementById("locationsContainer");

    for (let id = 1; id <= TOTAL_LOCATIONS; id++) {
        const img = document.createElement("img");

        img.id = `location${id}`;
        img.classList.add("location");
        img.src = "./src/assets/Images/locationIcon.png";
        img.classList.add('visible');

        locationsContainer.appendChild(img);
    }

     for (let id = 1; id <= TOTAL_LOCATIONS; id++) {
        locationElements[id] =
            document.getElementById(`location${id}`);
       locationElements[id].addEventListener("click", handleOpenInfo);

    }
}

function handleOpenInfo(event){
    showElement(finishBtn);

    const location = String(event.target.id);
    const locationId = Number(location.replace("location", ""));
    console.log(locationId);
  
   flickeringLocation.classList.remove("animated");
    
    disableLocation();

    let image = locationElements[locationId];
    image.src = './src/assets/Images/locationIcon3Pressed.png';

    showElement(shadow)

    if(videoLocations.includes(locationId)){
        if(locationId !== HAS_SPECIAL_VIDEO){
            showElement( document.getElementById('info' + locationId))
        }
        showElement(document.getElementById('header' + locationId));
        createFrame(locationId);
    }
    else{
        showElement(document.getElementById('info' + locationId));
    }
    showElement(document.getElementById('closeBtn' + locationId));
    document.getElementById('closeBtn' + locationId).addEventListener("click", handleCloseInfo);
}


function handleCloseInfo(event){
    const location = String(event.target.id);
    const locationId = Number(location.replace("closeBtn", ""));
    console.log(locationId)

    if(videoLocations.includes(locationId)){
        if(locationId !== HAS_SPECIAL_VIDEO){
            hideElement(document.getElementById('info' + locationId));
        }
        hideElement(document.getElementById('header' + locationId));
        removeFrame(locationId);
    }
    else{
        hideElement(document.getElementById('info' + locationId))
    }
    hideElement(document.getElementById('closeBtn' + locationId));
    hideElement(shadow);
    enableLocation();
}

function disableLocation(){
    for(let id=1; id <= TOTAL_LOCATIONS; id++){
        locationElements[id].classList.add("lowLocation"); //opacity
        locationElements[id].removeEventListener("click", handleOpenInfo);

        if( locationElements[id].classList.contains("animated")){
            locationElements[id].classList.remove("animated");
            locationElements[id].classList.remove("lowLocation");

           locationElements[id].classList.add("lowAnimated");
        }
    }
    finishBtn.removeEventListener("click", handleFinish);
    finishBtn.classList.add("under");
}


function enableLocation(){
    for( let id=1; id<= TOTAL_LOCATIONS; id++){
        locationElements[id].classList.remove("lowLocation");
        locationElements[id].addEventListener("click", handleOpenInfo);

        if( locationElements[id].classList.contains("lowAnimated")){
            locationElements[id].classList.add("animated");
            locationElements[id].classList.remove("lowAnimated");
        }
    }
    finishBtn.addEventListener("click", handleFinish);
    finishBtn.classList.remove("under");
}



function createFrame(id){
    let ifrm = document.createElement("div");
    let srcArr = ["https://www.youtube-nocookie.com/embed/RU24Tl5AWsg?si=KtgFFE8yJ_354CWp", "https://www.youtube.com/embed/Cgf1W48siEo?si=a4IZyK4MEe5WUyYv", "https://www.youtube.com/embed/ZRXVP2mZ_V8?si=A6N2bfmN-zprGGrN"];
    ifrm.setAttribute("id", 'vidFrame' + id);
    ifrm.innerHTML = `
        <iframe
            id="vid${id}"
            src="${srcArr[id - 2]}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        `;

    document.body.appendChild(ifrm);
}

function removeFrame(id){ 
    document.getElementById('vidFrame' + id).remove();
}

function handleFinish(){
    for( let locationId=1; locationId<6; locationId++){
        hideElement(locationElements[locationId])
    }
    showElement(shadow);
    hideElement(finishBtn);
    showElement(document.getElementById("credits"))
}
