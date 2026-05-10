def obtener_ventas():

    ventas = [
        {
            "id_venta": 1,
            "producto_id": 101,
            "cantidad": 5,
            "total": 50000
        },

        # DATO MALO: cantidad negativa
        {
            "id_venta": 2,
            "producto_id": 102,
            "cantidad": -2,
            "total": 30000
        },

        {
            "id_venta": 3,
            "producto_id": 103,
            "cantidad": 8,
            "total": 120000
        },

        # DATO MALO: producto_id inexistente
        {
            "id_venta": 4,
            "producto_id": 999,
            "cantidad": 3,
            "total": 30000
        },

        # DATO MALO: total inconsistente
        {
            "id_venta": 5,
            "producto_id": 101,
            "cantidad": 3,
            "total": 999999
        }
    ]

    return ventas


def obtener_productos():

    productos = [
        {
            "id_producto": 101,
            "nombre": "Taladro Industrial",
            "categoria": "Herramientas",
            "precio": 10000
        },

        {
            "id_producto": 102,
            "nombre": "Guantes de Seguridad",
            "categoria": "Seguridad",
            "precio": 15000
        },

        {
            "id_producto": 103,
            "nombre": "Casco Industrial",
            "categoria": "Seguridad",
            "precio": 15000
        },

        # DATO MALO: producto duplicado
        {
            "id_producto": 103,
            "nombre": "Casco Industrial Duplicado",
            "categoria": "Seguridad",
            "precio": 15000
        }
    ]

    return productos


def obtener_stock():

    stock = [
        {
            "producto_id": 101,
            "stock_disponible": 12
        },

        # DATO MALO: stock negativo
        {
            "producto_id": 102,
            "stock_disponible": -4
        },

        {
            "producto_id": 103,
            "stock_disponible": 20
        },

        # DATO MALO: producto inexistente
        {
            "producto_id": 888,
            "stock_disponible": 10
        }
    ]

    return stock


def extraer_datos():

    datos = {
        "ventas": obtener_ventas(),
        "productos": obtener_productos(),
        "stock": obtener_stock()
    }

    print("Datos extraídos correctamente.\n")

    return datos


if __name__ == "__main__":

    datos = extraer_datos()

    print("VENTAS:")
    print(datos["ventas"])

    print("\nPRODUCTOS:")
    print(datos["productos"])

    print("\nSTOCK:")
    print(datos["stock"])