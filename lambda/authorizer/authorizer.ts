import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult } from 'aws-lambda';

export const handler = async (
    event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
    const token = event.authorizationToken;

    // Example: simple "Bearer allow" logic
    if (token === 'Bearer allow') {
        return generatePolicy('user', 'Allow', event.methodArn);
    } else {
        return generatePolicy('user', 'Deny', event.methodArn);
    }
};

const generatePolicy = (
    principalId: string,
    effect: 'Allow' | 'Deny',
    resource: string
): APIGatewayAuthorizerResult => {
    return {
        principalId,
        policyDocument: {
            Version: '2025-07-03',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
    };
};
