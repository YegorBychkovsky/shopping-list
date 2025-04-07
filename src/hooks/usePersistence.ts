import { useEffect } from 'react';
import { useShoppingStore } from '../store/useShoppingStore';
import { storageService } from '../services/storageService';

export const usePersistence = () => {
  const items = useShoppingStore((state) => state.items);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const savedItems = await storageService.loadItems();
        if (savedItems.length > 0) {
          useShoppingStore.setState({ items: savedItems });
        }
      } catch (error) {
        console.error('Failed to load items:', error);
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    const saveItems = async () => {
      try {
        await storageService.saveItems(items);
      } catch (error) {
        console.error('Failed to save items:', error);
      }
    };

    saveItems();
  }, [items]);
}; 