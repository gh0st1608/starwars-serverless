> **Requerimientos**:
 - Instalar AWS Cli v2.15.48 y Python/3.11.8
 - Instalar Docker y Docker-compose v26.0.0,
 - Instalar Terraform v1.9.0
 - Instalar Node Js v20.13.1
 - Instalar Serverless Framework v4.4.6

## Deploy Local (Offline)
0. Clonar el repositorio

## Configuracion AWS
1. Ejecutar `aws configure --profile NOMBRE_DEL_PERFIL` donde "NOMBRE_DEL_PERFIL" es el perfil de despliegue con localstack.
2. Ingresar las credenciales respectivas : 
    - access_key
    - secret_key
    - region
    - ouput format

## Pasos para la infrastructura: 
1. Ubicarse en la raiz del proyecto y ejecutar `docker-compose up -d`, esto creara localmente con `localstack` los servicios de dynamodb, s3 y ssm.
2. Descomentar la seccion comentada del archivo `providers.tf` y segiudamente comentar la seccion `terraform` del mismo archivo.
3. Renombrar el archivo `terraform.tfvars.example` a `terraform.tfvars` y completar las variables `access_key` y `secret_key` con el valor de `test` en ambos casos, `region` con el valor `us-east-1`, adicionalmente completar `stage` con el valor `dev` y `service` con el valor de `localstack` si se desea simular servicios de aws sin costo.
4. Ubicarse en la carpeta `infra` y ejecutar respectivamente `terraform init` y luego `terraform apply -auto-approve`.

## Validar la creacion de infrastructura localstack:
1. lista tablas de dynamoDb `aws dynamodb list-tables --profile NOMBRE_DEL_PERFIL --endpoint-url=http://localhost:4566`
2. listar parametros `aws ssm describe-parameters --profile NOMBRE_DEL_PERFIL --endpoint-url=http://localhost:4566`
3. listar bucket despliegue `aws s3 ls --profile NOMBRE_DEL_PERFIL --endpoint-url=http://localhost:4566`

## Pasos para la aplicacion:
1. Ubicarse en la carpeta `backend` y ejecutar `npm install`, para instalar dependencias.
2. Ubicarse en el archivo `serverless.ts` y en `provider.environment` ingresar los siguientes valores:
    ```
     environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      ENV: "${self:provider.stage}",
      DB_DYNAMO_ENDPOINT: "http://localhost:4566",
      DB_DYNAMO_TABLE: "peopleTable-${self:provider.stage}",
      REGION: "us-east-1",
      SWAPI_URL: "https://swapi.py4e.com/api"
    },
    ```

3. Ejecutar `npm run start:dev` para iniciar el proyecto serverless en modo `offline`.

-------------------------------------------------------------------------------------------
## Deploy en AWS
0. Clonar el repositorio

## Configuracion AWS
1. Ejecutar `aws configure --profile NOMBRE_DEL_PERFIL` donde "NOMBRE_DEL_PERFIL" es el perfil de la cuenta de despliegue en aws.
2. Ingresar las credenciales respectivas : 
    - access_key
    - secret_key
    - region
    - ouput format

## Pasos para la infrastructura: 
1. Ubicarse en la carpeta `infra` y completar las variables con credenciales respectivas.
2. Ejecutar `terraform init` y seguidamente `terraform apply -auto-approve`.

## Validar la creacion de infrastructura aws:
1. lista tablas de dynamoDb `aws dynamodb list-tables --profile NOMBRE_DEL_PERFIL`
2. listar parametros `aws ssm describe-parameters --profile NOMBRE_DEL_PERFIL`
3. listar bucket despliegue `aws s3 ls --profile NOMBRE_DEL_PERFIL`

## Pasos para la aplicacion:
1. Ubicarse en la carpeta `backend` y ejecutar `npm install`, para instalar dependencias.
2. Mantener la configuracion del archivo `serverless.ts` en la seccion `provider.environment` tal como se hizo en el deploy local.
3. Ejecutar `npm run deploy:stg` para desplegar el proyecto serverless en la nube.

-------------------------------------------------------------------------------------------
## Request de pruebas locales

- Obtener un personaje
`curl -X GET http://localhost:3000/api/dev/people/1`

- Crear un nuevo personaje
```
curl -X POST http://localhost:3000/api/dev/people \
-H "Content-Type: application/json" \
-d '{
    "birth_year": "19 BBY",
    "eye_color": "Blue",
    "films": ["https://swapi.py4e.com/api/films/1"],
    "gender": "Male",
    "hair_color": "Blond",
    "height": "172",
    "homeworld": "https://swapi.py4e.com/api/planets/1/",
    "mass": "77",
    "name": "test",
    "skin_color": "Fair",
    "created": "2024-12-09T13:50:51.644000Z",
    "edited": "2024-12-10T13:52:43.172000Z",
    "species": ["https://swapi.py4e.com/api/species/1/"],
    "starships": [
        "https://swapi.py4e.com/api/starships/12/"
    ],
    "url": "https://swapi.py4e.com/api/people/1/",
    "vehicles": ["https://swapi.py4e.com/api/vehicles/14"]
}'
```
- Obtener el id del personaje creado
 1. Ejecutar `aws dynamodb scan --table-name PeopleTable --endpoint-url http://localhost:4566`
 2. Extraer el valor del campo `peopleId` (Por ejemplo que sea `aabbccdd`)

- Consultar el valor (Ejemplo)
`curl -X GET http://localhost:3000/api/dev/people/aabbccdd`

------------------------------------------------------------------
## Generar Documentacion formato YAML
1. Ubicarse en la carpeta `backend` y ejecutar `npm run doc`, para generar la documentacion.
2. Copiar el codigo generado del archivo `openapi.yaml` y pegarlo en el editor [swagger](https://editor.swagger.io/)
3. Opcional: Visualizar el swagger en el url: `https://gh0st1608.github.io/starwars-serverless`

## Pruebas Unitarias
1. Ubicarse en la carpeta `backend` y ejecutar `npm run test`

## NOTAS
1. En caso de que al ejecutar el despliegue en aws con cuenta respectiva con el comando `npm run deploy:stg` salga un aviso de `ServerlessError2: Serverless plugin "serverless-offline" not found` por favor ejecutar el comando `npm install serverless-offline --save-dev`. Luego de ello ya se podra desplegar sin problema alguno en la nube y generara los endpoints respectivos. Recordar que primero necesita crear la infraestructura con terraform segun los pasos del readme.md
