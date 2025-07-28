document.addEventListener("DOMContentLoaded", () => {
  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const closeBtn = document.querySelector(".chatbot .close-btn");
  const chatbox = document.getElementById("chat-window");
  const chatInput = document.getElementById("chat-input");
  const sendChatBtn = document.querySelector("#send-btn");
  const chatForm = document.getElementById("chat-form");

  chatForm.addEventListener("submit", e => {
    e.preventDefault();
    handleChat();
  });

  chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
  });
  closeBtn.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
  });

  const createChatLi = (message, className) => {
    const li = document.createElement("li");
    li.classList.add("chat", className);
    let content =
      className === "outgoing"
        ? `<p>${message}</p>`
        : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    li.innerHTML = content;
    return li;
  };

  const handleChat = async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.appendChild(createChatLi("Thinking...", "incoming"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });


      const data = await response.json();
      const botReply = data.reply || "Sorry, no reply.";
      chatbox.lastChild.querySelector("p").textContent = botReply;
    } catch (error) {
      chatbox.lastChild.querySelector("p").textContent =
        "Oops, something went wrong.";
      console.error("Fetch error:", error);
    }
  };

});
