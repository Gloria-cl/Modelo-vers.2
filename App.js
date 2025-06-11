const { useState, useMemo } = React;

function App() {
  const dataPorCuadrante = {
    Diseño: [
      { nombre: "Funcionalidad", valor: 3.0, angulo: 10, id: "funcionalidad" },
      {
        nombre: "Integración Urbana",
        valor: 2.0,
        angulo: 20,
        id: "integracion_urbana",
      },
      { nombre: "Innovación", valor: 2.2, angulo: 30, id: "innovacion" },
      { nombre: "Inclusión", valor: 2.1, angulo: 45, id: "inclusion" },
      { nombre: "Accesibilidad", valor: 2.0, angulo: 60, id: "accesibilidad" },
      { nombre: "Confort", valor: 2.7, angulo: 75, id: "confort" },
      { nombre: "Imagen", valor: 2.5, angulo: 85, id: "imagen" },
    ],
    Construcción: [
      {
        nombre: "Sostenibilidad Ambiental",
        valor: 2.6,
        angulo: 100,
        id: "sostenibilidad_ambiental",
      },
      {
        nombre: "Cohesión Social",
        valor: 3.0,
        angulo: 115,
        id: "cohesion_social",
      },
      {
        nombre: "Movilidad Sostenible",
        valor: 2.5,
        angulo: 130,
        id: "movilidad_sostenible",
      },
      {
        nombre: "Materiales Ecológicos",
        valor: 2.3,
        angulo: 150,
        id: "materiales_ecologicos",
      },
      {
        nombre: "Eficiencia Energética",
        valor: 2.5,
        angulo: 170,
        id: "eficiencia_energetica",
      },
    ],
    Gestión: [
      { nombre: "Mantenimiento", valor: 2.5, angulo: 195, id: "mantenimiento" },
      { nombre: "Planificación", valor: 3.0, angulo: 210, id: "planificacion" },
      {
        nombre: "Gestión Operativa",
        valor: 2.6,
        angulo: 225,
        id: "gestion_operativa",
      },
      {
        nombre: "Comunicación y Difusión",
        valor: 2.3,
        angulo: 240,
        id: "comunicacion_difusion",
      },
      {
        nombre: "Monitoreo y Evaluación",
        valor: 3.0,
        angulo: 255,
        id: "monitoreo_evaluacion",
      },
    ],
    Rehabilitación: [
      { nombre: "Cultura", valor: 2.6, angulo: 285, id: "cultura" },
      { nombre: "Identidad", valor: 1.7, angulo: 300, id: "identidad" },
      {
        nombre: "Participación Ciudadana",
        valor: 2.7,
        angulo: 315,
        id: "participacion_ciudadana",
      },
      {
        nombre: "Responsabilidad Social",
        valor: 2.8,
        angulo: 330,
        id: "responsabilidad_social",
      },
      {
        nombre: "Impacto Económico",
        valor: 1.6,
        angulo: 345,
        id: "impacto_economico",
      },
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

  const estadisticas = useMemo(() => {
    const totalIndicadores = Object.keys(indicadoresActuales).length;
    const indicadoresPresentes =
      Object.values(indicadoresActuales).filter(Boolean).length;
    const porcentajeExito = Math.round(
      (indicadoresPresentes / totalIndicadores) * 100
    );

    const estadisticasPorCuadrante = {};
    Object.entries(dataPorCuadrante).forEach(([cuadrante, items]) => {
      const totalCuadrante = items.length;
      const presentesCuadrante = items.filter(
        (item) => indicadoresActuales[item.id]
      ).length;
      const porcentajeCuadrante = Math.round(
        (presentesCuadrante / totalCuadrante) * 100
      );
      estadisticasPorCuadrante[cuadrante] = {
        total: totalCuadrante,
        presentes: presentesCuadrante,
        porcentaje: porcentajeCuadrante,
        faltantes: items.filter((item) => !indicadoresActuales[item.id]),
      };
    });

    return {
      total: totalIndicadores,
      presentes: indicadoresPresentes,
      porcentaje: porcentajeExito,
      porCuadrante: estadisticasPorCuadrante,
    };
  }, [indicadoresActuales]);

  const categorizarFaltantes = useMemo(() => {
    const todasLasFaltantes = Object.entries(estadisticas.porCuadrante).flatMap(
      ([cuadrante, stats]) =>
        stats.faltantes.map((item) => ({ ...item, cuadrante }))
    );
    const esenciales = todasLasFaltantes.filter((item) => item.valor === 3.0);
    const importantes = todasLasFaltantes.filter(
      (item) => item.valor >= 2.0 && item.valor <= 2.9
    );
    const complementarios = todasLasFaltantes.filter(
      (item) => item.valor >= 1.0 && item.valor <= 1.9
    );
    return { esenciales, importantes, complementarios };
  }, [estadisticas]);

  const dividirTexto = (texto, maxCaracteres = 16) => {
    if (texto.length <= maxCaracteres) return [texto];
    const palabras = texto.split(" ");
    const lineas = [];
    let lineaActual = "";
    palabras.forEach((palabra) => {
      if (
        (lineaActual + " " + palabra).length <= maxCaracteres ||
        lineaActual === ""
      ) {
        lineaActual += (lineaActual ? " " : "") + palabra;
      } else {
        if (lineaActual) lineas.push(lineaActual);
        lineaActual = palabra;
      }
    });
    if (lineaActual) lineas.push(lineaActual);
    if (lineas.length > 3) return [lineas[0], lineas[1], lineas[2] + "..."];
    return lineas;
  };

  const crearPuntosRadar = (cuadrante) => {
    const puntos = [];
    const centroX = 450,
      centroY = 450,
      radioMax = 340;
    const datos = dataPorCuadrante[cuadrante];
    const anguloIncremento = 360 / datos.length;

    datos.forEach((item, indiceItem) => {
      const anguloRadar = indiceItem * anguloIncremento;
      const anguloRad = ((anguloRadar - 90) * Math.PI) / 180;
      let valorMostrar =
        modoVisualizacion === "actual"
          ? indicadoresActuales[item.id]
            ? item.valor
            : 0
          : item.valor;
      const radio = (valorMostrar / 3) * radioMax;
      const x = centroX + Math.cos(anguloRad) * radio;
      const y = centroY + Math.sin(anguloRad) * radio;
      puntos.push({
        x,
        y,
        nombre: item.nombre,
        valor: valorMostrar,
        valorOriginal: item.valor,
        cuadrante,
        color: coloresCuadrante[cuadrante],
        angulo: anguloRadar,
        radio,
        id: `${cuadrante}-${indiceItem}`,
        tipo: "radar",
        indicadorId: item.id,
        presente: indicadoresActuales[item.id],
      });
    });
    return puntos;
  };

  const crearPuntosHibrido = () => {
    const puntos = [];
    const centroX = 450,
      centroY = 450,
      radioMax = 340;
    Object.entries(dataPorCuadrante).forEach(([cuadrante, datos]) => {
      datos.forEach((item, indiceItem) => {
        const anguloRad = ((item.angulo - 90) * Math.PI) / 180;
        let valorMostrar =
          modoVisualizacion === "actual"
            ? indicadoresActuales[item.id]
              ? item.valor
              : 0
            : item.valor;
        const radio = (valorMostrar / 3) * radioMax;
        const x = centroX + Math.cos(anguloRad) * radio;
        const y = centroY + Math.sin(anguloRad) * radio;
        puntos.push({
          x,
          y,
          nombre: item.nombre,
          valor: valorMostrar,
          valorOriginal: item.valor,
          cuadrante,
          color: coloresCuadrante[cuadrante],
          angulo: item.angulo,
          radio,
          id: `${cuadrante}-${indiceItem}`,
          tipo: "hibrido",
          indicadorId: item.id,
          presente: indicadoresActuales[item.id],
        });
      });
    });
    return puntos;
  };

  const crearPoligonosHibrido = () => {
    const puntos = crearPuntosHibrido();
    const poligonosPorCuadrante = {};
    Object.keys(coloresCuadrante).forEach((cuadrante) => {
      const puntosCuadrante = puntos.filter((p) => p.cuadrante === cuadrante);
      if (puntosCuadrante.length > 0) {
        const coordenadas = puntosCuadrante
          .map((p) => `${p.x},${p.y}`)
          .join(" ");
        poligonosPorCuadrante[cuadrante] = coordenadas;
      }
    });
    return poligonosPorCuadrante;
  };

  const crearLineasRadialesHibrido = () => {
    const lineas = [];
    const centroX = 450,
      centroY = 450;
    Object.entries(dataPorCuadrante).forEach(([cuadrante, datos]) => {
      datos.forEach((item) => {
        const anguloRad = ((item.angulo - 90) * Math.PI) / 180;
        const x2 = centroX + Math.cos(anguloRad) * 360;
        const y2 = centroY + Math.sin(anguloRad) * 360;
        lineas.push({
          x1: centroX,
          y1: centroY,
          x2,
          y2,
          angulo: item.angulo,
          nombre: item.nombre,
        });
      });
    });
    return lineas;
  };

  const crearPoligono = (cuadrante) => {
    const puntos = crearPuntosRadar(cuadrante);
    const coordenadas = puntos.map((p) => `${p.x},${p.y}`);
    if (puntos.length > 0) coordenadas.push(`${puntos[0].x},${puntos[0].y}`);
    return coordenadas.join(" ");
  };

  const crearLineasRadiales = (cuadrante) => {
    const lineas = [];
    const centroX = 450,
      centroY = 450;
    const datos = dataPorCuadrante[cuadrante];
    const anguloIncremento = 360 / datos.length;
    datos.forEach((item, indiceItem) => {
      const anguloRadar = indiceItem * anguloIncremento;
      const anguloRad = ((anguloRadar - 90) * Math.PI) / 180;
      const x2 = centroX + Math.cos(anguloRad) * 360;
      const y2 = centroY + Math.sin(anguloRad) * 360;
      lineas.push({
        x1: centroX,
        y1: centroY,
        x2,
        y2,
        angulo: anguloRadar,
        nombre: item.nombre,
      });
    });
    return lineas;
  };

  const crearEspiralReferencia = () => {
    const puntosEspiral = [];
    const centroX = 450,
      centroY = 450,
      vueltas = 2.2;
    for (let i = 0; i <= 360 * vueltas; i += 3) {
      const anguloRad = ((i - 90) * Math.PI) / 180;
      const radio = 90 + (i / (360 * vueltas)) * 320;
      const x = centroX + Math.cos(anguloRad) * radio;
      const y = centroY + Math.sin(anguloRad) * radio;
      puntosEspiral.push({ x, y });
    }
    return puntosEspiral;
  };

  let puntosMostrar = [],
    lineasMostrar = [],
    poligonoMostrar = "",
    poligonosHibrido = {},
    mostrarEspiral = false;

  if (cuadranteSeleccionado === "todos") {
    puntosMostrar = crearPuntosHibrido();
    lineasMostrar = crearLineasRadialesHibrido();
    poligonosHibrido = crearPoligonosHibrido();
    mostrarEspiral = true;
  } else {
    puntosMostrar = crearPuntosRadar(cuadranteSeleccionado);
    lineasMostrar = crearLineasRadiales(cuadranteSeleccionado);
    poligonoMostrar = crearPoligono(cuadranteSeleccionado);
  }

  const crearPoligonosDesdeCentro = () => {
    const centroX = 450,
      centroY = 450;
    const poligonosConCentro = {};

    if (cuadranteSeleccionado === "todos") {
      Object.keys(coloresCuadrante).forEach((cuadrante) => {
        const puntosCuadrante = puntosMostrar.filter(
          (p) => p.cuadrante === cuadrante
        );
        if (puntosCuadrante.length > 0) {
          const triangulos = [];
          for (let i = 0; i < puntosCuadrante.length; i++) {
            const puntoActual = puntosCuadrante[i];
            const siguientePunto =
              puntosCuadrante[(i + 1) % puntosCuadrante.length];
            if (i < puntosCuadrante.length - 1) {
              triangulos.push(
                `${centroX},${centroY} ${puntoActual.x},${puntoActual.y} ${siguientePunto.x},${siguientePunto.y}`
              );
            }
          }
          poligonosConCentro[cuadrante] = triangulos;
        }
      });
    }

    return poligonosConCentro;
  };

  const poligonosConCentro = crearPoligonosDesdeCentro();
  const espiralReferencia = crearEspiralReferencia();

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
      "div",
      {
        style: {
          textAlign: "center",
          marginBottom: "30px",
          padding: "25px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
      },
      React.createElement(
        "h1",
        {
          style: {
            fontSize: "28px",
            fontWeight: "700",
            color: "#1e293b",
            margin: "0 0 10px 0",
          },
        },
        "Modelo de Estrategias de Viabilidad para Espacios Públicos"
      ),
      React.createElement(
        "p",
        { style: { fontSize: "16px", color: "#64748b", margin: "0" } },
        "Priorización Estratégica - Diagnóstico"
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          justifyContent: "center",
          maxWidth: "940px",
          margin: "0 auto 30px auto",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            width: "480px",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            maxHeight: "600px",
            overflowY: "auto",
          },
        },
        React.createElement(
          "h3",
          {
            style: { margin: "0 0 20px 0", color: "#1e293b", fontSize: "18px" },
          },
          "Selecciona las categorías presentes en tu espacio"
        ),
        Object.entries(dataPorCuadrante).map(([cuadrante, items]) =>
          React.createElement(
            "div",
            { key: cuadrante, style: { marginBottom: "20px" } },
            React.createElement(
              "h4",
              {
                style: {
                  color: coloresCuadrante[cuadrante],
                  fontSize: "16px",
                  fontWeight: "600",
                  margin: "0 0 10px 0",
                },
              },
              cuadrante
            ),
            items.map((item) =>
              React.createElement(
                "label",
                {
                  key: item.id,
                  style: {
                    display: "flex",
                    alignItems: "center",
                    padding: "8px",
                    marginBottom: "4px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: indicadoresActuales[item.id]
                      ? "#f0f9ff"
                      : "transparent",
                    border: indicadoresActuales[item.id]
                      ? "1px solid #e0f2fe"
                      : "1px solid transparent",
                  },
                },
                React.createElement("input", {
                  type: "checkbox",
                  checked: indicadoresActuales[item.id],
                  onChange: () => toggleIndicador(item.id),
                  style: {
                    marginRight: "10px",
                    accentColor: coloresCuadrante[cuadrante],
                  },
                }),
                React.createElement(
                  "span",
                  { style: { fontSize: "14px", color: "#374151" } },
                  item.nombre,
                  React.createElement(
                    "span",
                    { style: { color: "#9ca3af", fontSize: "12px" } },
                    " (valor: " + item.valor + ")"
                  )
                )
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        {
          style: {
            width: "480px",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          },
        },
        React.createElement(
          "h3",
          {
            style: { margin: "0 0 20px 0", color: "#1e293b", fontSize: "18px" },
          },
          "Diagnóstico del Espacio"
        ),
        React.createElement(
          "div",
          {
            style: {
              textAlign: "center",
              padding: "15px",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              marginBottom: "15px",
            },
          },
          React.createElement(
            "div",
            {
              style: { fontSize: "32px", fontWeight: "700", color: "#1e293b" },
            },
            estadisticas.porcentaje + "%"
          ),
          React.createElement(
            "div",
            { style: { fontSize: "13px", color: "#64748b" } },
            "Índice de Viabilidad"
          ),
          React.createElement(
            "div",
            {
              style: { fontSize: "11px", color: "#9ca3af", marginTop: "2px" },
            },
            estadisticas.presentes + " de " + estadisticas.total + " categorías"
          )
        ),
        React.createElement(
          "div",
          { style: { marginBottom: "15px" } },
          React.createElement(
            "h4",
            {
              style: {
                fontSize: "14px",
                color: "#374151",
                marginBottom: "12px",
              },
            },
            "Por etapa:"
          ),
          Object.entries(estadisticas.porCuadrante).map(([cuadrante, stats]) =>
            React.createElement(
              "div",
              {
                key: cuadrante,
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #f1f5f9",
                },
              },
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: "14px",
                    color: "#64748b",
                    fontWeight: "500",
                  },
                },
                cuadrante
              ),
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  },
                },
                React.createElement(
                  "div",
                  {
                    style: {
                      width: "60px",
                      height: "8px",
                      backgroundColor: "#e2e8f0",
                      borderRadius: "4px",
                      overflow: "hidden",
                    },
                  },
                  React.createElement("div", {
                    style: {
                      width: stats.porcentaje + "%",
                      height: "100%",
                      backgroundColor: coloresCuadrante[cuadrante],
                    },
                  })
                ),
                React.createElement(
                  "span",
                  {
                    style: {
                      fontSize: "16px",
                      color: "#374151",
                      fontWeight: "600",
                      minWidth: "35px",
                    },
                  },
                  stats.porcentaje + "%"
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "h4",
            {
              style: {
                fontSize: "14px",
                color: "#374151",
                marginBottom: "15px",
              },
            },
            "Categorías faltantes para la viabilidad del espacio público:"
          ),
          estadisticas.presentes === 0
            ? React.createElement(
                "div",
                {
                  style: {
                    fontSize: "12px",
                    color: "#64748b",
                    fontStyle: "italic",
                    textAlign: "center",
                    padding: "20px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "8px",
                  },
                },
                "Selecciona las categorías presentes en tu espacio para ver las recomendaciones"
              )
            : estadisticas.porcentaje === 100
            ? React.createElement(
                "div",
                {
                  style: {
                    fontSize: "12px",
                    color: "#059669",
                    fontWeight: "500",
                    textAlign: "center",
                    padding: "20px",
                    backgroundColor: "#f0fdf4",
                    borderRadius: "8px",
                  },
                },
                "¡Excelente! Tu espacio cuenta con todas las categorías de viabilidad."
              )
            : React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  },
                },
                categorizarFaltantes.esenciales.length > 0 &&
                  React.createElement(
                    "div",
                    {
                      style: {
                        backgroundColor: "white",
                        border: "2px solid #dc2626",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "600",
                        width: "100%",
                        boxSizing: "border-box",
                      },
                    },
                    React.createElement(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "6px",
                        },
                      },
                      React.createElement(
                        "span",
                        {
                          style: {
                            fontSize: "13px",
                            fontWeight: "700",
                            color: "#6b7280",
                          },
                        },
                        "Complementarios"
                      ),
                      React.createElement(
                        "span",
                        {
                          style: {
                            fontSize: "16px",
                            fontWeight: "800",
                            color: "#6b7280",
                          },
                        },
                        "1.0-1.9"
                      )
                    ),
                    React.createElement(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          lineHeight: "1.2",
                          wordWrap: "break-word",
                          overflow: "hidden",
                          color: "#374151",
                          fontWeight: "400",
                        },
                      },
                      categorizarFaltantes.complementarios
                        .map((item) => item.nombre)
                        .join(", ")
                    )
                  )
              )
        )
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "20px",
          gap: "8px",
        },
      },
      React.createElement(
        "button",
        {
          style: {
            backgroundColor:
              cuadranteSeleccionado === "todos" ? "#e2e8f0" : "white",
            color: "#64748b",
            border: "1px solid #cbd5e1",
            borderRadius: "20px",
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "14px",
            transition: "background-color 0.3s ease",
            outline: "none",
          },
          onClick: () => setCuadranteSeleccionado("todos"),
        },
        "Todas las etapas"
      ),
      Object.keys(coloresCuadrante).map((cuadrante) =>
        React.createElement(
          "button",
          {
            key: cuadrante,
            style: {
              backgroundColor:
                cuadranteSeleccionado === cuadrante
                  ? coloresCuadrante[cuadrante]
                  : "white",
              color: cuadranteSeleccionado === cuadrante ? "white" : "#64748b",
              border: "1px solid #cbd5e1",
              borderRadius: "20px",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px",
              transition: "background-color 0.3s ease",
              outline: "none",
            },
            onClick: () => setCuadranteSeleccionado(cuadrante),
          },
          cuadrante
        )
      ),
      React.createElement("div", { style: { width: "20px" } }),
      React.createElement(
        "button",
        {
          style: {
            backgroundColor:
              modoVisualizacion === "actual" ? "#2563eb" : "white",
            color: modoVisualizacion === "actual" ? "white" : "#64748b",
            border: "1px solid #cbd5e1",
            borderRadius: "20px",
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "14px",
            transition: "background-color 0.3s ease",
            outline: "none",
          },
          onClick: () => setModoVisualizacion("actual"),
        },
        "📊 Diagnóstico Actual"
      ),
      React.createElement(
        "button",
        {
          style: {
            backgroundColor:
              modoVisualizacion === "ideal" ? "#16a34a" : "white",
            color: modoVisualizacion === "ideal" ? "white" : "#64748b",
            border: "1px solid #cbd5e1",
            borderRadius: "20px",
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "14px",
            transition: "background-color 0.3s ease",
            outline: "none",
          },
          onClick: () => setModoVisualizacion("ideal"),
        },
        "🎯 Modelo Ideal"
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            border: "1px solid #e2e8f0",
          },
        },
        React.createElement(
          "svg",
          {
            width: "900",
            height: "900",
            style: { display: "block" },
            onMouseLeave: () => setPuntoHover(null),
          },
          React.createElement(
            "defs",
            null,
            React.createElement(
              "filter",
              {
                id: "dropShadow",
                x: "-50%",
                y: "-50%",
                width: "200%",
                height: "200%",
              },
              React.createElement("feDropShadow", {
                dx: "0",
                dy: "2",
                stdDeviation: "4",
                floodColor: "rgba(0,0,0,0.2)",
              })
            ),
            React.createElement(
              "radialGradient",
              { id: "centerGradient", cx: "50%", cy: "50%", r: "50%" },
              React.createElement("stop", {
                offset: "0%",
                stopColor: "#ffffff",
              }),
              React.createElement("stop", {
                offset: "100%",
                stopColor: "#f8fafc",
              })
            )
          ),
          React.createElement("circle", {
            cx: "450",
            cy: "450",
            r: "430",
            fill: "url(#centerGradient)",
          }),
          [113, 226, 340].map((radio, index) =>
            React.createElement(
              "g",
              { key: index },
              React.createElement("circle", {
                cx: "450",
                cy: "450",
                r: radio,
                stroke: "#e2e8f0",
                strokeWidth: "1",
                fill: "none",
              }),
              React.createElement(
                "text",
                {
                  x: "470",
                  y: 450 - radio + 5,
                  fill: "#94a3b8",
                  fontSize: "11",
                  fontWeight: "500",
                },
                ((radio / 340) * 3).toFixed(1)
              )
            )
          ),
          lineasMostrar.map((linea, index) => {
            const lineasTexto = dividirTexto(linea.nombre, 16);
            const esLadoDerecho = linea.x2 > 450;
            const offsetX = esLadoDerecho ? 18 : -18;
            return React.createElement(
              "g",
              { key: index },
              React.createElement("line", {
                x1: linea.x1,
                y1: linea.y1,
                x2: linea.x2,
                y2: linea.y2,
                stroke: "#cbd5e1",
                strokeWidth: "1",
                opacity: "0.4",
              }),
              lineasTexto.map((lineaTexto, lineaIndex) =>
                React.createElement(
                  "text",
                  {
                    key: lineaIndex,
                    x: linea.x2 + offsetX,
                    y:
                      linea.y2 +
                      (lineaIndex - (lineasTexto.length - 1) / 2) * 12,
                    textAnchor: esLadoDerecho ? "start" : "end",
                    fill: "#475569",
                    fontSize: "11",
                    fontWeight: "500",
                    dominantBaseline: "central",
                  },
                  lineaTexto
                )
              )
            );
          }),
          mostrarEspiral &&
            React.createElement("path", {
              d: `M ${espiralReferencia[0].x} ${
                espiralReferencia[0].y
              } ${espiralReferencia
                .slice(1)
                .map((p) => `L ${p.x} ${p.y}`)
                .join(" ")}`,
              stroke: "#94a3b8",
              strokeWidth: "2",
              fill: "none",
              opacity: "0.3",
              strokeDasharray: "5,5",
            }),
          React.createElement("line", {
            x1: "90",
            y1: "450",
            x2: "810",
            y2: "450",
            stroke: "#cbd5e1",
            strokeWidth: "2",
            strokeDasharray: "10,5",
          }),
          React.createElement("line", {
            x1: "450",
            y1: "90",
            x2: "450",
            y2: "810",
            stroke: "#cbd5e1",
            strokeWidth: "2",
            strokeDasharray: "10,5",
          }),
          Object.entries(poligonosConCentro).map(([cuadrante, triangulos]) =>
            React.createElement(
              "g",
              { key: `centro-${cuadrante}` },
              Array.isArray(triangulos)
                ? triangulos.map((triangulo, index) =>
                    React.createElement("polygon", {
                      key: `${cuadrante}-triangulo-${index}`,
                      points: triangulo,
                      fill: coloresCuadrante[cuadrante],
                      opacity: "0.15",
                      stroke: "none",
                    })
                  )
                : React.createElement("polygon", {
                    points: triangulos,
                    fill: coloresCuadrante[cuadrante],
                    opacity: "0.15",
                    stroke: "none",
                  })
            )
          ),
          cuadranteSeleccionado !== "todos" &&
            poligonoMostrar &&
            React.createElement("polygon", {
              points: poligonoMostrar,
              fill: coloresCuadrante[cuadranteSeleccionado],
              opacity: "0.2",
              stroke: coloresCuadrante[cuadranteSeleccionado],
              strokeWidth: "2",
            }),
          [
            { nombre: "Rehabilitación", x: 60, y: 60 },
            { nombre: "Diseño", x: 750, y: 60 },
            { nombre: "Gestión", x: 60, y: 814 },
            { nombre: "Construcción", x: 750, y: 814 },
          ].map(({ nombre, x, y }) =>
            React.createElement(
              "g",
              { key: nombre },
              React.createElement("rect", {
                x: x,
                y: y,
                width: "90",
                height: "26",
                rx: "13",
                fill: coloresCuadrante[nombre],
                opacity: "0.9",
              }),
              React.createElement(
                "text",
                {
                  x: x + 45,
                  y: y + 16,
                  textAnchor: "middle",
                  fill: "white",
                  fontSize: "12",
                  fontWeight: "600",
                },
                nombre
              )
            )
          ),
          puntosMostrar.map((punto, index) => {
            const tamaño = 5 + punto.valor * 3;
            const isHovered = puntoHover === punto.id;
            return React.createElement(
              "g",
              { key: index },
              React.createElement("circle", {
                cx: punto.x,
                cy: punto.y,
                r: tamaño,
                fill:
                  punto.presente && modoVisualizacion === "actual"
                    ? punto.color
                    : modoVisualizacion === "actual"
                    ? "#e2e8f0"
                    : punto.color,
                stroke: "white",
                strokeWidth: "2",
                opacity:
                  punto.presente && modoVisualizacion === "actual"
                    ? "0.9"
                    : modoVisualizacion === "actual"
                    ? "0.3"
                    : "0.9",
                filter: "url(#dropShadow)",
                style: { cursor: "pointer", transition: "all 0.2s ease" },
                onMouseEnter: () => setPuntoHover(punto.id),
                transform: isHovered ? `scale(1.3)` : "scale(1)",
                transformOrigin: `${punto.x} ${punto.y}`,
              }),
              React.createElement(
                "text",
                {
                  x: punto.x,
                  y: punto.y + 3,
                  textAnchor: "middle",
                  fill: "white",
                  fontSize: "9",
                  fontWeight: "700",
                  style: { pointerEvents: "none" },
                },
                modoVisualizacion === "actual"
                  ? punto.presente
                    ? punto.valorOriginal
                    : "0"
                  : punto.valorOriginal
              ),
              isHovered &&
                React.createElement(
                  "g",
                  null,
                  React.createElement("rect", {
                    x: punto.x - 70,
                    y: punto.y - tamaño - 50,
                    width: "140",
                    height: "40",
                    rx: "8",
                    fill: "#1e293b",
                    opacity: "0.95",
                    filter: "url(#dropShadow)",
                  }),
                  React.createElement(
                    "text",
                    {
                      x: punto.x,
                      y: punto.y - tamaño - 32,
                      textAnchor: "middle",
                      fill: "white",
                      fontSize: "11",
                      fontWeight: "600",
                    },
                    punto.nombre
                  ),
                  React.createElement(
                    "text",
                    {
                      x: punto.x,
                      y: punto.y - tamaño - 18,
                      textAnchor: "middle",
                      fill: "#cbd5e1",
                      fontSize: "9",
                    },
                    punto.cuadrante +
                      " • " +
                      (modoVisualizacion === "actual"
                        ? punto.presente
                          ? ` Presente (${punto.valorOriginal})`
                          : " No presente"
                        : ` Valor ideal: ${punto.valorOriginal}`)
                  )
                )
            );
          })
        )
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          textAlign: "center",
        },
      },
      React.createElement(
        "p",
        {
          style: {
            fontSize: "16px",
            color: "#475569",
            margin: "0",
            fontWeight: "500",
          },
        },
        React.createElement(
          "strong",
          null,
          "Interpretación de valores: 3 = Esencial | 2 = Importante | 1 = Complementario"
        )
      )
    )
  );
}: "12px",
                        fontWeight: "600",
                        width: "100%",
                        boxSizing: "border-box",
                      },
                    },
                    React.createElement(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "6px",
                        },
                      },
                      React.createElement(
                        "span",
                        {
                          style: {
                            fontSize: "13px",
                            fontWeight: "700",
                            color: "#dc2626",
                          },
                        },
                        "Esenciales"
                      ),
                      React.createElement(
                        "span",
                        {
                          style: {
                            fontSize: "16px",
                            fontWeight: "800",
                            color: "#dc2626",
                          },
                        },
                        "3.0"
                      )
                    ),
                    React.createElement(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          lineHeight: "1.2",
                          wordWrap: "break-word",
                          overflow: "hidden",
                          color: "#374151",
                          fontWeight: "400",
                        },
                      },
                      categorizarFaltantes.esenciales
                        .map((item) => item.nombre)
                        .join(", ")
                    )
                  ),
                categorizarFaltantes.importantes.length > 0 &&
                  React.createElement(
                    "div",
                    {
                      style: {
                        backgroundColor: "white",
                        border: "2px solid #f59e0b",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "600",
                        width: "100%",
                        boxSizing: "border-box",
                      },
                    },
                    React.createElement(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "6px",
                        },
                      },
                      React.createElement(
                        "span",
                        {
                          style: {
                            fontSize: "13px",
                            fontWeight: "700",
                            color: "#f59e0b",
                          },
                        },
                        "Importantes"
                      ),
                      React.createElement(
                        "span",
                        {
                          style: {
                            fontSize: "16px",
                            fontWeight: "800",
                            color: "#f59e0b",
                          },
                        },
                        "2.0-2.9"
                      )
                    ),
                    React.createElement(
                      "div",
                      {
                        style: {
                          fontSize: "11px",
                          lineHeight: "1.2",
                          wordWrap: "break-word",
                          overflow: "hidden",
                          color: "#374151",
                          fontWeight: "400",
                        },
                      },
                      categorizarFaltantes.importantes
                        .map((item) => item.nombre)
                        .join(", ")
                    )
                  ),
                categorizarFaltantes.complementarios.length > 0 &&
                  React.createElement(
                    "div",
                    {
                      style: {
                        backgroundColor: "white",
                        border: "2px solid #6b7280",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        fontSize
