// Lüvable Chat Moderation System
class ChatModerator {
  constructor() {
    this.bannedWords = [
      // Exact offensive phrases (with word boundaries)
      'shut up', 'shut the hell up', 'go to hell', 'what the hell',
      'damn it', 'damn you', 'go damn', 'goddamn',
      // Direct insults
      'you idiot', 'you moron', 'you loser', 'you stupid',
      'i hate you', 'hate you', 'you suck',
      // Violence and threats
      'kill yourself', 'go die', 'die now', 'kys',
      // Graphic content indicators
      'porn site', 'nude pics', 'sexual content',
      // Hate speech
      'racist scum', 'bigot', 'supremacist',
      // Direct harassment
      'pathetic loser', 'worthless person', 'disgusting pig'
    ];
    
    this.hostileKeywords = [
      'shut up', 'go away', 'leave me alone', 'i hate you', 'you suck',
      'pathetic', 'worthless', 'disgusting', 'terrible', 'awful',
      'annoying', 'irritating', 'boring', 'lame', 'dumb'
    ];
    
    this.positiveWords = [
      'love', 'like', 'great', 'awesome', 'wonderful', 'amazing', 'good',
      'nice', 'kind', 'friendly', 'helpful', 'thank', 'please', 'sorry'
    ];
    
    this.userWarnings = new Map(); // userId -> warning count
    this.bannedUsers = new Set();
    this.currentUserId = 'user_' + Math.random().toString(36).substr(2, 9);
    
    this.initializeChat();
  }
  
  initializeChat() {
    this.messagesDiv = document.getElementById('messages');
    this.chatInput = document.getElementById('chat-input');
    this.sendBtn = document.getElementById('send-btn');
    this.warningDiv = document.getElementById('chat-warning');
    this.userStatusDiv = document.getElementById('user-status');
    
    // Enable chat if user is not banned
    if (!this.bannedUsers.has(this.currentUserId)) {
      this.chatInput.disabled = false;
      this.sendBtn.disabled = false;
      this.updateUserStatus('Welcome! Please be respectful and kind.');
    }
    
    // Event listeners
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
    
    // Show welcome message
    this.addSystemMessage('Welcome to Lüvable! Please be kind and respectful to everyone.');
  }
  
  sendMessage() {
    const message = this.chatInput.value.trim();
    
    if (!message) return;
    
    // Check if user is banned
    if (this.bannedUsers.has(this.currentUserId)) {
      this.showBanMessage();
      return;
    }
    
    // Moderate the message
    const moderationResult = this.moderateMessage(message);
    
    if (moderationResult.isAppropriate) {
      this.addUserMessage(message);
      this.chatInput.value = '';
      this.hideWarning();
    } else {
      this.handleInappropriateMessage(moderationResult);
    }
  }
  
  moderateMessage(message) {
    const lowerMessage = message.toLowerCase();
    let issues = [];
    let sentimentScore = 0;
    
    // Check for banned phrases
    for (const phrase of this.bannedWords) {
      if (lowerMessage.includes(phrase.toLowerCase())) {
        issues.push(`Contains inappropriate content: "${phrase}"`);
      }
    }
    
    // Simple sentiment analysis
    const words = lowerMessage.split(/\s+/);
    for (const word of words) {
      if (this.hostileKeywords.some(hostile => lowerMessage.includes(hostile))) {
        sentimentScore -= 2;
      }
      if (this.positiveWords.includes(word)) {
        sentimentScore += 1;
      }
    }
    
    // Check for hostile tone
    if (sentimentScore <= -4) {
      issues.push('Message tone appears hostile or rude');
    }
    
    // Check for excessive caps (shouting)
    const capsRatio = (message.match(/[A-Z]/g) || []).length / message.length;
    if (capsRatio > 0.7 && message.length > 15) {
      issues.push('Please avoid excessive capital letters');
    }
    
    return {
      isAppropriate: issues.length === 0,
      issues: issues,
      sentimentScore: sentimentScore
    };
  }
  
  handleInappropriateMessage(moderationResult) {
    const currentWarnings = this.userWarnings.get(this.currentUserId) || 0;
    const newWarningCount = currentWarnings + 1;
    
    this.userWarnings.set(this.currentUserId, newWarningCount);
    
    if (newWarningCount >= 3) {
      // Ban the user
      this.bannedUsers.add(this.currentUserId);
      this.showBanMessage();
      this.disableChat();
    } else {
      // Show warning
      const remainingWarnings = 3 - newWarningCount;
      this.showWarning(
        `Warning ${newWarningCount}/3: ${moderationResult.issues.join('. ')}. 
        ${remainingWarnings} warning(s) remaining before automatic ban.`
      );
      this.updateUserStatus(`Warnings: ${newWarningCount}/3`);
    }
    
    this.chatInput.value = '';
  }
  
  showWarning(message) {
    this.warningDiv.textContent = message;
    this.warningDiv.style.display = 'block';
    
    // Auto-hide warning after 8 seconds
    setTimeout(() => {
      this.hideWarning();
    }, 8000);
  }
  
  hideWarning() {
    this.warningDiv.style.display = 'none';
  }
  
  showBanMessage() {
    this.warningDiv.innerHTML = `
      <strong>🚫 You have been automatically banned from the chat.</strong><br>
      Reason: Multiple violations of community guidelines.<br>
      Our system detected inappropriate content or hostile behavior.<br>
      Please contact support if you believe this was an error.
    `;
    this.warningDiv.style.display = 'block';
    this.warningDiv.style.background = '#ffcdd2';
    this.warningDiv.style.borderColor = '#d32f2f';
  }
  
  disableChat() {
    this.chatInput.disabled = true;
    this.sendBtn.disabled = true;
    this.updateUserStatus('Chat access disabled due to violations');
  }
  
  updateUserStatus(message) {
    this.userStatusDiv.textContent = message;
  }
  
  addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'user-message';
    messageElement.innerHTML = `
      <span class="message-time">${new Date().toLocaleTimeString()}</span>
      <span class="message-author">You:</span>
      <span class="message-content">${this.escapeHtml(message)}</span>
    `;
    this.messagesDiv.appendChild(messageElement);
    this.scrollToBottom();
  }
  
  addSystemMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'system-message';
    messageElement.innerHTML = `
      <span class="message-time">${new Date().toLocaleTimeString()}</span>
      <span class="message-content">${this.escapeHtml(message)}</span>
    `;
    this.messagesDiv.appendChild(messageElement);
    this.scrollToBottom();
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  scrollToBottom() {
    this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
  }
  
  // Admin methods for extending banned words (for future use)
  addBannedWord(word) {
    if (!this.bannedWords.includes(word.toLowerCase())) {
      this.bannedWords.push(word.toLowerCase());
    }
  }
  
  removeBannedWord(word) {
    const index = this.bannedWords.indexOf(word.toLowerCase());
    if (index > -1) {
      this.bannedWords.splice(index, 1);
    }
  }
  
  // Get moderation statistics (for monitoring)
  getModerationStats() {
    return {
      totalUsers: this.userWarnings.size,
      bannedUsers: this.bannedUsers.size,
      userWarnings: Object.fromEntries(this.userWarnings),
      bannedWordsList: this.bannedWords.length
    };
  }
}

// Initialize chat moderation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.chatModerator = new ChatModerator();
});

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChatModerator;
}