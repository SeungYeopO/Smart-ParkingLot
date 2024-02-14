#include <SPI.h>
#include <Mirf.h>
#include <nRF24L01.h>
#include <MirfHardwareSpiDriver.h>

unsigned int adata = 0, oldadata = 0;

void setup()
{
    Serial.begin(9600);

    Mirf.cePin = 9;   //CE핀
    Mirf.csnPin = 10; //CS핀
    Mirf.spi = &MirfHardwareSpi;
    Mirf.init();  // nRF24L01 초기화

    //수신측 어드레스 설정
    Mirf.setRADDR((byte *)"TX_01");
    //송수신에 사용할 바이트 수 지정 sizeof(unsigned int) 는 2바이트
    Mirf.payload = sizeof(unsigned int);
    //송수신 채널 지정(0~128), 송수신 모듈이 동일한 채널을 사용해야함
    Mirf.channel = 3;
    Mirf.config();

    //수신기표시
    Serial.println("NRF24L01_RECEIVE");
}

void loop()
{
    //수신할 데이터 버퍼 정의
    byte data[Mirf.payload];
    if(Mirf.dataReady())    //데이터수신 대기
    {
        Mirf.getData(data);    //수신 데이터를 data에 저장
        //데이터 버퍼를 통합
        adata = (char)((data[1] << 8) | data[0]);

        //이전 데이터와 동일여부 확인 시리얼통신 과부하 방지
        //이전 데이터와 다른 경우만 표시함
        if(adata != oldadata)
        {
            oldadata = adata; //oldadata로 복사
            //수신 데이터 표시
            Serial.print("수신데이터 : ");
            Serial.println(adata);
        }

    }
}