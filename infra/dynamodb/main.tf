resource "aws_dynamodb_table" "people" {
 name = "peopleTable-${var.dynamo_stage}"
 billing_mode = "PROVISIONED"
 read_capacity = 10
 write_capacity = 5

 hash_key = "peopleId"
#range_key = "name" Atributo secundario (opcional)

  attribute {
    name = "peopleId"
    type = "S"  # String data type
  }

 tags = {
   Name = "peopleTable-Swapi"
 }
}
