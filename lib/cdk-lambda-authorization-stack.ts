import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {AuthorizationType, LambdaIntegration, RestApi, TokenAuthorizer} from "aws-cdk-lib/aws-apigateway";
import path from "path";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {Code, Runtime} from "aws-cdk-lib/aws-lambda";
import {Duration} from "aws-cdk-lib";

export class CdkLambdaAuthorizationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const usersFn = new NodejsFunction(this, 'ListUsers', {
      runtime: Runtime.NODEJS_22_X,
      entry: path.join(__dirname, '../lambda/users/list-users.ts'),
      handler: 'handler',
      memorySize: 128,
      timeout: Duration.seconds(5),
    });

    const publicFn = new NodejsFunction(this, 'PublicStatus', {
      runtime: Runtime.NODEJS_22_X,
      entry: path.join(__dirname, '../lambda/public/public-status.ts'),
      handler: 'handler',
      memorySize: 128,
      timeout: Duration.seconds(5),
    });


    const authorizerFn = new NodejsFunction(this, 'AuthorizerLambda', {
      runtime: Runtime.NODEJS_22_X,
      handler: 'handler',
      entry: path.join(__dirname, '../lambda/authorizer/authorizer.ts'),
      memorySize: 128,
      timeout: Duration.seconds(5),
    });

    const api = new RestApi(this, 'SecuredAPI', {
      restApiName: 'Secured API with Lambda Authorizer',
    });

    const authorizer = new TokenAuthorizer(this, 'LambdaAuthorizer', {
      handler: authorizerFn,
      identitySource: 'method.request.header.Authorization',
    })

    const securedResource = api.root.addResource('users');
    securedResource.addMethod('GET', new LambdaIntegration(usersFn), {
      authorizer,
      authorizationType: AuthorizationType.
          CUSTOM,
      methodResponses: [{
        statusCode: '200'
      }]
    })

    const publicResource = api.root.addResource('public');
    publicResource.addMethod('GET', new LambdaIntegration(publicFn));
  }
}
