import { rest } from "msw";
import { apiUrl } from "../hooks/useSpotsApi";
import { spotsMock } from "./mocks";

export const handlers = [
  rest.get(`${apiUrl}/spots`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(spotsMock));
  }),
];
