export class CheckDeviceType {

    public static isMobileDevice(): boolean {
        console.log(navigator.userAgent)
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            console.log("[DeviceType] Вы используете мобильное устройство (телефон или планшет).");
            return true;

        } else { 
            console.log("[DeviceType] Вы используете ПК.");
            return false;
        }
    } 

}

