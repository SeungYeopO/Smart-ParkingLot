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
const unsigned long postingInterval = 500L;

WiFiEspClient client;

const byte address[6] = "00001"; // the address the the module
String str = "";
int cnt = 0;

void setup() {
//  Serial.begin(9600);
  Serial1.begin(9600);
  WiFi.init(&Serial1);

  radio.begin();
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MAX);
  radio.startListening();

  if (WiFi.status() == WL_NO_SHIELD) {
//    Serial.println("WiFi 쉴드 없음");
    while (true);
  }

  while (status != WL_CONNECTED) {
//    Serial.print("WPA SSID에 연결 시도 중: ");
//    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);
  }

//  Serial.println("네트워크에 연결되었습니다.");

  printWifiStatus();

}

void loop() {
  int flag = 0;
  if (radio.available()) { // 만약 NRF 모듈에서 데이터가 들어오면
    char text[32] = "";
    radio.read(&text, sizeof(text));
    for(int i = 0; i < sizeof(str); ++i){
      if(str[i] == text[0]){
        flag = 1;
        break;
      }
    }
    if(flag == 0){
      str += text[0];
      cnt++;
    }
//    Serial.println(text);
  }
  // HTTP 요청
  unsigned long currentTime = millis();

  if(cnt == 4){
    char ch[7] = {0};
    str.toCharArray(ch, str.length()+1);
 //   Serial.println(ch);
    if (currentTime - lastConnectionTime > postingInterval) {
      if (!httpRequest(ch)) {
 //       Serial.println("HTTP 요청 실패. 재시도 중...");
      } else {
        lastConnectionTime = currentTime;
      }
    }
    str = "";
    cnt = 0;
    delay(10);
  }
}

bool httpRequest(const char* text) {
//  Serial.println();

  client.stop();

  if (client.connect(server, 3002)) {
  //  Serial.println("연결 중...");

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
    //    Serial.write(c);
      }
    }

    return true;
  } else {
 //   Serial.println("연결 실패");
    return false;
  }
}

void printWifiStatus() {
//  Serial.print("SSID: ");
//  Serial.println(WiFi.SSID());

  IPAddress ip = WiFi.localIP();
//  Serial.print("IP 주소: ");
//  Serial.println(ip);

  long rssi = WiFi.RSSI();
//  Serial.print("신호 강도 (RSSI):");
//  Serial.print(rssi);
//  Serial.println(" dBm");
}
