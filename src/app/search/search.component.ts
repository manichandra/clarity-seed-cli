import { Component } from '@angular/core';
import {Inventory} from "../inventory/inventory";
import {User} from "../inventory/user";

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  users: User[];
    _selected: User[] = [];
    toAdd: User[] = [];
    toDelete: User[] = [];
    toEdit: User;

    get selected() {
        return this._selected;
    }

    set selected(selection: User[]) {
        this._selected = selection;
        this.cleanUp();
    }

    cleanUp(): void {
        this.toAdd = [];
        this.toDelete = [];
        this.toEdit = null;
    }

    constructor(private inventory: Inventory) {
        inventory.size = 10;
        inventory.reset();
        this.users = inventory.all;
    }

    onDelete(user: User) {
        this.cleanUp();
        if (user) {
            this.toDelete = [user];
        } else {
            this.toDelete = this.selected.slice();
        }
    }

    onEdit(user: User) {
        this.cleanUp();
        if (user) {
            this.toEdit = user;
        } else {
            this.toEdit = this.selected[0];
        }
    }

    onAdd() {
        this.cleanUp();
        this.toAdd = this.selected.slice();
    }
}
