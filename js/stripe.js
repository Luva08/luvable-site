// Stripe integration for Lüvable Chat
// Initialize Stripe with your publishable key
const stripe = Stripe('pk_live_51RvUXmGROms4OEfUb3izMmeRuLFsll93XInlfGw7zcYvToTAMa2qXEfPB7tyoj3IzlDOqxcPsSvjKiB77NvTcgC800ZRHOaVXn');

// Payment handler for the chat access
document.addEventListener('DOMContentLoaded', () => {
  const payBtn = document.getElementById('pay-btn');
  if (payBtn) {
    payBtn.addEventListener('click', async () => {
      try {
        // Show loading state
        payBtn.disabled = true;
        payBtn.innerHTML = '<svg class="heart-button"><use href="#icon-heart-luvable"></use></svg> Processing...';
        
        // In a real application, you would fetch the session ID from your backend
        // For now, we'll simulate the checkout process
        const response = await simulateCheckoutSession();
        
        if (response.sessionId) {
          // Redirect to Stripe Checkout
          await stripe.redirectToCheckout({
            sessionId: response.sessionId
          });
        } else {
          // Fallback for demo - show success message
          showPaymentSuccess();
        }
      } catch (error) {
        console.error('Payment error:', error);
        showPaymentError();
      } finally {
        // Reset button state
        payBtn.disabled = false;
        payBtn.innerHTML = '<svg class="heart-button"><use href="#icon-heart-luvable"></use></svg> Let\'s Chat';
      }
    });
  }
});

// Simulate checkout session creation (replace with actual backend call)
async function simulateCheckoutSession() {
  // In production, this would be a call to your backend
  // return fetch('/create-checkout-session', { method: 'POST' }).then(res => res.json());
  
  // For demo purposes, simulate success
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ sessionId: null }); // null means demo mode
    }, 1000);
  });
}

function showPaymentSuccess() {
  alert('🎉 Welcome to Lüvable! Your 2-hour chat session is now active. Enjoy meaningful connections!');
  // Enable chat functionality
  if (window.chatModerator) {
    window.chatModerator.enablePaidAccess();
  }
}

function showPaymentError() {
  alert('❌ Payment failed. Please try again or contact support if the problem persists.');
}

// Handle successful payments (called when user returns from Stripe)
function handlePaymentSuccess() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('payment') === 'success') {
    showPaymentSuccess();
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

// Check for payment success on page load
document.addEventListener('DOMContentLoaded', handlePaymentSuccess);
