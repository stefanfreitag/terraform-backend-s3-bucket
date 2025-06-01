export interface TerraformStateBackendProperties {
  /**
   * The name of the bucket to create.
   *
   * @type {string}
   * @memberof TerraformStateBackendProperties
   */
  readonly bucketName: string;
  /**
   * The name of the DynamoDB table to create.
   *
   * @type {string}
   * @memberof TerraformStateBackendProperties
   */
  readonly tableName: string;

  /**
   * Whether to protect the created DynamoDB table from being accidentally deleted.
   * @default false
   * @type {boolean}
   * @memberof TerraformStateBackendProperties
   */
  readonly tableDeletionProtection?: boolean;
}