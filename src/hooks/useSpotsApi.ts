import { useCallback } from "react";
import { ApiSpots, Spot } from "../types";
import axios from "axios";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const apiUrl = import.meta.env.VITE_API_URL;

const useSpotsApi = () => {
  const [user] = useIdToken(auth);

  const getSpots = useCallback(async (): Promise<Spot[]> => {
    try {
      const token = await user?.getIdToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data: apiSpots } = await axios.get<ApiSpots>(
        `${apiUrl}/spots`,
        config,
      );

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
  }, [user]);

  return { getSpots };
};

export default useSpotsApi;
