# Brand Assets

This document provides guidelines for using Lüvable brand assets including the logo and heart icon.

## Logo Usage

### Primary Logo
- **File**: `assets/logo.png`
- **Format**: PNG with transparency
- **Size**: 200x200px (scalable)
- **Colors**: Pink (#e75480) and Purple (#4B2E83)

#### Usage Guidelines
- Always use the logo on light backgrounds for optimal contrast
- Maintain clear space around the logo equal to half the logo's height
- Do not modify the logo colors or proportions
- Minimum size: 40px width for web usage

#### Examples
```html
<!-- Standard usage in header -->
<img src="assets/logo.png" alt="Lüvable Logo" id="logo" />

<!-- With specific sizing -->
<img src="assets/logo.png" alt="Lüvable Logo" style="width: 80px; height: 80px;" />
```

## Heart Icon

The heart icon is extracted from the main logo and available in both SVG and PNG formats for flexible use throughout the application.

### Heart SVG
- **File**: `assets/heart.svg`
- **Format**: Scalable Vector Graphics
- **Color**: Pink (#e75480)
- **Best for**: UI components, scalable elements, icons in text

#### Usage Guidelines
- Use SVG format when you need crisp scaling at any size
- Perfect for inline icons, buttons, and interactive elements
- Can be styled with CSS for hover effects and color changes

#### Examples
```html
<!-- Inline SVG usage -->
<img src="assets/heart.svg" alt="Heart" class="heart-icon" />

<!-- In buttons -->
<button><img src="assets/heart.svg" alt="Heart" style="width: 16px;"> Like</button>
```

### Heart PNG
- **File**: `assets/heart.png`
- **Format**: PNG with transparency
- **Size**: 100x100px
- **Color**: Pink (#e75480)
- **Best for**: Fixed-size implementations, email templates, social media

#### Usage Guidelines
- Use PNG format when SVG is not supported
- Ideal for email templates and social media assets
- Maintains consistent appearance across platforms

#### Examples
```html
<!-- Standard usage -->
<img src="assets/heart.png" alt="Heart" class="heart-icon" />

<!-- In social sharing -->
<a href="#share"><img src="assets/heart.png" alt="Share with love" style="width: 24px;"></a>
```

## Color Palette

The Lüvable brand uses a warm, welcoming color palette:

- **Primary Pink**: #e75480 - Used for the heart icon and primary accents
- **Primary Purple**: #4B2E83 - Used for logo text and secondary elements
- **Light Pink**: #ffb6c1 - Used for backgrounds and lighter accents
- **Background**: #fff6f0 - Primary background color

## Do's and Don'ts

### Do's
✅ Use the provided assets in their original colors  
✅ Maintain proper spacing around logos and icons  
✅ Use SVG format when possible for crisp scaling  
✅ Keep the heart icon consistent with brand colors  

### Don'ts
❌ Do not modify the logo proportions or colors  
❌ Do not use the logo on backgrounds that reduce visibility  
❌ Do not create derivative versions without approval  
❌ Do not use outdated or modified versions of brand assets  

## Technical Requirements

- All assets are optimized for web use
- PNG files include transparency for flexible backgrounds
- SVG files are clean and minimal for fast loading
- Assets follow semantic naming conventions

For questions about brand asset usage, please refer to the brand guidelines or contact the design team.