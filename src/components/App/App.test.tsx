import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { formHandler } from "../../mocks/handlers";
import { formMock, spotsMock } from "../../mocks/mocks";
import { server } from "../../mocks/server";
import { setupStore } from "../../store";
import App from "./App";

const store = setupStore({
  spotsStore: {
    spots: spotsMock,
  },
  uiStore: {
    isLoading: false,
  },
});

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

  describe("When a NewSpot page is rendered the form is filled and the button 'Añadir espacio' is clicked", () => {
    test("Then is should redirects the user to the list page", async () => {
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
});
