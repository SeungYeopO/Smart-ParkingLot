#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(9, 10); // CE, CSN
const int numPackets = 1000;

void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openWritingPipe(0xDEADBEEF01); // Use the same pipe address as in the receiver
}

void loop() {
  for (int i = 0; i < numPackets; i++) {
    // Send a dummy packet
    int dummyData = 42;
    radio.write(&dummyData, sizeof(dummyData));
    delay(5); // Give some time between packets
  }

  // Signal the end of the transmission
  int endTransmission = -1;
  radio.write(&endTransmission, sizeof(endTransmission));

  delay(5000); // Wait for a while before the next transmission
}
