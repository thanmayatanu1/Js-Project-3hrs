import React, { useState, useEffect } from 'react';

function ExpenseTracker() {
  const [sellingPrice, setSellingPrice] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [table, setTable] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addToNewExpense = (event) => {
    event.preventDefault();

    const newProduct = {
      sellingPrice,
      productName,
      category,
      table,
      
    };

    setProducts([...products, newProduct]);
    setSellingPrice('');
    setProductName('');
    setCategory('');
    setTable('');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product, index) => index !== id));
  };

  return (
    <div>
      <form onSubmit={addToNewExpense}>
        <label>Unique Order ID:</label>
        <input
          type="number"
          value={sellingPrice}
          onChange={(event) => setSellingPrice(event.target.value)}
          placeholder="Selling Price"
        />
        <label>Choose Price:</label>
        <input
          type="text"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          placeholder="Product Name"
        />
        <label>Choose a Dish:</label>
        <input
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Category"
        />
        <label>Choose a Table:</label>
        <select
          id="table"
          name="table"
          value={table}
          onChange={(event) => setTable(event.target.value)}
        >
          <option value="Table1">Table 1</option>
          <option value="Table2">Table 2</option>
          <option value="Table3">Table 3</option>
        </select>
        <button type="submit">Add to bill</button>
      </form>

      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <div>{product.sellingPrice}</div>
            <div>{product.productName}</div>
            <div>{product.category}</div>
            <div>{product.table}</div>
            <button onClick={() => deleteProduct(index)}>Delete Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ExpenseTracker;

