import Layout from "@/components/Layout";
import { Ad } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function AdDetails() {
    
    const router = useRouter();
    const { adId } = router.query;

    const [ad, setAd] = useState<Ad>();

    useEffect(() => {
        if (typeof ad === 'undefined')
            axios
                .get<Ad>(`http://localhost:4000/ads/${adId}`)
                .then((res) => setAd(res.data))
                .catch(console.error);
    }, [adId]);

    // je supprime mon annonce
    const handleDeleteAd = async () => {
        try {
            await axios.delete(`http://localhost:4000/ads/${adId}`);
            // redirige à l'accueil
            router.push('/');
        } catch (error) {
            console.error('Nooooooooooooooooon', error);
        }
    };

    return (
        <Layout title={`annonce ${adId}`}>

            {typeof ad === 'undefined' ? ( 'Chargement...' ) 
            : ( 
                <section className="bg-gray-400 rounded-sm grid md:grid-cols-2 p-8 gap-2">

                    <img className="w-full rounded-md" src={ad.picture} alt={ad.title} />

                    
                    <div className="">
                        
                        <div className="grid grid-cols-2">
                            <h2 className="font-bold">{ad.title}</h2>
                            <p>{ad.price} €</p>
                        </div>          
                        <p>Par {ad.author}</p>
                        <p>{ad.city}</p>
                        <p>{ad.description} zebi</p>
                        <button className="button" onClick={handleDeleteAd}>Supprimer</button>

                    </div>

                    
                    

                </section>
 
            )}
                                
        </Layout>
    );
}


{/*  */}
