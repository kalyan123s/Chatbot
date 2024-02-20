const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "";
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  input.value = "";

  messages.innerHTML += `<div class="message user-message"><span>${message}</span></div>`;

  const messagesBuffer = [{"role": "system", "content": "you are a helpful assistant."}];
  try {
    messagesBuffer.push({"role": "user", "content": message});
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messagesBuffer,
        temperature: 0.4,
        max_tokens: 800
      })
    });
    const responseData = await response.json();
    messagesBuffer.push({"role": "assistant", "content": responseData.choices[0].message.content});
    
    // Display the assistant's response
    messages.innerHTML += `<div class="message bot-message">
    <span>${responseData.choices[0].message.content}</span></div>`;
  } 
  catch (error) {
    console.error("Error:", error);
  }
});
