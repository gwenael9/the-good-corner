export type Ad = {
    id: number;
    title: string;
    description: string;
    author: string;
    price: number;
    picture: string;
    city: string;
    createdAt: string;
    category?: Category;
};

export type Category = {
    id: number;
    name: string;
};

export type Tag = {
    id: number;
    name: string;
}