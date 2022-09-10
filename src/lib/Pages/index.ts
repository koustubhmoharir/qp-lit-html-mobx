import { html } from "lit-html";
import { action, makeObservable, observable } from "mobx";
import { component } from "../utils/Component";
import { repeat } from "../utils/repeat";

class TodoList {
  constructor() {
    makeObservable(this);
    this.createItem();
  }

  @observable.ref
  private _items = observable.array([] as TodoItem[], { deep: false });
  // items is exposed as a read only array so that it cannot be modified from outside this class without going through the proper API
  get items(): readonly TodoItem[] {
    return this._items;
  }

  deleteItem(item: TodoItem) {
    this._items.remove(item);
  }

  private _id = 0;
  @action.bound
  createItem() {
    this._id++;
    this._items.push(new TodoItem(this, this._id, ""));
    console.log("added item");
  }

  render() {
    return html`
      <div style="{display:" flex; flex-direction: column;}>
        <button @click="${this.createItem}">Add New</button>
        ${repeat(
          this.items,
          (i) => i.id,
          (i) => i.render()
        )}
      </div>
    `;
  }
}

class TodoItem {
  constructor(readonly parent: TodoList, readonly id: number, text: string) {
    makeObservable(this);
    this.text = text;
  }

  @observable
  text = "";

  @action.bound
  private onChangeText(e: { target: { value: any } }) {
    this.text = e.target.value as string;
  }

  @action.bound
  delete() {
    this.parent.deleteItem(this);
  }

  render() {
    return html`
        <div style={display: flex;}>
            <input style={flex-grow:1} .value=${this.text} @input=${this.onChangeText}></input>
            <button @click=${this.delete}>X</button>
        </div>
      `;
  }
}

export const TodoListPage = component(TodoList);
