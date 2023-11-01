export type ImagesProps = {
  id: number;
  fileName: string;
  idProduct: number;
};

export type FavoriteProps = {
  id: number;
  idProduct: number;
  idUSer: number;
  product: {
    description: string;
    images: ImagesProps[];
    name: string;
    price: string;
    quantity: number;
  };
};
