import { ShoppingItem } from '../types/shoppingItem';

const STORAGE_KEY = 'shopping-list';

export const storageService = {
  async saveItems(items: ShoppingItem[]): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        resolve();
      }, 500); // Simulate API delay
    });
  },

  async loadItems(): Promise<ShoppingItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = localStorage.getItem(STORAGE_KEY);
        resolve(items ? JSON.parse(items) : []);
      }, 500); // Simulate API delay
    });
  },
}; 