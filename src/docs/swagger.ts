import { serve, setup } from "swagger-ui-express";
import express from "express";

const docRouter = express.Router();

const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    title: "User API Documentation",
    version: "1.0.0",
    description: "Comprehensive API documentation for User-related operations, including JWT-based authentication and validations.",
  },
  servers: [
    { url: "http://localhost:3000", description: "Local Server" },
    { url: "https://your-deployed-url.com", description: "Production Server" },
  ],
  tags: [
    { name: "Users", description: "Endpoints related to user operations" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer", description: "User ID" },
          name: { type: "string", description: "Name of the user" },
          email: { type: "string", description: "Email of the user" },
          password: { type: "string", description: "Password of the user" },
          role: { type: "string", enum: ["USER", "ADMIN"], description: "Role of the user" },
        },
        required: ["name", "email", "password"],
      },
      LoginRequest: {
        type: "object",
        properties: {
          email: { type: "string", description: "User email" },
          password: { type: "string", description: "User password" },
        },
        required: ["email", "password"],
      },
      LoginResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          token: { type: "string" },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/api/users/register": {
      post: {
        tags: ["Users"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        responses: {
          201: {
            description: "User successfully registered",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          400: {
            description: "Validation errors or email already exists",
          },
        },
      },
    },
    "/api/users/login": {
      post: {
        tags: ["Users"],
        summary: "Login an existing user and get a JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful, returns a JWT token",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginResponse" },
              },
            },
          },
          400: {
            description: "Invalid credentials",
          },
        },
      },
    },
    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "Get a list of all users",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get a user by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID of the user",
          },
        ],
        responses: {
          200: {
            description: "User details retrieved successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          401: { description: "Unauthorized" },
          404: { description: "User not found" },
        },
      },
    },
    "/api/users/update-profile": {
  put: {
    tags: ["Users"],
    summary: "Update the authenticated user's profile",
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Updated name of the user" },
              email: { type: "string", description: "Updated email of the user" },
            },
            example: {
              name: "New Name",
              email: "newemail@example.com",
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "User profile updated successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
                data: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
      },
      400: { description: "Validation error" },
      401: { description: "Unauthorized" },
    },
  },
},
    "/api/users/change-password": {
      put: {
        tags: ["Users"],
        summary: "Change the password for the authenticated user",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                properties: {
                  oldPassword: { type: "string" },
                  newPassword: { type: "string" },
                  confirmPassword: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Password updated successfully",
          },
          400: { description: "Validation errors or mismatched passwords" },
          401: { description: "Unauthorized" },
        },
      },
    },
  "/api/users/profile": {
  delete: {
    tags: ["Users"],
    summary: "Delete the authenticated user's profile",
    security: [{ bearerAuth: [] }],
    responses: {
      204: { description: "User profile deleted successfully" },
      401: { description: "Unauthorized" },
      404: { description: "User not found" },
    },
  },
},
  },
};

docRouter.use("/", serve, setup(swaggerDocument));

export { docRouter as default };
