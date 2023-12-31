import Layout from "@/components/Layout"
import { Ad, Category } from "@/types";
import { useRouter } from "next/router"
import axios from 'axios';
import { useEffect, useState } from "react";
import AdCard from "@/components/AdCard";

export default function Search() {

    const router = useRouter();

    const [ads, setAds] = useState<Ad[]>([]);
    const [cats, setCats] = useState<Category[]>([]);


    useEffect(() => {
        axios
        .get<Ad[]>(`http://localhost:4000/ads?title=${router.query.title || ''}`)
        .then(res => setAds(res.data))
        .catch(console.error)
    }, [router.query.title]);

    useEffect(() => {
        axios
        .get<Category[]>(`http://localhost:4000/categories?name=${router.query.name || ''}`)
        .then(res => setCats(res.data))
        .catch(console.error)
    }, [router.query.name]);
    
    return  (
        <Layout title="recherche - TGC">
            <h2 className="flex-auto text-lg font-semibold text-slate-900 text-center">Voici les annonces de : {router.query.title} ({ads.length})</h2>
            <section className="grid md:grid-cols-3 gap-4 m-8">
                {ads.map((ad) => (
                    <AdCard key={ad.title} ad={ad} link={`/ads/${ad.id}`}/>
                ))}
            </section>
            
        </Layout>
    )
}