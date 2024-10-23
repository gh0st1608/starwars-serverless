resource "aws_ssm_parameter" "ssm" {
  name        = "/store/s3-bucket-deployment-${var.ssm_stage}"
  type        = "String"
  value       = "bucket-swapi-${var.ssm_stage}"

  tags = {
   Name = "Ssm-Swapi"
 }
}

resource "aws_ssm_parameter" "dynamo_table" {
  name        = "/db/dynamo_table-${var.ssm_stage}"
  type        = "String"
  value       = "peopleTable-${var.ssm_stage}"

  tags = {
   Name = "Ssm-Swapi"
 }
}