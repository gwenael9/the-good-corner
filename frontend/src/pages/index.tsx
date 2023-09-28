import Layout from "@/components/Layout";
import RecentAds from "@/components/RecentAds";

export default function Home() {
  return (
    <Layout title="Accueil - TGC">
      <h1 className="text-red-900 font-bold mb-5 flex justify-center">Bienvenue sur TheGoodCorner, site référence n°1 dans l'achat/vente de seconde main.</h1>
      <RecentAds />
    </Layout>
  );
}
