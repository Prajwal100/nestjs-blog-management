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
import { CREATE_CATEGORY, UPDATE_CATEGORY } from 'graphql/Category';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ImageUploading from 'react-images-uploading';

const CategoryModal = ({ addCategory, setAddCategory, refetch, initialData = null, isEdit = false }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(null);
  const [status, setStatus] = useState('ACTIVE');
  const [createCategory, { loading: creating, error: createError }] = useMutation(CREATE_CATEGORY);
  const [updateCategory, { loading: updating, error: updateError }] = useMutation(UPDATE_CATEGORY);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setIcon(initialData.icon ? [{ data_url: initialData.icon }] : []);
      setStatus(initialData.status || 'ACTIVE');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit && initialData) {
        const res = await updateCategory({
          variables: {
            id: initialData.id,
            updateCategoryInput: {
              name,
              status
            },
            image: icon ? icon[0]?.file : null
          }
        });
        if (res?.data?.updateCategory) {
          toast.success('Category updated successfully!');
        } else {
          toast.error(res.errors?.[0]?.message || 'Unknown error occurred.');
        }
      } else {
        const res = await createCategory({
          variables: {
            createCategoryInput: {
              name,
              status
            },
            image: icon ? icon[0]?.file : null
          }
        });
        if (res?.data?.createCategory) {
          toast.success('Category created successfully!');
        } else {
          toast.error(res.errors?.[0]?.message || 'Unknown error occurred.');
        }
      }

      await refetch();

      handleClose();
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const handleImageChange = (imageList) => {
    console.log(imageList);
    setIcon(imageList);
  };

  const handleClose = () => {
    setAddCategory(false);
  };
  return (
    <Dialog open={addCategory} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Update Category' : 'Create Category'}</DialogTitle>
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

          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <label>
              Category Icon <span className="text-danger">*</span>
            </label>
            <br />
            <ImageUploading
              multiple={false}
              value={icon}
              onChange={handleImageChange}
              maxNumber={1}
              dataURLKey="data_url"
              acceptType={['jpg', 'png', 'jpeg']}
            >
              {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
                <>
                  <Button
                    variant="outlined"
                    onClick={onImageUpload}
                    {...dragProps}
                    style={{ marginBottom: '10px', backgroundColor: isDragging ? '#ddd' : '' }}
                  >
                    Upload Icon
                  </Button>
                  {Array.isArray(imageList) &&
                    imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image['data_url']} alt="" width="100" />
                        <Button onClick={() => onImageRemove(index)}>Remove</Button>
                      </div>
                    ))}
                </>
              )}
            </ImageUploading>
          </div>

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
          {creating || updating ? 'saving...' : isEdit ? 'Update Category' : 'Create Category'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryModal;
