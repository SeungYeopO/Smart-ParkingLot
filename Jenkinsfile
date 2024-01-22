pipeline {
    agent any

    tools {
        nodejs 'nodejs-18.17.1'
    }

    stages {
        stage('stage_1') {
            steps {
                sh 'cd ./backend'
                sh 'npm start'
            }
        }
    }
}