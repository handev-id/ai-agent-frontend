export const responseJSON = () => {
  const success = `
// Success Response (200 OK)
{
  "contents": [
      {
        "role": "user",
        "content": "Helo",
      },
      {
        "role": "model",
        "content": "Hai, How can i help you today?",
      },
    ],
  "agent": {
      "name": "Ai Agent",
    }
}`;

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

export const requestApi = () => {
  return `
// Example API Request
fetch(
    "${window.location.protocol}//${window.location.host}/api/message?clientId=YOUR_CLIENT_ID",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer YOUR_API_KEY",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "Hello, how can I help you today?",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data));`;
};
