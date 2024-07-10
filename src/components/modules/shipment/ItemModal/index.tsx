import { Box, Button, IconButton, OutlinedInput, Modal, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { InventoryItem, ShipmentItem } from '../../../../types';
import { GridCloseIcon } from '@mui/x-data-grid';
import { addShipmentItem, selectShipmentItem, updateShipmentItem } from '../../../../reducer/shipment.reducer';
import { selectInvetoryItem, selectInvetoryItems } from '../../../../reducer/inventory.reducer';

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
    boxShadow: 24,
};

const modalTitle = {
    'add': 'Add Item',
    'edit': 'Edit Item'
}
const ctaTitle = {
    'add': 'Add',
    'edit': 'Update'
}

const ItemModal = ({ open, handleClose, config }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const itemToBeEdited: ShipmentItem | undefined = useSelector((state: RootState) => selectShipmentItem(state, config.id!));
console.log(itemToBeEdited,"item")
    const [item, setItem] = React.useState({ origin: '', destination: '', estimatedDelivery: '', status: '' });

    React.useEffect(() => {
        if (config.op === 'edit' && itemToBeEdited) {
            const { id, ...rest } = itemToBeEdited;
            setItem(rest);
        }
    }, [itemToBeEdited, config.op]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setItem(prevItem => ({ ...prevItem, [name]: value }));
    }

    const handleOp = () => {
        if (config.op === 'add') {
            dispatch(addShipmentItem({ item }));
        }
        if (config.op === 'edit') {
            dispatch(updateShipmentItem({ item: { ...item, id: config.id! } }));
        }
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#1976d2", color: "white" }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ p: 2 }}>
                        {modalTitle[config.op]}
                    </Typography>
                    <IconButton color="inherit" onClick={handleClose}>
                        <GridCloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{ p: 2 }}>
                    <OutlinedInput
                        name="origin"
                        placeholder='Origin'
                        value={item.origin}
                        onChange={handleChange}
                        sx={{ m: 2, width: 'calc(100% - 32px)' }}
                        disabled={config.op === 'edit' }
                    />
                    <OutlinedInput
                        name="destination"
                        placeholder='Destination'
                        value={item.destination}
                        onChange={handleChange}
                        sx={{ m: 2, width: 'calc(100% - 32px)' }}
                        disabled={config.op === 'edit' }
                    />
                    <OutlinedInput
                        name="status"
                        placeholder='Status'
                        value={item.status}
                        onChange={handleChange}
                        sx={{ m: 2, width: 'calc(100% - 32px)' }}
                    />
                    <OutlinedInput
                        name="estimatedDelivery"
                        placeholder='Estimated Delivery Date'
                        value={item.estimatedDelivery}
                        onChange={handleChange}
                        sx={{ m: 2, width: 'calc(100% - 32px)' }}
                        disabled={config.op === 'edit' }
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                    <Button onClick={handleOp} variant='contained' sx={{ m: 1 }}>
                        {ctaTitle[config.op]}
                    </Button>
                    <Button onClick={handleClose} variant='contained' sx={{ m: 1 }}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ItemModal;
