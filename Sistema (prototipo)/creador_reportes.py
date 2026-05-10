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

    resumen = "\n===== RESUMEN DE RESULTADOS =====\n"
    resumen += f"Ventas realizadas: {metricas['numero_ventas']}\n"
    resumen += f"Total vendido: ${metricas['total_ventas']}\n"
    resumen += f"Productos vendidos: {metricas['cantidad_total_productos']}\n"

    if productos:
        producto_top = productos[0]
        resumen += f"Producto más vendido: {producto_top['nombre']} "
        resumen += f"({producto_top['cantidad_vendida']} unidades)\n"

    stock_bajo = []

    for item in stock:
        if item["estado"] == "STOCK BAJO" or item["estado"] == "SIN STOCK":
            stock_bajo.append(item)

    resumen += f"Productos con alerta de stock: {len(stock_bajo)}\n"

    return resumen


def generar_reporte_detallado(resultados):

    metricas = resultados["metricas_ventas"]
    productos = resultados["productos_mas_vendidos"]
    stock = resultados["comportamiento_stock"]

    reporte = "\n===== REPORTE DETALLADO =====\n"

    reporte += "\n--- MÉTRICAS DE VENTAS ---\n"
    reporte += f"Número de ventas: {metricas['numero_ventas']}\n"
    reporte += f"Total de ventas: ${metricas['total_ventas']}\n"
    reporte += f"Cantidad total de productos vendidos: {metricas['cantidad_total_productos']}\n"
    reporte += f"Promedio por venta: ${metricas['promedio_venta']}\n"

    reporte += "\n--- PRODUCTOS MÁS VENDIDOS ---\n"

    for producto in productos:
        reporte += f"- {producto['nombre']} | "
        reporte += f"Categoría: {producto['categoria']} | "
        reporte += f"Cantidad vendida: {producto['cantidad_vendida']} | "
        reporte += f"Total generado: ${producto['total_generado']}\n"

    reporte += "\n--- COMPORTAMIENTO DE STOCK ---\n"

    for item in stock:
        reporte += f"- {item['nombre']} | "
        reporte += f"Categoría: {item['categoria']} | "
        reporte += f"Stock disponible: {item['stock_disponible']} | "
        reporte += f"Estado: {item['estado']}\n"

    return reporte


def generar_estadisticas(resultados):

    metricas = resultados["metricas_ventas"]
    productos = resultados["productos_mas_vendidos"]
    stock = resultados["comportamiento_stock"]

    sin_stock = 0
    stock_bajo = 0
    stock_medio = 0
    stock_suficiente = 0

    for item in stock:

        if item["estado"] == "SIN STOCK":
            sin_stock += 1
        elif item["estado"] == "STOCK BAJO":
            stock_bajo += 1
        elif item["estado"] == "STOCK MEDIO":
            stock_medio += 1
        elif item["estado"] == "STOCK SUFICIENTE":
            stock_suficiente += 1

    estadisticas = "\n===== ESTADÍSTICAS DEL SISTEMA =====\n"
    estadisticas += f"Total de ventas registradas: {metricas['numero_ventas']}\n"
    estadisticas += f"Monto total vendido: ${metricas['total_ventas']}\n"
    estadisticas += f"Promedio por venta: ${metricas['promedio_venta']}\n"
    estadisticas += f"Unidades vendidas: {metricas['cantidad_total_productos']}\n"

    estadisticas += "\n--- INDICADORES DE STOCK ---\n"
    estadisticas += f"Productos sin stock: {sin_stock}\n"
    estadisticas += f"Productos con stock bajo: {stock_bajo}\n"
    estadisticas += f"Productos con stock medio: {stock_medio}\n"
    estadisticas += f"Productos con stock suficiente: {stock_suficiente}\n"

    if productos:
        producto_top = productos[0]
        estadisticas += "\n--- INDICADOR PRINCIPAL ---\n"
        estadisticas += f"Producto con mayor venta: {producto_top['nombre']}\n"
        estadisticas += f"Unidades vendidas: {producto_top['cantidad_vendida']}\n"
        estadisticas += f"Total generado: ${producto_top['total_generado']}\n"

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