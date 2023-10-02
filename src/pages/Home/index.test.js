import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
    await screen.findByText("Message"); // ajout d'un test unitaire, qui permet de vérifier que le message est bien affiché
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    // to implement

    render(<Home />);

    await screen.findByText("Toutes");
    await screen.findByText("Mega Event")[0];
    // expect(await screen.findByText("forum")).toBeVisible();
  });

  it("a list a people is displayed", async () => {
    render(<Home />);
    await screen.findByText("Samira");
    await screen.findByText("Animateur");
    const image = screen.getByAltText("Samira"); // ajout des alt pour les images pour effectuer le test
    expect(image).toBeInTheDocument();

    // to implement
  });
  it("a footer is displayed", async () => {
    // to implement
    render(<Home />);
    await screen.findByText("Contactez-nous");
    await screen.findByText("Notre derniére prestation");
  });
  it("an event card, with the last event, is displayed", async () => {
    // to implement
    render(<Home />);
    await screen.findByText("boom");
  });
});
