export type ImagesProps = {
  id: number;
  fileName: string;
  idProduct: number;
};

export type ProductsData = {
  description: string;
  images: ImagesProps[];
  name: string;
  price: string;
  quantity: number;
};

export type FavoriteProps = {
  id: number;
  idProduct: number;
  idUSer: number;
  product: ProductsData;
};

export type FavoriteData = {
  hasNext: false;
  items: FavoriteProps[];
};
