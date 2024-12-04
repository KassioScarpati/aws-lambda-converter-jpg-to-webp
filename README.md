# AWS Lambda Automatic Format Converter

## Project Overview

This project demonstrates how to build an automated image format converter using **AWS Lambda** and the **AWS SDK v3**. The solution leverages the serverless architecture of AWS Lambda to automatically detect newly uploaded image files in an Amazon S3 bucket, process them using the `sharp` library, and save the converted image back into the same bucket in a different format.

The primary goal of this project is to provide a practical example for developers looking to implement automation in cloud environments, specifically for use cases involving file processing.

---

## Features

- **Runtime:** Built using **AWS Lambda Node.js runtime 22.x**, providing the latest performance optimizations and compatibility with ES modules.
- **Automatic Trigger:** The Lambda function is triggered by S3 events whenever a new `.jpg` image is uploaded.
- **Format Conversion:** Converts `.jpg` images to the more efficient `.webp` format using the `sharp` library.
- **Efficient Resource Management:** The solution utilizes AWS Lambda for cost-effective, scalable, and event-driven execution.
- **Streamlined Integration:** Built using AWS SDK v3, which provides modular packages and optimized performance for serverless applications.

---

## Benefits of this Solution

1. **Cost Efficiency:** Pay only for the resources consumed during each function invocation.
2. **Automation:** Eliminates the need for manual image format conversion.
3. **Scalability:** Automatically scales with the number of uploaded images.
4. **Simplicity:** Minimal setup required, leveraging AWS managed services.

---

## How It Works

1. **S3 Event Trigger:**
   - The function is triggered when an image is uploaded to a specified S3 bucket.
   - The event payload provides details such as the bucket name and object key.

2. **Image Processing:**
   - The Lambda function downloads the image from S3.
   - It converts the image to `.webp` format using the `sharp` library.

3. **Output Storage:**
   - The converted image is uploaded back to the same S3 bucket under a new key.

---

## Prerequisites

- **AWS Account:** Ensure you have access to an AWS account with permissions to configure Lambda and S3.
- **Node.js Environment:** Use Node.js version 18 or later for development, matching the runtime behavior of 22.x.
- **AWS CLI:** Optional but useful for managing AWS resources.

---

## Getting Started

1. **Set Up S3 Bucket:**
   - Create a bucket and configure permissions to allow Lambda to access it.

2. **Deploy Lambda Function:**
   - Use the provided code in this repository to deploy the Lambda function.
   - Ensure the Lambda function has the necessary permissions (`s3:GetObject`, `s3:PutObject`).

3. **Test the Workflow:**
   - Upload a `.jpg` image to the S3 bucket.
   - Check for the `.webp` version of the image in the same bucket.

---

## Future Improvements

- **Support for Additional Formats:** Extend functionality to handle other file formats (e.g., `.png`, `.gif`).
- **Customizable Output Options:** Add flexibility for users to define output resolutions or quality.
- **Error Handling:** Enhance logging and exception handling for robust operation.

---

## Conclusion

This project serves as a starting point for developers looking to integrate automated file processing with AWS Lambda. By following this example, you can explore the potential of serverless computing and modular development with AWS SDK v3. It is a practical demonstration of how to combine cloud services for real-world applications.

---
