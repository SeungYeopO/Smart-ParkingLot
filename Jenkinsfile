pipeline {
    agent any

    tools {
        nodejs(nodeJSInstallationName: 'nodejs')
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