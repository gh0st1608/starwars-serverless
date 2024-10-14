resource "aws_ssm_parameter" "ssm" {
  name        = "/store/s3-bucket-deployment-${var.ssm_stage}"
  type        = "String"
  value       = "bucket-swapi-${var.ssm_stage}"

  tags = {
   Name = "Ssm-Swapi"
 }
}