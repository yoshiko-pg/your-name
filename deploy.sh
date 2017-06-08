#!/bin/bash

PATH=./node_modules/.bin:${PATH}


# 1. Deploy Serverless functions to AWS
cd service
serverless deploy --stage prod
if [ "$?" -gt 0 ]; then
  echo "Fail to deploy serverless functions..." >&2
  exit 1
fi
ENDPOINT=$(serverless info -s prod | grep -e "GET - .*\/fetch$" | cut -b 9-)
cd ..


# 2. Create environment file with extracted AWS API Gateway endpoint.
cat << EOT > .prod.env.json
{
  "apiEndpoint": "${ENDPOINT%\/api\/fetch}"
}
EOT


# 3. Deploy Angular app.
ng build --prod
gh-pages -d dist
if [ "$?" -gt 0 ]; then
  echo "Fail to deploy Angular app..." >&2
  exit 1
fi
