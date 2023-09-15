import { render, screen } from "@testing-library/react";
import { formMock, spotsMock } from "../../mocks/mocks";
import { setupStore } from "../../store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import NewSpot from "./NewSpot";
import userEvent from "@testing-library/user-event";

const store = setupStore({
  spotsStore: {
    spots: spotsMock,
  },
});

const nameInputLabelText = "Espacio";
const imageInputLabelText = "URL Imagen";
const openingYearLabelText = "Año de creación";
const spotUseInputLabelText = "Función del espacio";
const checkboxText = "Visitado";

describe("Given a NewSpot component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the fields 'Espacio', 'URL Imagen', 'Año de creación', 'Función del espacio' and a checkbox with the text 'Visitado'", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <NewSpot />
          </Provider>
        </BrowserRouter>,
      );

      const spotInput = screen.getByLabelText(nameInputLabelText);
      const imageInput = screen.getByLabelText(imageInputLabelText);
      const OpeningYearInput = screen.getByLabelText(openingYearLabelText);
      const spotUseInput = screen.getByLabelText(spotUseInputLabelText);
      const checkboxInput = screen.getByLabelText(checkboxText);

      expect(spotInput).toBeInTheDocument();
      expect(imageInput).toBeInTheDocument();
      expect(OpeningYearInput).toBeInTheDocument();
      expect(spotUseInput).toBeInTheDocument();
      expect(checkboxInput).toBeInTheDocument();
    });

    describe("When an user types all the data for the spot 'St. Felip Neri'", () => {
      test("Then it should show the typed data about the spot 'St. Felip Neri' in input textboxes", async () => {
        render(
          <BrowserRouter>
            <Provider store={store}>
              <NewSpot />
            </Provider>
          </BrowserRouter>,
        );

        const nameInput = screen.getByLabelText(
          nameInputLabelText,
        ) as HTMLInputElement;
        const imageInput = screen.getByLabelText(
          imageInputLabelText,
        ) as HTMLInputElement;
        const OpeningYearInput = screen.getByLabelText(
          openingYearLabelText,
        ) as HTMLInputElement;
        const spotUseInput = screen.getByLabelText(
          spotUseInputLabelText,
        ) as HTMLInputElement;
        const isVisitedInput = screen.getByLabelText(
          checkboxText,
        ) as HTMLInputElement;

        await userEvent.type(nameInput, formMock.name!);
        await userEvent.type(imageInput, formMock.imageUrl!);
        await userEvent.type(
          OpeningYearInput,
          formMock.openingYear!.toString(),
        );
        await userEvent.type(spotUseInput, formMock.spotUse!.toString());
        await userEvent.click(isVisitedInput);

        expect(nameInput.value).toBe(formMock.name);
        expect(imageInput.value).toBe(formMock.imageUrl);
        expect(OpeningYearInput.value).toBe(formMock.openingYear?.toString());
        expect(spotUseInput.value).toBe(formMock.spotUse);
        expect(isVisitedInput.value).toBe("on");
      });

      test("Then the button 'Añadir espacio' should be ennabled", async () => {
        const buttonText = "Añadir espacio";
        render(
          <BrowserRouter>
            <Provider store={store}>
              <NewSpot />
            </Provider>
          </BrowserRouter>,
        );

        const nameInput = screen.getByLabelText(
          nameInputLabelText,
        ) as HTMLInputElement;
        const imageInput = screen.getByLabelText(
          imageInputLabelText,
        ) as HTMLInputElement;
        const OpeningYearInput = screen.getByLabelText(
          openingYearLabelText,
        ) as HTMLInputElement;
        const spotUseInput = screen.getByLabelText(
          spotUseInputLabelText,
        ) as HTMLInputElement;

        await userEvent.type(nameInput, formMock.name!);
        await userEvent.type(imageInput, formMock.imageUrl!);
        await userEvent.type(
          OpeningYearInput,
          formMock.openingYear!.toString(),
        );
        await userEvent.type(spotUseInput, formMock.spotUse!.toString());

        const createButton = screen.getByRole("button", { name: buttonText });

        expect(createButton).toHaveProperty("disabled", false);
      });
    });
  });
});
