const screenShotBtn = document.querySelector("#src-btn"),
screenShotPreview = document.querySelector(".src-preview"),
closeBtn = screenShotPreview.querySelector("#close-btn");

const captureScreen = async () => {
    try{
        const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true});
        const video = document.createElement("video");

        video.addEventListener("loadedmetadata", () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = video.videoWidth;
            canvas.height =video.videoHeight;

            video.play();

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            stream.getVideoTracks()[0].stop();
            
            screenShotPreview.querySelector("img").src = canvas.toDataURL();
            screenShotPreview.classList.add("show");

        }); 

        video.srcObject = stream;
    } catch (error) {
        alert("Failed To Capture Screen Shot");
    }
}


closeBtn.addEventListener("click", () => screenShotPreview.classList.remove("show"))
screenShotBtn.addEventListener("click", captureScreen);