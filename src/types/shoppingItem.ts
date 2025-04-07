export type Category = 'Fruits' | 'Dairy' | 'Vegetables' | 'Other';

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  category: Category;
  purchased: boolean;
}

export interface ShoppingListState {
  items: ShoppingItem[];
  history: ShoppingItem[][];
  searchTerm: string;
  selectedCategory: Category | 'All';
  showPurchased: boolean;
} 