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
                <div className="flex justify-center">
                    <div className="bg-slate-300 rounded-sm grid md:grid-cols-2 p-8 md:gap-6">

                        <div className="flex items-center">
                            <img className="h-80 w-full rounded-md" src={ad.picture} alt={ad.title} />
                        </div>

                        
                        <div className="">
                            
                            <div className="flex justify-between mb-8">
                                <h2 className="font-bold text-lg">{ad.title}</h2>
                                <p className="text-lg font-semibold text-slate-500">{ad.price} €</p>
                            </div>  

                            <p>{ad.description}</p>

                            <p className="text-xs">Cette annonce à été postée par <span className="font-bold">{ad.author}</span>.</p>

                            <div className="flex justify-between mt-8" >
                                <p>{ad.city}</p>

                                <button className="button"><a href={`editAd/${adId}`}>Modifier</a></button>
                                <button className="button" onClick={handleDeleteAd}>Supprimer</button>

                            </div>
                            
                        </div>
                    </div>
                </div>
                
 
            )}
                                
        </Layout>
    );
}


{/*  */}
