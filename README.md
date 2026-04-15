# MERN Practical – Authentication & Testing

This backend project implements:
- JWT authentication with protected routes
- Password hashing with bcryptjs
- Product image upload using Multer + Cloudinary
- Mock payment API
- Validation with express-validator
- Postman-ready API testing flow

## Project Structure

```
project/
│── models/
│── routes/
│── middleware/
│── uploads/
│── server.js
│── .env
```

## Installation

1. Clone or open the project folder.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file from `.env.example`.
4. Start MongoDB locally or provide a MongoDB URI.
5. Start the server:

```bash
npm run dev
```

## Environment Variables

Use `.env` values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_practical
JWT_SECRET=mysecretkey
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

If Cloudinary is not configured, uploads will save to the local `uploads/` folder.

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Products
- `POST /api/products` (protected)
- `GET /api/products`

### Payments
- `POST /api/payment` (protected)

## Postman Test Flow

1. Register user
2. Login and copy token
3. Add product with `Authorization: Bearer <token>` and image form-data
4. Get products
5. Post payment request with amount

## Deployment

This API can be deployed to platforms such as Railway, Render, Heroku, or any Node.js hosting provider.

### Example deployment steps
1. Push project to GitHub.
2. Create a new app on Railway or Render.
3. Set environment variables from `.env`.
4. Set start command to `npm start`.

## Notes

- The `uploads/` folder is ignored by git.
- Use Postman or similar tools to verify the auth, image upload, and payment flows.
