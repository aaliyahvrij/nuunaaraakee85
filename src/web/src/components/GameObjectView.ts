import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GameObjectFormResult } from "@shared/GameObjectFormResult";
import { deleteGameObject, fetchGameObjects, updateGameObject } from "../services/gameObjectService";

@customElement("gameobject-view")
export class GameObjectView extends LitElement {
    @property({ type: Array }) public gameObjects: GameObjectFormResult[] = [];
    @property({ type: Object }) private currentGameObject: GameObjectFormResult | null = null;

    public static styles = css`
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background-color: #ffe6e6;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f3c6e2;
        }
        tr:nth-child(even) {
            background-color: #e0a2af;
        }
        tr:nth-child(odd) {
            background-color: #e0a2af;
        }

        form {
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: none;
            margin-bottom: 20px;
        }

        form.show {
            display: block;
        }

        form label {
            display: block;
            margin-bottom: 8px;
        }

        form input[type="text"], form input[type="number"], form select {
            width: calc(100% - 16px);
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        form button {
            padding: 10px 20px;
            background-color: #e0a2af;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        form button:hover {
            background-color: #f3c6e2;;
        }

        .hidden {
            display: none;
        }
    `;

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        try {
            this.gameObjects = await fetchGameObjects();
        } catch (error) {
            console.error("Error fetching game objects:", error);
        }
    }

    private async confirmDelete(id: number): Promise<void> {
        if (confirm("Are you sure you want to delete this game object?")) {
            try {
                await deleteGameObject(id);
                this.gameObjects = await fetchGameObjects(); // Update de lijst na verwijdering
            } catch (error) {
                console.error("Error deleting game object:", error);
            }
        }
    }

    private handleDeleteClick(id?: number): void {
        if (id !== undefined) {
            void this.confirmDelete(id);
        } else {
            console.error("Game object ID is undefined");
        }
    }

    private handleEditClick(gameObject: GameObjectFormResult): void {
        this.currentGameObject = gameObject;
        const form: HTMLFormElement | null | undefined = this.shadowRoot?.querySelector("form");
        if (form) {
            form.classList.add("show");
        }
    }

    private handleFormSubmit(event: Event): void {
        event.preventDefault();
        const formData: FormData = new FormData(event.target as HTMLFormElement);

        if (this.currentGameObject) {
            const updatedGameObject: GameObjectFormResult = {
                ...this.currentGameObject,
                alias: formData.get("alias") as string,
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                type: formData.get("type") as string,
                price: formData.get("type") === "item" ? parseFloat(formData.get("price") as string) : undefined,
                hp: formData.get("type") === "character" ? parseInt(formData.get("hp") as string) : undefined,
            };

            void this.confirmUpdate(updatedGameObject);
            this.currentGameObject = null;
            const form: HTMLFormElement | null | undefined = this.shadowRoot?.querySelector("form");
            if (form) {
                form.classList.remove("show");
            }
        }
    }

    private async confirmUpdate(gameObject: GameObjectFormResult): Promise<void> {
        try {
            await updateGameObject(gameObject);
            this.gameObjects = await fetchGameObjects();
        } catch (error) {
            console.error("Error updating game object:", error);
        }
    }

    private handleTypeChange(event: Event): void {
        const typeInput: HTMLSelectElement = event.target as HTMLSelectElement;
        const priceInput: Element | null | undefined = this.shadowRoot?.querySelector("[name=\"price\"]");
        const hpInput: Element | null | undefined = this.shadowRoot?.querySelector("[name=\"hp\"]");
        const priceLabel: Element | null | undefined = this.shadowRoot?.querySelector(".price-label");
        const hpLabel: Element | null | undefined = this.shadowRoot?.querySelector(".hp-label");

        if (typeInput.value === "item") {
            if (priceInput && priceLabel) {
                priceInput.classList.remove("hidden");
                priceLabel.classList.remove("hidden");
                (priceInput as HTMLInputElement).setAttribute("required", "");
                (priceInput as HTMLInputElement).setAttribute("step", "0.01");
            
            }
            if (hpInput && hpLabel) {
                hpInput.classList.add("hidden");
                hpLabel.classList.add("hidden");
                (hpInput as HTMLInputElement).removeAttribute("required");
            }
        } else if (typeInput.value === "character") {
            if (hpInput && hpLabel) {
                hpInput.classList.remove("hidden");
                hpLabel.classList.remove("hidden");
                (hpInput as HTMLInputElement).setAttribute("required", "");
            }
            if (priceInput && priceLabel) {
                priceInput.classList.add("hidden");
                priceLabel.classList.add("hidden");
                (priceInput as HTMLInputElement).removeAttribute("required");
            }
        }
    }

    public render(): TemplateResult {
        return html`
            <div class="container">
                <form @submit=${this.handleFormSubmit} class="hidden">
                    <h2>Edit Game Object</h2>
                    <label>Alias:</label>
                    <input type="text" name="alias" .value=${this.currentGameObject?.alias ?? ""} required />
                    <br/>
                    <label>Name:</label>
                    <input type="text" name="name" .value=${this.currentGameObject?.name ?? ""} required />
                    <br/>
                    <label>Description:</label>
                    <input type="text" name="description" .value=${this.currentGameObject?.description ?? ""} required />
                    <br/>
                    <label>Type:</label>
                    <select name="type" @change=${this.handleTypeChange}>
                        <option value="item" ?selected=${this.currentGameObject?.type === "item"}>Item</option>
                        <option value="character" ?selected=${this.currentGameObject?.type === "character"}>Character</option>
                    </select>
                    <br/>
                    <label class="price-label hidden">Price:</label>
                    <input type="number" name="price" .value=${this.currentGameObject?.price?.toString() ?? ""} class="hidden" />
                    <br/>
                    <label class="hp-label hidden">HP:</label>
                    <input type="number" name="hp" .value=${this.currentGameObject?.hp?.toString() ?? ""} class="hidden" />
                    <br/>
                    <button type="submit">Save</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Alias</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>HP</th>
                        </tr>
                    </thead> 
                    <tbody>
                        ${this.gameObjects.map((gameObject) => html`
                            <tr>
                                <td>${gameObject.alias}</td>
                                <td>${gameObject.name}</td>
                                <td>${gameObject.description}</td>
                                <td>${gameObject.type}</td>
                                <td>${gameObject.price ?? "-"}</td>
                                <td>${gameObject.hp ?? "-"}</td>
                                <td>
                                    <button @click=${(): void => this.handleDeleteClick(gameObject.id)}>Delete</button>
                                    <button @click=${(): void => this.handleEditClick(gameObject)}>Edit</button>
                                </td>
                            </tr>
                        `)}
                    </tbody>
                </table>
            </div>
        `;
    }
}
