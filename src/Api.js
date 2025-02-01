import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetch("/.netlify/functions/connectMongo")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const addItem = () => {
    fetch("/.netlify/functions/connectMongo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItem })
    }).then(() => window.location.reload());
  };

  return (
    <div>
      <h1>MongoDB Items</h1>
      <ul>{items.map((item) => (<li key={item._id}>{item.name}</li>))}</ul>
      <input value={newItem} onChange={(e) => setNewItem(e.target.value)} />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}
export default App;