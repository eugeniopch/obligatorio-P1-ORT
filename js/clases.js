class Usuario {
    // el atributo o propiedad saldo refiere al saldo de dinero ($)
    constructor(id, nombre, apellido, nombreUsuario, contrasena, numeroTarjeta, numeroCVC, tipoUsuario, saldo, millas) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreUsuario = nombreUsuario;
        this.contrasena = contrasena;
        this.numeroTarjeta = numeroTarjeta;
        this.numeroCVC = numeroCVC;
        this.tipoUsuario = tipoUsuario;
        this.saldo = saldo;
        this.millas = millas;
    }

}

class Destino {

    constructor(id, nombreDestino, descripcion, precioPorPersona, cupos, enOferta, imagen, estaActivo) {
        this.id = id;
        this.nombreDestino = nombreDestino;
        this.descripcion = descripcion;
        this.precioPorPersona = precioPorPersona;
        this.cupos = cupos;
        this.enOferta = enOferta;
        this.imagen = imagen;
        this.estaActivo = estaActivo;
    }

}

// estado puede ser pendiente, aprobada, cancelada
// la clase reserva tiene como uno de sus atributos un objeto Usuario y un objeto Destino
class Reserva {
    // se agrega un atributo o propiedad de millas utilizadas en cada reserva
    constructor(id, cliente, destino, cantidadPersonas, estado, formaPago, millasUtilizadas) {
        this.id = id;
        this.cliente = cliente;
        this.destino = destino;
        this.cantidadPersonas = cantidadPersonas;
        this.estado = estado;
        this.formaPago = formaPago;
        this.millasUtilizadas = millasUtilizadas;
    }

}