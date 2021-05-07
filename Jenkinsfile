pipeline {

    agent any
    stages
    {
        stage('Build') 
        {

            steps
            {
                echo 'Start building'
                script {
                    currentBuild.result = 'UNSTABLE'
                }
            }
        }

        stage('Test') 
        {

            steps
            {
                script {
                    if (currentBuild.result == 'UNSTABLE')
                        error('Build failure')
                }

                echo 'Start testing'
                git branch: 'Grupa04-DN297896_Lab07', url: 'https://github.com/InzynieriaOprogramowaniaAGH/MIFT2021'

                dir('Grupy/Grupa04/DN297896/Lab07/Docker')
                {
                    sh '''
                        curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o ~/docker-compose
                        chmod +x ~/docker-compose
                        docker-compose up -d test-agent
                    ''' 
                }
            }
        }
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
