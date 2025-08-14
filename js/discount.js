// Lüvable Discount & Referral System
// Implements 50% discount windows with 7-day periods and stacking logic

class LuvaDiscountSystem {
  constructor() {
    this.storageKeys = {
      expiry: 'luvaDiscountExpiry',
      referralCount: 'luvaDiscountReferralCount', 
      rotationIndex: 'luvaDiscountRotationIndex',
      heartPulseShown: 'luvaHeartPulseShown'
    };
    
    this.successMessages = [
      "Amazing! You've unlocked a 50% discount for 7 days",
      "Fantastic! Your discount window is now active", 
      "Wonderful! You're spreading the Lüvable love"
    ];
    
    this.init();
  }
  
  init() {
    // Add canonical heart SVG symbol to document
    this.addHeartSymbol();
    
    // Initialize discount badge if active
    this.updateDiscountBadge();
    
    // Start timer for badge updates
    this.startBadgeTimer();
  }
  
  addHeartSymbol() {
    // Add the canonical SVG symbol definition
    const svgDefs = document.createElement('div');
    svgDefs.innerHTML = `
      <svg style="display: none;">
        <defs>
          <symbol id="icon-heart-luvable" viewBox="0 0 100 100">
            <path d="M50.0,20.0 C80.0,5.0 95.0,35.0 50.0,85.0 C5.0,35.0 20.0,5.0 50.0,20.0 Z" fill="#e75480"/>
          </symbol>
          <symbol id="luvable-text" viewBox="0 0 200 40">
            <!-- L -->
            <path d="M10 5 L10 30 L25 30" stroke="#e75480" stroke-width="2" fill="none"/>
            <!-- u with dots -->
            <path d="M30 15 L30 25 Q30 30 35 30 Q40 30 40 25 L40 15" stroke="#e75480" stroke-width="2" fill="none"/>
            <circle cx="32" cy="8" r="1.5" fill="#e75480"/>
            <circle cx="38" cy="8" r="1.5" fill="#e75480"/>
            <!-- v -->
            <path d="M45 15 L50 30 L55 15" stroke="#e75480" stroke-width="2" fill="none"/>
            <!-- a -->
            <path d="M60 25 Q60 30 65 30 Q70 30 70 25 L70 15 Q70 10 65 10 Q60 10 60 15 L60 25 L70 20" stroke="#e75480" stroke-width="2" fill="none"/>
            <!-- b -->
            <path d="M75 5 L75 30 L75 20 Q75 15 80 15 Q85 15 85 20 Q85 25 80 25 Q75 25 75 20" stroke="#e75480" stroke-width="2" fill="none"/>
            <!-- l -->
            <path d="M90 5 L90 30" stroke="#e75480" stroke-width="2" fill="none"/>
            <!-- e -->
            <path d="M95 20 L110 20 Q110 15 105 15 Q100 15 100 20 Q100 25 105 25 Q110 25 110 22" stroke="#e75480" stroke-width="2" fill="none"/>
          </symbol>
        </defs>
      </svg>
    `;
    document.body.appendChild(svgDefs);
  }
  
  // Get discount expiry timestamp from localStorage
  getDiscountExpiry() {
    const expiry = localStorage.getItem(this.storageKeys.expiry);
    return expiry ? parseInt(expiry) : null;
  }
  
  // Set discount expiry timestamp
  setDiscountExpiry(timestamp) {
    localStorage.setItem(this.storageKeys.expiry, timestamp.toString());
  }
  
  // Get referral count
  getReferralCount() {
    const count = localStorage.getItem(this.storageKeys.referralCount);
    return count ? parseInt(count) : 0;
  }
  
  // Set referral count
  setReferralCount(count) {
    localStorage.setItem(this.storageKeys.referralCount, count.toString());
  }
  
  // Get rotation index for success messages
  getRotationIndex() {
    const index = localStorage.getItem(this.storageKeys.rotationIndex);
    return index ? parseInt(index) : 0;
  }
  
  // Set rotation index
  setRotationIndex(index) {
    localStorage.setItem(this.storageKeys.rotationIndex, index.toString());
  }
  
  // Check if heart pulse has been shown
  hasHeartPulseShown() {
    return localStorage.getItem(this.storageKeys.heartPulseShown) === 'true';
  }
  
  // Mark heart pulse as shown
  setHeartPulseShown() {
    localStorage.setItem(this.storageKeys.heartPulseShown, 'true');
  }
  
  // Check if discount is currently active
  isDiscountActive() {
    const expiry = this.getDiscountExpiry();
    return expiry && Date.now() < expiry;
  }
  
  // Get remaining time in milliseconds
  getRemainingTime() {
    const expiry = this.getDiscountExpiry();
    if (!expiry) return 0;
    return Math.max(0, expiry - Date.now());
  }
  
  // Format remaining time as "Xd Yh"
  formatRemainingTime(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else {
      return `${hours}h`;
    }
  }
  
  // Process a new share/referral
  processShare() {
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const currentExpiry = this.getDiscountExpiry();
    let extended = false;
    
    // Determine new expiry based on stacking logic
    let newExpiry;
    if (currentExpiry && now < currentExpiry) {
      // Extend existing discount by 7 days
      newExpiry = currentExpiry + sevenDays;
      extended = true;
    } else {
      // Start new 7-day discount period
      newExpiry = now + sevenDays;
    }
    
    // Update expiry and increment referral count
    this.setDiscountExpiry(newExpiry);
    const newReferralCount = this.getReferralCount() + 1;
    this.setReferralCount(newReferralCount);
    
    // Show success message
    this.showSuccessMessage(extended);
    
    // Update discount badge
    this.updateDiscountBadge();
    
    // Show extension note if extending
    if (extended) {
      this.showExtensionNote();
    }
    
    // Fire custom event
    this.fireDiscountUpdatedEvent(newExpiry, newReferralCount, extended);
    
    return {
      expiry: newExpiry,
      referralCount: newReferralCount,
      extended: extended
    };
  }
  
  // Show rotating success message
  showSuccessMessage(extended) {
    const index = this.getRotationIndex();
    const message = this.successMessages[index];
    
    // Update rotation index for next time
    const nextIndex = (index + 1) % this.successMessages.length;
    this.setRotationIndex(nextIndex);
    
    // Create or update success banner
    let banner = document.getElementById('luva-success-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'luva-success-banner';
      banner.className = 'luva-success-banner';
      
      // Insert after share section
      const shareSection = document.getElementById('share');
      if (shareSection && shareSection.parentNode) {
        shareSection.parentNode.insertBefore(banner, shareSection.nextSibling);
      }
    }
    
    banner.innerHTML = `
      <div class="success-content">
        <span class="success-message">${message}</span>
        <div class="encouragement">
          <svg class="heart-icon"><use href="#icon-heart-luvable"></use></svg>
          Earn another 7-day 50% discount every time you refer or share (no limit)
        </div>
      </div>
    `;
    
    banner.style.display = 'block';
    banner.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Show "+7 days added!" extension note
  showExtensionNote() {
    let note = document.getElementById('luva-extension-note');
    if (!note) {
      note = document.createElement('div');
      note.id = 'luva-extension-note';
      note.className = 'luva-extension-note';
      document.body.appendChild(note);
    }
    
    note.textContent = '+7 days added!';
    note.style.display = 'block';
    note.style.opacity = '1';
    
    // Fade out after 3 seconds
    setTimeout(() => {
      note.style.opacity = '0';
      setTimeout(() => {
        note.style.display = 'none';
      }, 500);
    }, 3000);
  }
  
  // Update discount badge
  updateDiscountBadge() {
    let badge = document.getElementById('luva-discount-badge');
    
    if (this.isDiscountActive()) {
      if (!badge) {
        badge = document.createElement('div');
        badge.id = 'luva-discount-badge';
        badge.className = 'luva-discount-badge';
        
        // Insert at top of main content
        const main = document.querySelector('main');
        if (main && main.firstElementChild) {
          main.insertBefore(badge, main.firstElementChild);
        }
      }
      
      const remainingTime = this.getRemainingTime();
      const formattedTime = this.formatRemainingTime(remainingTime);
      const referralCount = this.getReferralCount();
      
      let referralText = '';
      if (referralCount > 0) {
        referralText = ` (Referrals: ${referralCount})`;
      }
      
      badge.innerHTML = `
        <div class="badge-content">
          <span class="discount-text">
            <svg class="heart-icon"><use href="#icon-heart-luvable"></use></svg>
            50% OFF ACTIVE – ${formattedTime} left
          </span>
          ${referralText ? `<span class="referral-count">${referralText}</span>` : ''}
        </div>
      `;
      
      badge.style.display = 'block';
    } else if (badge) {
      badge.style.display = 'none';
    }
  }
  
  // Start timer to update badge every minute
  startBadgeTimer() {
    setInterval(() => {
      this.updateDiscountBadge();
    }, 60000); // Update every minute
  }
  
  // Fire custom event
  fireDiscountUpdatedEvent(expiry, referralCount, extended) {
    const event = new CustomEvent('luvaDiscountUpdated', {
      detail: {
        expiry: expiry,
        referralCount: referralCount,
        extended: extended
      }
    });
    document.dispatchEvent(event);
  }
}

// Initialize the discount system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.luvaDiscountSystem = new LuvaDiscountSystem();
});

// Export for use in other scripts
window.LuvaDiscountSystem = LuvaDiscountSystem;