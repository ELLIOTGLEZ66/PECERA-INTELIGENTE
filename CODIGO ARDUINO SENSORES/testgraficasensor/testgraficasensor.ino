#include <WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include "DFRobot_ESP_EC.h"
#include "EEPROM.h"

#define ONE_WIRE_BUS 25

const char* ssid = "IZZI-388E";
const char* password = "704FB83A388E";
const char* mqtt_broker = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
char OutTopic[] = "/UTT/0319123780";
char InTopic[] = "/UTT/0319123780/cntrl";

char onevaluetopic[] = "/UTT/0319123780/send/onevalue";
char onevaluetopic2[] = "/UTT/0319123780/send/ph";
char onevaluetopic3[] = "/UTT/0319123780/send/lux";
char onevaluetopic4[] = "/UTT/0319123780/send/temp";

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
DFRobot_ESP_EC ec;
int ph = 0;
int lux = 0;
int waterlevel = 0;
int waterlevelPin = 35;
float tempC = 0;
float voltage, ecValue = 25;
float waterLevelAtZeroValue = 0.0;
float waterLevelAtFullValue = 100.0;
long previousMillis = 0;
long sampling_period = 3700;

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP Address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "Client0319123780";
    if (client.connect(clientId.c_str())) {
      Serial.println("Connected");
      client.subscribe(InTopic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println("try again in 2 seconds");
      delay(5000);
    }
  }
}

void get_sensor_values() {
  voltage = analogRead(34);
  ecValue = ec.readEC(voltage, tempC);
  ec.calibration(voltage, tempC);
  sensors.requestTemperatures();
  tempC = sensors.getTempCByIndex(0);
  lux = analogRead(27);
  waterlevel = analogRead(32);
}

void setup() {
  EEPROM.begin(32);
  ec.begin();
  sensors.begin();
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_broker, 1883);
  client.setCallback(callback);
  pinMode(2, INPUT);
  previousMillis = millis();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  unsigned long now = millis();
  if (now - previousMillis > sampling_period) {
    get_sensor_values();
    String JSON_msg = "{\"n\":\"0319123780\",\"ToC\":" + String(tempC, 2);
    JSON_msg += ",\"ECVal\":" + String(ecValue, 4) + ",\"Level\":" + String(waterlevel) + "}";
    Serial.println("Publish Message: ");
    Serial.println(JSON_msg);
    char JSON_msg_array[60];
    int JSON_msg_length = JSON_msg.length();
    JSON_msg.toCharArray(JSON_msg_array, JSON_msg_length + 1);
    Serial.println(JSON_msg_array);
    if (client.connected()) {
      client.publish(OutTopic, JSON_msg_array);
      Serial.print("Published to topic: ");
      Serial.println(OutTopic);

      char chrToC[10];
      char chrEcValue[10];
      char chrWaterLevel[10];
      String strToC = String(tempC, 2);
      String strEcValue = String(ecValue, 4);
      String strWaterLevel = String(waterlevel);
      strToC.toCharArray(chrToC, 10);
      strEcValue.toCharArray(chrEcValue, 10);
      strWaterLevel.toCharArray(chrWaterLevel, 10);
      client.publish(onevaluetopic, chrWaterLevel);
      client.publish(onevaluetopic2, strEcValue.c_str());
      client.publish(onevaluetopic4, chrToC);
      Serial.print("Nivel de Agua en la Pecera: ");
      Serial.println(chrWaterLevel);
      Serial.print("Valor de pH en la Pecera: ");
      Serial.println(strEcValue);
      Serial.print("Temperatura de la Pecera: ");
      Serial.println(chrToC);
    } else {
      Serial.print("Not connected to broker... couldn't send MQTT message");
    }
    previousMillis = millis();
  }
}
