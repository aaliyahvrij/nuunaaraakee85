import { html, LitElement, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import { addGameObject } from "../services/routeService";

@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    private successMessage = "";
    private errorMessage = "";

    public static styles = css`
        .toevoegen {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
            max-width: 400px;
            margin: 20px auto;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .toevoegen label {
            display: flex;
            flex-direction: column;
            font-size: 16px;
            color: #333;
        }
        .toevoegen input,
        .toevoegen textarea,
        .toevoegen select {
            padding: 8px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-top: 5px;
        }
        .toevoegen button {
            padding: 10px 15px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
            transition: background-color 0.3s ease-in-out;
        }
        .toevoegen button:hover {
            background-color: #0056b3;
        }
        .success {
            color: green;
            font-size: 16px;
            margin-bottom: 10px;
        }
        .error {
            color: red;
            font-size: 16px;
            margin-bottom: 10px;
        }
    `;

    public render(): TemplateResult {
        return html`
                ${this.successMessage ? html`<div class="success">${this.successMessage}</div>` : ""}
                
                ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ""}
                
                <div class="toevoegen">
                    <label for="alias">Alias:</label>
                    <input type="text" id="alias" name="alias">

                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name">

                    <label for="description">Description:</label>
                    <textarea id="description" name="description"></textarea>

                    <label for="type">Type:</label>
                    <select id="type" name="type">
                        <option value="">Select a type</option>
                        <option value="Item">Item</option>
                        <option value="Room">Room</option>
                        <option value="Character">Character</option>
                    </select>

                    <div id="priceField" style="display: none;">
                        <label for="price">Price:</label>
                        <input type="number" id="price" name="price" min="0" step="0.01">
                    </div>

                    <div id="hpField" style="display: none;">
                        <label for="hp">HP:</label>
                        <input type="number" id="hp" name="hp" min="0" step="1">
                    </div>

                    <button @click="${this.confirmData}">Add ${this.selectedType}</button>
                </div>
            </div>
        `;
    }

    private async confirmData(): Promise<void> {
        const aliasInput: HTMLInputElement | null = this.shadowRoot?.getElementById("alias") as HTMLInputElement;
        const nameInput: HTMLInputElement | null = this.shadowRoot?.getElementById("name") as HTMLInputElement;
        const descriptionInput: HTMLTextAreaElement | null = this.shadowRoot?.getElementById("description") as HTMLTextAreaElement;
        const typeSelect: HTMLSelectElement | null = this.shadowRoot?.getElementById("type") as HTMLSelectElement;
        const priceInput: HTMLInputElement | null = this.shadowRoot?.getElementById("price") as HTMLInputElement;
        const hpInput: HTMLInputElement | null = this.shadowRoot?.getElementById("hp") as HTMLInputElement;

        if (!aliasInput || !nameInput || !descriptionInput || !typeSelect || !typeSelect.value) {
            this.errorMessage = "Please fill in all required fields.";
            this.successMessage = "";
            return;
        }

        if (typeSelect.value === "Item" && (!priceInput || !priceInput.value)) {
            this.errorMessage = "Please enter a price for the item.";
            this.successMessage = ""; 
            return;
        }

        if (typeSelect.value === "Character" && !hpInput) {
            this.errorMessage = "Please enter HP for the character.";
            this.successMessage = ""; 
            return;
        }

        const gameObjectResult: GameObjectFormResult = {
            alias: aliasInput.value,
            name: nameInput.value,
            description: descriptionInput.value,
            type: typeSelect.value,
            price: typeSelect.value === "Item" ? parseFloat(priceInput.value) : undefined,
            hp: typeSelect.value === "Character" ? parseInt(hpInput.value) : undefined
        };


        const success: boolean = await addGameObject(gameObjectResult);

        if (success) {
            this.successMessage = "GameObject is successfully added!";
            this.errorMessage = ""; 
        } else {
            this.errorMessage = "Error adding GameObject!";
            this.successMessage = ""; 
        }


        this.requestUpdate();
    }

    private get selectedType(): string | undefined {
        const typeElement: HTMLSelectElement | null | undefined = this.shadowRoot?.getElementById("type") as HTMLSelectElement | null | undefined;
        return typeElement?.value;
    }

    private showPriceField(): void {
        const priceFieldElement: HTMLElement | null | undefined = this.shadowRoot?.getElementById("priceField");
        const priceField: HTMLElement | null = priceFieldElement || null;
        if (this.selectedType === "Item" && priceField) {
            priceField.style.display = "block";
        } else if (priceField) {
            priceField.style.display = "none";
        }
    }

    private showHPField(): void {
        const hpFieldElement: HTMLElement | null | undefined = this.shadowRoot?.getElementById("hpField");
        const hpField: HTMLElement | null = hpFieldElement instanceof HTMLElement ? hpFieldElement : null;
        if (this.selectedType === "Character" && hpField) {
            hpField.style.display = "block";
        } else if (hpField) {
            hpField.style.display = "none";
        }
    }

    protected firstUpdated(): void {
        const typeElement: HTMLSelectElement | null | undefined = this.shadowRoot?.getElementById("type");
        if (typeElement instanceof HTMLSelectElement) {
            typeElement.addEventListener("change", () => {
                this.showPriceField();
                this.showHPField();
            });
        }
    }
}
