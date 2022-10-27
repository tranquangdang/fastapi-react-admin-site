import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import { Navigate, useOutletContext } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link as LinkTo, useLocation } from 'react-router-dom';
import Axios from '../../helper/axios';
import Validation from '../../helper/validation';
interface ICategory {
  categoryId: string;
  categoryName: string;
}

export default function Detail() {
  //@ts-ignore
  const { setAlert } = useOutletContext();
  const { state } = useLocation();
  const [category, setCategory] = useState<ICategory>({
    categoryId: '',
    categoryName: '',
  });
  const [categoryList, setCategoryList] = useState<ICategory[]>([
    { categoryId: '', categoryName: '' },
  ]);
  const [product, setProduct] = useState<{
    productId: number;
    categoryNo: string;
    brand: string;
    productName: string;
    productImg: string;
    intro: string;
    unitPrice: number;
    perDiscount: number;
    qtyOnHand: number;
    timeCreate: string;
  }>({
    productId: 0,
    categoryNo: '',
    brand: '',
    productName: '',
    productImg: '',
    intro: '',
    unitPrice: 0,
    perDiscount: 0,
    qtyOnHand: 0,
    timeCreate: '',
  });
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState<any>({});

  useEffect(() => {
    setError({});
  }, [product, category]);
  useEffect(() => {
    (async () => {
      const list = await Axios.getData(`product-category`);
      setCategoryList([
        {
          categoryId: '',
          categoryName: '',
        },
        ...list.data,
      ]);
      if (state?.id) {
        const product = await Axios.getDataById(`products`, state.id);
        setProduct(product.data.ProductModel);
        const result = list.data.filter(
          (i: ICategory) =>
            i.categoryId === product.data.ProductModel.categoryNo
        )[0];

        setCategory(result);
      }
    })();
  }, []);

  if (redirect) {
    return <Navigate to="/admin/products" />;
  }

  function handleChange(event: any) {
    const value = event.target.value;
    setProduct({
      ...product,
      [event.target.name]: value,
    });
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const validate = () => {
      let field: any = {};
      field.productName = Validation.isNotNull(product.productName);
      field.brand = Validation.isNotNull(product.brand);
      field.intro = Validation.isNotNull(product.intro);
      field.unitPrice = Validation.isInteger(product.unitPrice);
      field.perDiscount = Validation.isInteger(product.perDiscount);
      field.qtyOnHand = Validation.isInteger(product.qtyOnHand);
      field.categoryNo = Validation.isNotNull(category.categoryId);

      setError({ ...field });
      return Object.values(field).every((error) => error === '');
    };

    if (!validate()) {
      return;
    }

    const payload = {
      ...product,
      categoryNo: category.categoryId,
    };
    if (product.productId) {
      Axios.updateData(`products`, payload).then((res) => {
        if (res.status === 200) {
          setAlert({
            message: 'Update product successfully',
            type: 'success',
          });
          setRedirect(true);
        }
      });
    } else {
      Axios.createData(`products`, payload).then((res) => {
        if (res.status === 200) {
          setAlert({
            message: 'Create product successfully',
            type: 'success',
          });
          setRedirect(true);
        }
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minWidth: '650px' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1 },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                fullWidth
                onChange={handleChange}
                name="productName"
                value={product.productName}
                label="Name"
                {...(error.productName && {
                  error: true,
                  helperText: error.productName,
                })}
              />
              {categoryList && (
                <Autocomplete
                  fullWidth
                  value={!category.categoryId ? categoryList[0] : category}
                  isOptionEqualToValue={(option, value) =>
                    option.categoryId === value.categoryId
                  }
                  onChange={(event, newValue: any) => {
                    if (newValue) {
                      setCategory(newValue);
                    }
                  }}
                  options={categoryList}
                  getOptionLabel={(c: ICategory) => c.categoryName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      fullWidth
                      {...(error.categoryNo && {
                        error: true,
                        helperText: error.categoryNo,
                      })}
                    />
                  )}
                />
              )}
              <TextField
                fullWidth
                onChange={handleChange}
                name="brand"
                value={product.brand}
                label="Brand"
                {...(error.brand && {
                  error: true,
                  helperText: error.brand,
                })}
              />
              <TextField
                fullWidth
                onChange={handleChange}
                name="intro"
                value={product.intro}
                label="Information"
                {...(error.intro && {
                  error: true,
                  helperText: error.intro,
                })}
              />
              <TextField
                fullWidth
                onChange={handleChange}
                name="unitPrice"
                value={product.unitPrice}
                label="Unit Price"
                {...(error.unitPrice && {
                  error: true,
                  helperText: error.unitPrice,
                })}
              />
              <TextField
                fullWidth
                onChange={handleChange}
                name="perDiscount"
                value={product.perDiscount}
                label="Discount"
                {...(error.perDiscount && {
                  error: true,
                  helperText: error.perDiscount,
                })}
              />
              <TextField
                fullWidth
                onChange={handleChange}
                name="qtyOnHand"
                value={product.qtyOnHand}
                label="Quantity"
                {...(error.qtyOnHand && {
                  error: true,
                  helperText: error.qtyOnHand,
                })}
              />
              <React.Fragment>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, mr: 2 }}
                    component={LinkTo}
                    to="/admin/products"
                  >
                    Quay lại
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {state?.id ? 'Update' : 'Create'}
                  </Button>
                </Box>
              </React.Fragment>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
