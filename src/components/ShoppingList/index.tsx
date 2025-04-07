import { useState, useEffect } from 'react';
import { useShoppingStore } from '../../store/useShoppingStore';
import { ShoppingItem } from '../../types/shoppingItem';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EditItemDialog } from '../EditItemDialog';
import { useDebounce } from '../../hooks/useDebounce';

export const ShoppingList = () => {
  const {
    items,
    searchTerm,
    selectedCategory,
    showPurchased,
    setSearchTerm,
    setCategory,
    toggleShowPurchased,
    removeItem,
    togglePurchased,
    undo,
  } = useShoppingStore();

  const [searchInput, setSearchInput] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(searchInput, 300);

  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesPurchased = showPurchased || !item.purchased;
    return matchesSearch && matchesCategory && matchesPurchased;
  });

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          fullWidth
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setCategory(e.target.value as any)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Fruits">Fruits</MenuItem>
            <MenuItem value="Dairy">Dairy</MenuItem>
            <MenuItem value="Vegetables">Vegetables</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() => toggleShowPurchased()}
        >
          {showPurchased ? 'Hide Purchased' : 'Show Purchased'}
        </Button>
        <Button variant="outlined" onClick={undo}>
          Undo
        </Button>
      </Box>

      {filteredItems.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          No items found
        </Typography>
      ) : (
        <List>
          {filteredItems.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                bgcolor: item.purchased ? 'action.hover' : 'background.paper',
              }}
            >
              <Checkbox
                edge="start"
                checked={item.purchased}
                onChange={() => togglePurchased(item.id)}
              />
              <ListItemText
                primary={item.name}
                secondary={`${item.quantity} ${item.category}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => setEditingItem(item)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeItem(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      {editingItem && (
        <EditItemDialog
          item={editingItem}
          open={!!editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}
    </Box>
  );
}; 