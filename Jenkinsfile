pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'ssafyysh/s10p12c102'
        DOCKERFILE_PATH = './backend/Dockerfile'
        CONTAINER_NAME = 'snowman'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Run on Host Docker') {
            agent {
                docker {
                    image DOCKER_IMAGE_NAME
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                script {
                    sh 'echo done'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE_NAME} -f ${DOCKERFILE_PATH} ."
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker run -d --name ${CONTAINER_NAME} -p 80:3000 ${DOCKER_IMAGE_NAME}"
                }
            }
        }
    }
}
