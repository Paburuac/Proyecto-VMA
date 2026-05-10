from gestor_bd import extraer_datos
from validador import validar_datos
from analizador import analizar_datos
from creador_reportes import crear_reporte

from datetime import datetime


def registrar_ejecucion(tipo_resultado):

    fecha = datetime.now()

    with open("registro_ejecuciones.txt", "a", encoding="utf-8") as archivo:

        archivo.write(
            f"[{fecha}] Reporte generado correctamente | Tipo: {tipo_resultado}\n"
        )


def iniciar_sistema(tipo_resultado):

    print("\n===== INICIANDO SISTEMA =====\n")

    print("Extrayendo datos...")
    datos = extraer_datos()

    print("Validando datos...")
    datos_validados = validar_datos(datos)

    print("Procesando análisis...")
    resultados = analizar_datos(datos_validados)

    print("Generando resultados...")
    salida = crear_reporte(resultados, tipo_resultado)

    print("\n===== RESULTADO FINAL =====")
    print(salida)

    registrar_ejecucion(tipo_resultado)

    print("\nEjecución registrada correctamente.")
    print("\n===== FIN DEL PROCESO =====\n")


if __name__ == "__main__":

    print("Seleccione el tipo de resultado:")
    print("1. RESUMEN")
    print("2. REPORTE")
    print("3. ESTADISTICA")

    opcion = input("\nIngrese una opción: ")

    tipos = {
        "1": "RESUMEN",
        "2": "REPORTE",
        "3": "ESTADISTICA"
    }

    tipo_resultado = tipos.get(opcion)

    if tipo_resultado:
        iniciar_sistema(tipo_resultado)
    else:
        print("\nOpción inválida.")