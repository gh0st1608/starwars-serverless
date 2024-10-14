resource "aws_ssm_parameter" "ssm" {
  name        = "/store/s3-bucket-deployment-${var.ssm_stage}"
  type        = "String"
  value       = "my-dev-bucket"

  tags = {
   Name = "Ssm-Swapi"
 }
}