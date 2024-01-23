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

        stage('Docker set') {
            sh "docker run -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts"
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
