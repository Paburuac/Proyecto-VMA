def validar_datos(datos):

    ventas = datos["ventas"]
    productos = datos["productos"]
    stock = datos["stock"]

    errores = []

    if not ventas:
        errores.append("No existen datos de ventas.")

    if not productos:
        errores.append("No existen datos de productos.")

    if not stock:
        errores.append("No existen datos de stock.")

    validar_ventas(ventas, errores)
    validar_productos(productos, errores)
    validar_stock(stock, errores)
    validar_relaciones(ventas, productos, stock, errores)

    if errores:
        print("Se encontraron errores en los datos.")
        for error in errores:
            print(f"- {error}")

        datos = depurar_datos(datos)

        print("\nDatos depurados y normalizados correctamente.\n")
        return datos

    print("Datos validados correctamente.\n")
    return datos


def validar_ventas(ventas, errores):

    for venta in ventas:

        if venta["cantidad"] <= 0:
            errores.append(
                f"La venta {venta['id_venta']} tiene cantidad inválida."
            )

        if venta["total"] <= 0:
            errores.append(
                f"La venta {venta['id_venta']} tiene total inválido."
            )


def validar_productos(productos, errores):

    ids_productos = []

    for producto in productos:

        if producto["precio"] <= 0:
            errores.append(
                f"El producto {producto['id_producto']} tiene precio inválido."
            )

        if producto["id_producto"] in ids_productos:
            errores.append(
                f"El producto {producto['id_producto']} está duplicado."
            )

        ids_productos.append(producto["id_producto"])


def validar_stock(stock, errores):

    for item in stock:

        if item["stock_disponible"] < 0:
            errores.append(
                f"El producto {item['producto_id']} tiene stock negativo."
            )


def validar_relaciones(ventas, productos, stock, errores):

    ids_productos = []
    ids_stock = []

    for producto in productos:
        ids_productos.append(producto["id_producto"])

    for item in stock:
        ids_stock.append(item["producto_id"])

    for venta in ventas:

        if venta["producto_id"] not in ids_productos:
            errores.append(
                f"La venta {venta['id_venta']} tiene un producto_id que no existe en productos."
            )

        if venta["producto_id"] not in ids_stock:
            errores.append(
                f"La venta {venta['id_venta']} tiene un producto_id que no existe en stock."
            )

        producto_encontrado = None

        for producto in productos:

            if producto["id_producto"] == venta["producto_id"]:
                producto_encontrado = producto
                break

        if producto_encontrado:

            total_correcto = venta["cantidad"] * producto_encontrado["precio"]

            if venta["total"] != total_correcto:
                errores.append(
                    f"La venta {venta['id_venta']} tiene un total inconsistente."
                )

    for item in stock:

        if item["producto_id"] not in ids_productos:
            errores.append(
                f"Existe stock asociado a un producto inexistente: {item['producto_id']}."
            )


def depurar_datos(datos):

    ventas_limpias = []
    productos_limpios = []
    stock_limpio = []

    ids_productos_validos = []

    for producto in datos["productos"]:

        if (
            producto["precio"] > 0
            and producto["id_producto"] not in ids_productos_validos
        ):
            producto["nombre"] = producto["nombre"].strip().title()
            producto["categoria"] = producto["categoria"].strip().title()

            productos_limpios.append(producto)
            ids_productos_validos.append(producto["id_producto"])

    for item in datos["stock"]:

        if (
            item["stock_disponible"] >= 0
            and item["producto_id"] in ids_productos_validos
        ):
            stock_limpio.append(item)

    ids_stock_validos = []

    for item in stock_limpio:
        ids_stock_validos.append(item["producto_id"])

    for venta in datos["ventas"]:

        if (
            venta["cantidad"] > 0
            and venta["total"] > 0
            and venta["producto_id"] in ids_productos_validos
            and venta["producto_id"] in ids_stock_validos
        ):

            producto_encontrado = None

            for producto in productos_limpios:

                if producto["id_producto"] == venta["producto_id"]:
                    producto_encontrado = producto
                    break

            total_correcto = venta["cantidad"] * producto_encontrado["precio"]

            if venta["total"] == total_correcto:
                ventas_limpias.append(venta)

    datos_limpios = {
        "ventas": ventas_limpias,
        "productos": productos_limpios,
        "stock": stock_limpio
    }

    return datos_limpios


if __name__ == "__main__":

    from gestor_bd import extraer_datos

    datos = extraer_datos()

    datos_validados = validar_datos(datos)

    print("DATOS VALIDADOS:")
    print(datos_validados)