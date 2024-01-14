// ** MUI Imports
import { CardActions, CardContent, CardMedia, Grid, Typography, styled } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import * as React from 'react';

import { useState } from 'react';
import { Card } from '@mui/material';
import useGetProduct from 'src/hooks/useGetProduct';

const AddProduct = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const { allProducts } = useGetProduct()



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
      <CustomGrid container spacing={6} >
        {allProducts?.map((data, index): any => {
          return (
            <Grid item xs={6}>
              <Card sx={{ maxWidth: 345 }} key={index}>
                <CardMedia
                  component="img"
                  alt="product image"
                  height="140"
                  image={data?.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data?.shortDescription}
                  </Typography>
                  <Typography color="text.secondary">
                    {data?.price} تومان
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant='contained' color='error' size="small">حذف</Button>
                  <Button variant='contained' size="small"> ویرایش</Button>
                </CardActions>
              </Card>
            </Grid>
          )

        })}
      </CustomGrid>

    </>
  );
}

export default AddProduct;

const CTextField = styled(TextField)`
  margin: 1rem 0;
`
const CustomGrid = styled(Grid)`
  padding: 5rem 0;
`
