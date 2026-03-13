function triggerDownload(dataUrl, fileName) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link); // Body mein add karna zaroori hai
    link.click();
    document.body.removeChild(link); // Download ke baad remove
}

// Convert function ko aise update karein:
function convert(type, ext, id) {
    const file = document.getElementById(id).files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width; canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img,0,0);
            
            // Yahan hum naya download handler use karenge
            const dataUrl = canvas.toDataURL(type);
            triggerDownload(dataUrl, 'converted-file.' + ext);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}