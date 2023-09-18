import axios from "axios";
import { useCallback } from "react";
import { useIdToken } from "react-firebase-hooks/auth";
import {
  createSuccesFeedback,
  deleteSuccessFeedback,
  showFeedback,
} from "../components/Feedback/toast";
import { auth } from "../firebase";
import { useAppDispatch } from "../store";
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
} from "../store/ui/uiSlice";
import { ApiSpots, Spot } from "../types";

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
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data: apiSpots } = await axios.get<ApiSpots>(
        `${apiUrl}/spots`,
        requestConfig,
      );

      const spots = apiSpots.spots.map(({ _id, ...spot }) => ({
        id: _id,
        ...spot,
      }));

      dispatch(stopLoadingActionCreator());

      return spots;
    } catch (error: unknown) {
      const message = "No se pueden mostrar espacios";

      showFeedback(message, "error");
      dispatch(stopLoadingActionCreator());
      throw new Error(message);
    }
  }, [dispatch, user]);

  const deleteSpot = useCallback(
    async (id: string) => {
      try {
        if (!user) {
          throw new Error("Usuario no encontrado");
        }

        const token = await user.getIdToken();
        const requestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const {
          data: { message },
        } = await axios.delete(`${apiUrl}/spots/${id}`, requestConfig);

        showFeedback(deleteSuccessFeedback, "success");

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

  const addSpot = useCallback(
    async (spot: Partial<Spot>) => {
      try {
        if (!user) {
          throw new Error("User not found");
        }

        const token = await user.getIdToken();
        const requestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data: newSpot } = await axios.post<Spot>(
          `${apiUrl}/spots`,
          spot,
          requestConfig,
        );

        showFeedback(createSuccesFeedback, "success");

        return newSpot;
      } catch (error: unknown) {
        const message = "No se pudo añadir el espacio";

        showFeedback(message, "error");

        dispatch(stopLoadingActionCreator());
        throw new Error(message);
      }
    },
    [dispatch, user],
  );

  const getSpotById = useCallback(
    async (id: string): Promise<Spot | undefined> => {
      try {
        if (!user) {
          throw new Error("User not found");
        }

        const token = await user.getIdToken();
        const requestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data: apiSpot } = await axios.get(
          `${apiUrl}/spots/${id}`,
          requestConfig,
        );

        const selectedSpot = { id: apiSpot.spot._id, ...apiSpot.spot };
        delete selectedSpot._id;

        return selectedSpot;
      } catch (error: unknown) {
        const message = "No se puede mostrar el espacio";

        showFeedback(message, "error");

        throw new Error(message);
      }
    },
    [user],
  );

  const toogleIsVisited = useCallback(
    async (
      id: string,
      spotToggle: Pick<Spot, "isVisited">,
    ): Promise<Spot | undefined> => {
      try {
        if (!user) {
          throw new Error("User not found");
        }

        const token = await user.getIdToken();
        const requestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { isVisited } = spotToggle;

        const { data: apiSpot } = await axios.patch(
          `${apiUrl}/spots/${id}`,
          { isVisited },
          requestConfig,
        );

        const updatedSpot = { id: apiSpot.spot._id, ...apiSpot.spot };
        delete updatedSpot._id;

        return updatedSpot;
      } catch (error: unknown) {
        const message = "No se puede actualizar el espacio";

        showFeedback(message, "error");

        throw new Error(message);
      }
    },
    [user],
  );

  return { getSpots, deleteSpot, addSpot, getSpotById, toogleIsVisited };
};

export default useSpotsApi;
