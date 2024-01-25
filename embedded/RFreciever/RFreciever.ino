#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(9, 10); // CE, CSN

void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(1, 0xDEADBEEF01); // Use the same pipe address as in the sender
  radio.startListening();
}

void loop() {
  int receivedData;
  int successCount = 0;

  for (int i = 0; i < 100; i++) {
    if (radio.available()) {
      radio.read(&receivedData, sizeof(receivedData));
      successCount++;
    }
  }

  // Calculate and print the packet loss rate
  int packetLossRate = 100 - (successCount * 100 / 100); // Adjust the denominator based on your needs
  Serial.print("Packet Loss Rate: ");
  Serial.print(packetLossRate);
  Serial.println("%");

  delay(5000); // Wait for a while before the next measurement
}
