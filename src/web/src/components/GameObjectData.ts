import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GameObjectFormResult } from "../shared/GameObjectFormResult";
import { deleteGameObject, queryGameObjects } from "../services/routeService";

@customElement("gameobject-data")
export class GameObjectData extends LitElement {
    @property({ type: Array }) public gameObjects: GameObjectFormResult[] = [];

    public static styles = css`
        table {
            width: 100%;
            border-collapse: collapse;
            background-color: #ffe6e6;
        }
        th,
        td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #ffcccc;
        }
        tr:nth-child(even) {
            background-color: #ffe6e6;
        }
        tr:nth-child(odd) {
            background-color: #ffffff;
        }
    `;

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        try {
            this.gameObjects = await queryGameObjects();
        } catch (error) {}
    }

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
                this.gameObjects = await queryGameObjects(); // Update de lijst na verwijdering
            } catch (error) {
                // Behandel fouten bij het verwijderen van gegevens
            }
        }
    }

    public render(): TemplateResult {
        return html`
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
                    </tr>
                </thead>
                <tbody>
                    ${this.gameObjects.map(
                        (gameObject) => html`
                            <tr>
                                <td>${gameObject.id}</d>
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
                                </td>
                            </tr>
                        `
                    )}
                </tbody>
            </table>
        `;
    }
}
