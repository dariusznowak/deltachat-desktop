pipeline {

    agent any
    tools {
	    nodejs "node"
	}
    stages
    {
        
        stage('Test') 
        {

            steps
            {
                echo 'Start testing'
                git branch: 'Grupa04-DN297896_Lab07', url: 'https://github.com/InzynieriaOprogramowaniaAGH/MIFT2021'

                dir('Grupy/Grupa04/DN297896/Lab07/Docker')
                {
                    sh '''
                        npm install
                        npm test
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
                subject: 'Test positive', 
                to: 'nowakdariusz03@gmail.com'
        }

        failure {
            emailext attachLog: true, 
                body: "Test notification: ${currentBuild.currentResult}: Job ${env.JOB_NAME}, More informations in attachment", 
                recipientProviders: [developers()], 
                subject: 'Test failure', 
                to: 'nowakdariusz03@gmail.com'
        }
    }
}
