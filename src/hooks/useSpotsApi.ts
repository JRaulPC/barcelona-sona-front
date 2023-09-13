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
import { showFeedback } from "../components/Feedback/toast";

export const apiUrl = import.meta.env.VITE_API_URL;

const useSpotsApi = () => {
  const [user] = useIdToken(auth);
  const dispatch = useAppDispatch();

  const getSpots = useCallback(async (): Promise<Spot[] | undefined> => {
    dispatch(startLoadingActionCreator());

    try {
      if (!user) {
        throw new Error("User not found");
      }

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
      const message = "Can't get spots right now";

      showFeedback(message, "error");
      dispatch(stopLoadingActionCreator());
      throw new Error(message);
    }
  }, [dispatch, user]);

  const deleteSpot = useCallback(
    async (id: string) => {
      try {
        if (!user) {
          throw new Error("User not found");
        }

        const token = await user.getIdToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data: message } = await axios.delete<string>(
          `${apiUrl}/spots/${id}`,
          config,
        );

        showFeedback(message, "success");

        return message;
      } catch (error: unknown) {
        const message = "No se puede borrar el espacio";

        showFeedback(message, "error");
        dispatch(stopLoadingActionCreator());
        throw new Error(message);
      }
    },
    [dispatch, user],
  );

  return { getSpots, deleteSpot };
};

export default useSpotsApi;
