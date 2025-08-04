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
                bat '''
                aws ecr get-login-password --region %AWS_REGION% | docker login --username AWS --password-stdin %ECR_REPO_URL%
                '''
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
                    bat '''
                    terraform init
                    terraform apply -auto-approve
                    '''
                }
            }
        }

        stage('Deploy to EC2 via Ansible') {
            steps {
                dir('deployment') {
                    bat '''
                    ansible-playbook -i inventory.ini deploy.yml --extra-vars "@.env"
                    '''
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
