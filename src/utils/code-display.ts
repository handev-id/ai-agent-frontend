export const responseJSON = () => {
  const success = `
// Success Response (200 OK)
{
  "success": true,
  "code": 200,
  "data": {
    "id": "agt_123456789",
    "name": "Customer Support Bot",
    "status": "active",
    "created_at": "2023-11-20T10:30:00Z",
    "updated_at": "2023-11-20T10:30:00Z"
  },
  "meta": {
    "api_version": "v1",
    "request_id": "req_987654321"
  }
}
`;

  const error = `
// Error Validation Response (400 Bad Request)
{
  "errors": [
    {
      "field": "content",
      "message": "content is required",
      "code": "required"
    },
    {
      "field": "content",
      "message": "Content must be a string",
      "code": "string"
    },
    {
      "field": "clientId",
      "message": "Client is required",
      "code": "required"
    },
    {
      "field": "clientId",
      "message": "Client must be a string",
      "code": "string"
    },
  ]
}`;

  return { success, error };
};
