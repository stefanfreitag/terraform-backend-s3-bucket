# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### TerraformStateBackend <a name="TerraformStateBackend" id="terraform-backend-s3-bucket.TerraformStateBackend"></a>

#### Initializers <a name="Initializers" id="terraform-backend-s3-bucket.TerraformStateBackend.Initializer"></a>

```typescript
import { TerraformStateBackend } from 'terraform-backend-s3-bucket'

new TerraformStateBackend(scope: Construct, id: string, props: TerraformStateBackendProperties)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#terraform-backend-s3-bucket.TerraformStateBackend.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#terraform-backend-s3-bucket.TerraformStateBackend.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#terraform-backend-s3-bucket.TerraformStateBackend.Initializer.parameter.props">props</a></code> | <code><a href="#terraform-backend-s3-bucket.TerraformStateBackendProperties">TerraformStateBackendProperties</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="terraform-backend-s3-bucket.TerraformStateBackend.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="terraform-backend-s3-bucket.TerraformStateBackend.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="terraform-backend-s3-bucket.TerraformStateBackend.Initializer.parameter.props"></a>

- *Type:* <a href="#terraform-backend-s3-bucket.TerraformStateBackendProperties">TerraformStateBackendProperties</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#terraform-backend-s3-bucket.TerraformStateBackend.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="terraform-backend-s3-bucket.TerraformStateBackend.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#terraform-backend-s3-bucket.TerraformStateBackend.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="terraform-backend-s3-bucket.TerraformStateBackend.isConstruct"></a>

```typescript
import { TerraformStateBackend } from 'terraform-backend-s3-bucket'

TerraformStateBackend.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="terraform-backend-s3-bucket.TerraformStateBackend.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#terraform-backend-s3-bucket.TerraformStateBackend.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#terraform-backend-s3-bucket.TerraformStateBackend.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | *No description.* |
| <code><a href="#terraform-backend-s3-bucket.TerraformStateBackend.property.table">table</a></code> | <code>aws-cdk-lib.aws_dynamodb.ITable</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="terraform-backend-s3-bucket.TerraformStateBackend.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="terraform-backend-s3-bucket.TerraformStateBackend.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

---

##### `table`<sup>Required</sup> <a name="table" id="terraform-backend-s3-bucket.TerraformStateBackend.property.table"></a>

```typescript
public readonly table: ITable;
```

- *Type:* aws-cdk-lib.aws_dynamodb.ITable

---


## Structs <a name="Structs" id="Structs"></a>

### TerraformStateBackendProperties <a name="TerraformStateBackendProperties" id="terraform-backend-s3-bucket.TerraformStateBackendProperties"></a>

#### Initializer <a name="Initializer" id="terraform-backend-s3-bucket.TerraformStateBackendProperties.Initializer"></a>

```typescript
import { TerraformStateBackendProperties } from 'terraform-backend-s3-bucket'

const terraformStateBackendProperties: TerraformStateBackendProperties = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#terraform-backend-s3-bucket.TerraformStateBackendProperties.property.bucketName">bucketName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#terraform-backend-s3-bucket.TerraformStateBackendProperties.property.tableName">tableName</a></code> | <code>string</code> | *No description.* |

---

##### `bucketName`<sup>Required</sup> <a name="bucketName" id="terraform-backend-s3-bucket.TerraformStateBackendProperties.property.bucketName"></a>

```typescript
public readonly bucketName: string;
```

- *Type:* string

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="terraform-backend-s3-bucket.TerraformStateBackendProperties.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

---



