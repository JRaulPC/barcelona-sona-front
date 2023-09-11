import { rest } from "msw";
import { apiUrl } from "../hooks/useSpotsApi";
import { apiSpotsMock } from "./mocks";

export const handlers = [
  rest.get(`${apiUrl}/spots`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(apiSpotsMock));
  }),
];

export const errorHandlers = [
  rest.get(`${apiUrl}/spots`, (_req, res, ctx) => {
    return res(ctx.status(404, "Can't get spots right now"));
  }),
];
