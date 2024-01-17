// ** MUI Imports
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useState } from 'react'
import useGetCategories from 'src/hooks/useCategories'
import useCreateProduct from 'src/hooks/useCreateProduct'
import useGetTags from 'src/hooks/useGetTags'
// import { MuiFileInput } from 'mui-file-input'
import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import useGetProduct from 'src/hooks/useGetProduct'

const AddProduct = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { postProductData, postProductDataLoading } = useCreateProduct()
  const { fetchCategories, categories, fetchCategoriesLoading } = useGetCategories()
  const { tags, fetchTagsLoading } = useGetTags()
  const { allProducts, fetchAllProduct } = useGetProduct()
  const handleClickOpen = () => setOpen(true)

  const required = 'این فیلد اجباریه'

  const validationSchema = Yup.object({
    // Define your validation rules here
    name: Yup.string().required(required),
    // price: Yup.number().required(required).positive('Price must be a positive number'),
    // discount: Yup.number().required(required).positive('Price must be a positive number'),
    shortDescription: Yup.string().required(required),
    longDescription: Yup.string().required(required),
    tags: Yup.array().required(required),
    categories: Yup.array().required(required),
    min_quantity: Yup.number()
    // image: Yup.string().required(required)
  })
  const handleClose = () => setOpen(false)
  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      shortDescription: '',
      longDescription: '',
      image: '',
      discount: 0,
      tags: [],
      categories: [],
      min_quantity: 0,
      max_quantity: 0,
      available_quantity: 0
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      console.log(values)
      values.categories = values.categories.map(v => v.id)
      values.tags = values.tags.map(v => v.id)
      const filteredFormValues = Object.keys(values).reduce((acc, key) => {
        const value = values[key]
        if (value !== '' && value !== null && value !== undefined) {
          acc[key] = value
        }
        return acc
      }, {})
      console.log(filteredFormValues)
      // values.img = base64Image
      postProductData(filteredFormValues).then(() => {
        formik.resetForm()
        handleClose()
        fetchAllProduct()
      })

      // Handle form submission here
    }
  })

  const handleFileChange = event => {
    console.log(event)
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]

      if (file) {
        const fd = new FormData()
        const reader = new FileReader()

        // reader.onload = e => {
        //   const fileContent = e.target.result
        //   fd.append('test', value as unknown as Blob)
        //   formik.setFieldValue('image', fileContent)
        // }

        // reader.readAsText(file)

        reader.onloadend = () => {
          if (reader.result) {
            // Convert the image file to Base64
            const base64String = reader.result
            // setBase64Image(base64String)
            console.log(base64String)
            // Set the Base64 representation of the image to formik state
            formik.setFieldValue('image', base64String)
          }
        }

        reader.onerror = error => {
          console.error('FileReader error:', error)
        }

        reader.readAsDataURL(file)
      }
    }
  }

  const inputProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur
  }

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen}>
        اضافه کردن محصول
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id='form-dialog-title'>محصول جدید</DialogTitle>
          <DialogContent>
            <CTextField
              value={formik.values.name}
              {...inputProps}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              name='name'
              autoFocus
              fullWidth
              type='text'
              label='نام محصول'
            />
            {/* <MuiFileInput value={formik.values.img} name='img' onChange={handleFileChange} /> */}
            <input name='image' type='file' onChange={handleFileChange} />
            {/* <CTextField
              type='file'
              onChange={handleFileChange}
              inputProps={{
                accept: 'image/*'
              }}
              // error={formik.touched.img && Boolean(formik.errors.img)}
              // helperText={formik.touched.img && formik.errors.img}
              name='img'
              value={formik.values.img}
              // autoFocus
              // fullWidth
              // label=''
            /> */}
            <CTextField
              name='price'
              value={formik.values.price}
              {...inputProps}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              autoFocus
              fullWidth
              type='number'
              label='قیمت'
            />
            <CTextField
              name='discount'
              value={formik.values.discount}
              {...inputProps}
              error={formik.touched.discount && Boolean(formik.errors.discount)}
              helperText={formik.touched.discount && formik.errors.discount}
              autoFocus
              fullWidth
              type='number'
              label='تخفیف'
            />
            <CTextField
              value={formik.values.shortDescription}
              {...inputProps}
              error={formik.touched.shortDescription && Boolean(formik.errors.shortDescription)}
              helperText={formik.touched.shortDescription && formik.errors.shortDescription}
              name='shortDescription'
              autoFocus
              fullWidth
              type='text'
              label='توضیح کوتاه'
            />
            <CTextField
              minRows={3}
              maxRows={10}
              placeholder='توضیحات کامل'
              style={{ width: '100%', marginTop: '10px' }}
              value={formik.values.longDescription}
              {...inputProps}
              error={formik.touched.longDescription && Boolean(formik.errors.longDescription)}
              helperText={formik.touched.longDescription && formik.errors.longDescription}
              name='longDescription'
              autoFocus
              fullWidth
              type='text'
            />
            <CTextField
              name='discount'
              value={formik.values.discount}
              {...inputProps}
              error={formik.touched.discount && Boolean(formik.errors.discount)}
              helperText={formik.touched.discount && formik.errors.discount}
              autoFocus
              fullWidth
              type='number'
              label='تخفیف'
            />
            <CTextField
              name='max_quantity'
              value={formik.values.max_quantity}
              {...inputProps}
              error={formik.touched.max_quantity && Boolean(formik.errors.max_quantity)}
              helperText={formik.touched.max_quantity && formik.errors.max_quantity}
              autoFocus
              fullWidth
              type='number'
              label=' حداکثر تعداد'
            />
            <CTextField
              name='min_quantity'
              value={formik.values.min_quantity}
              {...inputProps}
              error={formik.touched.min_quantity && Boolean(formik.errors.min_quantity)}
              helperText={formik.touched.min_quantity && formik.errors.min_quantity}
              autoFocus
              fullWidth
              type='number'
              label='کمترین تعداد'
            />
            <CTextField
              name='available_quantity'
              value={formik.values.available_quantity}
              {...inputProps}
              error={formik.touched.available_quantity && Boolean(formik.errors.available_quantity)}
              helperText={formik.touched.available_quantity && formik.errors.available_quantity}
              autoFocus
              fullWidth
              type='number'
              label='تعداد در دسترس'
            />
            <Autocomplete
              label={'برچسب'}
              options={tags}
              multiple={true}
              getOptionLabel={option => option.word}
              value={formik.values.tags}
              onChange={(event, newValue) => {
                console.log(newValue)
                formik.setFieldValue('tags', newValue)
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label='برچسب'
                  variant='outlined'
                  error={formik.touched.tags && Boolean(formik.errors.tags)}
                  helperText={formik.touched.tags && formik.errors.tags}
                />
              )}
            />

            <Autocomplete
              label={'دسته'}
              multiple={true}
              options={categories}
              getOptionLabel={option => option.name}
              value={formik.values.categories}
              onChange={(event, newValues) => {
                formik.setFieldValue('categories', newValues)
              }}
              renderInput={params => (
                <CTextField
                  {...params}
                  label='دسته'
                  variant='outlined'
                  error={formik.touched.categories && Boolean(formik.errors.categories)}
                  helperText={formik.touched.categories && formik.errors.categories}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              انصراف
            </Button>
            <Button type='submit' variant='contained'>
              ثبت
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <CustomGrid container spacing={6}>
        {allProducts?.map((data, index): any => {
          return (
            <Grid item xs={6}>
              <Card sx={{ maxWidth: 345 }} key={index}>
                <CardMedia component='img' alt='product image' height='140' image={data?.image} />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {data?.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {data?.shortDescription}
                  </Typography>
                  <Typography color='text.secondary'>{data?.price} تومان</Typography>
                </CardContent>
                <CardActions>
                  <Button variant='contained' color='error' size='small'>
                    حذف
                  </Button>
                  <Button variant='contained' size='small'>
                    {' '}
                    ویرایش
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </CustomGrid>
    </>
  )
}

export default AddProduct

const CTextField = styled(TextField)`
  margin: 1rem 0;
`
const CustomGrid = styled(Grid)`
  padding: 5rem 0;
`
