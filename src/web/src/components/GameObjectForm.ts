import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GameObjectFormResult } from "../shared/GameObjectFormResult";
import { addGameObject } from "../services/routeService";

@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    @property() private selectedOption: string = "";
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

    @property() public messageField: string = "";
    @property() public messageResponse: string = "";

    public static styles = css`
        .valid {
            color: green;
        }
        .error {
            color: red;
        }
    `;

    private async handleButtonClick(): Promise<void> {
        this.formData = {
            alias: this.formData.alias,
            name: this.formData.name,
            description: this.formData.description,
            type: this.selectedOption,
            price: this.selectedOption === "item" ? this.formData.price : undefined,
            hp: this.selectedOption === "character" ? this.formData.hp : undefined,
        };

        console.log("Data:", this.formData);

        try {
            const addingGameObject: boolean = await addGameObject(this.formData);
            if (addingGameObject) {
                this.messageField = "Adding GameObject was succesfull";
                this.messageResponse = "valid";
                console.log("added GameObject succesfull");
            } else {
                this.messageField = " Adding GameObject was unsuccesfull";
                this.messageResponse = "error";
                console.error(" Adding GameObject was unsuccesfull");
            }
        } catch (error) {
            ("something went wrong");
        }
    }

    public render(): TemplateResult {
        return html`
           <p>Hello world!</p>

            <div class="${this.messageResponse}">${this.messageField}</div>

            <label for="alias">Alias:</label>
            <input type="text" @input=${this.changeAlias}  id="alias" name="alias">


            <label for="name">Name:</label>
            <input type="text" @input=${this.changeName}  id="name" name="name">

            <label for="description">Description:</label>
            <textarea id="description" @input=${this.changeDescription}  name="description"></textarea>

            <label for="gameobject">Type gameobject:</label>
                <select @change="${this.handleChange}" id="gameobject_select">
                    <option value="item">Item</option>
                    <option value="room">Room</option>
                    <option value="character">Character</option>
                </select>

               ${this.additionalInput()}<br>

                <button @click="${this.handleButtonClick}">Add ${this.selectedOption}</button>
            </div>
        `;
    }

    private changeAlias(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.formData.alias = input.value;
    }

    private changeDescription(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.formData.description = input.value;
    }

    private changeName(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.formData.name = input.value;
    }

    private changePrice(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.formData.price = parseFloat(input.value);
    }

    private changeHp(event: Event): void {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        this.formData.hp = parseFloat(input.value);
    }

    private additionalInput(): TemplateResult {
        if (this.selectedOption === "item") {
            return html`
                <label for="price">Price:</label>
                <input
                    type="number"
                    @input=${this.changePrice}
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                /><br />
            `;
        } else if (this.selectedOption === "character") {
            return html`
                <label for="hp">Health Points:</label>
                <input type="number" @input=${this.changeHp} id="hp" name="hp" min="0" step="1" /><br />
            `;
        } else {
            return html``;
        }
    }
}
