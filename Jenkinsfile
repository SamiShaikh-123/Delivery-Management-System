pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                dir('docker'){
                   sh 'docker compose build'
                }
            }
        }

        stage('Run') {
            steps {
                dir('docker'){
                     sh 'docker compose up -d'
                }


            }
        }
        
        stage ('Deploy to Kubernetes'){
            steps{
                sh 'kubectl apply -f kubernetes/'
            }
        }

        
    }
}