import { Ad } from "@/types";
import Link from "next/link";
import { useState } from "react";

export type AdCardProps = {
  ad: Ad;
  link: string;
  onAddPrice?: (price: number) => void;
};

export default function AdCard({
  ad: { price, title, picture },
  link,
  onAddPrice,
}: AdCardProps) {
const [test, setTest] = useState(0);

  return (
    <>
      <div className=" bg-slate-300 rounded-md border">
        <Link className="flex-none w-full" href={link}>
          <img className="w-full h-80 object-cover" src={picture} />
          <div className="p-3 flex">
            <div className="flex-auto text-lg font-semibold text-slate-900">
              {title}
            </div>
            <div className="text-lg font-semibold text-slate-500">
              {price} €
            </div>
          </div>
        </Link>

        {typeof onAddPrice === "function" && (
          <div className="flex justify-between	p-4">
            <button
              className="button hover:bg-white"
              onClick={() => {
                onAddPrice(price);
                setTest(test + 1);
              }}
            >
              Ajouter au panier
            </button>
            <p className="button">{test}</p>
          </div>
        )}
      </div>
    </>
  );
}

/*        <div className="flex font-sans border p-6 rounded-md bg-slate-300">
            <div className="flex-none w-48 relative">
                <img src={picture} alt="" className="rounded-md w-full" loading="lazy" />
            </div>

            <form className="flex-auto p-6">

                <div className="flex flex-wrap">
                    <h3 className="flex-auto text-lg font-semibold text-slate-900">
                        {title}
                    </h3>
                    <div className="text-lg font-semibold text-slate-500">
                        {price} €
                    </div>
                </div>

                {typeof onAddPrice === "function" && (
                    <div className="flex space-x-4 mt-6 text-sm font-medium">
                        <div className="flex-auto flex space-x-4">

                            <button className="button" type="button"  onClick={() => { onAddPrice(price); setTest(test + 1)}}>Add to bag</button>
                        </div>
                        
                        <button className="button" type="button" aria-label="Like">
                            <p>{test}</p>
                        </button>
                    </div>
                )}

            </form>
        </div>


*/
