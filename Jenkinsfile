pipeline {
    agent any
        tools{nodejs "NodeJS"}
    stages {
        stage('Build') { 
            steps {
                sh 'git pull origin master'
                sh 'npm install npm@latest -g'
                sh 'npm run build'
            }
            post {
        failure {
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'nowakdariusz03@gmail.com',
                subject: "Build failed in Jenkins ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        }
        success {
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'nowakdariusz03@gmail.com',
                subject: "Successful build in Jenkins ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        }
    }
        }
        stage('Test') { 
            steps {
                sh 'npm run test'
            }
            post {
        failure {
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'nowakdariusz03@gmail.com',
                subject: "Test failed in Jenkins ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        }
        success {
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'nowakdariusz03@gmail.com',
                subject: "Successful test in Jenkins ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        }
    }
        }
    }

}
