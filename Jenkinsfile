pipeline {
    agent any

    tools {
        nodejs 'nodejs'
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