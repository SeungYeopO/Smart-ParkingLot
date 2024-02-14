# Node.js 이미지를 기반으로 하고 그 위에 GCC를 설치하는 Dockerfile

# 첫 번째 단계: Node.js 및 GCC 설치
FROM node:20 AS base

RUN apt-get update && apt-get install -y gcc g++

# 두 번째 단계: Node.js 애플리케이션 빌드
FROM base AS builder

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY . .

# 세 번째 단계: 애플리케이션 실행 환경 설정
FROM base AS final

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 3001

CMD ["npm", "start"]
