import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
      routes: {
        "GET /private": "src/private.handler"
      }
    });

    const auth = new sst.Auth(this, "Auth", {
      facebook: { appId: "503705007507255" }
    });

  

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
      IdentityPoolId: auth.cognitoCfnIdentityPool.ref,
    });

    // Allow auth users to access the API
    auth.attachPermissionsForAuthUsers([api]);
  }
}
