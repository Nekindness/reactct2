import React, { useState } from 'react'; // Импорт React и хука useState из библиотеки React
import './App.css'; // Импорт стилей из файла App.css

// Компонент ProductList, отображающий список продуктов
const ProductList = ({ products, onDelete, onIncrement, onDecrement, onAdd }) => {
  return (
    <div className="product-list"> {/* Обертка для списка продуктов */}
      {products.map((product) => ( // Итерация по каждому продукту в списке
        <div key={product.id} className="product-item"> {/* Элемент для отдельного продукта */}
          <div>{product.name}</div> {/* Отображение названия продукта */}
          <div>Цена: ₽{product.price * product.count}</div> {/* Отображение цены продукта */}
          <div>Количество: {product.count}</div> {/* Отображение количества продукта */}
          <div className="product-buttons"> {/* Обертка для кнопок управления количеством */}
            <button onClick={() => onDecrement(product.id)}>-</button> {/* Кнопка уменьшения количества продукта */}
            <button onClick={() => onIncrement(product.id)}>+</button> {/* Кнопка увеличения количества продукта */}
          </div>
          <div className="delete-button" onClick={() => onDelete(product.id)}> {/* Кнопка удаления продукта */}
            Удалить товар
          </div>
        </div>
      ))}
      <div className="add-button" onClick={onAdd}> {/* Кнопка добавления нового товара */}
        Добавить новый товар
      </div>
    </div>
  );
};

// Компонент App, основной компонент приложения
const App = () => {
  const [products, setProducts] = useState([ // Инициализация состояния products с помощью хука useState
    { id: 1, name: 'Велосипед', price: 1000, count: 1 }, // Начальные данные о продуктах
    { id: 2, name: 'Самокат', price: 3500, count: 1 },
    { id: 3, name: 'Ролики', price: 2000, count: 1 },
    { id: 4, name: 'Сноуборд', price: 15000, count: 1 }
  ]);

  const handleDelete = (id) => { // Функция для удаления продукта
    setProducts(products.filter((product) => product.id !== id)); // Удаление продукта из списка
  };

  const handleIncrement = (id) => { // Функция для увеличения количества продукта
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, count: Math.min(product.count + 1, 25) } : product
      )
    );
  };

  const handleDecrement = (id) => { // Функция для уменьшения количества продукта
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, count: Math.max(product.count - 1, 0) } : product
      )
    );
  };

  const handleAdd = () => { // Функция для добавления нового продукта
    const newId = products.length + 1; // Генерация нового идентификатора для продукта
    const newName = prompt('Введите название нового товара:'); // Запрос названия нового товара
    const newPrice = Number(prompt('Введите цену нового товара:')); // Запрос цены нового товара
    const newCount = Number(prompt('Введите количество нового товара:')); // Запрос количества нового товара
    setProducts([...products, { id: newId, name: newName, price: newPrice, count: newCount }]); // Добавление нового продукта в список
  };

  return (
    <div className="app">
      <ProductList
        products={products} //список продуктов, который будет отображаться в компоненте ProductList.
        onDelete={handleDelete} //функция обработчик, которая будет вызываться при удалении продукта из списка.
        onIncrement={handleIncrement} //функция обработчик, которая будет вызываться при увеличении количества продукта.
        onDecrement={handleDecrement} // функция обработчик, которая будет вызываться при уменьшении количества продукта.
        onAdd={handleAdd} //функция обработчик, которая будет вызываться при добавлении нового продукта в список.
      />
    </div>
  );
};

export default App;