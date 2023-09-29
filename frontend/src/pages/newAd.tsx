import Layout from "@/components/Layout";
import { Category } from "@/types";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function NewAd() {

    const [categories, setCategories] = useState<Category[]>([]);
    const router = useRouter();

    useEffect(() => {
        axios
          .get<Category[]>("http://localhost:4000/categories")
          .then((res) => setCategories(res.data))
          .catch(console.error);
      }, []);

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
                    <form className="bg-slate-200 shadow-md rounded p-8 mb-4 grid grid-cols-2 gap-8" onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="name">Titre</label>
                            <br />
                            <input className="rounded-md" type="text" name="title" id="name" required/>
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="picture">Image</label>
                            <br />
                            <input className="rounded-md" type="text" name="picture" id="picture" required/>           
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="city">Ville</label>
                            <br />
                            <input className="rounded-md" type="text" name="city" id="city" required/>          
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="author">Auteur</label>
                            <br />
                            <input className="rounded-md" type="text" name="author" id="author" required/>                    
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="description">Description</label> 
                            <br />
                            <textarea className="rounded-md" name="description" id="description" required></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="price">Prix</label>
                            <br />
                            <input className="rounded-md" type="number" name="price" id="price" min={0} required/>          
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="category">Catégories</label>
                            <br />
                            <select className="rounded-md" name="category" id="category">
                                {categories.map(cat => 
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                )}
                            </select>           
                        </div>

                        <button className="hover:bg-lime-400 button w-16" type="submit">Envoyer</button>
                    </form>
                </div>

            </Layout>
        </>
    )
}



            {/*  */}

