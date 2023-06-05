import defImage from "@/images/system/default.jpg"
import configRoutes from "@/config/API_routes"


export default function Img({
    className = "",
    src,
    isAPIimage=false,
    alt = "alternative image text"
}) {
    // вывод дефолтной картинки
    let nsrc = defImage.src;

    // или вывод нормальной картинки с АПИ/без путями
    if (src !== undefined && src !== null){
        nsrc = isAPIimage? `${configRoutes.API_IMAGES_STORAGE}/`: "";
        nsrc += src
    }

    return (
        <img
            className={className}
            src={nsrc}
            alt={alt}
        />
    );
}
