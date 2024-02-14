#include <SPI.h> // for SPI communication
#include <nRF24L01.h>
#include <RF24.h>
#include <string.h>

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
  char first[32] = "";
  unsigned long nextTime;
  unsigned long nowTime = millis();
  if (radio.available()) { // if nrf has any incoming data
    
    char text[32] = "";
    radio.read(&text, sizeof(text));
    if(first == ""){
      strcpy(first, text);
    }
    else if(strcmp(first,text) != 0){
      nextTime = millis();
      Serial.println("differnt");
    }
    unsigned long dif = nextTime - nowTime;
    Serial.println(text);
    Serial.print("time:");
    Serial.println(dif);
    
    delay(1000);
  }
}