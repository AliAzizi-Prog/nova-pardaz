// ** MUI Imports
import { Autocomplete, TextareaAutosize, styled } from '@mui/material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Input } from '@mui/material'
import * as React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useState } from 'react'
import useCreateProduct from 'src/hooks/useCreateProduct'
import useGetCategories from 'src/hooks/useCategories'
import useGetTags from 'src/hooks/useGetTags'
// import { MuiFileInput } from 'mui-file-input'

const SecondPage = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { postProductData, postProductDataLoading } = useCreateProduct()
  const { fetchCategories, categories, fetchCategoriesLoading } = useGetCategories()
  const { tags, fetchTagsLoading } = useGetTags()

  const handleClickOpen = () => setOpen(true)

  const validationSchema = Yup.object({
    // Define your validation rules here
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    shortDescription: Yup.string().required('shortDescription is required')
  })
  const handleClose = () => setOpen(false)
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      shortDescription: '',
      longDescription: '',
      image: '',
      discount: '',
      tags: [],
      categories: []
    },
    // validationSchema: validationSchema,
    onSubmit: async values => {
      console.log(values)
      values.categories = values.categories.map(v => v.id)
      values.tags = values.tags.map(v => v.id)
      // values.img = base64Image
      postProductData(values).then(() => {
        formik.resetForm()
        handleClose()
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
            <TextareaAutosize
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
    </>
  )
}

export default SecondPage

const CTextField = styled(TextField)`
  margin: 1rem 0;
`
