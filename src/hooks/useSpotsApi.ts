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

  const getSpots = useCallback(async (): Promise<Spot[] | undefined> => {
    dispatch(startLoadingActionCreator());

    if (!user) {
      throw new Error("User not found");
    }

    try {
      const token = await user.getIdToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data: apiSpots } = await axios.get<ApiSpots>(
        `${apiUrl}/spots`,
        config,
      );

      const spots = apiSpots.spots.map(({ _id, ...spot }) => ({
        id: _id,
        ...spot,
      }));

      dispatch(stopLoadingActionCreator());
      return spots;
    } catch (error: unknown) {
      showError((error as Error).message);
      dispatch(stopLoadingActionCreator());
    }
  }, [dispatch, user]);

  return { getSpots };
};

export default useSpotsApi;
