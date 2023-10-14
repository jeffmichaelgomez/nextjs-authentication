'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar-2';
import {
	FormWrapper,
	FormTitle,
	SubmitButton,
	StyledTable,
	TopSection,
	StyledForm,
	StyledInput,
	StyledLabel,
	FormGroup,
	SearchInput,
	SearchWrapper,
	Spinner,
} from './ProductStyles';

type ProductType = {
	_id: string;
	productId: string;
	brand: string;
	manufacturer: string;
	price: number;
	lotNo: string;
	expiry: Date;
};

type ProductRowProps = {
	product: ProductType;
	onEdit: (product: ProductType) => void;
};

function ProductRow({ product, onEdit }: ProductRowProps) {
	return (
		<tr>
			<td>{product.productId}</td>
			<td>{product.brand}</td>
			<td>{product.manufacturer}</td>
			<td>${product.price.toFixed(2)}</td>
			<td>{product.lotNo}</td>
			<td>{new Date(product.expiry).toLocaleDateString()}</td>
			<td>
				<Image
					src="/edit.png"
					alt="Edit Product"
          width={20}
          height={20}
					style={{ cursor: 'pointer' }} // Makes it look clickable
					onClick={() => onEdit(product)}
				/>
			</td>
		</tr>
	);
}

function ProductList() {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [editingProduct, setEditingProduct] = useState<ProductType | null>(
		null
	);

	const handleEditProduct = (product: ProductType) => {
		setEditingProduct(product);
	};

	const handleUpdateProduct = async (updatedProduct: ProductType) => {
		try {
			await axios.put(`/api/products`, updatedProduct);
			setProducts(
				products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
			);
			setEditingProduct(null);
			alert('Product updated successfully!');
		} catch (error) {
			console.error(error);
		}
	};

	const [search, setSearch] = useState('');
	const [searchTermForQuery, setSearchTermForQuery] = useState('');

	useEffect(() => {
		// This will clear the timeout in case the user is still typing
		const timer = setTimeout(() => {
			setSearchTermForQuery(search);
		}, 500); // 1-second delay

		// Clear the timer when the component is unmounted or when the search value changes
		return () => clearTimeout(timer);
	}, [search]);

	useEffect(() => {
		async function fetchProducts() {
			setLoading(true);
			try {
				const response = await axios.get(
					`/api/products?page=${page}&search=${searchTermForQuery}`
				);
				setProducts(response.data.products);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		fetchProducts();
	}, [page, searchTermForQuery]);

	return (
		<div style={{ display: 'flex' }}>
			<Sidebar />
			<FormWrapper>
				<TopSection>
					<FormTitle>{loading ? 'Loading...' : 'Product List'}</FormTitle>
					<SearchWrapper>
						<SearchInput
							placeholder="Search products..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</SearchWrapper>
					<div>
						<SubmitButton
							onClick={() => setPage((prev) => prev - 1)}
							disabled={page === 1}
						>
							Prev
						</SubmitButton>
						<SubmitButton
							style={{ marginRight: '220px' }}
							onClick={() => setPage((prev) => prev + 1)}
						>
							Next
						</SubmitButton>
					</div>
				</TopSection>
				{loading ? (
					<Spinner />
				) : editingProduct ? (
					<StyledForm
						onSubmit={(e) => {
							e.preventDefault();
							handleUpdateProduct(editingProduct);
						}}
					>
						{/* Product ID */}
						<FormGroup>
							<StyledLabel htmlFor="productId">Product ID</StyledLabel>
							<StyledInput
								id="productId"
								value={editingProduct.productId}
								onChange={(e) =>
									setEditingProduct({
										...editingProduct,
										productId: e.target.value,
									})
								}
							/>
						</FormGroup>

						{/* Brand */}
						<FormGroup>
							<StyledLabel htmlFor="brand">Brand</StyledLabel>
							<StyledInput
								id="brand"
								value={editingProduct.brand}
								onChange={(e) =>
									setEditingProduct({
										...editingProduct,
										brand: e.target.value,
									})
								}
							/>
						</FormGroup>

						{/* Manufacturer */}
						<FormGroup>
							<StyledLabel htmlFor="manufacturer">Manufacturer</StyledLabel>
							<StyledInput
								id="manufacturer"
								value={editingProduct.manufacturer}
								onChange={(e) =>
									setEditingProduct({
										...editingProduct,
										manufacturer: e.target.value,
									})
								}
							/>
						</FormGroup>

						{/* Price */}
						<FormGroup>
							<StyledLabel htmlFor="price">Price</StyledLabel>
							<StyledInput
								type="number"
								id="price"
								value={editingProduct.price}
								onChange={(e) =>
									setEditingProduct({
										...editingProduct,
										price: parseFloat(e.target.value),
									})
								}
							/>
						</FormGroup>

						{/* Lot Number */}
						<FormGroup>
							<StyledLabel htmlFor="lotNo">Lot Number</StyledLabel>
							<StyledInput
								id="lotNo"
								value={editingProduct.lotNo}
								onChange={(e) =>
									setEditingProduct({
										...editingProduct,
										lotNo: e.target.value,
									})
								}
							/>
						</FormGroup>

						{/* Expiry Date - Assuming a simple date input for now */}
						<FormGroup>
							<StyledLabel htmlFor="expiry">Expiry Date</StyledLabel>
							<StyledInput
								type="date"
								id="expiry"
								value={
									new Date(editingProduct.expiry).toISOString().split('T')[0]
								}
								onChange={(e) =>
									setEditingProduct({
										...editingProduct,
										expiry: new Date(e.target.value),
									})
								}
							/>
						</FormGroup>

						<SubmitButton type="submit">Update</SubmitButton>
					</StyledForm>
				) : (
					<StyledTable>
						<thead>
							<tr>
								<th>Product ID</th>
								<th>Brand</th>
								<th>Manufacturer</th>
								<th>Price</th>
								<th>Lot Number</th>
								<th>Expiry Date</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<ProductRow
									key={product._id}
									product={product}
									onEdit={handleEditProduct}
								/>
							))}
						</tbody>
					</StyledTable>
				)}
			</FormWrapper>
		</div>
	);
}

export default ProductList;
