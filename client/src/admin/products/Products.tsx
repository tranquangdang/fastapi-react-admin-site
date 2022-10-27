import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TableCell,
  TableRow,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from 'react';
import TablePagination from '../../helper/component/TablePagination';
import Axios from '../../helper/axios';
import Format from '../../helper/format';
import { Link as LinkTo } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
const productsTableHead = [
  'ID',
  'Name',
  'Category',
  'Time Create',
  'Qty',
  'Unit Price',
  'Detail',
];

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.getData(`products`).then((result) => {
      setProducts(result.data);
    });
  }, []);

  const handleDelete = (id: string) => {
    Axios.deleteData(`products`, id).then((res) => {
      if (res.status === 200) {
        setProducts(
          products.filter((p: any) => p.ProductModel.productId !== id)
        );
      }
    });
  };

  const renderHead = (item: any, index: any) => (
    <TableCell key={index} sx={{ fontWeight: 700 }}>
      {item}
    </TableCell>
  );

  const renderBody = (item: any) => (
    <TableRow key={item.ProductModel.productId}>
      <TableCell>{item.ProductModel.productId}</TableCell>
      <TableCell>{item.ProductModel.productName}</TableCell>
      <TableCell>{item.ProductCategoryModel.categoryName}</TableCell>
      <TableCell>{Format.dateTimeJS(item.ProductModel.timeCreate)}</TableCell>
      <TableCell>{item.ProductModel.qtyOnHand}</TableCell>
      <TableCell align="right">
        {Format.money(item.ProductModel.unitPrice)}
      </TableCell>
      <TableCell>
        <Button
          component={LinkTo}
          to={`/admin/products/create`}
          state={{ id: item.ProductModel.productId }}
        >
          <InfoIcon />
        </Button>
        <Button onClick={() => handleDelete(item.ProductModel.productId)}>
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <TablePagination
              title="Product List"
              topRight={
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    component={LinkTo}
                    to="/admin/products/create"
                  >
                    Create
                  </Button>
                </Box>
              }
              headData={productsTableHead}
              renderHead={(item: any, index: any) => renderHead(item, index)}
              bodyData={products}
              renderBody={(item: any) => renderBody(item)}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
