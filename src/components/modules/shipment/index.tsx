import React, { useState } from 'react';
import Layout from '../../layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, InputAdornment, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ItemModal from './ItemModal';
import { fetchShipmentItems, selectIsFetchingShipmentItems, selectShipmentItems } from '../../../reducer/shipment.reducer';

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
  { field: 'id', renderHeader: () => renderHeader('ShipmentId') },
  { field: 'origin', renderHeader: () => renderHeader('Origin') },
  { field: 'destination', renderHeader: () => renderHeader('Destination') },
  { field: 'status', renderHeader: () => renderHeader('Status.') },
  { field: 'estimatedDelivery', renderHeader: () => renderHeader('estimatedDelivery') }
]

const Shipment: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shipmentItems = useSelector(selectShipmentItems);
  const isFetchingItems = useSelector(selectIsFetchingShipmentItems);
  
  const [modalConfig, setModalConfig] = useState<null | ModalConfig>(null);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    dispatch(fetchShipmentItems());
  }, [dispatch])

 

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = shipmentItems.filter(item =>
    item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.estimatedDelivery.toLowerCase().includes(searchQuery.toLowerCase()))

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
           <Typography variant='h5'>Shipment Management</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={2}>
             
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

export default Shipment;
