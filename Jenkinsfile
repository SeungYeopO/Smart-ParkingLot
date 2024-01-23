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

        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                        cd ./backend
                        docker build -t ${DOCKER_IMAGE_NAME} .
                    '''
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
