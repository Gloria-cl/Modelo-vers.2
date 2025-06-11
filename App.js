const { useState, useMemo } = React;

function App() {
  const dataPorCuadrante = {
    Diseño: [
      { nombre: "Funcionalidad", valor: 3.0, angulo: 10, id: "funcionalidad" },
      { nombre: "Integración Urbana", valor: 2.0, angulo: 20, id: "integracion_urbana" },
      { nombre: "Innovación", valor: 2.2, angulo: 30, id: "innovacion" },
      { nombre: "Inclusión", valor: 2.1, angulo: 45, id: "inclusion" },
      { nombre: "Accesibilidad", valor: 2.0, angulo: 60, id: "accesibilidad" },
      { nombre: "Confort", valor: 2.7, angulo: 75, id: "confort" },
      { nombre: "Imagen", valor: 2.5, angulo: 85, id: "imagen" },
    ],
    Construcción: [
      { nombre: "Sostenibilidad Ambiental", valor: 2.6, angulo: 100, id: "sostenibilidad_ambiental" },
      { nombre: "Cohesión Social", valor: 3.0, angulo: 115, id: "cohesion_social" },
      { nombre: "Movilidad Sostenible", valor: 2.5, angulo: 130, id: "movilidad_sostenible" },
      { nombre: "Materiales Ecológicos", valor: 2.3, angulo: 150, id: "materiales_ecologicos" },
      { nombre: "Eficiencia Energética", valor: 2.5, angulo: 170, id: "eficiencia_energetica" },
    ],
    Gestión: [
      { nombre: "Mantenimiento", valor: 2.5, angulo: 195, id: "mantenimiento" },
      { nombre: "Planificación", valor: 3.0, angulo: 210, id: "planificacion" },
      { nombre: "Gestión Operativa", valor: 2.6, angulo: 225, id: "gestion_operativa" },
      { nombre: "Comunicación y Difusión", valor: 2.3, angulo: 240, id: "comunicacion_difusion" },
      { nombre: "Monitoreo y Evaluación", valor: 3.0, angulo: 255, id: "monitoreo_evaluacion" },
    ],
    Rehabilitación: [
      { nombre: "Cultura", valor: 2.6, angulo: 285, id: "cultura" },
      { nombre: "Identidad", valor: 1.7, angulo: 300, id: "identidad" },
      { nombre: "Participación Ciudadana", valor: 2.7, angulo: 315, id: "participacion_ciudadana" },
      { nombre: "Responsabilidad Social", valor: 2.8, angulo: 330, id: "responsabilidad_social" },
      { nombre: "Impacto Económico", valor: 1.6, angulo: 345, id: "impacto_economico" },
    ],
  };

  const coloresCuadrante = {
    Diseño: "#9966ff",
    Construcción: "#95ca49",
    Gestión: "#5c8fe6",
    Rehabilitación: "#5cd6d6",
  };

  const [cuadranteSeleccionado, setCuadranteSeleccionado] = useState("todos");
  const [puntoHover, setPuntoHover] = useState(null);
  const [modoVisualizacion, setModoVisualizacion] = useState("ideal");

  const [indicadoresActuales, setIndicadoresActuales] = useState(() => {
    const inicial = {};
    Object.values(dataPorCuadrante)
      .flat()
      .forEach((item) => {
        inicial[item.id] = false;
      });
    return inicial;
  });

  const toggleIndicador = (indicadorId) =>
    setIndicadoresActuales((prev) => ({
      ...prev,
      [indicadorId]: !prev[indicadorId],
    }));

  return React.createElement(
    "div",
    {
      style: {
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        backgroundColor: "#f8fafc",
      },
    },
    React.createElement(
      "h1",
      {
        style: {
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "700",
          color: "#1e293b",
          margin: "20px 0",
        },
      },
      "Modelo de Estrategias de Viabilidad para Espacios Públicos"
    ),
    React.createElement(
      "p",
      {
        style: {
          textAlign: "center",
          fontSize: "16px",
          color: "#64748b",
          margin: "0 0 40px 0",
        },
      },
      "¡Tu aplicación React está funcionando!"
    )
  );
}
