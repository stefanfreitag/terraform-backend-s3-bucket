# Features

## S3 Bucket

- [[S3.2] S3 buckets should prohibit public read access](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-2)
- [[S3.3] S3 buckets should prohibit public write access](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-3)
- [[S3.4] S3 buckets should have server-side encryption enabled](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-4)
- [[S3.5] S3 buckets should require requests to use Secure Socket Layer](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-5)
- [[S3.14] S3 buckets should use versioning](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-14)
- A lifecycle policy for non-current versions of objects  
  [[S3.10] S3 buckets with versioning enabled should have lifecycle policies configured](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-10)
- Enforcing that the bucket owner owns every object in the bucket.

## DynamoDB Table

- [[DynamoDB.2] DynamoDB tables should have point-in-time recovery enabled](https://docs.aws.amazon.com/securityhub/latest/userguide/dynamodb-controls.html#dynamodb-2)

## IAM

- Managed policy for accessing the S3 bucket and keys as well as the DynamoDB table.
