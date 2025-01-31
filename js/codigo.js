window.addEventListener("load", inicio);

function inicio () {

    // eventos en botones inicio de sesión y registrar
    document.querySelector("#btnIniciarSesion").addEventListener("click", hacerLogin);
    document.querySelector("#btnRegistrar").addEventListener("click", registrarUsuario);

    document.querySelector("#menuSalir").addEventListener("click", salir);

    // eventos en botones de reservar del formulario Reserva Y en boton de agrear destino
    document.querySelector("#btnReservar").addEventListener("click", realizarReserva);
    document.querySelector("#btnAgregarDestino").addEventListener("click", crearDestino);

    ocultarSecciones();

    // evento de click en los botones del nav
    let botones = document.querySelectorAll(".btnSeccion");
    for ( let i = 0; i < botones.length; i++ ) {
        botones[i].addEventListener("click", mostrarSeccion);
    }

    //muestra login
    document.querySelector("#secInicioSesion").style.display = "block";
    //muestra el registro
    document.querySelector("#secRegistroCliente").style.display = "block";
    //oculta todos los botones del menú nav
    document.querySelector("#navPrincipal").style.display = "none";

}

let sistema = new Sistema();

function ocultarSecciones () {
    let secciones = document.querySelectorAll(".seccion");
    for ( let i = 0; i < secciones.length; i++ ) {
        secciones[i].style.display = "none";
    }

    // limpia mensaje del párrafo del formulario agregar/ crear destino
    document.querySelector("#pMensajeAgregarDestino").innerHTML = "";

}   

// muestra secciones
// a su vez segun id del botón clickeado se carga la sección correspondiente
function mostrarSeccion () {
    ocultarSecciones();
    let idBtn = this.getAttribute("id"); //ej. btnSecExplorarDestinos
    let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);//ej. secExplorarDestinos
    document.querySelector("#" + idSeccion).style.display = "block"; //ej. muestra seccion Destinos

    switch (idBtn) {
        case "btnSecExplorarDestinos":
            explorarDestinos();
            break;
        case "btnSecHistorialReservas":
            cargarHistorialReservas();
            break;
        case "btnSecVerDestinosOferta":
            explorarDestinosOferta();
            break;
        case "btnSecListarReservas":
            listarReservas();
            break;
        case "btnSecAministrarDestinos":
            administrarDestinos();
            break;
        case "btnSecInformeGanancias":
            verInformeGanancias();
            break;
        
        default:
            break;
    }

}

function mostrarBotones (usuario) {
    ocultarBotones();
    let botonesMostrar = document.querySelectorAll("." + usuario);
    for ( let i = 0; i < botonesMostrar.length; i++ ) {
        botonesMostrar[i].style.display = "block";
    }
}

function ocultarBotones () {
    let botonOcultar = document.querySelectorAll(".btnSeccion");
    for ( let i = 0; i < botonOcultar.length; i++) {
        botonOcultar[i].style.display = "none";
    }
}


let idUsuario = 11;
let idReserva = 6;
let idDestino = 11;
let usuarioLogeado = null;

// funcionalidad para hacer login del cliente o admin
// si las credenciales son validas y los campos estan completos se guarda el usuario logeado en la variable global usuarioLogeado
// se crea método para validar credenciales (nombre de usuario y clave)
function hacerLogin() {
    let nombreUsuario = document.querySelector("#txtUsuarioLogIn").value;
    let clave = document.querySelector("#pswPasswordLogIn").value;
    let mensaje = "";

    // verifica campos diferentes de vacío
    let camposCompletos = sistema.validarCamposVaciosLogin(nombreUsuario, clave);

    // verifica nombre de usuario y clave
    let loginValido = sistema.verificarLogin(nombreUsuario, clave);

    if ( loginValido && camposCompletos ) {

        document.querySelector("#txtUsuarioLogIn").value = "";
        document.querySelector("#pswPasswordLogIn").value = "";

        // dado que el login es valido, la variable global usarioLogeado es diferente de null
        usuarioLogeado = sistema.obtenerObjeto(sistema.usuarios, "nombreUsuario", nombreUsuario);

        // se mnuestra el menu correspondiente
        mostrarMenuOcultandoLoginYRegistro();

    } else if (!camposCompletos) {
        mensaje = "Todos los campos son obligatorios";
    } else if (!loginValido) {
        mensaje = "Usuario y/o clave incorrectos";
    }

    document.querySelector("#mensajeInicioSesion").innerHTML = mensaje;
}

// funcionalidad para mostrar el menú de botones según el tipo de usuario logeado
function mostrarMenuOcultandoLoginYRegistro() {
    // mostrar menú
    document.querySelector("#navPrincipal").style.display = "block";

    // mostrar botones del menú según usuario: cliente o administrador
    mostrarBotones(usuarioLogeado.tipoUsuario);

    // mostrar saludo y nombre de usuario
    document.querySelector("#nombreUsuarioLogeado").style.display = "block";
    document.querySelector("#nombreUsuarioLogeado").innerHTML= "Bienvenido "+ usuarioLogeado.nombreUsuario;

    // mostrar saldo disponible y millas para el cliente
    if (usuarioLogeado.tipoUsuario === "cliente") {
        document.querySelector("#saldoMillas").style.display = "block";
        document.querySelector("#saldoMillas").innerHTML= "Millas disponibles: "+ usuarioLogeado.millas;
    }

    // ocultar secciones de registro e inicio sesión
    document.querySelector("#secRegistroCliente").style.display = "none";
    document.querySelector("#secInicioSesion").style.display = "none";

}

// funcionalidad para salir o cerrar sesión: ocultando y mostrando secciones correspondientes
// la variable global usuarioLogeado se vuelve null
function salir() {
    ocultarSecciones();
    document.querySelector("#navPrincipal").style.display = "none";
    document.querySelector("#nombreUsuarioLogeado").style.display = "none";
    document.querySelector("#saldoMillas").style.display = "none";

    usuarioLogeado = null;

    document.querySelector("#secInicioSesion").style.display = "block";
    document.querySelector("#secRegistroCliente").style.display = "block";

    // Limpiar mensajes de registro e inicio de sesión
    document.querySelector("#mensajeRegistro").innerHTML = "";
    document.querySelector("#mensajeInicioSesion").innerHTML = "";
    
}

// registro de cliente
// dentro de esta funcionalidad se realizan las validaciones de campos y formatos correspondientes
// si es valido se agrega el usuario a la lista de usuarios
function registrarUsuario() {
    let nombre = document.querySelector("#txtNombreRegistro").value;
    let apellido = document.querySelector("#txtApellidoRegistro").value;
    let nombreUsuario = document.querySelector("#txtNombreUsuarioRegistro").value;
    let clave = document.querySelector("#pswPasswordRegistro").value;
    let numeroTarjeta = document.querySelector("#txtTarjetaRegistro").value;
    let numeroCVC = document.querySelector("#txtCVCRegistro").value;

    let mensaje = "";

    let camposCompletos = sistema.validarCamposVaciosRegistro(nombre, apellido, nombreUsuario, clave, numeroTarjeta, numeroCVC);
    let formatoClaveValido = sistema.verificarFormatoClave(clave);
    let formatoTarjetaValido = sistema.verificarFormatoTarjeta(numeroTarjeta);
    let formatoCVCvalido = sistema.verificarFormatoCVC(numeroCVC);
    
    let existeUsuario = sistema.buscarElemento(sistema.usuarios, "nombreUsuario", nombreUsuario); //true o false (si no lo encuentra)

    if (camposCompletos && formatoClaveValido && formatoTarjetaValido && formatoCVCvalido && !existeUsuario) {

    
        // se crea un cliente del tipo Usuario con saldo inicial de $15000 y 0 millas
        let usuario = new Usuario(idUsuario, nombre, apellido, nombreUsuario, clave, numeroTarjeta, numeroCVC, "cliente", 15000, 0);

        sistema.agregarUsuario(usuario);

        idUsuario++;
        mensaje = "Registro Exitoso";

        document.querySelector("#txtNombreRegistro").value = "";
        document.querySelector("#txtApellidoRegistro").value = "";
        document.querySelector("#txtNombreUsuarioRegistro").value = "";
        document.querySelector("#pswPasswordRegistro").value = "";
        document.querySelector("#txtTarjetaRegistro").value = "";
        document.querySelector("#txtCVCRegistro").value = "";
    
    } else if (!camposCompletos) {
        mensaje = "Todos los campos son obligatorios";
    } else if (!formatoClaveValido) {
        mensaje = "La contraseña debe tener al menos 5 caracteres, contener al menos una mayúscula, una minúscula y un número";
    } else if (!formatoTarjetaValido) {
        mensaje = "Formato de tarjeta de crédito inválido";
    } else if (!formatoCVCvalido) {
        mensaje = "El CVC debe tener 3 dígitos";
    } else if (existeUsuario) {
        mensaje = "El nombre de usuario ya existe";
    }
    
    document.querySelector("#mensajeRegistro").innerHTML = mensaje;

}

// carga de los destinos en la sección exlorar destinos. Si tiene cupos disponibles y está activo entonces se muestran
// esta funcionalidad se ejecuta al hacer click en botón del menú  a través de la funcionalidad mostrarSeccion
function explorarDestinos() {
    let destinosExplorar = "";
 
    for (let i = 0; i < sistema.destinos.length; i++) {
        const unDestino = sistema.destinos[i];

        if (unDestino.estaActivo && unDestino.cupos > 0) {
            destinosExplorar += `<tr>
                    <td><img src="img/${unDestino.imagen}" alt="Imagen del destino ${unDestino.nombreDestino}" class="explorar-destinos__elemento-img"></td>
                    <td>${unDestino.nombreDestino}</td>
                    <td>${unDestino.descripcion}</td>
                    <td>$ ${unDestino.precioPorPersona}</td>`;

                if ( unDestino.enOferta ) {
                    destinosExplorar += `<td><h4>Oferta</h4></td>`;
                } else {
                    destinosExplorar += `<td></td>`;
                }

                destinosExplorar += `<td><input type="button" value="Ir a reservar" class="explorar-destinos__elemento-boton" id="btnReservarDestino${unDestino.id}" data-destino="${unDestino.id}"></td>`;
            
        }

    }

    document.querySelector("#tblExplorarDestinosBody").innerHTML = destinosExplorar;
    
    // evento de click en botones de explorar destino
    let botonesReservar = document.querySelectorAll(".explorar-destinos__elemento-boton");
    for (let i = 0; i < botonesReservar.length; i++) {
        botonesReservar[i].addEventListener("click", prepararFormularioReservaDesdeExplorar);
    }

}

// funcionalidad para preparar formulario Reserva
// al darle click al botón se accede al formulario
function prepararFormularioReservaDesdeExplorar() {
    ocultarSecciones();
    document.querySelector("#secReservarDestino").style.display = "block";
    let idDestino = this.getAttribute("data-destino"); //DEST_ID_x

    // obtener destino a partir del id del botón clickeado
    let destinoActual = sistema.obtenerObjeto(sistema.destinos, "id", idDestino);   

    // precarcargar el nombre del destino en el campo
    document.querySelector("#txtNombreDestinoReserva").value = destinoActual.nombreDestino;
    document.querySelector("#txtNombreDestinoReserva").setAttribute("disabled", "disabled");

    // precargar millas y dinero disponible del usuario
    document.querySelector("#pMillasDisponibles").innerHTML = `Millas disponibles: ${usuarioLogeado.millas}`;
    document.querySelector("#pDineroDisponible").innerHTML = `Dinero disponible: $ ${usuarioLogeado.saldo}`;

    // limpieza de campos cada vez que se accede
    document.querySelector("#numCantidadPersonasReserva").value = "";
    document.querySelector("#slcMedioPagoReserva").value = "";
    document.querySelector("#mensajeReserva").innerHTML = "";

}

// funcionalidad para realizar reserva desde formulario de Reserva. Se ejecuta luego de click en botón Reservar
// se agrega la reserva como pendiente a lista de reservas si los campos estan completos, con formato correcto y no existe reserva aprobada o 
// pendiente por el cliente
function realizarReserva() {
    let nombreDestino = document.querySelector("#txtNombreDestinoReserva").value;
    let cantidadPersonas = Number(document.querySelector("#numCantidadPersonasReserva").value);
    let medioPago = document.querySelector("#slcMedioPagoReserva").value;

    let mensaje = "";

    let camposCompletos = sistema.validarCamposVaciosReserva(cantidadPersonas, medioPago); //true si estan completos
    let formatoCantidadPersonas = sistema.verificarCantidadNumerica(cantidadPersonas); //true si cantidad personas es mayor que 0

    // obtener destino actual a partir del nombre precargado
    let destinoActual = sistema.obtenerObjeto(sistema.destinos, "nombreDestino", nombreDestino);
    let existeReservaPendiente = sistema.existeReserva(sistema.reservas, usuarioLogeado.nombreUsuario, destinoActual.nombreDestino);

    if (camposCompletos && formatoCantidadPersonas && !existeReservaPendiente) {

        // id, cliente, destino, cantidadPersonas, estado, formaPago
        let reserva = new Reserva(idReserva, usuarioLogeado, destinoActual, cantidadPersonas, "Pendiente", medioPago, 0);

        sistema.agregarReserva(reserva);

        idReserva++;
        mensaje = `Se ingresó tu reserva a ${reserva.destino.nombreDestino}. Se encuentra pendiente de aprobación.`;

        document.querySelector("#txtNombreDestinoReserva").value = "";
        document.querySelector("#numCantidadPersonasReserva").value = "";
        document.querySelector("#slcMedioPagoReserva").value = "";

    } else if (!camposCompletos) {
        mensaje = "Todos los campos son obligatorios";
    } else if (!formatoCantidadPersonas) {
        mensaje = "La cantidad de personas debe un número mayor que 0";
    } else {
        mensaje = `El usuario <b>${usuarioLogeado.nombreUsuario}</b> ya tiene una reserva pendiente o aprobada para el destino <b>${destinoActual.nombreDestino}</b>`;;
    }

    document.querySelector("#mensajeReserva").innerHTML = mensaje;

}

// funcionalidad para ver historial de reservas realizadas por cliente logeado
// se muestran las reservas independientemente de su estado
function cargarHistorialReservas() {
    let filaReservas = "";
    let mensaje = "";

    for ( let i = 0; i < sistema.reservas.length; i++ ) {
        const reserva = sistema.reservas[i];
            
        if (reserva.cliente.nombreUsuario === usuarioLogeado.nombreUsuario) {
    
            let montoReserva = reserva.destino.precioPorPersona * reserva.cantidadPersonas;
    
            filaReservas += `<tr>
                                <td>${reserva.destino.nombreDestino}</td>
                                <td>${reserva.cantidadPersonas}</td>
                                <td>${montoReserva}</td>
                                <td>${reserva.estado}</td>
                                <td><img src="img/${reserva.destino.imagen}" alt="Imagen del destino ${reserva.destino.nombreDestino}" class="historial-reservas__elemento-img"></td>
                                `;
            
            // solo se muestra botón de cancelar si la reserva tiene estado pendiente
            if (reserva.estado === "Pendiente") {
                    filaReservas += `<td><input type="button" value="Cancelar" class= "historial-reservas__elemento-boton" id="btnCancelarReserva${reserva.id}" data-reserva="${reserva.id}"></td>
                                    </tr>`;
            } else {
                    filaReservas += `<td></td></tr>`;
            }
    
        }
    }

    if (filaReservas === "") {
        mensaje = `El usuario ${usuarioLogeado.nombreUsuario} no tiene reservas.`;
    }
   
    document.querySelector("#tblHistorialReservasBody").innerHTML = filaReservas;
    document.querySelector("#pMensajeHistorialReserva").innerHTML = mensaje;

    let botonesCancelar = document.querySelectorAll(".historial-reservas__elemento-boton");
    for (let i = 0; i < botonesCancelar.length; i++) {
        botonesCancelar[i].addEventListener("click", cancelarReserva);
    }
      
}

// funcionalidad para cancelar una reserva por el cliente, siempre que este en estado pendiente
// se solicita confirmación por parte del usuario cliente para confirmar la cancelación
function cancelarReserva() {
    let idReserva = Number(this.getAttribute("data-reserva"));

    let reserva = sistema.obtenerObjeto(sistema.reservas, "id", idReserva);
    
    let confirmar = confirm(`Está seguro que quiere cancelar la reserva a ${reserva.destino.nombreDestino}?`);

    if (confirmar) {
        reserva.estado = "Cancelada";

        alert(`La reserva a ${reserva.destino.nombreDestino} ha sido cancelada`);

        cargarHistorialReservas();
    }
    
}

// funcionalidad que muestra al cliente los destinos en oferta
function explorarDestinosOferta() {
    let destinosOferta = "";
    let mensaje = "";
    
    for (const unDestino of sistema.destinos) {
        
        if (unDestino.estaActivo && unDestino.cupos > 0 && unDestino.enOferta) {
            destinosOferta += `<tr>
                        <td><img src="img/${unDestino.imagen}" alt="Imagen del destino ${unDestino.nombreDestino}" class="explorar-destinos__elemento-img"></td>
                        <td>${unDestino.nombreDestino}</td>
                        <td>${unDestino.descripcion}</td>
                        <td>$ ${unDestino.precioPorPersona}</td>
                        <td><h4>Oferta</h4></td>
                        <td><input type="button" value="Ir a reservar" class="explorar-destinos__elemento-boton" id="btnReservarDestino${unDestino.id}" data-destino="${unDestino.id}"></td>
                    </tr>`;
            
        }
    
    }

    if (destinosOferta === "") {
        mensaje = "No hay destinos disponibles";
    }

    document.querySelector("#tblExplorarDestinosOfertaBody").innerHTML = destinosOferta;
    document.querySelector("#pMensajeOfertas").innerHTML = mensaje;
    
    // Manejador de eventos en botones de explorar destino
    let botonesReservar = document.querySelectorAll(".explorar-destinos__elemento-boton");
    for (let i = 0; i < botonesReservar.length; i++) {
        botonesReservar[i].addEventListener("click", prepararFormularioReservaDesdeExplorar);
    }

}

// funcionalidad para listar las reservas por parte de un usuario tipo administrador
// se cargan en tres tablas distintas
// si las reservas estan pendientes, se pueden procesar. Las validaciones para pasar una reserva a aprobada o cancelada las realiza
// el sistema
function listarReservas() {
    let fila = "";

    let listadoReservasPendientes = "";
    let listadoReservasAprobadas = "";
    let listadoReservasCanceladas = "";

    for (const reserva of sistema.reservas) {
        
        fila =`<tr>
                    <td>${reserva.cliente.nombreUsuario}</td>
                    <td>${reserva.destino.nombreDestino}</td>
                    <td>${reserva.cantidadPersonas}</td>
                `;
        
        if (reserva.estado === "Pendiente") {
            fila += `<td><input type="button" value="Procesar reserva" class="listar-reservas__elemento-boton" id="btnProcesarReserva${reserva.id}" data-reserva="${reserva.id}"></td>
                </tr>`;
            listadoReservasPendientes += fila;

        } else if (reserva.estado === "Aprobada") {
            fila += `</tr>`;
            listadoReservasAprobadas += fila;

        } else if (reserva.estado === "Cancelada") {
            fila += `</tr>`;
            listadoReservasCanceladas += fila;
        }
                       
    }
    
    document.querySelector("#tblReservasPendientes").innerHTML = listadoReservasPendientes;
    document.querySelector("#tblReservasAprobadas").innerHTML = listadoReservasAprobadas;
    document.querySelector("#tblReservasCanceladas").innerHTML = listadoReservasCanceladas;

    // evento de click en botones de reservas pendientes, permite procesarlas
    let botonesProcesar = document.querySelectorAll(".listar-reservas__elemento-boton");
    for (let i = 0; i < botonesProcesar.length; i++) {
        botonesProcesar[i].addEventListener("click", procesarReserva);
    }

}

// funcionalidad que realiza la lógica de aprobar o cancelar una reserva pendiente. Se verifica cupos del destino y saldo del cliente
// se ejecuta luego de click en botón de procesar reserva
// se realiza la lógica de descuento de millas o saldo en pesos. Se acumulan millas en caso de pagar con dinero
// se actualiza la propiedad de millasUtilizadas correspondiente
function procesarReserva() {
    let idReserva = Number(this.getAttribute("data-reserva"));
    let unaReserva = sistema.obtenerObjeto(sistema.reservas, "id", idReserva);

    let montoReserva = unaReserva.destino.precioPorPersona * unaReserva.cantidadPersonas;

    let cuposDisponibles = sistema.verificarCuposDisponibles(unaReserva.destino, unaReserva.cantidadPersonas); //true si hay cupos
    let saldoTotalDisponible = sistema.verificarSaldoDisponible(unaReserva.cliente, unaReserva.formaPago, montoReserva); //true si tiene saldo o millas
    
    if (cuposDisponibles && saldoTotalDisponible) {

        // aprobar reserva
        unaReserva.estado = "Aprobada";
        // descontar cupos
        unaReserva.destino.cupos -= unaReserva.cantidadPersonas;

        // actualizar saldo y millas del cliente //si paga con pesos acumula millas sino no
        if (unaReserva.formaPago === "millas") {
            
            let saldoRestante = montoReserva - unaReserva.cliente.millas;

            if (saldoRestante > 0) {
                // si queda un saldo a pagar, se paga con dinero
                // se actualiza las millas utilizadas
                unaReserva.millasUtilizadas = unaReserva.cliente.millas;

                // se actualizan las millas del cliente
                unaReserva.cliente.millas = 0;
                // se actualiza saldo de dinero descontando el saldo restante de la reserva
                unaReserva.cliente.saldo -= saldoRestante;

                // se acumulan millas según el importe restante pagado con pesos
                unaReserva.cliente.millas += Math.floor(saldoRestante / 100);
            
            } else {
                unaReserva.millasUtilizadas = montoReserva;
                unaReserva.cliente.millas -= montoReserva;  
                         
            }

        } else if (unaReserva.formaPago === "dinero") {
            unaReserva.cliente.saldo -= montoReserva;

            unaReserva.cliente.millas += Math.floor(montoReserva / 100);
        }

        // pausar el destino si los cupos llegan a 0
        if (unaReserva.destino.cupos <= 0) {
            unaReserva.destino.estaActivo = false;
        }

        alert(`Reserva aprobada`);

    } else {
        unaReserva.estado = "Cancelada";

        if (!cuposDisponibles) {
            alert(`No hay cupos disponibles para el destino: ${unaReserva.destino.nombreDestino}`);
       
        } else if (!saldoTotalDisponible) {
            alert(`No tiene saldo suficiente`);
        }
        
    }

    listarReservas();

}

// funcionalidad para crear un nuevo destino por el usuario tipo administrador
// si cumple las validaciones se crea un nuevo destino activo
function crearDestino() {
    let nombre = document.querySelector("#txtDestinoAgregar").value;
    let precioPorPersona = Number(document.querySelector("#numPrecioPorPersonaAgregar").value);
    let descripcion = document.querySelector("#txtDescripcionAgregar").value;
    let imagen = document.querySelector("#fileImagenAgregar").value; //devuelve C:\fakepath\imagen.jpg 
    let nombreImagen = imagen.substring(imagen.lastIndexOf("\\") + 1); // se obtiene subcadena: imagen.jpg
    let cuposDisponibles = Number(document.querySelector("#numCuposDisponiblesAgregar").value);

    let mensaje = "";

    let camposCompletos = sistema.verificarCampoVacio(nombre, precioPorPersona, descripcion, nombreImagen, cuposDisponibles);

    if (camposCompletos && sistema.verificarCantidadNumerica(precioPorPersona) && sistema.verificarCantidadNumerica(cuposDisponibles)) {

        // se crea un nuevo destino segun los campos ingresados, se pide que los cupos sean mayores a 0 para que este activo
        let destino = new Destino (`DEST_ID_${idDestino}`, nombre, descripcion, precioPorPersona, cuposDisponibles, false, nombreImagen, true);
 
        sistema.agregarDestino(destino);

        idDestino++;

        mensaje = "Destino creado";

        // limpieza de campos al crear el destino
        document.querySelector("#txtDestinoAgregar").value = "";
        document.querySelector("#numPrecioPorPersonaAgregar").value = "";
        document.querySelector("#txtDescripcionAgregar").value = "";
        document.querySelector("#fileImagenAgregar").value = "";
        document.querySelector("#numCuposDisponiblesAgregar").value = "";

    } else if (!camposCompletos) {
        mensaje = "Todos los campos son requeridos";
    } else if (!sistema.verificarCantidadNumerica(precioPorPersona)) {
        mensaje = "El precio por persona debe ser un valor numérico mayor a 0.";
    } else if (!sistema.verificarCantidadNumerica(cuposDisponibles)) {
        mensaje = "Los cupos disponibles deben ser un valor numérico mayor a 0.";
    }

    document.querySelector("#pMensajeAgregarDestino").innerHTML = mensaje;
}

// funcionalidad que se ejecuta al seleccionar boton adminsitrar destino del menu de administrador. Carga tabla con botón para procesar cambios
// la tabla muestra el estado actual de cada destino y campos para modificar cupos, estado del destino y si se encuentra en oferta
function administrarDestinos() {
    let tablaAdministrarDestino = "";
    
    for (const destino of sistema.destinos) {
    
        tablaAdministrarDestino += `<tr>
                                        <td>${destino.nombreDestino}</td>
                                        <td>${destino.cupos}</td>
                                        <td><input type="text" id="txtAdministrarCantidadCupos${destino.id}"></td>`;

        if (destino.estaActivo) {
            tablaAdministrarDestino += `<td>ACTIVO</td>`;
        } else {
            tablaAdministrarDestino += `<td>INACTIVO</td>`;
        }
        
        tablaAdministrarDestino += `<td>
                                        <select id="slcAdministrarEstado${destino.id}">
                                            <option value="activo">ACTIVO</option>
                                            <option value="inactivo">INACTIVO</option>
                                        </select>
                                    </td>`;
        
        if (destino.enOferta) {
            tablaAdministrarDestino += `<td>Si</td>`;
        } else {
            tablaAdministrarDestino += `<td>No</td>`;
        }

        tablaAdministrarDestino += `<td>
                                        <select id="slcAdministrarOfertas${destino.id}">
                                            <option value="si">SI</option>
                                            <option value="no">NO</option>
                                        </select>
                                    </td>
                                    <td><input type="button" value="Procesar" class="administar-destinos__boton" id="btnProcesarCambios${destino.id}" data-id="${destino.id}"></td>
                                    </tr>`;

    }

    document.querySelector("#tblAdministrarDestinosBody").innerHTML = tablaAdministrarDestino;

    let botonesAdministrar = document.querySelectorAll(".administar-destinos__boton");
    for (let i = 0; i < botonesAdministrar.length; i++) {
        botonesAdministrar[i].addEventListener("click", procesarCambios);
    }

}

// funcionalidad que se ejecuta al seleccionar botón de procesar
// permite modificar stock de cupos, estado del destino (activo o inactivo) y si se encuentra en oferta
function procesarCambios() {
    let idDestino = this.getAttribute("data-id");
    let nuevoCupo = document.querySelector("#txtAdministrarCantidadCupos" + idDestino).value.trim();
    let nuevoEstado = document.querySelector("#slcAdministrarEstado" + idDestino).value;
    let nuevaOferta = document.querySelector("#slcAdministrarOfertas" + idDestino).value;

    let destino = sistema.obtenerObjeto(sistema.destinos, "id", idDestino);

    let cambioProcesado = true;
    if (isNaN(nuevoCupo) || nuevoCupo < 0) {
        alert("Los cupos deben ser números positivos");
        // no se procesan cambios si el formato de cupos no es correcto
        cambioProcesado = false;

    } else {

        if (nuevoCupo === "") {
            // si el campo de cupos está vacío, se mantienen los cupos
            destino.cupos = destino.cupos;

        } else {
            destino.cupos = Number(nuevoCupo);

            if (destino.cupos === 0) {
                // si se coloca a 0 los cupos del destino, cambia a estado inactivo
                destino.estaActivo = false;
            }
        }

        if (nuevoEstado === "activo" && destino.cupos > 0) {
            destino.estaActivo = true;

        // si está con 0 cupos no es posible activar el destino
        } else if (nuevoEstado === "activo" && destino.cupos === 0) {
            cambioProcesado = false;
            alert("No es posible activar un destino si no tiene cupos");

        } else {
            destino.estaActivo = false;
        }
    
        if (nuevaOferta === "si") {
            destino.enOferta = true;
    
        } else {
            destino.enOferta = false;
        }

    }

    if (cambioProcesado) {  
        alert(`Cambios procesados para el destino: ${destino.nombreDestino}`)
        administrarDestinos();

    }

}

// funcionalidad para ver el informe de ganancias. Se ejecuta desde el botón del menú correspondiente a usuario administrador
// se muestra el total generado por reservas aprobadas (sea si se realizaron en pesos o con millas)
// también se muestra en una tabla, para cada destino, la cantidad de personas de las reservas y el total generado 
// solo para reservas aprobadas y que fueron pagadas con dinero
function verInformeGanancias() {
    let montoTotalReservasAprobadas = 0;
    let filaGananciaDestino = "";

    for (const reserva of sistema.reservas) {

        if (reserva.estado === "Aprobada") {
            let montoReservaAprobada = reserva.destino.precioPorPersona * reserva.cantidadPersonas;
            montoTotalReservasAprobadas += montoReservaAprobada;
        }
        

    }

    for (const unDestino of sistema.destinos) {

        let cantidadPersonas = 0;
        let montoTotalDestino = 0;
        
        for (const unaReserva of sistema.reservas) {
            
            if (unaReserva.estado === "Aprobada" && unaReserva.destino.nombreDestino === unDestino.nombreDestino) {
                cantidadPersonas += unaReserva.cantidadPersonas;
                montoTotalDestino += (unaReserva.destino.precioPorPersona * unaReserva.cantidadPersonas) - unaReserva.millasUtilizadas;
            }
        }

        filaGananciaDestino += `<tr>
                                    <td>${unDestino.nombreDestino}</td>
                                    <td>${cantidadPersonas}</td>
                                    <td>${montoTotalDestino}</td>
                                </tr>`;
    
    }

    document.querySelector("#totalReservasConfirmadas").innerHTML = `El total generado por las reservas confirmadas es: ${montoTotalReservasAprobadas}`;
    document.querySelector("#tblGananciasBody").innerHTML = filaGananciaDestino;

}
