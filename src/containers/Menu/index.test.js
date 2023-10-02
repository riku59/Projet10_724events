import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  it("a list of mandatories links and the logo are displayed", async () => {
    render(<Menu />);
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on contact button", () => {
    it("document location  href change", async () => {
      render(<Menu />);
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(window.document.location.hash).toEqual("#contact");
    });
  });
  describe("and a click is triggered on Notre equipe button", () => {
    // ajout d'un test unitaire, qui permet de vérifier que le lien notre équipe renvoie au bon endroit
    it("scrolls to the corresponding section", async () => {
      render(<Menu />);
      fireEvent.click(await screen.findByText("Notre équipe"));

      const notreEquipeSection = await screen.findByText("Notre équipe");
      expect(notreEquipeSection).toBeInTheDocument();
    });
  });
});
