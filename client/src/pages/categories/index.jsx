import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CATEGORY, GET_CATEGORIES } from '../../graphql/Category';
import Loader from 'components/Loader';
import { Button, Chip } from '@mui/material';
import { PlusCircleOutlined } from '@ant-design/icons';
import CreateCategoryModal from './create';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
import ConfirmDialog from 'components/ConfirmDialog';
export const CategoriesPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_CATEGORIES);
  const [removeCategory] = useMutation(DELETE_CATEGORY);

  const [addCategory, setAddCategory] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleOpenConfirmDialog = (id) => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setSelectedRows([]);
    setOpenConfirmDialog(false);
  };

  const handleDelete = async () => {
    try {
      console.log({selectedRows})
      await Promise.all(
        selectedRows.map(async (row) => {
          const id = data.categories[row].id;
          await removeCategory({
            variables: {
              id
            }
          });
        })
      );
      toast.success('Category deleted successfully.');
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
          return (
            <>
              <Box display="flex" gap={1}>
                <Button variant="contained" color="primary" className="m-2" onClick="">
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setSelectedRows([
                      [tableMeta.rowIndex]
                    ])
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
      <Button variant="outlined" startIcon={<PlusCircleOutlined />} style={{ marginBottom: '20px' }} onClick={() => setAddCategory(true)}>
        Add Category
      </Button>
      <MUIDataTable title={'Categories List'} data={rows} columns={columns} options={options} />
      {addCategory && <CreateCategoryModal addCategory={addCategory} setAddCategory={setAddCategory} refetch={refetch} />}

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
