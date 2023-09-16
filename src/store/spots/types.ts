import { Spot } from "../../types";

export interface SpotsState {
  spots: Spot[];
  selectedSpot?: Spot;
}
