// Lüvable Enhanced Functionality
document.addEventListener('DOMContentLoaded', function() {
    let selectedAvatar = 'default1';
    let captchaAnswer = generateCaptcha();
    let shareDiscountApplied = false;

    // Generate simple math captcha
    function generateCaptcha() {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const answer = a + b;
        
        const captchaLabel = document.querySelector('label[for="captcha-input"]');
        if (captchaLabel) {
            captchaLabel.textContent = `Verify you're human (what's ${a} + ${b}?):`;
        }
        
        return answer;
    }

    // Avatar selection
    const avatarOptions = document.querySelectorAll('.avatar-option');
    const customAvatarInput = document.getElementById('custom-avatar');
    
    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            avatarOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            const avatarType = this.dataset.avatar;
            if (avatarType === 'custom') {
                customAvatarInput.click();
            } else {
                selectedAvatar = avatarType;
            }
        });
    });

    // Custom avatar upload with filtering
    if (customAvatarInput) {
        customAvatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Basic file validation
                if (!file.type.startsWith('image/')) {
                    alert('Please select a valid image file.');
                    return;
                }
                
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    alert('File size must be less than 5MB.');
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(e) {
                    const customOption = document.querySelector('[data-avatar="custom"]');
                    customOption.innerHTML = `<img src="${e.target.result}" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover;">`;
                    selectedAvatar = 'custom';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Emoji picker
    const emojiOptions = document.querySelectorAll('.emoji-option');
    const questionInput = document.getElementById('question-input');
    
    emojiOptions.forEach(emoji => {
        emoji.addEventListener('click', function() {
            if (questionInput) {
                questionInput.value += this.textContent + ' ';
                questionInput.focus();
            }
        });
    });

    // Join Lüva Nation button
    const joinNationBtn = document.getElementById('join-nation-btn');
    if (joinNationBtn) {
        joinNationBtn.addEventListener('click', function() {
            alert('Welcome to Lüva Nation! 🎉 You\'re now part of our caring community. Check your email for next steps!');
        });
    }

    // Ask a Lüva functionality
    const askLuvaBtn = document.getElementById('ask-luva-btn');
    if (askLuvaBtn) {
        askLuvaBtn.addEventListener('click', function() {
            const question = questionInput?.value.trim();
            const category = document.getElementById('category-select')?.value;
            const captchaInput = document.getElementById('captcha-input')?.value;

            // Validation
            if (!question) {
                alert('Please enter your question.');
                return;
            }

            if (!category) {
                alert('Please select a category for your question.');
                return;
            }

            if (parseInt(captchaInput) !== captchaAnswer) {
                alert('Please solve the math problem correctly.');
                return;
            }

            // Simulate posting question
            const questionsList = document.getElementById('questions-list');
            if (questionsList) {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question-item';
                questionDiv.innerHTML = `
                    <div class="question-header">
                        <span class="question-avatar">${getAvatarDisplay(selectedAvatar)}</span>
                        <span class="question-category">${category}</span>
                        <span class="question-time">Just now</span>
                    </div>
                    <div class="question-content">${question}</div>
                    <div class="question-actions">
                        <button class="answer-btn">Answer this Lüva</button>
                        <span class="answers-count">0 answers</span>
                    </div>
                `;
                
                questionsList.insertBefore(questionDiv, questionsList.firstChild);
            }

            // Reset form
            questionInput.value = '';
            document.getElementById('category-select').value = '';
            document.getElementById('captcha-input').value = '';
            captchaAnswer = generateCaptcha();

            alert('Your question has been posted! Other Lüvas will help answer it soon. 💖');
        });
    }

    function getAvatarDisplay(avatarType) {
        const avatarMap = {
            'default1': '🌸',
            'default2': '💝',
            'default3': '🌺',
            'default4': '✨',
            'default5': '🦋'
        };
        
        if (avatarType === 'custom') {
            const customOption = document.querySelector('[data-avatar="custom"] img');
            return customOption ? customOption.outerHTML : '👤';
        }
        
        return avatarMap[avatarType] || '👤';
    }

    // Initialize with sample questions
    function loadSampleQuestions() {
        const questionsList = document.getElementById('questions-list');
        if (questionsList) {
            const sampleQuestions = [
                {
                    avatar: '🌸',
                    category: 'relationships',
                    time: '2 hours ago',
                    content: 'How do I know if someone genuinely cares about me?',
                    answers: 5
                },
                {
                    avatar: '💝',
                    category: 'mental-health',
                    time: '1 day ago',
                    content: 'Feeling overwhelmed lately. Any tips for managing stress?',
                    answers: 12
                },
                {
                    avatar: '🌺',
                    category: 'personal-growth',
                    time: '3 days ago',
                    content: 'How do you stay motivated when working toward long-term goals?',
                    answers: 8
                }
            ];

            sampleQuestions.forEach(q => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question-item';
                questionDiv.innerHTML = `
                    <div class="question-header">
                        <span class="question-avatar">${q.avatar}</span>
                        <span class="question-category">${q.category}</span>
                        <span class="question-time">${q.time}</span>
                    </div>
                    <div class="question-content">${q.content}</div>
                    <div class="question-actions">
                        <button class="answer-btn">Answer this Lüva</button>
                        <span class="answers-count">${q.answers} answers</span>
                    </div>
                `;
                questionsList.appendChild(questionDiv);
            });
        }
    }

    // Load sample questions on page load
    loadSampleQuestions();

    // Track IP (client-side simulation - would be server-side in production)
    function trackUserInfo() {
        const userInfo = {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenResolution: `${screen.width}x${screen.height}`,
            // Note: Actual IP tracking would be done server-side
        };
        
        // In production, this would send to a secure endpoint
        console.log('User info tracked for safety:', userInfo);
    }

    // Initialize tracking
    trackUserInfo();
});

// Share functionality
function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Join me on Lüvable - where genuine connections flourish! 💖');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    applyShareDiscount();
}

function shareToInstagram() {
    // Instagram doesn't have direct URL sharing, so we copy text for users to paste
    const text = 'Join me on Lüvable - where genuine connections flourish! 💖 ' + window.location.href;
    navigator.clipboard.writeText(text).then(() => {
        alert('Share text copied! Paste it in your Instagram story or post. 📷');
        applyShareDiscount();
    });
}

function shareToTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Join me on Lüvable - where genuine connections flourish! 💖');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    applyShareDiscount();
}

function shareToLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    applyShareDiscount();
}

function copyShareLink() {
    const shareText = 'Join me on Lüvable - where genuine connections flourish! 💖 ' + window.location.href;
    navigator.clipboard.writeText(shareText).then(() => {
        alert('Share link copied to clipboard! 🔗');
        applyShareDiscount();
    });
}

function applyShareDiscount() {
    const shareSuccess = document.getElementById('share-success');
    const productDescription = document.querySelector('.product-description');
    
    if (shareSuccess && shareSuccess.style.display !== 'block') {
        shareSuccess.style.display = 'block';
        
        // Update price display
        if (productDescription) {
            productDescription.innerHTML = `
                Lüvable — Less than a latte for 2 hours of real connection.<br>
                <strong style="text-decoration: line-through;">Price: $4</strong> 
                <strong style="color: #e75480;">Special Price: $2</strong> 
                <span class="discount-note">(Thanks for sharing! 💖)</span>
            `;
        }
    }
}