# 빌드 및 배포 정리

## 사용 프로그램 및 프레임워크

### 배포 환경
- AWS EC2
  - UBUNTU 20.04.6(SSAFY 지급)
- MariaDB
  - mysql  Ver 15.1 Distrib 10.3.39-MariaDB, for debian-linux-gnu (x86_64) using readline 5.2
- Docker
  - Docker version 25.0.3, build 4debf41
- Jenkins
  - Jenkins 2.426.3
### 프레임워크 및 모듈
- Server
  - Node.js
  - node : 20.11.0
  - npm : 10.2.4
  - cors: 2.8.5
  - express : 4.18.2
  - mysql2 : 3.7.1
  - gcc : 9.4.0
- Client
  - React
  - popperjs/core : 2.11.8
  - testing-library/jest-dom : 5.17.0
  - testing-library/react : 13.4.0
  - testing-library/user-event : 13.5.0
  - animate.css : 4.1.1
  - bootstrap : 5.3.2
  - react : 18.2.0
  - react-bootstrap : 2.10.0
  - react-dom : 18.2.0
  - react-router-dom : 6.4
  - socket.io-client : 4.7.4
  - web-vitals : 2.1.4
- Embedded
  - Arduino Uno R3
  - Arduino IDE 2.2.1
  - Arduino Library
  - Raspberry pi 4 Bullseye
  
## 포팅 메뉴얼
### 배포 준비
0. 먼저..
- Gitlab에 프로젝트가 있는 상태에서, 프로젝트를 서버에 `git clone`으로 가져오거나 수동으로 배포하는 것이 아닌, Jenkins와 Docker를 이용하여 서비스를 배포하는 환경을 서술하였다.

1. AWS 접속 환경 설정(with. Windows terminal)
- windows terminal 설치
- 터미널 탭에서 설정 → 새 프로필 추가
- 프로필 이름 설정
- `ssh -i "(pem키 경로)" (AWS 도메인orDNS 주소)` 
    - ex) `ssh -i "C:\Users\SSAFY\Downloads\I10C102T.pem" ubuntu@i10c102.p.ssafy.io`
        - ubuntu 환경으로 서버를 생성했기 때문에 해당 도메인의 유저 기본 이름이 ubuntu이므로 `ubuntu@(IP or 도메인 주소)` 로 설정\
+) openssh 설정이 필요할 수도 있다(공통 프로젝트를 수행할 때는 설정하지 않았음)\
⇒ 정상적으로 설정되었다면 원격으로 서버에 접속한 터미널 창이 뜬다.

1. (선택사항) AWS EC2 메모리 용량 늘리기(swap 메모리 활용)
- 가상의 컨테이너를 실행하게 된다면 메모리를 많이 사용할 수 있음
- 프리 티어 환경에서는 Jenkins를 구동할 메모리가 부족할 수 있음
- 따라서 가상 메모리(swap 메모리)를 사용하여 임의로 메모리 볼륨을 늘림
- `free -h` : 메모리 확인
- `sudo fallocate -l 3G /swapfile` : 3G swap 메모리 생성 준비

```bash
sudo chmod 600 /swapfile # 권한 수정
sudo mkswap /swapfile    # 활성화 준비
sudo swapon /swapfile    # 활성화
```

+) 베포 환경에서 재부팅과 작업이 존재할 경우, 다음 작업도 수행한다(재부팅 시에도 swap 메모리를 사용하도록 설정)

```bash
sudo nano /etc/fstab # 파일 편집

## 내용 추가
/swapfile swap swap defaults 0 0
```

3. 서버에 Docker 설치
- https://docs.docker.com/engine/install/ubuntu/ 참고

```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$UBUNTU_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

4. Docker를 통해 Jenkins container 설치
- `sudo ufw` 로 포트 개방
    
    ※ 참고로 AWS에서 네트워크 단위로 포트가 열려있어야 ufw로 개방한 포트를 사용할 수 있음
    
    ```bash
    sudo ufw status #열려있는 포트 확인
    sudo ufw allow 22 #ssh 포트
    sudo ufw allow 8080 #Jenkins 포트
    sudo ufw show added #등록한 포트 조회
    sudo ufw enable #ufw 활성화
    ```
    
- Jenkins container 설치
    
    ※ 이 때, 생성한 Jenkins container에서 docker 환경을 사용하기 위해서는 로컬의 환경과 컨테이너의 환경을 매핑해줘야 한다.
    
    ```bash
    sudo docker run -itd \
    -p 8080:8080 \
    -p 50000:50000 \
    -v /home/ubuntu/jenkins-data:/var/jenkins_home \
    -v /$(which docker):/usr/bin/docker \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --name jenkins jenkins/jenkins:lts
    ```

- 서버 아이피와 포트로 Jenkins 접속
    
    ex) i10c102.p.ssafy.io:8080
    
    - 이 때, Jenkins에서 패스워드를 요구한다. 패스워드는 서버 콘솔에서 `sudo docker logs jenkins` 를 입력해서 찾는다.
    - 이후 jenkins 설정을 마치고 접속하면 jenkins dashboard가 나온다.

5. Jenkins 설정하기
- Plugin 설치(Jenkins 관리)
    - docker 관련 플러그인 설치
        - Docker API Plugin
        - Docker Commons Plugin
        - Docker Pipeline
        - Docker plugin
    - NodeJS Plugin 설치
    - Gitlab 관련 플러그인 설치
        - Gitlab API Plugin
        - GitLab Authentication plugin
        - GitLab Branch Source Plugin
        - Gitlab Merge Request Builder
        - Generic Webhook Trigger Plugin
- Credentials 설정(Jenkins 관리)
    - Jenkins System의 Domains의 (global) 오른쪽 화살표나, global을 타고 들어가는 링크에 있는 곳에 Add Credentials 클릭
    - Kind : Username with password
    - Scope : Global
    - Username : Gitlab 계정 아이디
    - Password : Gitlab project token(모든 권한이 있는 maintenance 계정이어야 함)
    - ID, Description : 기호나 팀 컨벤션에 맞춰 작성
- Tools 설정(Jenkins 관리)
    - NodeJS를 쓸 것이므로, 설치한 NodeJS 플러그인을 바탕으로 NodeJS 설정을 진행한다.\
    ※ Jenkins 설정을 두 번 진행한 경험상, 두 번 모두 NodeJS 플러그인이 정상 작동하지 않았다. Version 선택창이 select box가 아니라 input text box로 되어 있었고, 이 현상이 발생했다면 NodeJS 설정을 제대로 진행할 수 없다. 결국 두 번의 설정 모두 Jenkins 컨테이너를 삭제한 후, 서버에 존재하는 jenkins-data 폴더를 삭제하고 다시 생성한 후, Jenkins 컨테이너를 재설치하여 해결하였다.
    
    - NodeJS 항목에서 설정
        - Name : 설정 이름, 필자는 nodejs-(version)으로 작성하였다.
            
            ex) nodejs-20.11
            
        - Install automatically 체크
        - 일반적으로 Install from nodejs.org로 설정되어 있을 것, 그렇지 않다면 하단의 Add Installer에서 설정해준다
        - Version : 사용할 nodejs 버전. 자신이 프로젝트를 구축한 환경의 nodejs 버전으로 설정해준다.
- 배포할 프로젝트(Gitlab)를 Pipeline으로 구축(새로운 Item)
    - item 이름 설정
    - Pipeline 타입으로 설정
    - Build Triggers 설정(이 때 Gitlab과 번갈아 작업해야함)
        - Jenkins : Build when a change is pushed to GitLab. 체크
        - Jenkins : 체크한 항목을 보면 GitLab webhook URL이 있는데 이 URL을 복사(만약 item 이름이 바뀌면 URL도 바뀐다)
        - GitLab : 진행중인 프로젝트의 Settings 항목의 Webhooks 선택(Maintainer 권한이 있는, 일반적으로 프로젝트를 생성한 팀장이 볼 수 있다. 다른 사람이 작업을 하기 위해서는 팀장이 Maintainer 권한을 부여해야 함)
        - GitLab : Add new webhook 클릭
        - Gitlab : URL에 복사한 URL을 붙여넣기
        - Jenkins : 고급 옵션을 펼쳐, 하단의 Secret token을 Generate한 후 복사
        - GitLab : Secret token에 생성한 토큰을 붙여넣기
        - GitLab : Trigger 항목에 Push event 체크, 여기서 All branches를 체크하여 모든 Push events에 대해 신호를 받거나, 또는 Wildcard pattern으로 특정 branch 신호만 받을 수 있다.
            
            wildcard pattern ex) feature/create_server
            
        - GitLab : 설정 저장
    - Pipeline 설정
        - Definition : Pipeline script from SCM 선택, 아래에 추가 항목 생성
        - SCM : Git 선택, 아래에 추가 항목 생성
        - Repositories에 배포할 Repository 생성하기
        - Repository URL : 프로젝트의 git URL 붙여넣기
        - Credentials : 앞에서 작성한 Credential을 설정(즉, 이 Credential은 해당 프로젝트를 관리하는 권한이 있는 계정임)
        - Branches to build : 신호를 받으면 실행할 브랜치를 작성(*/develop 으로 테스트해 볼 수도 있지 않을까?)
        - Repository browser는 자동에서 변경하지 않음
        - Script Path : Jenkinsfile
        - 설정을 저장

- Jenkins에서 “지금 빌드”를 누르거나, Git push로 신호를 보내면 Jenkinsfile 스크립트를 따라 작업이 수행되면서 최종적으로 서버가 열린다.
    
    ※ 만약 빌드를 실행했을 때 아래와 같은 메시지를 콘솔 출력 창에서 발견하게 될 수도 있다.
    
    ```bash
    permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock:
    ```
    
    필자는 해당 오류를 해결하기 위해 여러 작업을 수행하였는데, 어떤 방법으로 해결이 되었는지 확실히 잘 모르겠다. 아래는 필자가 추측하는 해결 방법이다.
    
    ```bash
    sudo chown ubuntu:docker /var/run/docker.sock
    #ubuntu:docker 부분에서 ubuntu는 AWS ubuntu에서 사용중인 호스트의 이름이다.
    #만약 호스트의 이름이 ubuntu가 아니라면, 해당하는 호스트의 이름을 기입해줘야 할 것으로 생각된다.
    ```
- server에서 C++ 코드를 컴파일하므로, 컴파일러를 설치한다.
  ```bash
  sudo apt install build-essential
  ```

1. 배포 환경 설정
- nginx 설치

```bash
sudo apt install nginx -y

sudo unlink /etc/nginx/sites-enabled/default
```
- `sudo vi /etc/nginx/sites-available/reverse-proxy.conf`를 입력하고 아래의 내용을 작성한다.

```bash
server {
        listen 80;
        listen [::]:80;
        server_name url;
				#url은 자신의 aws 주소를 입력한다

        access_log /var/log/nginx/reverse-access.log;
        error_log /var/log/nginx/reverse-error.log;

        location / {
                    proxy_pass http://127.0.0.1:{포트번호};
										#포트번호는 서버를 개방하기 위해 설정한 포트번호를 입력한다
                  }
}
```

- `sudo vi /etc/nginx/sites-enabled/reverse-proxy.conf` 에서도 마찬가지로 작성한다
- nginx를 사용하기 위해 포트를 개방한다

```bash
sudo ufw allow 22
#http://
sudo ufw allow 443
#https://
sudo ufw enable
```

- 작성한 nginx 설정이 적용되었는지 확인한다

```bash
sudo nginx -t
```

- nginx를 재시작한다

```bash
sudo service nginx restart
```

- 위 설정을 완료하면, AWS의 주소로 바로 접속했을 때(실제로는 80포트로 접속하는 것) 해당 포트가 가리키는 서버 포트로 접속한다.
- SSL 인증서를 발급받고 HTTPS를 사용하는 방법이다. 먼저 certbot을 설치한다.

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
```

- 그 다음 SSL 인증서를 발급받는다.

```bash
sudo certbot --nginx -d (domain 주소)
```

- 위 명령어를 입력하면 절차를 거쳐 보안 프로토콜을 입력하게 되는데, 중간에 HTTP를 HTTPS로 리다이렉팅 할 것인지 물어본다. 자신이 배포할 환경에 맞춰서 리다이렉팅을 할 것인지 결정하면 된다.
- 적용하고 나면 `/etc/nginx/site-available/`에 존재하는, 현재 자신이 적용하고 있는 설정(.conf) 파일에 해당 설정 사항이 적용된다.
- 추가로 설정 파일에 Client뿐 아니라 Server에 접속하는 환경도 HTTPS를 적용했다. 아래는 최종 `reverse-proxy.conf` 파일의 형태이다.
  
  ```
  server {
        server_name i10c102.p.ssafy.io;

        access_log /var/log/nginx/reverse-access.log;
        error_log /var/log/nginx/reverse-error.log;

        location / {
                    proxy_pass http://127.0.0.1:3000;
        }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/i10c102.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/i10c102.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

  }
  server {
        server_name i10c102.p.ssafy.io;

        access_log /var/log/nginx/reverse-access-server.log;
        error_log /var/log/nginx/reverse-error-server.log;

        location / {
                    proxy_pass http://127.0.0.1:3002;
        }

    listen [::]:3001 ssl ipv6only=on; # managed by Certbot
    listen 3001 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/i10c102.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/i10c102.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

  }
  server {
    if ($host = i10c102.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80;
        listen [::]:80;
        server_name i10c102.p.ssafy.io;
    return 404; # managed by Certbot


  }
  ```


7. 애로사항
- Jenkins에서 프로젝트를 빌드할 때, 콘솔 출력에서

```bash
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
Install the buildx component to build images with BuildKit:
```

라는 에러 메시지가 출력되었다. legacy builder의 지원이 종료되니 BuildKit을 이용하라는 메시지 같은데, 인터넷 검색을 통해 아래의 작업을 수행해봤지만 메시지는 사라지지 않았다.

```bash
sudo apt install docker-buildx-plugin

export DOCKER_CLI_EXPERIMENTAL=enabled

docker buildx create --use
```

어떤 작업을 수행해야 하는지 추가로 알아볼 필요가 있음

- `sudo apt update`를 실행할 때마다 중간에 아래와 같은 메시지가 출력되었다.

```bash
The repository 'https://ppa.launchpadcontent.net/certbot/certbot/ubuntu jammy Release' does not have a Release file.
```

이를 해결하기 위해 아래와 같은 작업을 수행하였다.

```bash
sudo add-apt-repository --remove ppa:certbot/certbot
```

+) 추가로 미러 사이트 수정 작업을 수행했다.

```bash
sudo vi /etc/apt/source.list
```

```bash
#vim 내에서
:%s/(현재 배정된 미러 사이트)/mirror.kakao.com/
```