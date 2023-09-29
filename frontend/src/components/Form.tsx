import React, { FormEvent, useState, useEffect } from "react";
import { Category } from "@/types";
import axios from "axios";

type FormProps = {
  onSubmit: (formData: any) => void;
  initialData?: any;
};

const Form: React.FC<FormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get<Category[]>("http://localhost:4000/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-200 shadow-md rounded p-8 mb-4 grid grid-cols-2 gap-8">
        <div className="mb-4">
            <label className="font-semibold" htmlFor="name">Titre</label>
            <br />
            <input
                defaultValue={formData.title}
                required
                type="text"
                name="title"
                id="title"
                placeholder="Zelda : Occarina of time"
                className="rounded-md"
                onChange={handleInputChange}
            />
        </div>
        
        <div className="mb-4">
            <label className="font-semibold" htmlFor="picture">Image</label>
            <br />
            <input
                defaultValue={formData.picture}
                type="text"
                name="picture"
                id="picture"
                required
                placeholder="https://imageshack.com/zoot.png"
                className="rounded-md"
                onChange={handleInputChange}
            />
        </div>

        <div className="mb-4">
            <label className="font-semibold" htmlFor="city">Ville</label>
            <br />
            <input
                defaultValue={formData.city}
                type="text"
                name="location"
                id="location"
                required
                placeholder="Paris"
                className="rounded-md"
                onChange={handleInputChange}
            />
        </div>

        <div className="mb-4">
            <label className="font-semibold" htmlFor="author">Auteur</label>
            <br />
            <input
                type="text"
                name="owner"
                defaultValue={formData.author}
                id="owner"
                required
                placeholder="Link"
                className="rounded-md"
                onChange={handleInputChange}
            />
        </div>

        <div className="mb-4">
            <label className="font-semibold" htmlFor="description">Description</label>
            <br />
            <textarea
            defaultValue={formData.description}
            className="textarea textarea-bordered"
            placeholder="The Legend of Zelda: Ocarina of Time est un jeu vidéo d'action-aventure développé par Nintendo EformData et édité par Nintendo sur Nintendo 64. Ocarina of Time raconte l'histoire de Link, un jeune garçon vivant dans un village perdu dans la forêt, qui parcourt le royaume d'Hyrule pour empêcher Ganondorf d'obtenir la Triforce, une relique sacrée partagée en trois : le courage (Link), la sagesse (Zelda) et la force (Ganondorf)."
            name="description"
            id="description"
            required
            onChange={handleInputChange}
            ></textarea>
        </div>

        <div className="mb-4">
            <label className="font-semibold" htmlFor="price">Prix</label>
            <br />
            <input
                required
                type="number"
                name="price"
                id="price"
                defaultValue={formData.price}
                min={0}
                placeholder="30"
                className="rounded-md"
                onChange={handleInputChange}
            />
        </div>

        <div className="mb-4">
            <label className="font-semibold" htmlFor="category">Catégories</label>
            <br />
            <select
                className="rounded-md"
                id="category"
                name="category"
                required
                value={formData.category || ""}
                onChange={handleInputChange}
            >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>
                ))}
            </select>
        </div>

        <button className="hover:bg-lime-400 button w-20" type="submit">
            Enregistrer
        </button>

    </form>
  );
};

export default Form;
