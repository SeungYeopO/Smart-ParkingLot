#include <SPI.h> // for SPI communication
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(9, 10); // CE, CSN

const byte address[6] = "00001"; // the address the the module

void setup() {
  radio.begin();
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_MIN);
  radio.stopListening();
}

void loop() {
  const char text[] = "First"; // you can customize this text to your wish
  radio.write(&text, sizeof(text));
  delay(5000);
  const char text2[] = "Second";
  radio.write(&text2, sizeof(text2));
  delay(5000);
}