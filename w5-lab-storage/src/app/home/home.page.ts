import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterLink],
})
export class HomePage {

  key: string = '';
  value: string = '';
  output: string = '';

  constructor(private storageService: StorageService) {
    
  }

  async setItem() {
    try {
      await this.storageService.set(this.key, this.value);
      this.output = `Set ${this.key}: ${this.value}`;//` character is needed ' wont work
    } catch (error) {
      console.error('Error setting item', error);
      this.output = `Error setting item: ${error}`;
    }
  }

  async getItem() {
    try {
      const value = await this.storageService.get(this.key);
      this.output = `Get ${this.key}: ${value}`;
    } catch (error) {
      console.error('Error getting item', error);
      this.output = `Error getting item: ${error}`;
    }
  }

  async removeItem() {
    try {
      await this.storageService.remove(this.key);
      this.output = `Removed ${this.key}`;
    } catch (error) {//for some reason even if it tries to delete a non existing key it won't throw an error
      console.error('Error removing item', error);
      this.output = `Error removing item: ${error}`;
    }
  }

  async clear() {
    try {
      await this.storageService.clear();
      this.output = 'Storage cleared';
    } catch (error) {//Don't know which case an error would be thrown
      console.error('Error clearing storage', error);
      this.output = `Error clearing storage: ${error}`;
    }
  }

  async keys() {
    try {
      const keys = await this.storageService.keys();
      this.output = `Keys: ${keys.join(', ')}`;
    } catch (error) {//Don't know which case an error would be thrown
      console.error('Error getting keys', error);
      this.output = `Error getting keys: ${error}`;
    }
  }

  async length() {
    try {
      const length = await this.storageService.length();
      this.output = `Storage length: ${length}`;
    } catch (error) {//Don't know which case an error would be thrown
      console.error('Error getting storage length', error);
      this.output = `Error getting storage length: ${error}`;
    }
  }

  async forEach() {
    try {
      await this.storageService.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
      this.output = 'Executed forEach on storage';
    } catch (error) {
      console.error('Error executing forEach on storage', error);
      this.output = `Error executing forEach on storage: ${error}`;
    }
  }
}
