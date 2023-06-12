import LightGallery from 'lightgallery/react';
import defImage from "@/images/system/default.jpg"
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import Img from '@/Components/Img';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import APIroutes from "@/config/API_routes.json";

export default function Galery({
    images
}: {
    images: { id: number, url: string }[]
}) {

    if (images.length === Number(0))
        return (
            <div className='flex items-center justify-center h-full text-3xl'>
                <i className="bi bi-code-slash"></i>
            </div>
        )

    const apiStorage = APIroutes.API_IMAGES_STORAGE;


    return (
        <>
            <LightGallery
                speed={500}
                plugins={[lgZoom]}
                elementClassNames='flex flex-wrap'
            >
                {
                    images.map(image => {
                        const link = `${apiStorage}/${image.url}`;

                        return (
                            <a key={image.id} className='w-1/4 mx-2' href={link}>
                                <Img className='' alt="img1" src={link} />
                            </a>
                        )
                    })
                }
            </LightGallery>
        </>
    )
}