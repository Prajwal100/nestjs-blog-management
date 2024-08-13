import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CATEGORY, GET_CATEGORIES } from '../../graphql/Category';
import Loader from 'components/Loader';
import { Button, Chip } from '@mui/material';
import { PlusCircleOutlined } from '@ant-design/icons';
import CreateCategoryModal from './form';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
import ConfirmDialog from 'components/ConfirmDialog';
export const CategoriesPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_CATEGORIES);
  const [removeCategory] = useMutation(DELETE_CATEGORY);

  const [addCategory, setAddCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const handleOpenConfirmDialog = (id) => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setSelectedRows([]);
    setEditCategory(null);
    setIsEdit(false);
    setOpenConfirmDialog(false);
  };

  const handleCreate = () => {
    setEditCategory(null);
    setIsEdit(false);
    setAddCategory(true);
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setAddCategory(true);
    setIsEdit(true);
  };

  const handleDelete = async () => {
    try {
      const results = await Promise.all(
        selectedRows.map(async (row) => {
          const id = data.categories[row].id;
          const response = await removeCategory({
            variables: {
              id
            }
          });

          return response.data.removeCategory;
        })
      );

      const successfulDeletes = results.filter((result) => result.status === true);
      const failedDeletes = results.filter((result) => result.status === false);

      if (successfulDeletes.length > 0) {
        toast.success(`${successfulDeletes.length} category(ies) deleted successfully.`);
      }

      if (failedDeletes.length > 0) {
        failedDeletes.forEach((result) => {
          toast.error(result.message || 'An error occurred while deleting category.');
        });
      }

      await refetch();
      handleCloseConfirmDialog();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Loader />;
  if (error) {
    toast.error(error.message);
  }
  const columns = [
    {
      name: 's.n',
      label: 'S.N.',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'icon',
      label: 'Icon',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) =>
          value ? <img src={value} alt="Category Icon" style={{ width: 50, height: 50, objectFit: 'cover' }} /> : null
      }
    },
    {
      name: 'slug',
      label: 'Slug',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <Chip label={value === 'ACTIVE' ? 'Active' : 'Inactive'} color={value === 'ACTIVE' ? 'success' : 'warning'} variant="outlined" />
        )
      }
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const category = data.categories[tableMeta.rowIndex];
          return (
            <>
              <Box display="flex" gap={1}>
                <Button variant="contained" color="primary" className="m-2" onClick={() => handleEdit(category)}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setSelectedRows([[tableMeta.rowIndex]]);
                    handleOpenConfirmDialog();
                  }}
                >
                  Delete
                </Button>
              </Box>
            </>
          );
        }
      }
    }
  ];

  const rows = data.categories.map((row, index) => ({
    's.n': index + 1,
    name: row.name,
    slug: row.slug,
    icon: row.icon,
    status: row.status
  }));

  const options = {
    rowsSelected: selectedRows,
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      setSelectedRows(rowsSelected);
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <Button style={{ marginRight: '6px' }} variant="contained" color="error" onClick={handleOpenConfirmDialog}>
        Delete All
      </Button>
    )
  };
  return (
    <>
      <Button variant="outlined" startIcon={<PlusCircleOutlined />} style={{ marginBottom: '20px' }} onClick={handleCreate}>
        Add Category
      </Button>
      <MUIDataTable title={'Categories List'} data={rows} columns={columns} options={options} />
      {addCategory && (
        <CreateCategoryModal
          addCategory={addCategory}
          setAddCategory={setAddCategory}
          refetch={refetch}
          initialData={editCategory}
          isEdit={isEdit}
        />
      )}

      {/* CONFIRM DIALOG BOX */}
      <ConfirmDialog
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleDelete}
        title="Confirm Delete"
        desc="Are you sure you want to delete this item?"
      />
    </>
  );
};
