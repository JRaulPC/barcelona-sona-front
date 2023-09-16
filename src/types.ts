export interface ApiSpot {
  _id: string;
  name: string;
  imageUrl: string;
  spotUse: string;
  openingYear: number;
  isVisited: boolean;
  description: string;
}

export interface ApiSpots {
  spots: ApiSpot[];
}

export interface Spot extends Omit<ApiSpot, "_id"> {
  id: string;
  name: string;
  imageUrl: string;
  spotUse: string;
  openingYear: number;
  isVisited: boolean;
  description: string;
}
