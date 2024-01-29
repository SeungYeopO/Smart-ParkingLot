pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'dlek567/backend'
        DOCKERFILE_PATH = './backend/Dockerfile'
        CONTAINER_NAME = 'backend'
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

        stage('Delete Previous Docker Container') {
            steps {
                script {
                    sh '''
                        docker stop ${CONTAINER_NAME}
                        docker rm ${CONTAINER_NAME}
                    '''
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${DOCKER_IMAGE_NAME}"
                }
            }
        }
    }
}
