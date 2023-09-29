import { Category } from "@/types";
import { CheckIcon, PencilSquareIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";

interface AdminCategoryRowProps {
    category: Category;
    handleDeleteCategory: (id: number) => Promise<void>
}

export default function AdminCategoryRow({category: { id, name }}: AdminCategoryRowProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [displayedName, setDisplayedName] = useState(name);

    const handleSave = async () => {
        try {
          if (displayedName) {
            await axios.patch(`http://localhost:4000/categories/${id}`, {
              name: displayedName,
            });
            setIsEditing(false);
          }
        } catch (err) {
          console.error(err);
          setDisplayedName(name);
        }
    };

    function handleDeleteCategory(id: number) {
        throw new Error("Function not implemented.");
    }

    return (
        <tr>
            <td>{id}</td>
            <td>
                {isEditing ? (
                <input
                    type="text"
                    className="input"
                    value={displayedName}
                    onChange={(e) => setDisplayedName(e.target.value)}
                />
                ) : (
                displayedName
                )}
            </td>
            <td>
                {isEditing ? (
                <div>
                    <button onClick={handleSave}>
                    <CheckIcon width={24} height={24} className="cursor-pointer mr-z"/>
                    </button>
                    <button
                    onClick={() => {
                        setIsEditing(false);
                        setDisplayedName(name);
                    }}
                    >
                    <XCircleIcon width={24} height={24} className="ml-2" />
                    </button>
                </div>
                ) : (
                <div>
                    <button onClick={() => setIsEditing(true)}>
                        <PencilSquareIcon width={24} height={24} />
                    </button>
                    <button
                        onClick={() => {
                            if (
                            confirm(
                                "voulez vous vraiement supprimer la categorie ? Toutes les annonces liées seront également supprimées"
                            )
                            )
                            handleDeleteCategory(id);
                        }}
                        >
                        <TrashIcon width={24} height={24} className="ml-2" />
                    </button>
                </div>
                )}
            </td>
        </tr>
    )
}