/* Fontes
Temperatura = http://forum.arduino.cc/index.php?topic=52714.0
Ubidots = https://ubidots.com/docs/devices/arduino-ethernet.html#send-multiple-values-to-ubidots
*/

#include <OneWire.h>  //biblioteca sensor temperatura
#include <DS3231.h>   //biblioteca para ler as horas do RTC
//Bibliotecas da Ubidots para comunicação via ethernet
#include <Ethernet.h>
#include <SPI.h>
#include <UbidotsEthernet.h>

/* Entrada do sensor de TEMPERATURA */
OneWire  ds(2);  // on pin 10 (a 4.7K resistor is necessary)

/* Entrada do RTC*/
// --------- CONEXOES UTILIZADAS ------------
//        SCL - A5      GND - GND
//        SDA - A4      VCC - 5VOLTS
DS3231 rtc(SDA, SCL);

/* Entrada do sensor de LUMINOSIDADE */
int pino_analogico_A0 = A3;     //Pino ligado a porta A0 do modulo LDR
int pino_digital_D0 = 2;        //Pino ligado a porta D0 do modulo LDR
int valord0 = 0;                //Armazena o valor lido da porta D0
int valora0 = 0;                //Armazena valor lido da porta A0, entre 0 e 1023
float luminosidade = 0;         //Valor de luminosidade do led


/* Variaveis que são utilizadas pela Ubidots*/
#define TOKEN  "FTfg995ftCnXZOfLqmFwJ83UN3v6w0"  // Put here your Ubidots TOKEN
//Variavel dos sensores que eu vou utilizar
#define idTemperatura  "586ef0cb76254252a2f27c42"  // Put here your Ubidots variable ID "url da variavel do device"
#define idLuminosidade  "5887d9ba76254260ef95aa3b"  // Put here your Ubidots variable ID "url da variavel do device"
//Mac e ip do Ethernet Shield
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 0, 125);
//Inicializando o meu perfil do Ubidots
Ubidots client(TOKEN);

void setup(void) {
  /*inicializando serial*/
  Serial.begin(9600);

  /* Inicializando os pinos do sensor de LUMINOSIDADE */
   pinMode(pino_analogico_A0, INPUT);   //Porta - A3 
   pinMode(pino_digital_D0, INPUT);     //Porta - 2

  /* Inicializando o RTC*/
  rtc.begin();
  //Linhas que serão utilizadas se for necessário alterar as informaçõe do RTC
  //rtc.setDOW(4); // Set 1-segunda, 2-terca, 3-quarta ...
  //rtc.setTime(14, 20, 0); // Set the time to 12:00:00 (24hr format)
  //rtc.setDate(29, 12, 2016); // Set the date 29/12/2016

  //inicializando o ethernet Shield
  if (Ethernet.begin(mac) == 0) {
      Serial.println("Falha ao conectar o EthernetShield");
      // try to congifure using IP address instead of DHCP:
      Ethernet.begin(mac, ip);
    }
    // Deley para o shiel inicializar
    delay(1000);
}

void loop(void) {
  /* --------------- Inicio Data --------------- */
  // Send Day-of-Week
  Serial.print(rtc.getDOWStr());
  Serial.print(" ");
  // Send date
  Serial.print(rtc.getDateStr());
  Serial.print(" - ");
  // Send time
  Serial.println(rtc.getTimeStr("hh:mm"));

  Serial.print("Temperature RTC: ");
  Serial.print(rtc.getTemp());
  Serial.println(" C");
  /* --------------- Fim Data --------------- */

  
  /* --------------- Inicio temperatura --------------- */
  byte i;
  byte present = 0;
  byte type_s;
  byte data[12];
  byte addr[8];
  float celsius, fahrenheit;
  if ( !ds.search(addr)) {
    //Serial.println("No more addresses.");
    //Serial.println();
    ds.reset_search();
    delay(250);
    return;
  }
  //Serial.print("ROM =");
  for( i = 0; i < 8; i++) {
    //Serial.write(' ');
    //Serial.print(addr[i], HEX);
  }
  if (OneWire::crc8(addr, 7) != addr[7]) {
      //Serial.println("CRC is not valid!");
      return;
  }
  //Serial.println();
  // the first ROM byte indicates which chip
  switch (addr[0]) {
    case 0x10:
      //Serial.println("  Chip = DS18S20");  // or old DS1820
      type_s = 1;
      break;
    case 0x28:
      //Serial.println("  Chip = DS18B20");
      type_s = 0;
      break;
    case 0x22:
      //Serial.println("  Chip = DS1822");
      type_s = 0;
      break;
    default:
      //Serial.println("Device is not a DS18x20 family device.");
      return;
  } 
  ds.reset();
  ds.select(addr);
  ds.write(0x44, 1);        // start conversion, with parasite power on at the end
  // we might do a ds.depower() here, but the reset will take care of it.
  present = ds.reset();
  ds.select(addr);    
  ds.write(0xBE);         // Read Scratchpad
  //Serial.print("  Data = ");
  //Serial.print(present, HEX);
  //Serial.print(" ");
  for ( i = 0; i < 9; i++) {           // we need 9 bytes
    data[i] = ds.read();
    //Serial.print(data[i], HEX);
    //Serial.print(" ");
  }
  //Serial.print(" CRC=");
  //Serial.print(OneWire::crc8(data, 8), HEX);
  //Serial.println();
  // Convert the data to actual temperature
  // because the result is a 16 bit signed integer, it should
  // be stored to an "int16_t" type, which is always 16 bits
  // even when compiled on a 32 bit processor.
  int16_t raw = (data[1] << 8) | data[0];
  if (type_s) {
    raw = raw << 3; // 9 bit resolution default
    if (data[7] == 0x10) {
      // "count remain" gives full 12 bit resolution
      raw = (raw & 0xFFF0) + 12 - data[6];
    }
  } else {
    byte cfg = (data[4] & 0x60);
    // at lower res, the low bits are undefined, so let's zero them
    if (cfg == 0x00) raw = raw & ~7;  // 9 bit resolution, 93.75 ms
    else if (cfg == 0x20) raw = raw & ~3; // 10 bit res, 187.5 ms
    else if (cfg == 0x40) raw = raw & ~1; // 11 bit res, 375 ms
    //// default is 12 bit resolution, 750 ms conversion time
  }
  celsius = (float)raw / 16.0;
  fahrenheit = celsius * 1.8 + 32.0;
  Serial.print("Temperature = ");
  Serial.print(celsius);
  Serial.print("Celsius, ");
  Serial.print(fahrenheit);
  Serial.println(" Fahrenheit");
  /* --------------- Fim temperatura --------------- */


  /* --------------- Inicio Luminosidade --------------- */
  valord0 = digitalRead(2);                     //Le o valor da porta digital do modulo
  valora0 = analogRead(pino_analogico_A0);      //Le o valor da porta analogica do modulo
  luminosidade = map(valora0, 0, 1023, 0, 255); //Converte e atribui para a variavel "luminosidade"
  //Mostra o valor lido do potenciometro e a luminosidade no Serial Monitor
  //QUANTO MAIOR O VALOR DA PORTA, MENOS LUMINOSIDADE
  //Serial.print("Valor da porta analogica : "); 
  //Serial.print(valora0);   
  Serial.print("Luminosidade = ");
  Serial.println(luminosidade);  //225 foi a mais baixa registrada
  /* --------------- Fim Luminosidade --------------- */

  /* --------------- Inicio do envio dos dados para Ubidots --------------- */
  client.add(idTemperatura, celsius);
  client.add(idLuminosidade, luminosidade);
  client.sendAll();
  /* --------------- Fim do envio dos dados para Ubidots --------------- */
  
  Serial.println("");  
  delay(10000);  //deley de toda a sequencia
}
