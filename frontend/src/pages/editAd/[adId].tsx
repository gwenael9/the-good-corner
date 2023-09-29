import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import Form from "@/components/Form";

export default function EditAd() {

  const router = useRouter();
  const { adId } = router.query;

  const [ad, setAd] = useState<any>(null);

  useEffect(() => {
    if (adId)
      axios
        .get(`http://localhost:4000/ads/${adId}`)
        .then((res) => setAd(res.data))
        .catch(console.error);
  }, [adId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.price = parseFloat(formJSON.price);

    axios
      .patch(`http://localhost:4000/ads/${ad?.id}`, formJSON)
      .then((res) => {
        router.push(`/ads/${res.data.id}`);
      })
      .catch(console.error);
  };

  return (

    <Layout title="Création d'une annonce">

        <h2 className="flex justify-center font-bold text-3xl mb-8">Pour modifier votre annonce, c'est ici !</h2>
        {ad && (
            <div className="flex justify-center">
                <Form onSubmit={handleSubmit} initialData={ad} />
            </div>
       
      )}
    </Layout>

    )

}