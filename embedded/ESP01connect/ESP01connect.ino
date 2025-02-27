#include <UnoWiFiDevEd.h>

#include <SoftwareSerial.h> 

int RX = 2;
int TX = 3;
SoftwareSerial ESP01(RX, TX); 

void setup() { 
  Serial.begin(9600); //아두이노 우노 보드레이트 9600
  ESP01.begin(9600);  //와이파이 모듈 보드레이트 9600
  ESP01.setTimeout(5000); 
  delay(1000); 
} 

void loop() { 
  if (Serial.available()){
    ESP01.write(Serial.read()); 
  } 
  if (ESP01.available()) { 
    Serial.write(ESP01.read()); 
  }
}