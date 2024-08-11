import { CloseCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import Loader from 'components/Loader';
import { CREATE_CATEGORY } from 'graphql/Category';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CreateCategoryModal = ({ addCategory, setAddCategory, refetch}) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({
        variables: {
          createCategoryInput: {
            name,
            icon,
            status
          }
        }
      });

      await refetch();

      handleClose();

      toast.success('Category created successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const handleClose = () => {
    setAddCategory(false);
  };
  return (
    <Dialog open={addCategory} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Category</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <CloseCircleOutlined />
      </IconButton>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField margin="dense" label="Category Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} required />

          <TextField
            margin="dense"
            label="Category Icon"
            type="file"
            fullWidth
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            required
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)} required>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" type="submit" variant="contained">
          {loading ? 'Creating...' : 'Create Category'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCategoryModal;
