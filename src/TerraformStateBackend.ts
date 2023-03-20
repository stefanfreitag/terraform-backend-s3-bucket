import * as aws_dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { BillingMode } from 'aws-cdk-lib/aws-dynamodb';
import * as aws_s3 from 'aws-cdk-lib/aws-s3';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
//import * as aws_iam from 'aws-cdk-lib/aws-iam'
import { TerraformStateBackendProperties } from './TerraformStateBackendProperties';

export class TerraformStateBackend extends Construct {
  readonly bucket: aws_s3.IBucket;
  readonly table: aws_dynamodb.ITable;
  // readonly policy: aws_iam.IPolicy;

  public constructor(
    scope: Construct,
    id: string,
    props: TerraformStateBackendProperties,
  ) {
    super(scope, id);

    this.bucket = new Bucket(this, 'bucket', {
      bucketName: props.bucketName,
      versioned: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
    });

    this.table = new aws_dynamodb.Table(this, 'table', {
      partitionKey: {
        name: 'LockID',
        type: aws_dynamodb.AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
  }
}
