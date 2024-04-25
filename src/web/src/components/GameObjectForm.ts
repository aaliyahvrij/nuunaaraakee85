import { html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("gameobject-form")
export class GameObjectForm extends LitElement {

    public render(): TemplateResult {
        return html`
            <p>Hello world!</p>
        `;
    }
}