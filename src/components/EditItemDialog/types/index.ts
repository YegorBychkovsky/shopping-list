import { ShoppingItem } from '../../../types/shoppingItem';

export interface EditItemDialogProps {
  item: ShoppingItem;
  open: boolean;
  onClose: () => void;
} 