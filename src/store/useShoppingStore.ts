import { create } from 'zustand';
import { ShoppingItem, ShoppingListState, Category } from '../types/shoppingItem';

const initialState: ShoppingListState = {
  items: [],
  history: [],
  searchTerm: '',
  selectedCategory: 'All',
  showPurchased: true,
};

export const useShoppingStore = create<ShoppingListState & {
  addItem: (item: Omit<ShoppingItem, 'id'>) => void;
  editItem: (id: string, item: Partial<ShoppingItem>) => void;
  removeItem: (id: string) => void;
  togglePurchased: (id: string) => void;
  undo: () => void;
  setSearchTerm: (term: string) => void;
  setCategory: (category: Category | 'All') => void;
  toggleShowPurchased: () => void;
}>((set) => ({
  ...initialState,
  addItem: (item) => {
    const newItem = { ...item, id: crypto.randomUUID() };
    set((state) => {
      const newItems = [...state.items, newItem];
      return {
        items: newItems,
        history: [...state.history, state.items],
      };
    });
  },
  editItem: (id, updates) => {
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      return {
        items: newItems,
        history: [...state.history, state.items],
      };
    });
  },
  removeItem: (id) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      return {
        items: newItems,
        history: [...state.history, state.items],
      };
    });
  },
  togglePurchased: (id) => {
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      );
      return {
        items: newItems,
        history: [...state.history, state.items],
      };
    });
  },
  undo: () => {
    set((state) => {
      if (state.history.length === 0) return state;
      const previousItems = state.history[state.history.length - 1];
      return {
        items: previousItems,
        history: state.history.slice(0, -1),
      };
    });
  },
  setSearchTerm: (term) => {
    set({ searchTerm: term });
  },
  setCategory: (category) => {
    set({ selectedCategory: category });
  },
  toggleShowPurchased: () => {
    set((state) => ({ showPurchased: !state.showPurchased }));
  },
})); 