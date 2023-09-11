import { useCallback } from "react";
import { ApiSpots, Spot } from "../types";
import axios from "axios";

export const apiUrl = import.meta.env.VITE_API_URL;

const useSpotsApi = () => {
  const getSpots = useCallback(async (): Promise<Spot[]> => {
    try {
      const { data: apiSpots } = await axios.get<ApiSpots>(`${apiUrl}/spots`);

      const apiSpotsToMap = apiSpots.spots;

      const spots = apiSpotsToMap.map<Spot>(
        ({ _id, imageUrl, isVisited, name, openingYear, spotUse }) => ({
          id: _id,
          imageUrl,
          isVisited,
          name,
          spotUse,
          openingYear,
        }),
      );

      return spots;
    } catch {
      throw new Error("Can't get spots right now");
    }
  }, []);

  return { getSpots };
};

export default useSpotsApi;
