#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {CdkLambdaAuthorizationStack} from '../lib/cdk-lambda-authorization-stack';

const env: cdk.Environment = {
    account: '000000000000',
    region: 'us-east-1',
}

const tags = {
    cost: "LambdaAuthorization",
    team: "BlaTeam"
}

const app = new cdk.App();
new CdkLambdaAuthorizationStack(app, 'CdkLambdaAuthorizationStack', {
    tags: tags,
    env: env
});