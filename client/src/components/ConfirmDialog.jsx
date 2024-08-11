import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

const ConfirmDialog = ({ open, handleClose, handleConfirm, title, desc }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-description">
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent id="confirm-dialog-description">{desc}</DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
