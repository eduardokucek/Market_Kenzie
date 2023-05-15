interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: string;
  expirationDate: Date;
  calories: number;
}

type TFoodRequest = IProduct;
type TCleaningRequest = Omit<IProduct, "calories">;

export { IProduct, TFoodRequest, TCleaningRequest };
