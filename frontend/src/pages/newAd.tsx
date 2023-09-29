import Form from "@/components/Form";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent } from "react";


export default function NewAd() {

    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("envoi des données");
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.price = parseFloat(formJSON.price);
    axios
        .post("http://localhost:4000/ads", formJSON)
        .then(() => {
        router.push('/');
        })
        .catch(console.error);
    
    };

    return (
        <>
            <Layout title="Création d'une annonce">

            <h2 className="flex justify-center font-bold text-3xl mb-8">Pour créer votre annonce, c'est ici !</h2>
            <div className="flex justify-center">
                <Form onSubmit={handleSubmit} />
            </div>

            </Layout>
        </>
    )
}
