import React, { useState } from 'react';
import Layout from '../../layout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInventoryItem, fetchInventoryItems, selectInvetoryItems, selectIsFetchingInventoryItems } from '../../../reducer/inventory.reducer';
import { AppDispatch } from '../../../store';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ItemModal from './ItemModal';

type ModalConfig = {
  op: 'edit' | 'add',
  id?: number;
}

const renderHeader = (label: string): React.ReactNode => (
  <strong>
    {label}
  </strong>
)

const COLUMNS = [
  { field: 'id', renderHeader: () => renderHeader('ID') },
  { field: 'name', renderHeader: () => renderHeader('Name') },
  { field: 'sku', renderHeader: () => renderHeader('SKU') },
  { field: 'quantity', renderHeader: () => renderHeader('Qty.') },
  { field: 'warehouse', renderHeader: () => renderHeader('Warehouse') }
]

const Inventory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inventoryItems = useSelector(selectInvetoryItems);
  const isFetchingItems = useSelector(selectIsFetchingInventoryItems);
  
  const [modalConfig, setModalConfig] = useState<null | ModalConfig>(null);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    dispatch(fetchInventoryItems());
  }, [dispatch])

  const handleDelete = (itemId: number) => {
    dispatch(deleteInventoryItem({ itemId }));
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.warehouse.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    ...COLUMNS, 
    { 
      field: 'actions', 
      renderHeader: () => renderHeader('Actions'),
      width: 300,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box display="flex" alignItems="center">
            <IconButton
              color="primary"
              onClick={() => setModalConfig({ id: params.row.id, op: 'edit' })}
            >
              <EditIcon style={{ color: 'green' }} />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon style={{ color: 'red' }} />
            </IconButton>
          </Box>
        )
      } 
    }
  ]

  return (
    <Layout>
      {
        isFetchingItems ? (
          <>Loading...</>
        ) : (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <TextField
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: '200px' , height:"20px" }}
              />
              <Button variant='contained' onClick={() => setModalConfig({ op: 'add' })}>Add</Button>
            </Box>
            <Box sx={{ height: 400, width: '100%' , mt:10 }}>
              <DataGrid
                rows={filteredItems}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 2,
                    },
                  },
                }}
                pageSizeOptions={[2]}
                disableRowSelectionOnClick
              />
            </Box>
            {!!modalConfig && (
              <ItemModal
                open={!!modalConfig}
                handleClose={() => setModalConfig(null)}
                config={modalConfig}
              />
            )}
          </>
        )
      }
    </Layout>
  );
};

export default Inventory;
