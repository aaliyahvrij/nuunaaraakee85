import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { addGameObject } from "../services/routeservice";


@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    public render(): TemplateResult {
        return html`
            <label for="alias">Alias:</label>
            <input id="alias" type="text" placeholder="Alias">

            <label for="name">Naam:</label>
            <input id="name" type="text" placeholder="Naam">

            <label for="beschrijving">Beschrijving:</label>
            <textarea id="beschrijving" placeholder="Beschrijving"></textarea>

            <label for="keuze">Keuze:</label>
            <select id="keuze" @change=${this.handleSelectChange}>
                <option value="Keuze">Keuze</option>
                <option value="Item">Item</option>
                <option value="Room">Room</option>
                <option value="Character">Character</option>
            </select>

            <div id="extraFields"></div>

            <button @click=${this.handleAddButtonClick}>Toevoegen</button>
        `;
    }

    private async handleAddButtonClick(): Promise<void> {
        try {
            // Verzamel de formuliergegevens
            const formData: GameObjectFormData = {
                alias: (this.shadowRoot?.getElementById("alias") as HTMLInputElement).value,
                name: (this.shadowRoot?.getElementById("name") as HTMLInputElement).value,
                beschrijving: (this.shadowRoot?.getElementById("beschrijving") as HTMLTextAreaElement).value,
                // Voeg hier andere formulier velden toe, afhankelijk van je behoeften
            };
    
            // Roep de addGameObject-functie aan
            const success: boolean = await addGameObject(formData);
    
            // Verwerk de resultaat
            if (success) {
                console.log("GameObject succesvol toegevoegd!");
            } else {
                console.error("Toevoegen van GameObject mislukt: er is een onbekende fout opgetreden.");
            }
        } catch (error) {
            console.error("Er is een fout opgetreden bij het toevoegen van het GameObject:", error);
        }
    }
    
    
    private handleSelectChange(event: Event): void {
        const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
        const selectedItem: string = selectElement.value;
        const extraFieldsContainer: HTMLElement | null = this.shadowRoot?.getElementById("extraFields");
    
        if (extraFieldsContainer) {
            extraFieldsContainer.innerHTML = "";
    
            if (selectedItem === "Item") {
                extraFieldsContainer.innerHTML = `
                    <label for="prijs">Prijs:</label>
                    <input id="prijs" type="number" min="0" step="0.01">
                `;
            } else if (selectedItem === "Character") {
                extraFieldsContainer.innerHTML = `
                    <label for="hp">HP (Health Points):</label>
                    <input id="hp" type="number" min="0" step="1">
                `;
            }
        }
    }
}
