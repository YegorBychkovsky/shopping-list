import { useMemo, useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { Category } from '../../types/shoppingItem';
import { FormErrors, FormState, TouchedState, ShoppingItemFormProps } from './types';

const INITIAL_FORM_STATE: FormState = {
  name: '',
  quantity: '1',
  category: 'Other',
};

const INITIAL_ERRORS: FormErrors = {
  name: '',
  quantity: '',
};

const INITIAL_TOUCHED: TouchedState = {
  name: false,
  quantity: false,
};

export const ShoppingItemForm = ({
  initialValues = INITIAL_FORM_STATE,
  onSubmit,
  submitButtonText,
  onCancel,
  showCancelButton = false,
}: ShoppingItemFormProps) => {
  const [formState, setFormState] = useState<FormState>(initialValues);
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERRORS);
  const [touched, setTouched] = useState<TouchedState>(INITIAL_TOUCHED);

  const { name, quantity, category } = formState;

  const isValid = useMemo(() => {
    const newErrors = { ...INITIAL_ERRORS };

    if (!name.trim()) {
      newErrors.name = 'Item name is required';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Item name must be at least 3 characters long';
    }

    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      newErrors.quantity = 'Quantity must be a positive number';
    } else if (parsedQuantity > 10000) {
      newErrors.quantity = 'Quantity cannot exceed 10000';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.quantity;
  }, [name, quantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const parsedQuantity = parseInt(quantity);
    onSubmit({
      name: name.trim(),
      quantity: Math.max(1, parsedQuantity).toString(),
      category,
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*$/.test(value)) {
      setFormState(prev => ({ ...prev, quantity: value }));
      const parsedValue = parseInt(value);
      setErrors(prev => ({
        ...prev,
        quantity: value === '' || parsedValue < 1 
          ? 'Quantity must be a positive number' 
          : parsedValue > 10000
            ? 'Quantity cannot exceed 10000'
            : ''
      }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState(prev => ({ ...prev, name: value }));
    setErrors(prev => ({
      ...prev,
      name: !value.trim() 
        ? 'Item name is required' 
        : value.trim().length < 3 
          ? 'Item name must be at least 3 characters long' 
          : ''
    }));
  };

  const handleCategoryChange = (e: SelectChangeEvent<Category>) => {
    setFormState(prev => ({ ...prev, category: e.target.value as Category }));
  };

  const handleBlur = (field: keyof TouchedState) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Item Name"
        value={name}
        onChange={handleNameChange}
        onBlur={() => handleBlur('name')}
        fullWidth
        required
        sx={{ mb: 1 }}
        error={touched.name && !!errors.name}
      />
      {touched.name && errors.name && (
        <Typography color="error" sx={{ mb: 1, fontSize: '0.75rem' }}>
          {errors.name}
        </Typography>
      )}
      <TextField
        label="Quantity"
        type="text"
        value={quantity}
        onChange={handleQuantityChange}
        onBlur={() => handleBlur('quantity')}
        fullWidth
        required
        sx={{ mb: 1 }}
        error={touched.quantity && !!errors.quantity}
      />
      {touched.quantity && errors.quantity && (
        <Typography color="error" sx={{ mb: 1, fontSize: '0.75rem' }}>
          {errors.quantity}
        </Typography>
      )}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="Fruits">Fruits</MenuItem>
          <MenuItem value="Dairy">Dairy</MenuItem>
          <MenuItem value="Vegetables">Vegetables</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {showCancelButton && onCancel && (
          <Button onClick={onCancel} variant="outlined" fullWidth>
            Cancel
          </Button>
        )}
        <Button 
          disabled={!name || !quantity || !isValid}
          type="submit" 
          variant="contained" 
          fullWidth
        >
          {submitButtonText}
        </Button>
      </Box>
    </Box>
  );
}; 