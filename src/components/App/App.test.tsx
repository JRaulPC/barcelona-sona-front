import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { deletedSpotHandlers, formHandler } from "../../mocks/handlers";
import { formMock, spotMock, spotsMock } from "../../mocks/mocks";
import { server } from "../../mocks/server";
import paths from "../../paths/paths";
import { setupStore } from "../../store";
import App from "./App";

const store = setupStore({
  spotsStore: {
    spots: spotsMock,
    selectedSpot: spotMock,
  },
  uiStore: {
    isLoading: false,
  },
});

const user: Partial<User> = {
  displayName: "Emilio",
  getIdToken: vi.fn().mockResolvedValue("token"),
};
const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given an App component", () => {
  describe("When it is rendered", () => {
    test("Then it should show the text 'Barcelona SONA' inside a header", () => {
      const user: Partial<User> = { displayName: "Emilio" };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const expectedHeading = "Barcelona SONA";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });

    test("And no navigation bar has to be shown.", () => {
      const authStateHookMock: Partial<AuthStateHook> = [null as null];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const listRoute = "/espacios";

      render(
        <MemoryRouter initialEntries={[listRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const navBar = screen.queryByRole("navigation");

      expect(navBar).not.toBeInTheDocument();
    });
  });

  describe("When a Page 404 is rendered and the 'Consulta que espacios tienen su acústica registrada o añade el tuyo.' is clicked", () => {
    test("Then it should show a page with the title 'Espacios' ", async () => {
      const expectedHeadingText =
        "Consulta que espacios tienen su acústica registrada o añade el tuyo.";

      const errorPath = "/holi";

      const buttonText = "Volver al inicio";

      render(
        <MemoryRouter initialEntries={[errorPath]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const backHomeLink = await screen.findByRole("link", {
        name: buttonText,
      });

      await userEvent.click(backHomeLink);

      const listHeading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(listHeading).toBeInTheDocument();
    });
  });

  describe("When a page with the text 'Añade un nuevo espacio' as a heading is shown and and the user fills the form and clicks the button with the text 'Añadir espacio' ", () => {
    test("Then is should show a page with the text 'Espacios' as a heading and a new card in the spots list that has the text 'St. Felip Neri' as a heading  ", async () => {
      server.resetHandlers(...formHandler);

      const user: Partial<User> = {
        displayName: "Emilio",
        getIdToken: vi.fn().mockResolvedValue("token"),
      };
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue([user]);
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const cardExpectedHeading = "St. Felip Neri";
      const newSpotroute = "/crear";

      render(
        <MemoryRouter initialEntries={[newSpotroute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const nameInputLabelText = "Espacio";
      const imageInputLabelText = "URL Imagen";
      const openingYearLabelText = "Año de creación";
      const spotUseInputLabelText = "Función del espacio";
      const spotDescriptionInputLabelText = "Descripción";
      const buttonText = "Añadir espacio";

      const nameInput = await screen.findByLabelText(nameInputLabelText);
      const imageInput = await screen.findByLabelText(imageInputLabelText);
      const OpeningYearInput = await screen.findByLabelText(
        openingYearLabelText,
      );
      const spotUseInput = await screen.findByLabelText(spotUseInputLabelText);
      const descriptionInput = screen.getByLabelText(
        spotDescriptionInputLabelText,
      ) as HTMLInputElement;

      await userEvent.type(nameInput, formMock.name!);
      await userEvent.type(imageInput, formMock.imageUrl!);
      await userEvent.type(OpeningYearInput, formMock.openingYear!.toString());
      await userEvent.type(spotUseInput, formMock.spotUse!.toString());
      await userEvent.type(descriptionInput, formMock.description!);

      const createButton = await screen.findByRole("button", {
        name: buttonText,
      });

      await userEvent.click(createButton);

      waitFor(async () => {
        const cardHeading = await screen.findByRole("heading", {
          name: cardExpectedHeading,
        });

        expect(cardHeading).toBeInTheDocument();
      });
    });
  });

  describe("When a list of cards with spots names as headings are shown ", () => {
    test("Then the card with the heading 'La modelo' should have a button with a link to path '/detalle/1' ", async () => {
      const linkText = "Ver más";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>,
      );

      const link = await screen.findAllByRole("link", { name: linkText });

      await userEvent.click(link[0]);

      expect(link[0]).toHaveAttribute("href", "/detalle/1");
    });
  });

  describe("When the user clicks the 'Ver más' link of 'La modelo' card'", () => {
    test("Then it should show a detail page with the spot 'La modelo' as a heading", async () => {
      const linkText = "Ver más";
      const headingText = spotMock.name;
      const detailPath = "/detalle/1";

      render(
        <MemoryRouter
          initialEntries={[paths.spots, detailPath]}
          initialIndex={0}
        >
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const link = await screen.findAllByRole("link", { name: linkText });

      await userEvent.click(link[0]);

      const heading = await screen.findByRole("heading", {
        name: headingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the a page with the heading 'La modelo' shown and the button with the text 'Eliminar' is clicked", () => {
    const buttonText = "Eliminar";
    const headingText = "Espacios";
    const detailPath = "/detalle/1";

    test("Then a page with the text 'Espacios' as a heading has to be shown", async () => {
      render(
        <MemoryRouter
          initialEntries={[paths.spots, detailPath]}
          initialIndex={1}
        >
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const deleteButton = await screen.findByRole("button", {
        name: buttonText,
      });

      await userEvent.click(deleteButton);

      const heading = await screen.findByRole("heading", {
        name: headingText,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then the card with the heading 'La modelo' does not have to be shown", async () => {
      server.resetHandlers(...deletedSpotHandlers);
      const cardHeadingText = spotMock.name;

      render(
        <MemoryRouter
          initialEntries={[paths.spots, detailPath]}
          initialIndex={1}
        >
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const deleteButton = await screen.findByRole("button", {
        name: buttonText,
      });

      await userEvent.click(deleteButton);

      const heading = screen.queryByRole("heading", {
        name: cardHeadingText,
      });

      expect(heading).not.toBeInTheDocument();
    });
  });
});
