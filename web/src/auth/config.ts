import Amplify from "aws-amplify";

const awsConfig = {
  aws_app_analytics: "enable",

  aws_user_pools: "enable",
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL_ID,

  aws_user_pools_mfa_type: "OFF",
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  aws_user_settings: "enable",
};

export const configure = () => {
  Amplify.configure(awsConfig);
};
