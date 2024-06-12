import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GameObjectFormResult } from "../shared/GameObjectFormResult";
import { deleteGameObject, queryGameObjects, updateGameObject } from "../services/routeService";
import { gameService } from "../services/gameService";
import { EditGameObjectEvent, SaveGameObjectEvent, editGame, saveGame } from "../types/events";

@customElement("gameobject-data")
export class GameObjectData extends LitElement {
    @property({ type: Array }) public gameObjects: GameObjectFormResult[] = [];
    @property({ type: Object }) public editingGameObject: GameObjectFormResult | null = null;

    public static styles = css`
        textarea {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
        }
        button {
            padding: 8px 16px;
            margin: 8px 0;
            border: none;
            border-radius: 4px;
            background-color: #ffffff;
            color: #333;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        button:hover {
            background-color: #f0f0f0;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background-color: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        th,
        td {
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: rgba(255, 255, 255, 0.5);
            font-weight: bold;
        }

        tr:nth-child(even) {
            background-color: rgba(255, 255, 255, 0.8);
        }

        tr:nth-child(odd) {
            background-color: rgba(255, 255, 255, 0.6);
        }

        .valid {
            color: green;
        }

        .error {
            color: red;
        }
    `;

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        try {
            this.gameObjects = await queryGameObjects();

            // using gameService to determine the edit buttons
            gameService.addEventListener(editGame, this.handleEditEvent.bind(this));
            gameService.addEventListener(saveGame, this.handleSaveEvent.bind(this));
        } catch (error) {
            console.error("Error fetching game objects:", error);
        }
    }

    // this function will delete the gameobject
    private async handleDelete(id: number | undefined): Promise<void> {
        if (id !== undefined) {
            await this.confirmDelete(id);
        } else {
            console.error("GameObject ID is undefined");
        }
    }

    private async confirmDelete(id: number): Promise<void> {
        if (confirm("Are you sure you want to delete this game object?")) {
            try {
                await deleteGameObject(id);
                this.gameObjects = await queryGameObjects(); // Update the list after deletion
            } catch (error) {
                console.error("Error deleting game object:", error);
            }
        }
    }

    private handleEditEvent(event: EditGameObjectEvent): void {
        console.log("pressed edit");
        console.log("Editing GameObject:", this.editingGameObject);
        this.editingGameObject = { ...event.data.gameObject };
    }

    private handleSaveEvent(event: SaveGameObjectEvent): void {
        const gameObject: GameObjectFormResult = event.data.gameObject;
        if (gameObject && gameObject.id) {
            updateGameObject(gameObject.id, gameObject)
                .then((updated) => {
                    if (updated) {
                        alert("GameObject updated successfully!");
                        this.editingGameObject;
                        queryGameObjects()
                            .then((gameObjects) => {
                                this.gameObjects = gameObjects; // Refresh the game objects list
                            })
                            .catch((error) => {
                                console.error("Error fetching game objects:", error);
                            });
                    } else {
                        alert("Failed to update GameObject.");
                    }
                })
                .catch((error) => {
                    console.error("Error updating game object:", error);
                    alert("Error updating GameObject.");
                });
        }
    }

    private dispatchEditEvent(gameObject: GameObjectFormResult): void {
        gameService.dispatchEvent(editGame, { id: gameObject.id, gameObject });
    }

    private dispatchSaveEvent(): void {
        if (this.editingGameObject) {
            gameService.dispatchEvent(saveGame, { gameObject: this.editingGameObject });
        }
    }

    private changeAlias(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        if (this.editingGameObject) this.editingGameObject.alias = input.value;
    }

    private changeName(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        if (this.editingGameObject) this.editingGameObject.name = input.value;
    }

    private changeDescription(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        if (this.editingGameObject) this.editingGameObject.description = input.value;
    }

    private changePrice(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        if (this.editingGameObject) {
            this.editingGameObject.price = parseFloat(input.value);
        }
    }

    private changeHp(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        if (this.editingGameObject) {
            this.editingGameObject.hp = parseFloat(input.value);
        }
    }

    private renderEditForm(): TemplateResult {
        if (!this.editingGameObject) {
            return html``;
        }

        return html`
            <div>
                <h3>Edit GameObject</h3>
                <label for="alias">Alias:</label>
                <input
                    type="text"
                    @input=${this.changeAlias}
                    .value=${this.editingGameObject.alias}
                    id="alias"
                    name="alias"
                />

                <label for="name">Name:</label>
                <input
                    type="text"
                    @input=${this.changeName}
                    .value=${this.editingGameObject.name}
                    id="name"
                    name="name"
                />

                <label for="description">Description:</label>
                <textarea
                    id="description"
                    @input=${this.changeDescription}
                    .value=${this.editingGameObject.description}
                    name="description"
                ></textarea>

                ${this.editingGameObject.price !== null
                    ? html`
                          <label for="price">Price:</label>
                          <input
                              type="number"
                              @input=${this.changePrice}
                              .value=${this.editingGameObject.price ?? ""}
                              id="price"
                              name="price"
                              min="0"
                              step="0.01"
                          />
                      `
                    : ""}
                ${this.editingGameObject.hp !== null
                    ? html`
                          <label for="hp">Health Points:</label>
                          <input
                              type="number"
                              @input=${this.changeHp}
                              .value=${this.editingGameObject.hp ?? ""}
                              id="hp"
                              name="hp"
                              min="0"
                              step="1"
                          />
                      `
                    : ""}

                <button @click="${this.dispatchSaveEvent}">Save</button>
            </div>
        `;
    }

    public render(): TemplateResult {
        return html`
            ${this.renderEditForm()}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Alias</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>HP</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.gameObjects.map(
                        (gameObject) => html`
                            <tr>
                                <td>${gameObject.id}</td>
                                <td>${gameObject.alias}</td>
                                <td>${gameObject.name}</td>
                                <td>${gameObject.description}</td>
                                <td>${gameObject.type}</td>
                                <td>${gameObject.price ?? "-"}</td>
                                <td>${gameObject.hp ?? "-"}</td>
                                <td>
                                    <button @click="${(): any => this.handleDelete(gameObject.id)}">
                                        Delete
                                    </button>
                                    <button @click="${(): any => this.dispatchEditEvent(gameObject)}">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        `
                    )}
                </tbody>
            </table>
        `;
    }
}
