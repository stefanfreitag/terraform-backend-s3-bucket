import { aws_dynamodb as dynamodb, aws_s3 as s3, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { TerraformStateBackendProperties } from './terraformStateBackendProperties';

export class TerraformStateBackend extends Construct {
  readonly bucket: s3.IBucket;
  readonly table: dynamodb.ITable;

  public constructor(
    scope: Construct,
    id: string,
    props: TerraformStateBackendProperties,
  ) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, 'bucket', {
      bucketName: props.bucketName,
      versioned: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      removalPolicy: RemovalPolicy.DESTROY,
      lifecycleRules: [
        {
          enabled: true,
          noncurrentVersionsToRetain: 1000,
          noncurrentVersionTransitions: [
            {
              storageClass: s3.StorageClass.INFREQUENT_ACCESS,
              transitionAfter: Duration.days(30),
            },
            {
              storageClass: s3.StorageClass.GLACIER,
              transitionAfter: Duration.days(90),
            },
            {
              storageClass: s3.StorageClass.DEEP_ARCHIVE,
              transitionAfter: Duration.days(180),
            },
          ],
        },
      ],
    });

    this.table = new dynamodb.Table(this, 'table', {
      tableName: props.tableName,
      partitionKey: {
        name: 'LockID',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
