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
  
  // Add CAPTCHA verification for first message
  if (chatMessages.children.length === 0 && !showCaptcha()) {
    alert('CAPTCHA verification failed. Please try again.');
    return;
  }
  
  if (!moderateMessage(message)) {
    alert(warningMessage);
    return;
  }
  renderMessage(message);
  chatInput.value = '';
});

// Add CAPTCHA verification function
function showCaptcha() {
  // Simple math CAPTCHA for demo
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const answer = prompt(`Please solve this simple math problem to continue: ${num1} + ${num2} = ?`);
  return parseInt(answer) === (num1 + num2);
}

// Add emoji picker functionality when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  addEmojiPicker();
});

function addEmojiPicker() {
  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '😍', '🤔', '😎', '🙌', '💕'];
  const emojiBtn = document.createElement('button');
  emojiBtn.innerHTML = '😊';
  emojiBtn.type = 'button';
  emojiBtn.className = 'emoji-btn';
  emojiBtn.style.marginLeft = '10px';
  emojiBtn.onclick = () => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
      chatInput.value += emoji;
    }
  };
  
  const chatInput = document.getElementById('chat-input');
  if (chatInput && chatInput.parentNode) {
    chatInput.parentNode.appendChild(emojiBtn);
  }
}
