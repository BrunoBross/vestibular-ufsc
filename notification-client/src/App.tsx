import { useState } from "react";
import "./App.css";
import { httpClient } from "./lib/http-client";

export default function App() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const sendNotification = async () => {
    await httpClient
      .post("/notification", {
        title,
        message,
      })
      .then(() => {
        setTitle("");
        setMessage("");
        alert("Notificação enviada com sucesso!");
      })
      .catch((e) => {
        console.log(e);
        alert("Ocorreu um erro!");
      });
  };

  return (
    <div>
      <h2>Enviar notificação</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>
          Título
          <input
            type="text"
            placeholder="Insira o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Mensagem
          <input
            type="text"
            placeholder="Insira a mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button onClick={sendNotification} type="submit">
          Enviar notificação
        </button>
      </div>
    </div>
  );
}
