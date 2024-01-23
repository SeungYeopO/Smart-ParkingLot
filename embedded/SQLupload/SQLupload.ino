#include <MySQL_Connection.h>
#include <MySQL_Cursor.h>
#include <SoftwareSerial.h>

// Define the ESP8266 TX and RX pins
SoftwareSerial espSerial(2, 3); // TX, RX

// MySQL connection parameters
//char hostname[] = "stg-yswa-kr-practice-db-master.mariadb.database.azure.com"; // Replace with your MySQL server domain
IPAddress server(52,231,145,3);
char user[] = "S10P12C102@stg-yswa-kr-practice-db-master.mariadb.database.azure.com";
char password[] = "oOsiCWwmDO";
char db[] = "s10p12c102";

void setup() {
  Serial.begin(9600);
  espSerial.begin(9600);

  Serial.flush();
  espSerial.flush();
  Serial.println("Connecting to MySQL");
  // Connect to MySQL Server
  MySQL_Connection conn((Client *)&espSerial);
  if (conn.connect(server, 3306, user, password)) {
    Serial.println("Connected to MySQL Server");
    updateDatabase(&conn, 1, 1); // Update values in the database
    conn.close();
  } else {
    Serial.println("Connection to MySQL Server failed");
  }
}

void loop() {
  // Your main code here
}

void updateDatabase(MySQL_Connection *conn, int value1, int value2) {
  // Prepare the query
  char query[128];
  sprintf(query, "UPDATE test_parking_sections SET column1=%d, column2=%d", value1, value2);

  // Execute the query
  MySQL_Cursor *cur_mem = new MySQL_Cursor(conn);
  cur_mem->execute(query);
  delete cur_mem;

  Serial.println("Database updated");
}
