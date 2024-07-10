import { Box, Button, IconButton, Input, InputAdornment, Modal, OutlinedInput, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInventoryItem, selectInvetoryItem, updateInventoryItem } from '../../../../reducer/inventory.reducer';
import { AppDispatch, RootState } from '../../../../store';
import { InventoryItem } from '../../../../types';
import { GridCloseIcon } from '@mui/x-data-grid';


type Props = {
    open: boolean;
    handleClose: () => void;
    config: {
        id?: number;
        op: 'edit' | 'add';
    }
}


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,  };

  const modalTitle = {
    'add': 'Add Item',
    'edit' : 'Edit Item'
}
  const ctaTitle = {
    'add': 'Add',
    'edit': 'Update'
}

const ItemModal = ({ open, handleClose, config }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    // @ts-ignore
    const itemToBeEdited: InventoryItem = useSelector<RootState>(state => selectInvetoryItem(state, config.id));

    const [item, setItem] = React.useState({ name: '', sku: '', quantity: 0, warehouse: '' });

    React.useEffect(() => {
        if (config.op === 'edit' && itemToBeEdited) {
            const {id, ...rest} = itemToBeEdited;
            setItem(rest);
        }
    }, [itemToBeEdited, config.op])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setItem(prevItem => ({ ...prevItem, [name]: value }));
    }

    const handleOp = () => {
        if (config.op === 'add') {
            dispatch(addInventoryItem({item}));
        }
        if (config.op === 'edit') {
            dispatch(updateInventoryItem({item : {  ...item, id: config.id! } }));
        }
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  , backgroundColor:"#1976d2", color:"white"}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{p:2}}>
                        {modalTitle[config.op]}
                    </Typography>
                    <IconButton color="inherit" onClick={handleClose}>
                        <GridCloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{p:2 }} >
                <OutlinedInput
                        name="name"
                        placeholder='Name'
                        value={item.name}
                        onChange={handleChange}
                        sx={{ m: 2 }}
                    />
                    <OutlinedInput
                        name="sku"
                        placeholder='SKU'
                        value={item.sku}
                        onChange={handleChange}
                        sx={{ m: 2 }}
                       
                    />
                    <OutlinedInput
                        name="quantity"
                        placeholder='Qty'
                        type="number"
                        value={item.quantity}
                        onChange={handleChange}
                        sx={{ m: 2 }}
                    />
                    <OutlinedInput
                        name="warehouse"
                        placeholder='Warehouse'
                        value={item.warehouse}
                        onChange={handleChange}
                        sx={{ m: 2 }}
                    />
                </Box>
                <Box sx={{display:"flex", alignItems:"right",justifyContent:"center", marginBottom:2}}>
                <Button onClick={handleOp} variant='contained' sx={{m:1}}>
                    {ctaTitle[config.op]}
                </Button>
                <Button onClick={handleClose} variant='contained' sx={{m:1}}>Cancel</Button>
                </Box>
               
            </Box>
        </Modal>
    )
}

export default ItemModal;