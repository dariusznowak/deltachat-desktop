pipeline {
	agent any
	tools {
	    nodejs "node"
	}
	stages {
		stage('Build') {
			steps {
				sh 'npm install'
				sh 'npm run build'
			}
		}
		stage('Test') {
			steps {
				echo 'Testing'
				sh 'npm test'
			}
		}
	}
	post {
			success {
            		echo 'Test success!'
			}
			failure {
        			emailext attachLog: true,
        			body: "Error is in ${env.BUILD_URL}",  
        			subject: "Failed Pipeline: ${currentBuild.fullDisplayName}", 
        			to: 'nowakdariusz03@gmail.com'
    		}
		}
	
}
