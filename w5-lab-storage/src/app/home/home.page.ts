import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class HomePage {

  key: string = '';
  value: string = '';
  output: string = '';

  constructor(private storage: Storage) {
    storage.create();
  }

  async setItem() {
    try {
      await this.storage.set(this.key, this.value);
      this.output = `Set ${this.key}: ${this.value}`;//` character is needed ' wont work
    } catch (error) {
      console.error('Error setting item', error);
      this.output = `Error setting item: ${error}`;
    }
  }

  async getItem() {
    try {
      const value = await this.storage.get(this.key);
      this.output = `Get ${this.key}: ${value}`;
    } catch (error) {
      console.error('Error getting item', error);
      this.output = `Error getting item: ${error}`;
    }
  }

  async removeItem() {
    try {
      await this.storage.remove(this.key);
      this.output = `Removed ${this.key}`;
    } catch (error) {//for some reason even if it tries to delete a non existing key it won't throw an error
      console.error('Error removing item', error);
      this.output = `Error removing item: ${error}`;
    }
  }

  async clear() {

  }

  async keys() {

  }

  async length() {

  }

  async forEach() {

  }
}
