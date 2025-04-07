import { Category } from '../../../types/shoppingItem';

export interface FormErrors {
  name: string;
  quantity: string;
}

export interface FormState {
  name: string;
  quantity: string;
  category: Category;
}

export interface TouchedState {
  name: boolean;
  quantity: boolean;
}

export interface ShoppingItemFormProps {
  initialValues?: FormState;
  onSubmit: (values: FormState) => void;
  submitButtonText: string;
  onCancel?: () => void;
  showCancelButton?: boolean;
} 