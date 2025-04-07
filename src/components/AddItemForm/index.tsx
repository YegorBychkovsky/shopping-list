import { useShoppingStore } from '../../store/useShoppingStore';
import { ShoppingItemForm } from '../ShoppingItemForm/index';

export const AddItemForm = () => {
  const addItem = useShoppingStore((state) => state.addItem);

  const handleSubmit = (values: { name: string; quantity: string; category: string }) => {
    const parsedQuantity = parseInt(values.quantity);
    addItem({
      name: values.name,
      quantity: Math.max(1, parsedQuantity),
      category: values.category as any,
      purchased: false,
    });
  };

  return (
    <ShoppingItemForm
      onSubmit={handleSubmit}
      submitButtonText="Add Item"
    />
  );
}; 