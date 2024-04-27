import React, { useState } from 'react';
import './App.css';

const ProductList = ({ products, onDelete, onIncrement, onDecrement, onAdd }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <div>{product.name}</div>
          <div>Цена: ₽{product.price * product.count}</div>
          <div>Количество: {product.count}</div>
          <div className="product-buttons">
            <button onClick={() => onDecrement(product.id)}>-</button>
            <button onClick={() => onIncrement(product.id)}>+</button>
          </div>
          <div className="delete-button" onClick={() => onDelete(product.id)}>
            Удалить товар
          </div>
        </div>
      ))}
      <div className="add-button" onClick={onAdd}>
        Добавить новый товар
      </div>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([ 
    { id: 1, name: 'Велосипед', price: 1000, count: 1 },
    { id: 2, name: 'Самокат', price: 3500, count: 1 },
    { id: 3, name: 'Ролики', price: 2000, count: 1 },
    { id: 4, name: 'Сноуборд', price: 15000, count: 1 }
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleIncrement = (id) => { 
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, count: Math.min(product.count + 1, 25) } : product
      )
    );
  };

  const handleDecrement = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, count: Math.max(product.count - 1, 0) } : product
      )
    );
  };

  const handleAdd = () => {
    const newId = products.length + 1;
    const newName = prompt('Введите название нового товара:');
    const newPrice = Number(prompt('Введите цену нового товара:'));
    const newCount = Number(prompt('Введите количество нового товара:'));
    setProducts([...products, { id: newId, name: newName, price: newPrice, count: newCount }]);
  };

  return (
    <div className="app">
      <ProductList
        products={products}
        onDelete={handleDelete}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default App;
