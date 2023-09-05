This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Configuration with Environment Variables

To successfully deploy your Next.js app on Vercel, you'll need to configure your environment variables. These variables contain sensitive information such as API keys, secrets, and connection strings. Storing them securely in environment variables ensures that your sensitive data remains protected.

Here are the environment variables you'll need to include in your .env file before deploying your app:

- ***GOOGLE_ID*** : This variable should contain your Google API client ID. It is used for authentication and authorization purposes when integrating with Google services.

- ***GOOGLE_SECRET*** : This variable should contain your Google API client secret. It is used in conjunction with the client ID for authentication and authorization with Google.

- ***MONGODB_URI*** : This variable should contain the connection string for your MongoDB database. It allows your Next.js app to connect to the MongoDB database and interact with it.

- ***SECRET*** : This variable should be set to a secret key or passphrase used for encrypting session data and other sensitive information in your app.

- ***S3_ACCESS_KEY*** : This variable should contain the access key for your AWS S3 bucket. It is used for authentication when interacting with the S3 storage service.

- ***S3_SECRET_ACCESS_KEY*** : This variable should contain the secret access key for your AWS S3 bucket. It is used in conjunction with the access key for authentication with S3.