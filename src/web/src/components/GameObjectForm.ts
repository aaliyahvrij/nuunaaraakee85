import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GameObjectFormResult } from "../shared/GameObjectFormResult";
import { addGameObject } from "../services/routeService";

@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    @property({ type: String }) private selectedOption: string = "";
    @property() public formData: GameObjectFormResult = {
        alias: "",
        name: "",
        description: "",
        type: "",
        price: undefined,
        hp: undefined,
    };

    private handleChange(event: Event): void {
        const target: HTMLSelectElement = event.target as HTMLSelectElement;
        this.selectedOption = target.value;
    }

    private async handleButtonClick(): Promise<void> {
        this.formData = {
            alias: (this.shadowRoot!.getElementById("alias") as HTMLInputElement).value, //getelementbyid niet de beste manier
            name: (this.shadowRoot!.getElementById("name") as HTMLInputElement).value,
            description: (this.shadowRoot!.getElementById("description") as HTMLInputElement).value,
            type: this.selectedOption,
            price:
                this.selectedOption === "item"
                    ? parseFloat((this.shadowRoot!.getElementById("price") as HTMLInputElement).value)
                    : undefined,
            hp:
                this.selectedOption === "character"
                    ? parseInt((this.shadowRoot!.getElementById("hp") as HTMLInputElement).value)
                    : undefined,
        };

        const addingGameObject: boolean = await addGameObject(this.formData);

        if (addingGameObject) {
            console.log("Gameobject was succesfull");
        } else {
            console.error("error:", Error);
        }
        // console.log("Form Data:", this.formData);
    }

    public render(): TemplateResult {
        let additionalInput: TemplateResult | null = null;

        if (this.selectedOption === "item") {
            additionalInput = html`<div>
                <label for="itemPrice">Item price:</label>
                <input type="number" id="price" min="0" step="0.1" />
            </div>`;
        }

        if (this.selectedOption === "character") {
            additionalInput = html`<div>
                <label for="CharacterHP">Character Health Points:</label>
                <input type="number" id="hp" min="0" step="1" />
            </div>`;
        }

        return html`
            <p>Hello world!</p>
            <div>
                <label for="alias">Alias: </label>
                <input type="text" id="alias" />

                <label for="name">Name:</label>
                <input type="text" id="name" />

                <label for="description">Description:</label>
                <textarea id="description" cols="30" rows="10"></textarea>

                <label for="gameobject">Type gameobject:</label>
                <select @change="${this.handleChange}" id="gameobject_select">
                    <option value="item">Item</option>
                    <option value="room">Room</option>
                    <option value="character">Character</option>
                </select>
                ${additionalInput}

                <button @click="${this.handleButtonClick}">Add ${this.selectedOption}</button>
            </div>
        `;
    }
}
