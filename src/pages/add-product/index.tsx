// ** MUI Imports
import { styled } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import * as React from 'react';

import { useState } from 'react';

const SecondPage = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)





      return (
        <>
    <Button variant='outlined' onClick={handleClickOpen}>
       اضافه کردن محصول
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>محصول جدید</DialogTitle>
        <DialogContent>
          <CTextField id='name' autoFocus fullWidth type='text' label='نام محصول' />
          <CTextField id='img' autoFocus fullWidth type='file' label='' />
          <CTextField id='price' autoFocus fullWidth type='number' label='قیمت' />
          <CTextField id='desc' autoFocus fullWidth type='text' label='توضیحات' />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            انصراف
          </Button>
          <Button variant='contained' onClick={handleClose}>
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
        </>
      );
    }

export default SecondPage;

const CTextField = styled(TextField)`
  margin: 1rem 0;
`
