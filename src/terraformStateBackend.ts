import {
  aws_dynamodb as dynamodb,
  aws_s3 as s3,
  Duration,
  RemovalPolicy,
  CfnOutput,
} from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
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
      encryption: s3.BucketEncryption.KMS_MANAGED,
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
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      deletionProtection: props.tableDeletionProtection ?? false,
      partitionKey: {
        name: 'LockID',
        type: dynamodb.AttributeType.STRING,
      },
      pointInTimeRecovery: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    this.createIamPolicies();

    new CfnOutput(this, 'output-table',
      {
        description: 'ARN of the DynamoDB table',
        exportName: 'tableArn',
        value: this.table.tableArn,
      });

    new CfnOutput(this, 'output-bucket',
      {
        description: 'ARN of the S3 bucket',
        exportName: 'bucketArn',
        value: this.bucket.bucketArn,
      });

  }

  private createIamPolicies() {
    // Policy Statement for reading/ writing DyanmoDB table
    const ddbStatement = new iam.PolicyStatement({
      sid: 'DynamoDBTable',
      effect: iam.Effect.ALLOW,
      actions: [
        'dynamodb:DescribeTable',
        'dynamodb:GetItem',
        'dynamodb:PutItem',
        'dynamodb:DeleteItem',
      ],
      resources: [this.table.tableArn],
    });
    // Policy Statement for reading/ writing to the S3 bucket and objects
    const s3Statement = new iam.PolicyStatement({
      sid: 'S3Bucket',
      effect: iam.Effect.ALLOW,
      actions: [
        's3:ListBucket',
        's3:GetObject',
        's3:PutObject',
        's3:DeleteObject',
      ],
      resources: [this.bucket.bucketArn, this.bucket.bucketArn + '/*'],
    });

    new iam.PolicyDocument({
      statements: [ddbStatement, s3Statement],
    });
    new iam.ManagedPolicy(this, 'managed-policy', {
      description: 'Managed policy for Terraform state backend',
      statements: [ddbStatement, s3Statement],
      managedPolicyName: 'TerraformStateBackendPolicy',
    });


  }
}
