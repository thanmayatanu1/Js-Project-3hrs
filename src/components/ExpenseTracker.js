import React, { useState, useEffect } from 'react';

function ExpenseTracker() {
  const [orderId, setorderId] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [dish, setDish] = useState('');
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
    orderId,
     sellingPrice,
     dish,
      table,
    };

    setProducts([...products, newProduct]);
    setorderId('');
    setSellingPrice('');
    setDish('');
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
          value={orderId}
          onChange={(event) => setorderId(event.target.value)}
          placeholder="OrderId"
        />
        <label>Choose Price:</label>
        <input
          type="text"
          value={sellingPrice}
          onChange={(event) => setSellingPrice(event.target.value)}
          placeholder="Selling Price"
        />
        <label>Choose a Dish:</label>
        <input
          type="text"
          value={dish}
          onChange={(event) => setDish(event.target.value)}
          placeholder="Dish"
        />
        <label>Choose a Table:</label>
        <select
          id="table"
          name="table"
          value={table}
          onChange={(event) => setTable(event.target.value)}
        >
          <option value="Table">Table </option>
          <option value="Table1">Table 1</option>
          <option value="Table2">Table 2</option>
          <option value="Table3">Table 3</option>
        </select>
        <button type="submit">Add to bill</button>
      </form>

      <div>
        <h3>Orders</h3>
        <h3>Table 1:</h3>
        <ul>
          {products
            .filter((product) => product.table === 'Table1')
            .map((product, index) => (
              <li key={index}>
                <div> {product.orderId}-{product.sellingPrice}-{product.dish} 
                <button onClick={() => deleteProduct(index)}>
                  Delete Order
                </button>
                 </div>
               </li>
            ))}
        </ul>
      </div>

      <div>
        <h3>Table 2:</h3>
        <ul>
          {products
            .filter((product) => product.table === 'Table2')
            .map((product, index) => (
              <li key={index}>
                <div> {product.orderId}-{product.sellingPrice}-{product.dish}
                <button onClick={() => deleteProduct(index)}>
                  Delete Order
                </button>
                 </div>
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h3>Table 3:</h3>
        <ul>
          {products
            .filter((product) => product.table === 'Table3')
            .map((product, index) => (
              <li key={index}>
                <div> {product.orderId}-{product.sellingPrice}-{product.dish}
                <button onClick={() => deleteProduct(index)}>
                  Delete Order
                </button>
                 </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpenseTracker;