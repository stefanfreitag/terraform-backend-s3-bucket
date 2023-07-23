# Introduction

Terraform supports remote state management using S3 and DynamoDB services from AWS.
This CDK construct provides an implementation following recommended practices, e.g.

- state locking and consistency checking via Dynamo DB
- encryption of state files at rest
- versioning on the S3 bucket  
  Allowing state recovery in the case of accidental deletions and human error

A full list of features is available in the [here](features.md).