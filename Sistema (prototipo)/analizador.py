def analizar_datos(datos):

    ventas = datos["ventas"]
    productos = datos["productos"]
    stock = datos["stock"]

    metricas_ventas = calcular_metricas_ventas(ventas)
    productos_vendidos = analizar_productos_mas_vendidos(ventas, productos)
    comportamiento_stock = analizar_stock(stock, productos)

    resultados = {
        "metricas_ventas": metricas_ventas,
        "productos_mas_vendidos": productos_vendidos,
        "comportamiento_stock": comportamiento_stock
    }

    print("Análisis de datos completado correctamente.\n")

    return resultados


def calcular_metricas_ventas(ventas):

    total_ventas = 0
    cantidad_total_productos = 0
    numero_ventas = len(ventas)

    for venta in ventas:
        total_ventas += venta["total"]
        cantidad_total_productos += venta["cantidad"]

    if numero_ventas > 0:
        promedio_venta = total_ventas / numero_ventas
    else:
        promedio_venta = 0

    metricas = {
        "numero_ventas": numero_ventas,
        "total_ventas": total_ventas,
        "cantidad_total_productos": cantidad_total_productos,
        "promedio_venta": promedio_venta
    }

    return metricas


def analizar_productos_mas_vendidos(ventas, productos):

    acumulado_productos = {}

    for venta in ventas:

        producto_id = venta["producto_id"]

        if producto_id not in acumulado_productos:
            acumulado_productos[producto_id] = {
                "producto_id": producto_id,
                "cantidad_vendida": 0,
                "total_generado": 0
            }

        acumulado_productos[producto_id]["cantidad_vendida"] += venta["cantidad"]
        acumulado_productos[producto_id]["total_generado"] += venta["total"]

    productos_vendidos = []

    for producto_id, datos_producto in acumulado_productos.items():

        nombre_producto = buscar_nombre_producto(producto_id, productos)
        categoria_producto = buscar_categoria_producto(producto_id, productos)

        productos_vendidos.append({
            "producto_id": producto_id,
            "nombre": nombre_producto,
            "categoria": categoria_producto,
            "cantidad_vendida": datos_producto["cantidad_vendida"],
            "total_generado": datos_producto["total_generado"]
        })

    productos_vendidos.sort(
        key=lambda producto: producto["cantidad_vendida"],
        reverse=True
    )

    return productos_vendidos


def analizar_stock(stock, productos):

    comportamiento_stock = []

    for item in stock:

        producto_id = item["producto_id"]
        stock_disponible = item["stock_disponible"]

        nombre_producto = buscar_nombre_producto(producto_id, productos)
        categoria_producto = buscar_categoria_producto(producto_id, productos)

        if stock_disponible == 0:
            estado = "SIN STOCK"
        elif stock_disponible <= 5:
            estado = "STOCK BAJO"
        elif stock_disponible <= 15:
            estado = "STOCK MEDIO"
        else:
            estado = "STOCK SUFICIENTE"

        comportamiento_stock.append({
            "producto_id": producto_id,
            "nombre": nombre_producto,
            "categoria": categoria_producto,
            "stock_disponible": stock_disponible,
            "estado": estado
        })

    comportamiento_stock.sort(
        key=lambda producto: producto["stock_disponible"]
    )

    return comportamiento_stock


def buscar_nombre_producto(producto_id, productos):

    for producto in productos:

        if producto["id_producto"] == producto_id:
            return producto["nombre"]

    return "Producto no encontrado"


def buscar_categoria_producto(producto_id, productos):

    for producto in productos:

        if producto["id_producto"] == producto_id:
            return producto["categoria"]

    return "Categoría no encontrada"


if __name__ == "__main__":

    from gestor_bd import extraer_datos
    from validador import validar_datos

    datos = extraer_datos()
    datos_validados = validar_datos(datos)

    resultados = analizar_datos(datos_validados)

    print("RESULTADOS DEL ANÁLISIS:")
    print(resultados)