import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { addGameObject } from "../services/routeServices";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";

@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    @property({ type: String }) public alias: string = "";
    @property({ type: String }) public name: string = "";
    @property({ type: String }) public description: string = "";
    @property({ type: String }) public type: string = "Item";
    @property({ type: Number }) public price: number = 0;
    @property({ type: Number }) public hp: number = 0;
    @property({ type: Boolean }) public isSuccess: boolean = false;
    @property({ type: Boolean }) public isError: boolean = false;

    public static styles = css`
        .success-message {
            color: green;
        }

        .error-message {
            color: red;
        }
    `;
    public render(): TemplateResult {
        return html`
            <div>
                ${this.isSuccess ? html`<p class="success-message">GameObject successfully added!</p>` : ""}
                ${this.isError ? html`<p class="error-message">Failed to add GameObject. Please check your input.</p>` : ""}
                <label for="alias">Alias:</label>
                <input type="text" id="alias" .value="${this.alias}" @input="${this.handleInputChange}" />

                <label for="name">Name:</label>
                <input type="text" id="name" .value="${this.name}" @input="${this.handleInputChange}" />

                <label for="description">Description:</label>
                <textarea id="description" .value="${this.description}" @input="${this.handleInputChange}"></textarea>

                <label for="type">Type:</label>
                <select id="type" @change="${this.handleTypeChange}">
                    <option value="Item">Item</option>
                    <option value="Room">Room</option>
                    <option value="Character">Character</option>
                </select>

                ${this.renderExtraFields()}

                <button @click="${this.handleFormSubmit}">Add ${this.type}</button>
            </div>
        `;
    }

    private handleInputChange(event: Event): void {
        const target: any = event.target as HTMLInputElement | HTMLTextAreaElement;
        const { id, value } = target;
        if (id) {
            this[id as keyof this] = value;
        }
    }

    private handleTypeChange(event: Event): void {
        const target: any = event.target as HTMLSelectElement;
        this.type = target.value;
    }

    private renderExtraFields(): TemplateResult | string {
        if (this.type === "Item") {
            return html`
                <label for="price">Price:</label>
                <input type="number" id="price" .value="${this.price}" @input="${this.handleInputChange}" min="0" step="0.01" />
            `;
        } else if (this.type === "Character") {
            return html`
                <label for="hp">Health Points:</label>
                <input type="number" id="hp" .value="${this.hp}" @input="${this.handleInputChange}" min="0" step="1" />
            `;
        }
        return "";
    }

    private async handleFormSubmit(): Promise<void> {
        const data: GameObjectFormResult = {
            alias: this.alias,
            name: this.name,
            description: this.description,
            type: this.type,
            price: this.price,
            hp: this.hp,
        };

        try {
            const success: boolean = await addGameObject(data);
            if (success) {
                this.isSuccess = true;
                this.isError = false;
            } else {
                this.isSuccess = false;
                this.isError = true;
            }
        } catch (error) {
            console.error("Error adding game object:", error);
            this.isSuccess = false;
            this.isError = true;
        }
    }
}
//commit