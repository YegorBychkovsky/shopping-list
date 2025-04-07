import { useShoppingStore } from '../../store/useShoppingStore';
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { ShoppingItemForm } from '../ShoppingItemForm/index';
import { EditItemDialogProps } from './types';

export const EditItemDialog = ({ item, open, onClose }: EditItemDialogProps) => {
  const editItem = useShoppingStore((state) => state.editItem);

  const handleSubmit = (values: { name: string; quantity: string; category: string }) => {
    const parsedQuantity = parseInt(values.quantity);
    editItem(item.id, {
      name: values.name,
      quantity: Math.max(1, parsedQuantity),
      category: values.category as any,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <ShoppingItemForm
          initialValues={{
            name: item.name,
            quantity: item.quantity.toString(),
            category: item.category,
          }}
          onSubmit={handleSubmit}
          submitButtonText="Save"
          onCancel={onClose}
          showCancelButton
        />
      </DialogContent>
    </Dialog>
  );
}; 