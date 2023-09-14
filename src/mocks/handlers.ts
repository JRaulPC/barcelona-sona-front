import { rest } from "msw";
import { apiUrl } from "../hooks/useSpotsApi";
import { apiSpotsMock, formMock, spotsMock } from "./mocks";

export const handlers = [
  rest.get(`${apiUrl}/spots`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(apiSpotsMock));
  }),

  rest.delete(`${apiUrl}/spots/${spotsMock[0].id}`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: "Espacio borrado con éxito" }),
    );
  }),

  rest.post(`${apiUrl}/spots`, (_req, res, ctx) => {
    return res(ctx.status(201), ctx.json(formMock));
  }),
];

export const errorHandlers = [
  rest.get(`${apiUrl}/spots`, (_req, res, ctx) => {
    return res(ctx.status(404, "Can't get spots right now"));
  }),
];
