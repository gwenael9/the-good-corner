import Layout from "@/components/Layout";
import { Ad, Category } from "@/types";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EditAd() {
  const router = useRouter();
  const { adId } = router.query;

  const [ad, setAd] = useState<Ad>();

  useEffect(() => {
    if (typeof ad === "undefined")
      axios
        .get<Ad>(`http://localhost:4000/ads/${adId}`)
        .then((res) => setAd(res.data))
        .catch(console.error);
  }, [adId]);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get<Category[]>("http://localhost:4000/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

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

}