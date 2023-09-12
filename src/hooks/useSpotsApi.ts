import { useCallback } from "react";
import { ApiSpots, Spot } from "../types";
import axios from "axios";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useAppDispatch } from "../store";
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
} from "../store/ui/uiSlice";
import { showError } from "../components/Feedback/toast";
export const apiUrl = import.meta.env.VITE_API_URL;

const useSpotsApi = () => {
  const [user] = useIdToken(auth);
  const dispatch = useAppDispatch();

  const getSpots = useCallback(async (): Promise<Spot[]> => {
    dispatch(startLoadingActionCreator());

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

      dispatch(stopLoadingActionCreator());
      return spots;
    } catch {
      showError();
      dispatch(stopLoadingActionCreator());
      throw new Error("Can't get spots right now");
    }
  }, [dispatch, user]);

  return { getSpots };
};

export default useSpotsApi;
