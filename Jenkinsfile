pipeline {
    agent any

    environment {
        ECR_REPO_URL = "529088255515.dkr.ecr.us-east-1.amazonaws.com/retailmax-cloudmigration-platform"
        AWS_REGION = "us-east-1"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'master', url: 'https://github.com/Anujpal00/RetailMax-CloudMigration-Platform.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("${ECR_REPO_URL}:latest")
                    // Save image reference for later stage
                    env.IMAGE_ID = dockerImage.id
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-creds']]) {
                    sh '''
                        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO_URL
                    '''
                }
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                script {
                    // Reconstruct image using ID (WSL-safe)
                    def dockerImage = docker.image(env.IMAGE_ID)
                    dockerImage.push("latest")
                }
            }
        }

        stage('Terraform Provisioning') {
            steps {
                dir('terraform') {
                    withCredentials([[
                        $class: 'AmazonWebServicesCredentialsBinding',
                        credentialsId: 'aws-ecr-creds'
                    ]]) {
                        sh '''
                            export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
                            export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
                            export AWS_DEFAULT_REGION=$AWS_REGION

                            terraform init
                            terraform apply -auto-approve
                        '''
                    }
                }
            }
        }

        stage('Ansible Deployment') {
            steps {
                dir('deployment') {
                    withCredentials([[
                        $class: 'AmazonWebServicesCredentialsBinding',
                        credentialsId: 'aws-ecr-creds'
                    ]]) {
                        sh '''
                            export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
                            export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
                            export AWS_DEFAULT_REGION=$AWS_REGION

                            ansible-playbook -i inventory.ini deploy.yml
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
