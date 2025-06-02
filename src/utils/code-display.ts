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

export const requestApi = `
// Example API Request
fetch(
    "${window.location.protocol}//api.${window.location.host}/api/message?clientId=YOUR_CLIENT_ID",
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

export const embedCode = `
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <!-- Add this to your HTML -->
  <script type="text/javascript">
    window.theme = "#1f2937";
    window.clientId = "YOUR_CLIENT_ID";
  </script>
  <script async src="${window.location.protocol}//api.${window.location.host}/static/widget.js"></script>
</body>
</html>
`;
