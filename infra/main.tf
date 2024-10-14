module "dynamodb" {
  source = "./dynamodb"
}

module "s3" {
  source = "./s3"
  s3_stage = var.stage
}

module "ssm" {
  source = "./ssm"
  ssm_stage = var.stage
}