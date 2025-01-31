class Sistema {

    constructor() {
        
        // array de usuarios con 5 administradores y 5 clientes precargados
        this.usuarios = [
            // id, nombre, apellido, nombreUsuario, contrasena, numeroTarjeta, numeroCVC, tipoUsuario, saldo, millas
            new Usuario(1, "admin1", "admin", "admin1", "admin", "1111-1111-1111-1111", "111", "admin", 0, 0),
            new Usuario(2, "admin2", "admin", "admin2", "admin", "1111-1111-1111-1111", "111", "admin", 0, 0),
            new Usuario(3, "admin3", "admin", "admin3", "admin", "1111-1111-1111-1111", "111", "admin", 0, 0),
            new Usuario(4, "admin4", "admin", "admin4", "admin", "1111-1111-1111-1111", "111", "admin", 0, 0),
            new Usuario(5, "admin5", "admin", "admin5", "admin", "1111-1111-1111-1111", "111", "admin", 0, 0),
            new Usuario(6, "Federico", "Chagas", "fchagas", "Chagas1", "3346-4698-2223-4550", "133", "cliente", 15000, 2000),
            new Usuario(7, "Juan", "Perez", "jperez", "Perez123", "3542-5569-4443-5104", "526", "cliente", 15000, 4000),
            new Usuario(8, "Eugenio", "Pereira", "epereira", "Pereira1", "1265-4575-5258-5208", "223", "cliente", 15000, 2000),
            new Usuario(9, "Lucia", "Rodriguez", "lrodriguez", "Rodriguez123", "3467-1492-2410-5292", "312", "cliente", 15000, 1000),
            new Usuario(10, "Maria", "Alvarez", "malvarez", "Alvarez123", "1041-2230-1258-5491", "101", "cliente", 15000, 0),
        ];

        // array de destinos con 10 destinos precargados
        this.destinos = [
            //id, nombreDestino, descripcion, precioPorPersona, cupos, enOferta, imagen, estaActivo
            new Destino("DEST_ID_1", "China", "Explora la gran muralla China.", 3000, 10, true, "china.jpg", true),
            new Destino("DEST_ID_2", "Santiago de Chile", "Explora la ciudad.", 1200, 20, true, "Santiago.jpg", true),
            new Destino("DEST_ID_3", "Londres", "Explora la ciudad.", 2500, 15, false, "Londres.jpg", true),
            new Destino("DEST_ID_4", "Punta Cana", "Sol y playa.", 2100, 15, true, "Punta Cana.jpg", false),
            new Destino("DEST_ID_5", "Bariloche", "Disfruta de la nieve.", 1200, 20, false, "Bariloche.jpg", true),
            new Destino("DEST_ID_6", "Los Angeles", "Disfruta de la ciudad del entretenimiento.", 2500, 20, false, "Los Angeles.jpg", true),
            new Destino("DEST_ID_7", "Nueva York", "Explora la gran manzana.", 2000, 10, true, "Nueva York.jpg", true),
            new Destino("DEST_ID_8", "Turquia", "Descubre la ciudad de Estambul.", 3000, 15, false, "Turquia.jpg", true),
            new Destino("DEST_ID_9", "Rio de Janeiro", "Escapada a la ciudad maravillosa.", 1500, 15, true, "Rio.jpg", true),
            new Destino("DEST_ID_10", "Buzios", "Sol y plaza en Brasil.", 1200, 4, false, "Buzios.jpg", true)
        ];

        // array de reservas con 5 reservas precargadas
        // id, cliente, destino, cantidadPersonas, estado, formaPago, millasUtilizadas
        this.reservas = [
            new Reserva(
                1,
                // objeto Usuario  
                this.obtenerObjeto(this.usuarios, "id", 8),
                // referencia al objeto Destino en el array de destinos
                this.destinos[0],
                2,
                "Pendiente",
                "dinero",
                0
            ), 
            new Reserva(
                2,
                this.obtenerObjeto(this.usuarios, "id", 7),
                this.destinos[1],
                3,
                "Pendiente",
                "millas",
                3600
            ),
            new Reserva(
                3,
                this.obtenerObjeto(this.usuarios, "id", 6),
                this.destinos[2],
                1,
                "Cancelada",
                "dinero",
                0
            ),
            new Reserva(
                4,
                this.obtenerObjeto(this.usuarios, "id", 9),
                this.destinos[8],
                1,
                "Aprobada",
                "millas",
                1500
            ),
            new Reserva(
                5,
                this.obtenerObjeto(this.usuarios, "id", 10),
                this.destinos[7],
                2,
                "Pendiente",
                "dinero",
                0
            ),

        ];


    }

    // método para validar campos vacíos en registro de cliente
    validarCamposVaciosRegistro(nombre, apellido, nombreUsuario, clave, numeroTarjeta, numeroCVC) {
        let camposVacios = false;
        if ( nombre !== "" && apellido !== "" && nombreUsuario !== "" && clave !== "" && numeroTarjeta !== "" && numeroCVC !== "") {
            camposVacios = true;
        }

        return camposVacios;
    }

    // verificar formato del password (contraseña)
    verificarFormatoClave(clave) {
        let valido = false;
        let contadorMay = 0;
        let contadorMin = 0;
        let contadorNum = 0;

        for ( let i = 0; i < clave.length; i++ ) {
            if ( clave.charAt(i) >= "A" && clave.charAt(i) <= "Z" ) {
                contadorMay++;
            }
            if ( clave.charAt(i) >= "0" && clave.charAt(i) <= "9" ) {
                contadorNum++;
            }
            if ( clave.charAt(i) >= "a" && clave.charAt(i) <= "z" ) {
                contadorMin++;
            }
        }

        if( clave.length >= 5 && contadorMay > 0 && contadorNum > 0 && contadorMin > 0 ) {
            valido = true;
        }

        return valido;
    }
    
    // verificar formato de tarjeta de crédito
    verificarFormatoTarjeta(numeroTarjeta) {
        let valido = false;
        let numeroTarjetaSinEspacio = numeroTarjeta.trim();

        let parte1 = numeroTarjetaSinEspacio.substring(0, 4);
        let parte2 = numeroTarjetaSinEspacio.substring(5, 9);
        let parte3 = numeroTarjetaSinEspacio.substring(10, 14);
        let parte4 = numeroTarjetaSinEspacio.substring(15, 19);


        if (numeroTarjetaSinEspacio.length === 19 && !isNaN(parte1) && !isNaN(parte2) && !isNaN(parte3) && !isNaN(parte4) && numeroTarjetaSinEspacio.charAt(4) === "-" &&
            numeroTarjetaSinEspacio.charAt(9) === "-" && numeroTarjetaSinEspacio.charAt(14) === "-") {

                valido = true;
        }

        return valido;
    
    }

    // verificar formato del CVC de la tarjeta de crédito
    verificarFormatoCVC(numeroCVC) {
        let valido = false;
        let numeroCVCsinEspacio = numeroCVC.trim();

        if (numeroCVCsinEspacio.length === 3 && !isNaN(numeroCVCsinEspacio)) {
            valido = true;
        }

        return valido;

    }

    // método para buscar un Objeto por su propiedad o atributo
    // devuelve un booleano si el Objeto existe en una lista
    buscarElemento(lista, propiedad, valorBusqueda) {
        let existe = false;

        for ( let i = 0; i < lista.length; i++ ) {
            const unElemento = lista[i];
            if ( unElemento[propiedad] === valorBusqueda ) {
                existe = true;
                break;
            }
        }
        return existe;
    }

    // método para agregar un Usuario a la lista de usuarios con push
    agregarUsuario(usuario) {
        this.usuarios.push(usuario);
    }

    // método para agregar una Reserva a la lista de reservas con push
    agregarReserva(reserva) {
        this.reservas.push(reserva);
    }

    // método para obtener un Objeto a partir de una de sus propiedades o atributo
    // devuelve un Objeto o null
    obtenerObjeto(listaElementos, propiedad, valorBusqueda) {
        let Objeto = null;

        for ( let i = 0; i < listaElementos.length; i++ ) {
            const unElemento = listaElementos[i];
            if ( unElemento[propiedad] === valorBusqueda ) {
                Objeto = unElemento;
                break
            }
        }
        return Objeto;
    }

    // método para verificar el login de un Usuario
    // se valida nombre de usuario y contraseña
    verificarLogin(nombreUsuario, clave) {
        let resultado = false;

        let usuario = this.obtenerObjeto(this.usuarios, "nombreUsuario", nombreUsuario);

        if ( usuario !== null ) {
            if (usuario.contrasena === clave) {
                resultado = true;
            }
        
        }
        return resultado;
    }

    // método para validar campos vacíos en login
    // devuelve false si los campos están vacíos
    validarCamposVaciosLogin(nombreUsuario, clave) {
        let camposVacios = false;
        if (nombreUsuario !== "" && clave !== "") {
            camposVacios = true;
        }
        return camposVacios;
    }

    // método para validar campos vacíos en formulario Reserva
    // devuelve false si los campos están vacíos
    validarCamposVaciosReserva(cantidadPersonas, medioPago) {
        let camposVacios = false;
        if (cantidadPersonas !== "" && medioPago !== "") {
            camposVacios = true;
        }
        return camposVacios;
    }

    // método para verificar un campo numérico: numero positivo y mayor que 0
    verificarCantidadNumerica(cantidad) {
        let numPositivoValido = false;
        if (!isNaN(cantidad) && cantidad > 0) {
            numPositivoValido = true;
        }
        return numPositivoValido;
    }

    // método para verificar si existe una reserva en la lista de reservas por nombre de usuario y nombre de destino
    // si existe una reserva pendiente o aprobada para un cliente, devuelve true
    existeReserva(listaReservas, usuarioNombre, destinoNombre) {
        let existe = false;

        for (let i = 0; i < listaReservas.length; i++) {
            const unaReserva = listaReservas[i];

            if (unaReserva.cliente.nombreUsuario === usuarioNombre && unaReserva.destino.nombreDestino === destinoNombre &&
                (unaReserva.estado === "Pendiente" || unaReserva.estado === "Aprobada")) {
                    existe = true;
                    break;
            }
        }
        return existe;
    }

    // método para verificar los cupos disponibles de un destino
    // devuelve true si la cantidad de cupos de un destino es mayor o igual a la cantidad de personas en la reserva
    verificarCuposDisponibles(destino, cantidadPersonas) {
        let cupos = false;
    
        if (destino.cupos >= cantidadPersonas) {
            cupos = true;
        }
        
        return cupos;
    }

    // método para verificar saldo disponible del cliente
    // si el cliente elige millas , el saldo total es millas + saldo($), sino el saldo total es el saldo($)
    // devuelve true si el saldo es suficiente de acuerdo a la forma de pago seleccionada 
    verificarSaldoDisponible(cliente, formaPago, montoReserva) {
        let saldoSuficiente = false;
        let saldoTotal = 0;

        if (formaPago === "millas") {
            saldoTotal = cliente.millas + cliente.saldo;
             
        } else if (formaPago === "dinero") {
            saldoTotal = cliente.saldo;
        }

        if (saldoTotal >= montoReserva) {
            saldoSuficiente = true;
        }

        return saldoSuficiente;
    }

    // método para verificar campos vacíos en formulario de agregar destinos
    // devuelve false si hay algún campo vacío
    verificarCampoVacio(nombre, precio, descripcion, imagen, cupos){
        let camposVacios = false;
        if ( nombre !== "" && precio !== "" && descripcion !== "" && imagen !== "" && cupos !== "") {
            camposVacios = true;
        }
        return camposVacios;
    }

    // método para agregar un Destino a la lista de destinos con push
    agregarDestino(destino) {
        this.destinos.push(destino);
    }

}



