import { useEffect, useState } from "react";
import AdCard from "./AdCard";
import { Ad } from "@/types";
import axios from "axios";

export default function RecentAds() {

  const [ads, setAds] = useState<Ad[]>([])
  
  // appel asynchrone à notre backend
  useEffect(() => {
    axios
      .get<Ad[]>("http://localhost:4000/ads")
      .then((res) => setAds(res.data))
      .catch(console.error);
    }, []);

  const [total, setTotal] = useState(0);
  const handleAddPrice = (price: number) => setTotal((oldTotal) => oldTotal + price);
  
    return (
      <>
        <h2 className="flex-auto text-lg font-semibold text-slate-900 text-center">Annonces récentes</h2>

        {total > 0 ? (
          <div className="flex justify-end">
          <p className="flex mr-2 w-max items-center">Prix total : {total} €</p>
          <button className="button" onClick={() => setTotal(0)}>Reset</button>
        </div>
        ): null}
        
        <section className="grid md:grid-cols-3 gap-4 m-8">
          {ads.map((ad) => (
              <AdCard 
                key={ad.title} 
                ad={ad}
                onAddPrice={handleAddPrice} 
                link={`/ads/${ad.id}`}
              />
          ))}
        </section>
      </>
    )
}