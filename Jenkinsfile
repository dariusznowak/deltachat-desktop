pipeline {

    agent any
    stages{
        
        stage('Build'){

            steps{

                echo 'Building app'
             
                git branch: 'Grupa04-DN297896_Lab07', url: 'https://github.com/InzynieriaOprogramowaniaAGH/MIFT2021'
                dir('Grupy/Grupa04/DN297896/Lab07/Docker'){
                    
                    sh '''
                        curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o ~/docker-compose
                        chmod +x ~/docker-compose
                        ~/docker-compose up -d chat-build
                    ''' 

                }
            }
        }
        
        stage('Test') {

            steps{
                echo 'Start testing'
                
                
                dir('Grupy/Grupa04/DN297896/Lab07/Docker'){
                    sh '''
                       ls 
                        ~/docker-compose up -d test-agent
                    ''' 
                }
            }
        }
    }


    post {

        success {
            emailext attachLog: true, 
                body: "Test notification: ${currentBuild.currentResult}: Job ${env.JOB_NAME}, More informations in attachment", 
                recipientProviders: [developers()], 
                subject: 'Test passed', 
                to: 'dnowak106@gmail.com'
        }

        failure {
            emailext attachLog: true, 
                body: "Test notification: ${currentBuild.currentResult}: Job ${env.JOB_NAME}, More informations in attachment", 
                recipientProviders: [developers()], 
                subject: 'Test NOT passed', 
                to: 'dnowak106@gmail.com'
        }
    }
}
