export interface ApiSpot {
  _id: string;
  name: string;
  imageUrl: string;
  spotUse: string;
  opening: number;
  visited: boolean;
}

export interface Spot extends Omit<ApiSpot, "_id"> {
  id: string;
  name: string;
  imageUrl: string;
  spotUse: string;
  opening: number;
  visited: boolean;
}
