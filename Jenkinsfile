pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        AWS_DEFAULT_REGION = 'ap-northeast-2'
        HOME = '.' // for aws cli
    }

    stages {
        stage('Prepare') {
            steps {
                echo 'Preparing...'

                git url: '',
                    branch: 'main',
                    credentialsId: ''
            }

            post {
                success {
                    echo 'Prepare success'
                }
                failure {
                    echo 'Prepare failure'
                }
                cleanup {
                    echo 'Prepare cleanup'
                }
            }
        }
        // stage('Production') {
        //     when {
        //         branch 'master'
        //         environment name: 'ENV', value: 'production'
        //         anyOf {
        //             environment name: 'ENV', value: 'production'
        //             environment name: 'ENV', value: 'staging'
        //         }
        //     }
        //     steps {
        //         echo 'Production...'
        //     }
        // }
        // stage('Test') {
        //     steps {
        //         echo 'Testing...'

        //         sh 'docker compose -f ci/docker/composes/docker-compose.test.yml --env-file .env.test exec -T passar-test-app npm run test --abort-on-container-exit'
        //     }

        //     post {
        //         success {
        //             echo 'Test success'
        //         }
        //         failure {
        //             error 'Test failure'
        //         }
        //         cleanup {
        //             echo 'Test cleanup'
        //         }
        //     }
        // }
        stage('Deploy') {
            steps {
                echo 'Deploying...'

                sh 'docker compose -f ci/docker/composes/docker-compose.local.yml --env-file .env.local up -d'
            }
        }
    }
}