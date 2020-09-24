
let config = {
    "AWS_ACCOUNT_ID": "xxxxxxxxxxx",
    "AWS_REGION": "eu-central-1",
    "COGNITO_IDENTITY_POOL_ID": "eu-central-1_xxxxxxxxx",
    "IAM_ROLE_ARN": "arn:aws:cognito-idp:eu-central-1:xxxxxxxxxxxxx:userpool/eu-central-1_xxxxxxxxxx",
    "COGNITO_DATASET_NAME": "xxxxxxxxxxxx",
    "COGNITO_KEY_NAME": "xxxxxxx",
    "CALLBACKURL": "https://squadron.auth.eu-central-1.amazoncognito.com/callback",
    "AMAZON_CLIENT_ID": "xxxxxxxxxxxxxxxxxxxxxx", 
    "AMAZON_CLIENT_SECRET": "" 
};

module.exports = {
    config: config
};
