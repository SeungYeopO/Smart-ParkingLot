pipeline {
    agent any

    environment {
        DOCKER_FRONT_IMAGE = 'dlek567/frontend'
        DOCKER_BACK_IMAGE = 'dlek567/backend'
        FRONT_DOCKERFILE_PATH = './frontend/front-end/'
        BACK_DOCKERFILE_PATH = './backend/'
        FRONT_CONTAINER_NAME = 'frontend'
        BACK_CONTAINER_NAME = 'backend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image/front') {
            steps {
                script {
                    sh '''
                        cd ${FRONT_DOCKERFILE_PATH}
                        docker build -t ${DOCKER_FRONT_IMAGE} .
                    '''
                }
            }
        }

        stage('Build Docker Image/back') {
            steps {
                script {
                    sh '''
                        cd ${BACK_DOCKERFILE_PATH}
                        docker build -t ${DOCKER_BACK_IMAGE} .
                    '''
                }
            }
        }

        stage('Delete Previous Docker Container') {
            steps {
                script {
                    sh '''
                        docker stop ${FRONT_CONTAINER_NAME}
                        docker rm ${FRONT_CONTAINER_NAME}
                        docker stop ${BACK_CONTAINER_NAME}
                        docker rm ${BACK_CONTAINER_NAME}
                    '''
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker run -d --name ${FRONT_CONTAINER_NAME} -p 3000:3000 ${DOCKER_FRONT_IMAGE}"
                    sh "docker run -d --name ${BACK_CONTAINER_NAME} -p 3001:3001 ${DOCKER_BACK_IMAGE}"
                }
            }
        }
    }
}
