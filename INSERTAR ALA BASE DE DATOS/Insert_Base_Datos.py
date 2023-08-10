import paho.mqtt.client as mqtt
import pymysql
import json

# Configuración de la base de datos MySQL
DB_HOST = "localhost"  # Cambia esto por la dirección IP del servidor MySQL si es necesario
DB_USER = "root"
DB_PASSWORD = ""
DB_DATABASE = "pecera1"
TABLE_NAME = "sensores"

# Función para guardar los datos en la base de datos MySQL
def save_to_database(temperature, level, pH):
    try:
        conn = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_DATABASE
        )
        cursor = conn.cursor()

        # Insertar los valores en la tabla
        cursor.execute(f"INSERT INTO {TABLE_NAME} (Sen_Temp, Sen_Nivel, Sen_PH) VALUES (%s, %s, %s)",
                       (temperature, level, pH))

        conn.commit()
        conn.close()
        print("Datos guardados en la base de datos.")
    except pymysql.Error as e:
        print(f"Error al guardar en la base de datos: {e}")

# Función para procesar los mensajes MQTT
def on_message(client, userdata, msg):
    try:
        topic = msg.topic
        payload = msg.payload.decode("utf-8")
        data = json.loads(payload)

        # Extraer los valores de temperature, level y pH del JSON recibido
        temperature = data.get("ToC")
        level = data.get("Level")
        pH = data.get("ECVal")

        print(f"Temperature: {temperature}, Level: {level}, pH: {pH}")

        # Guardar los valores en la base de datos
        save_to_database(temperature, level, pH)

    except Exception as e:
        print(f"Error al procesar el mensaje MQTT: {e}")

# Configuración del cliente MQTT
MQTT_BROKER = "broker.hivemq.com"
MQTT_TOPIC = "/UTT/0319123780"

client = mqtt.Client()
client.on_message = on_message

client.connect(MQTT_BROKER, 1883)

client.subscribe(MQTT_TOPIC)

# Mantener el programa en ejecución esperando mensajes MQTT
client.loop_forever()
