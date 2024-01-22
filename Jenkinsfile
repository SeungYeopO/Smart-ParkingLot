pipeline {
    agent any

    tools {
        nodejs 'nodejs-20.11.0'
    }

    stages {
        stage('stage_1') {
            steps {
                sh '''
                    cd ./backend
                    npm install
                    CI=false npm start
                '''
            }
        }
    }
}