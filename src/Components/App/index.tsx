import React, { useState } from "react";
import { TodoListPage as LitTodoListPage } from "../../lib/Pages";
import { reactComponent } from "../LitReact";

const TodoListPage = reactComponent(LitTodoListPage);

function App() {
  const [name, setName] = useState("Koustubh");

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <TodoListPage />
    </>
  );
}

export default App;
