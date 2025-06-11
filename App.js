const { useState } = React;

function App() {
  return React.createElement(
    "div",
    {
      style: {
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8fafc",
        textAlign: "center",
      },
    },
    React.createElement(
      "h1",
      {
        style: {
          fontSize: "28px",
          color: "#1e293b",
          margin: "20px 0",
        },
      },
      "¡Tu aplicación React está funcionando!"
    ),
    React.createElement(
      "p",
      {
        style: {
          fontSize: "16px",
          color: "#64748b",
        },
      },
      "Modelo de Estrategias de Viabilidad para Espacios Públicos"
    )
  );
}
