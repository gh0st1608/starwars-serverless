> **Requerimientos**:
 - Instalar AWS Cli
 - Instalar Docker y Docker-compose
 - Instalar Terraform
 - Instalar Node Js
 - Instalar Serverless Framework

## Deploy Local (Offline)
0. Clonar el repositorio

## Pasos para la infrastructura: 
1. Ubicarse en la raiz del proyecto y ejecutar `docker-compose up -d`, esto creara localmente con `localstack` los servicios de dynamodb, s3 y ssm.
2. Descomentar la seccion comentada del archivo `providers.tf` y segiudamente comentar la seccion `terraform` del mismo archivo.
3. Renombrar el archivo `terraform.tfvars.example` a `terraform.tfvars` y completar las variables `access_key` y `access_key` con el valor de `test` en ambos casos, adicionalmente completar `stage` con el valor `dev`.
4. Ubicarse en la carpeta `infra` y ejecutar respectivamente `terraform init` y luego `terraform apply -auto-approve`.

## Pasos para la aplicacion:
1. Ubicarse en la carpeta `backend` y ejecutar `npm install`, para instalar dependencias.
2. Renombrar el archivo `.env.example` a `.env` y copiar los siguientes valores dentro del mismo.
    ```
    ENV="development"
    PORT=3000
    DB_DYNAMO_ENDPOINT="http://localhost:4566"
    DB_DYNAMO_TABLE="PeopleTable"
    REGION="us-east-1"
    SWAPI_URL="https://swapi.py4e.com/api"
    ```

3. Ejecutar `npm run start:dev` para iniciar el proyecto serverless en modo `offline`.

-------------------------------------------------------------------------------------------
## Deploy en AWS
0. Clonar el repositorio

## Pasos para la infrastructura: 
1. Ubicarse en la carpeta `infra` y completar las variables con credenciales respectivas.
2. Ejecutar `terraform init` y seguidamente `terraform apply -auto-approve`.

## Pasos para la aplicacion:
1. Ubicarse en la carpeta `backend` y ejecutar `npm install`, para instalar dependencias.
2. Ejecutar `npm run deploy:dev` para desplegar el proyecto serverless en la nube.


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
