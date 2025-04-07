import { Category, ShoppingItem } from '../../../types/shoppingItem';

export interface ShoppingListProps {
  items: ShoppingItem[];
  searchTerm: string;
  selectedCategory: Category | 'All';
  showPurchased: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: Category | 'All') => void;
  onToggleShowPurchased: () => void;
  onRemoveItem: (id: string) => void;
  onTogglePurchased: (id: string) => void;
  onUndo: () => void;
} 