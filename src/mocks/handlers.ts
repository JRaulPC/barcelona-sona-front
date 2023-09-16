import { rest } from "msw";
import { apiUrl } from "../hooks/useSpotsApi";
import {
  addSpotWithFormMock,
  apiSpot,
  apiSpotsMock,
  formMock,
  spotMock,
  spotsMock,
} from "./mocks";

export const handlers = [
  rest.get(`${apiUrl}/spots`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(apiSpotsMock));
  }),

  rest.get(`${apiUrl}/spots/${spotMock.id}`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(apiSpot));
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
    return res(ctx.status(404, "No se pueden mostrar espacios"));
  }),
  rest.get(`${apiUrl}/spots/${spotsMock[0].id}`, (_req, res, ctx) => {
    return res(ctx.status(404, "No se puede mostrar el espacio"));
  }),
  rest.delete(`${apiUrl}/spots/${spotsMock[0].id}`, (_req, res, ctx) => {
    return res(ctx.status(404, "No se puede borrar el espacio"));
  }),
  rest.post(`${apiUrl}/spots`, (_req, res, ctx) => {
    return res(ctx.status(400, "No se pueden añadir el espacio"));
  }),
];

export const formHandler = [
  rest.get(`${apiUrl}/spots`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(addSpotWithFormMock));
  }),

  rest.post(`${apiUrl}/spots`, (_req, res, ctx) => {
    return res(ctx.status(201), ctx.json(formMock));
  }),
];
