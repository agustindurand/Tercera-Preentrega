// Función para convertir moneda
function convertirMoneda() {
    let pesoArgentino = parseFloat(document.getElementById("pesoArgentino").value);
    let dolarEstadounidense = pesoArgentino / 448;
    document.getElementById("resultadoMoneda").innerHTML = "USD " + dolarEstadounidense.toFixed(2);
}

// Función para calcular el préstamo
function calcularPrestamo() {
    let ingresoNeto = parseFloat(document.getElementById("ingresoNeto").value);

    if (ingresoNeto > 100000) {
        let tienePrestacion = confirm("¿Tiene alguna prestación del banco actualmente?");
        if (tienePrestacion) {
            document.getElementById("resultadoPrestamo").innerHTML = "Su préstamo será calculado.";

            let prestamo = 0;
            let cuotas = 0;

            while (prestamo <= 0 || cuotas <= 0) {
                prestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));
                cuotas = parseInt(prompt("Ingrese la cantidad de cuotas:"));
            }

            let interes = 0.12;
            let totalIntereses = prestamo * interes * cuotas;
            let totalPrestamo = prestamo + totalIntereses;

            document.getElementById("resultadoPrestamo").innerHTML = "Monto del préstamo: $" + prestamo.toFixed(2) +
                "<br>Cantidad de cuotas: " + cuotas +
                "<br>Total de intereses: $" + totalIntereses.toFixed(2) +
                "<br>Total a devolver: $" + totalPrestamo.toFixed(2);

            // Almacenar datos en el localStorage utilizando JSON.stringify
            const datosPrestamo = {
                montoPrestamo: prestamo,
                cuotas: cuotas,
                interes: interes,
                totalIntereses: totalIntereses,
                totalPrestamo: totalPrestamo,
            };
            localStorage.setItem("datosPrestamo", JSON.stringify(datosPrestamo));
        } else {
            document.getElementById("resultadoPrestamo").innerHTML = "Por favor, acérquese a la sucursal para solicitar un préstamo.";
        }
    } else {
        document.getElementById("resultadoPrestamo").innerHTML = "No cumple con el ingreso mínimo solicitado.";
    }
}

// Función para cargar datos del localStorage y mostrarlos al cargar la página
function cargarDatosAlIniciar() {
    // Obtener datos almacenados en el localStorage utilizando JSON.parse
    const datosPrestamo = JSON.parse(localStorage.getItem("datosPrestamo"));

    // Verificar si hay datos almacenados y mostrarlos en el resultado
    if (datosPrestamo) {
        document.getElementById("resultadoPrestamo").innerHTML = "Monto del préstamo: $" + datosPrestamo.montoPrestamo.toFixed(2) +
            "<br>Cantidad de cuotas: " + datosPrestamo.cuotas +
            "<br>Total de intereses: $" + datosPrestamo.totalIntereses.toFixed(2) +
            "<br>Total a devolver: $" + datosPrestamo.totalPrestamo.toFixed(2);
    }
}

// Evento para cargar datos al iniciar la página
window.addEventListener("load", cargarDatosAlIniciar);