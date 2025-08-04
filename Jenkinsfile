pipeline {
    agent any

    environment {
        ECR_REPO_URL = "529088255515.dkr.ecr.us-east-1.amazonaws.com/retailmax-cloudmigration-platform" // Replace with your actual ECR URL
        AWS_REGION = "us-east-1" // Replace with your actual AWS region
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'master', url: 'https://github.com/Anujpal00/RetailMax-CloudMigration-Platform.git' // Replace with your repo URL
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${ECR_REPO_URL}:latest")
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-creds']]) {
                    bat '''
                    aws ecr get-login-password --region %AWS_REGION% | docker login --username AWS --password-stdin %ECR_REPO_URL%
                    '''
                }
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                script {
                    dockerImage.push()
                }
            }
        }

        stage('Terraform Provisioning') {
            steps {
                dir('terraform') {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-creds']]) {
                        bat '''
                        set AWS_ACCESS_KEY_ID=%AWS_ACCESS_KEY_ID%
                        set AWS_SECRET_ACCESS_KEY=%AWS_SECRET_ACCESS_KEY%
                        set AWS_DEFAULT_REGION=us-east-1
                        terraform init
                        terraform apply -auto-approve
                        '''
                    }
                }
            }
        }

        stage('Ansible Deployment') {
    steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-creds']]) {
            dir('deployment') {
                bat '''
                    set AWS_ACCESS_KEY_ID=%AWS_ACCESS_KEY_ID%
                    set AWS_SECRET_ACCESS_KEY=%AWS_SECRET_ACCESS_KEY%
                    wsl ansible-playbook -i inventory.ini deploy.yml
                '''
               }
            }
        }
    }
}


    post {
        success {
            echo "✅ Deployment pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed."
        }
    }
}
