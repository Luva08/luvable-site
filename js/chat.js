// Lüvable Chatroom moderation and Q&A logic

const bannedWords = ['spam', 'scam', 'offensive'];
const warningMessage = "Your message contains inappropriate content and cannot be posted.";
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

function moderateMessage(message) {
  for (const word of bannedWords) {
    if (message.toLowerCase().includes(word)) {
      return false;
    }
  }
  return true;
}

function renderMessage(message) {
  const div = document.createElement('div');
  div.className = 'chat-message';
  div.textContent = message;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!moderateMessage(message)) {
    alert(warningMessage);
    return;
  }
  renderMessage(message);
  chatInput.value = '';
});
