def crear_reporte(resultados, tipo_resultado):

    tipo_resultado = tipo_resultado.upper()

    if tipo_resultado == "RESUMEN":
        return generar_resumen(resultados)

    elif tipo_resultado == "REPORTE":
        return generar_reporte_detallado(resultados)

    elif tipo_resultado == "ESTADISTICA":
        return generar_estadisticas(resultados)

    else:
        return "Tipo de resultado no válido. Use RESUMEN, REPORTE o ESTADISTICA."


def generar_resumen(resultados):

    metricas = resultados["metricas_ventas"]
    productos = resultados["productos_mas_vendidos"]
    stock = resultados["comportamiento_stock"]

    stock_alerta = []

    for item in stock:
        if item["estado"] == "STOCK BAJO" or item["estado"] == "SIN STOCK":
            stock_alerta.append(item)

    resumen = "\n===== RESUMEN EJECUTIVO =====\n"
    resumen += f"Ventas registradas: {metricas['numero_ventas']}\n"
    resumen += f"Ingresos totales: ${metricas['total_ventas']}\n"

    if productos:
        producto_top = productos[0]
        resumen += f"Producto más vendido: {producto_top['nombre']}\n"
    else:
        resumen += "Producto más vendido: No disponible\n"

    resumen += f"Alertas de stock: {len(stock_alerta)}\n"

    return resumen


def generar_reporte_detallado(resultados):

    metricas = resultados["metricas_ventas"]
    productos = resultados["productos_mas_vendidos"]
    stock = resultados["comportamiento_stock"]

    reporte = "\n========== REPORTE DETALLADO ==========\n"

    reporte += "\n----- MÉTRICAS GENERALES -----\n"
    reporte += f"Ventas registradas: {metricas['numero_ventas']}\n"
    reporte += f"Ingresos totales: ${metricas['total_ventas']}\n"
    reporte += f"Productos vendidos: {metricas['cantidad_total_productos']}\n"
    reporte += f"Promedio por venta: ${int(metricas['promedio_venta'])}\n"

    reporte += "\n----- PRODUCTOS MÁS VENDIDOS -----\n"

    if productos:

        contador = 1

        for producto in productos:

            reporte += f"\n[{contador}] {producto['nombre']}\n"
            reporte += f"Categoría: {producto['categoria']}\n"
            reporte += f"Cantidad vendida: {producto['cantidad_vendida']}\n"
            reporte += f"Total generado: ${producto['total_generado']}\n"

            contador += 1

    else:

        reporte += "No existen productos vendidos.\n"

    reporte += "\n----- ESTADO DEL INVENTARIO -----\n"

    if stock:

        contador = 1

        for item in stock:

            reporte += f"\n[{contador}] {item['nombre']}\n"
            reporte += f"Categoría: {item['categoria']}\n"
            reporte += f"Stock disponible: {item['stock_disponible']}\n"
            reporte += f"Estado: {item['estado']}\n"

            contador += 1

    else:

        reporte += "No existe información de stock.\n"

    return reporte


def generar_estadisticas(resultados):

    metricas = resultados["metricas_ventas"]
    productos = resultados["productos_mas_vendidos"]
    stock = resultados["comportamiento_stock"]

    total_ventas = metricas["total_ventas"]
    total_unidades = metricas["cantidad_total_productos"]
    numero_ventas = metricas["numero_ventas"]

    estadisticas = "\n===== ESTADÍSTICAS AVANZADAS =====\n"

    if numero_ventas > 0:
        promedio_unidades = total_unidades / numero_ventas
    else:
        promedio_unidades = 0

    estadisticas += f"Promedio de unidades por venta: {promedio_unidades}\n"

    if productos:

        producto_mayor_ingreso = productos[0]

        for producto in productos:
            if producto["total_generado"] > producto_mayor_ingreso["total_generado"]:
                producto_mayor_ingreso = producto

        estadisticas += f"Producto que más dinero genera: {producto_mayor_ingreso['nombre']}\n"
        estadisticas += f"Ingreso generado: ${producto_mayor_ingreso['total_generado']}\n"

        estadisticas += "\n----- PARTICIPACIÓN DE VENTAS POR PRODUCTO -----\n"

        for producto in productos:

            if total_ventas > 0:
                porcentaje = (producto["total_generado"] / total_ventas) * 100
            else:
                porcentaje = 0

            estadisticas += f"{producto['nombre']}: {porcentaje:.2f}% del total vendido\n"

    categorias = {}

    for producto in productos:

        categoria = producto["categoria"]

        if categoria not in categorias:
            categorias[categoria] = 0

        categorias[categoria] += producto["cantidad_vendida"]

    if categorias:

        categoria_dominante = max(categorias, key=categorias.get)

        estadisticas += "\n----- CATEGORÍA MÁS VENDIDA -----\n"
        estadisticas += f"Categoría dominante: {categoria_dominante}\n"
        estadisticas += f"Unidades vendidas: {categorias[categoria_dominante]}\n"

    total_productos_stock = len(stock)
    stock_critico = 0

    sin_stock = 0
    stock_bajo = 0
    stock_medio = 0
    stock_suficiente = 0

    for item in stock:

        if item["estado"] == "SIN STOCK":
            sin_stock += 1
            stock_critico += 1
        elif item["estado"] == "STOCK BAJO":
            stock_bajo += 1
            stock_critico += 1
        elif item["estado"] == "STOCK MEDIO":
            stock_medio += 1
        elif item["estado"] == "STOCK SUFICIENTE":
            stock_suficiente += 1

    if total_productos_stock > 0:
        porcentaje_stock_critico = (stock_critico / total_productos_stock) * 100
    else:
        porcentaje_stock_critico = 0

    estadisticas += "\n----- ANÁLISIS DE INVENTARIO -----\n"
    estadisticas += f"Porcentaje de stock crítico: {porcentaje_stock_critico:.2f}%\n"
    estadisticas += f"Sin stock: {sin_stock}\n"
    estadisticas += f"Stock bajo: {stock_bajo}\n"
    estadisticas += f"Stock medio: {stock_medio}\n"
    estadisticas += f"Stock suficiente: {stock_suficiente}\n"

    return estadisticas


if __name__ == "__main__":

    from gestor_bd import extraer_datos
    from validador import validar_datos
    from analizador import analizar_datos

    datos = extraer_datos()
    datos_validados = validar_datos(datos)
    resultados = analizar_datos(datos_validados)

    salida = crear_reporte(resultados, "REPORTE")

    print(salida)