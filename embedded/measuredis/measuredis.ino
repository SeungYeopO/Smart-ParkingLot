#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
#include <WiFiEsp.h>
#ifndef HAVE_HWSERIAL1
#include <SoftwareSerial.h>
#endif

SoftwareSerial Serial1(2, 3); // RX, TX

RF24 radio(9, 10); // CE, CSN

char ssid[] = "SSAFY_EMB";
char pass[] = "1210@ssafy";
int status = WL_IDLE_STATUS;

char server[] = "3.38.208.90";

unsigned long lastConnectionTime = 0;
const unsigned long postingInterval = 1000L;

WiFiEspClient client;

const byte address[6] = "00001"; // the address the the module
int cnt = 0;
int DAT[7] = {0};

void setup() {
  Serial1.begin(9600);
  WiFi.init(&Serial1);

  radio.begin();
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MAX);
  radio.startListening();

  if (WiFi.status() == WL_NO_SHIELD) {
    while (true);
  }

  while (status != WL_CONNECTED) {
    status = WiFi.begin(ssid, pass);
  }
  printWifiStatus();
}

void loop() {
  int num = 0;
  char txt[32];
  if (radio.available()) { // 만약 NRF 모듈에서 데이터가 들어오면
    char text[32] = "";
    radio.read(&text, sizeof(text));
    num = atoi(text);
    DAT[num]++;
    cnt++;
  }
  // HTTP 요청
  unsigned long currentTime = millis();

  if(cnt == 10){
    int max = 0;
    for(int i = 1; i < 7; ++i){
      if(max < DAT[i]){
        max = i;
      }
      DAT[i] = 0;
    }
    txt[0] = max + '0';
    if (currentTime - lastConnectionTime > postingInterval) {
      if (!httpRequest(txt)) {
      } else {
        lastConnectionTime = currentTime;
      }
    }
    cnt = 0;
  }
}

bool httpRequest(const char* text) {
  client.stop();

  if (client.connect(server, 3002)) {
    // "/updateDatabase" 엔드포인트에 GET 요청 전송
    client.print(F("GET /updateDatabase?text="));
    client.print(text);
    client.println(F(" HTTP/1.1"));
    client.println(F("Host: 3.38.208.90:3002"));
    client.println("Connection: close");
    client.println();

    // 응답 확인
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
      }
    }
    return true;
  } else {
    return false;
  }
}

void printWifiStatus() {
  IPAddress ip = WiFi.localIP();
  long rssi = WiFi.RSSI();
}