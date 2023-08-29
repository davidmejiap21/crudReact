import React, { useState } from "react";
import "./App.css";

function App() {
  // State Hook - `useState`
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  // Helper Functions

  /*añade nuevos objetos*/
  function addItem() {
    // ! Revisar el item vacio
    if (!newItem) {
      alert("Press enter an item.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    // Añade nuevos objetos al array
    setItems((oldList) => [...oldList, item]);

    // Devuelve el estado original del item
    setNewItem("");
  }

  /* Borrar el objeto seleccionado */
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  /* Edita el texto despues de aberlo creado */
  function editItem(id, newText) {
    // Obtener el itme seleccionado
    const currentItem = items.filter((item) => item.id === id);

    // Crea un nuevo item con el mismo ID
    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    // Remplaza el objeto en la lista
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }

  // Main part of app
  return (
    <div className="app">
      {/* 1. cabecera  */}
      <h1>Lista de tareas</h1>

      {/* 2. añadir tarea */}
      <input
        type="text"
        placeholder="Añade una nueva tarea..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />

      {/*boton añadir */}
      <button class="button" onClick={() => addItem()}>Añadir</button>

      {/* Lista de tareas */}
      <ul>
        {items.map((item) => {
          return (
            <div>
              <li key={item.id} onClick={() => setShowEdit(item.id)}>
                {item.value}
                <button
                  className="delete-button"
                  onClick={() => deleteItem(item.id)}
                >
                  ❌
                </button>
              </li>

              {showEdit == item.id ? (
                <div>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button class="button" onClick={() => editItem(item.id, updatedText)}>
                    Actualizar
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
