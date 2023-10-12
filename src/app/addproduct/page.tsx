"use client";
import { FormEvent, useState } from "react";
import {
  FormWrapper,
  StyledForm,
  FormTitle,
  FormGroup,
  StyledLabel,
  StyledInput,
  SubmitButton,
} from "./AddProductStyles";
import { Product } from './types';
import axios from "axios";
import Sidebar from '../../components/Sidebar';

function AddProduct() {
  const [product, setProduct] = useState<Product>({
    productId: "",
    brand: "",
    manufacturer: "",
    price: 0,
    lotNo: "",
    expiry: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Check if the input's name is "price" and convert it to a number, else keep it as is
    const inputValue = name === 'price' ? parseFloat(value) : value;
    setProduct(prev => ({ ...prev, [name]: inputValue }));
};

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        setLoading(true);
        const response = await axios.post("/api/addproduct", product);
        const data = await response.data;
        console.log(data)
    } catch (error) {
        console.error(error);
        alert('There was an error adding the product. Please try again.');
    } finally {
        setLoading(false);
        alert('Process Complete');
            setProduct({
                productId: '',
                brand: '',
                manufacturer: '',
                price: 0,
                lotNo: '',
                expiry: ''
        });
    }
}

const [loading, setLoading] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
        <FormWrapper>
          <StyledForm onSubmit={handleSubmit}>
            <FormTitle>{loading ? "Processing ..." : "Add New Product"}</FormTitle>

            <FormGroup>
              <StyledLabel htmlFor="productId">Product ID:</StyledLabel>
              <StyledInput
                type="text"
                id="productId"
                name="productId"
                value={product.productId}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <StyledLabel htmlFor="brand">Brand:</StyledLabel>
              <StyledInput
                type="text"
                id="brand"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <StyledLabel htmlFor="manufacturer">Manufacturer:</StyledLabel>
              <StyledInput
                type="text"
                id="manufacturer"
                name="manufacturer"
                value={product.manufacturer}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <StyledLabel htmlFor="price">Price:</StyledLabel>
              <StyledInput
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <StyledLabel htmlFor="lotNo">Lot Number:</StyledLabel>
              <StyledInput
                type="text"
                id="lotNo"
                name="lotNo"
                value={product.lotNo}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <StyledLabel htmlFor="expiry">Expiry Date:</StyledLabel>
              <StyledInput
                type="date"
                id="expiry"
                name="expiry"
                value={product.expiry}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <SubmitButton type="submit">Add Product</SubmitButton>
            </FormGroup>
          </StyledForm>
        </FormWrapper>
    </div>
  );
}

export default AddProduct;
