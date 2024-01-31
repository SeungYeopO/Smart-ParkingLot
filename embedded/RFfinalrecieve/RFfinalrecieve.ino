#include <SPI.h> // for SPI communication
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(9, 10); // CE, CSN

const byte address[6] = "00001"; // the address the the module

void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MIN);
  radio.startListening();
}

void loop() {
  if (radio.available()) { // 만약 NRF 모듈에서 데이터가 들어오면
    char text[32] = "";
    radio.read(&text, sizeof(text));
    Serial.println(text);
  }
  delay(10);
}