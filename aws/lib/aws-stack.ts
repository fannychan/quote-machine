import * as cdk from "@aws-cdk/core";
import {
  OAuthScope,
  UserPool,
  UserPoolClient,
  UserPoolClientIdentityProvider,
} from "@aws-cdk/aws-cognito";
import { Duration } from "@aws-cdk/core";
export class AwsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const userPool = new UserPool(this, "userPool", {
      userPoolName: "quote-machine",
      selfSignUpEnabled: true,
      autoVerify: {
        email: true
      }
    });

    new UserPoolClient(this, "userPoolClient", {
      userPoolClientName: "web",
      generateSecret: false,
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        callbackUrls: ["http://localhost:3000"],
        scopes: [OAuthScope.EMAIL, OAuthScope.OPENID, OAuthScope.COGNITO_ADMIN],
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
      accessTokenValidity: Duration.minutes(60),
      refreshTokenValidity: Duration.days(1),
      userPool: userPool,
    });
  }
}
