# Terraform Backend S3 Bucket

## Features

- Versioning is enabled  
  [[S3.14] S3 buckets should use versioning](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-14)
- All public access is blocked  
  [[S3.1] S3 Block Public Access setting should be enabled](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-1)
- Enforce SSL for requests  
 [[S3.5] S3 buckets should require requests to use Secure Socket Layer](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-1)
- A lifecycle policy for non-current versions of objects  
  [[S3.10] S3 buckets with versioning enabled should have lifecycle policies configured
](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-10)

## Links

- [Amazon Simple Storage Service controls](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html)
