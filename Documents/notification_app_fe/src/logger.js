export const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjaGF2dmFsYWFsYXNhLjIwMDVAZ21haWwuY29tIiwiZXhwIjoxNzgwODE4NDkyLCJpYXQiOjE3ODA4MTc1OTIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzZWJmNGY2Yi1mZTBkLTQzNzYtYjYwNy0yNjZlNGY3NTE4OGUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJjaGF2dmEgbGFhbGFzYSIsInN1YiI6ImZlZjg4MTA3LTU4NjItNDkyYy1iZTkzLWM2NTc4MjAyNjA5NCJ9LCJlbWFpbCI6ImNoYXZ2YWxhYWxhc2EuMjAwNUBnbWFpbC5jb20iLCJuYW1lIjoiY2hhdnZhIGxhYWxhc2EiLCJyb2xsTm8iOiIyMDIzMDAzNTI3IiwiYWNjZXNzQ29kZSI6IndnS3RnWiIsImNsaWVudElEIjoiZmVmODgxMDctNTg2Mi00OTJjLWJlOTMtYzY1NzgyMDI2MDk0IiwiY2xpZW50U2VjcmV0IjoiRENKQmZLeUNEYlBiQlB6diJ9.LepUZcVJ_I1KdAkuqAQEblb1jKIPzyGaw_tDLBl3BOA";

export async function Log(stack, level, packageName, message) {
  try {
    await fetch("/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message,
      }),
    });
  } catch (error) {
    console.error(error);
  }
}