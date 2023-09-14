import { render, screen } from "@testing-library/react";
import { spotsMock } from "../../mocks/mocks";
import { setupStore } from "../../store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import NewSpot from "./NewSpot";

const store = setupStore({
  spotsStore: {
    spots: spotsMock,
  },
});

const spotInputLabelText = "Espacio";
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

      const spotInput = screen.getByLabelText(spotInputLabelText);
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
  });
});
