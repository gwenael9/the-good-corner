import Head  from "next/head";
import Header from "./Header";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
    title: string;
}

export default function Layout({ children, title}: LayoutProps ) {
    return (
    <>
        <Head>
            <title>{title}</title>
            <meta name="description" content="annonces"/>
            <meta name="viewport" content="width=device-width, initial-scale-1"/>
            <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />
        <main className="py-0 px-4 mt-32">{children}</main>
    </>
    );
}