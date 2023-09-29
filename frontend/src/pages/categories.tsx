import Layout from "@/components/Layout";
import axios from "axios";
import { FormEvent } from "react";
import { useRouter } from "next/router";

export default function Categories() {

    const router = useRouter();
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("envoi des données");
        const formData = new FormData(e.target as HTMLFormElement);
        const formJSON: any = Object.fromEntries(formData.entries());
        axios
          .post("http://localhost:4000/categories", formJSON)
          .then(() => {
            router.push('/');
          })
          .catch(console.error);
        
      };

      return (
        <>
            <Layout title="Création d'une catégorie">
                <h2 className="flex justify-center font-bold text-3xl mb-8">Pour créer votre catégorie, c'est ici !</h2>

                <div className="flex justify-center">
                    <form className="bg-slate-200 shadow-md rounded p-8 mb-4 grid grid-cols-2 gap-8" onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="name">Nom</label>
                            <br />
                            <input className="rounded-md" type="text" name="name" id="name" required/>
                        </div>

                        <button className="hover:bg-lime-400 button w-16" type="submit">Envoyer</button>
                    </form>
                </div>
            </Layout>
          
        </>
      )
}