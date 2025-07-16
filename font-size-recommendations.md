# Font Size Optimization Recommendations

## Hero Slide (Slide 1)

### Current vs Recommended:
```css
/* Hero Title - Currently: clamp(3rem, 7vw, 8rem) */
.hero-main-title {
    font-size: clamp(3.5rem, 8vw, 10rem);  /* Increased min, vw, and max */
}

/* Hero Subtitle - Currently: clamp(1rem, 2vw, 2.2rem) */
.hero-subtitle {
    font-size: clamp(1.2rem, 2.5vw, 2.8rem);  /* Increased all values */
}

/* Hero Meta - Currently: clamp(0.9rem, 1.2vw, 1.4rem) */
.hero-meta {
    font-size: clamp(1rem, 1.5vw, 1.8rem);  /* Increased for better readability */
}

/* CTA Button - Currently: 1.3rem */
.cta-btn {
    font-size: clamp(1.4rem, 1.8vw, 2rem);  /* Make responsive with clamp */
    padding: 24px 70px;  /* Slightly larger padding */
}
```

## Content Slides (Slides 2-10)

### Main Titles:
```css
/* Slide Title - Currently: clamp(2rem, 4vw, 5rem) */
.slide-title {
    font-size: clamp(2.5rem, 5vw, 6.5rem);  /* Increased significantly */
}

/* Slide Subtitle - Currently: clamp(1rem, 1.5vw, 2rem) */
.slide-subtitle {
    font-size: clamp(1.2rem, 2vw, 2.5rem);  /* Increased all values */
}
```

## Table of Contents (Slide 2)

```css
/* TOC Card Heading - Currently: clamp(1rem, 1.5vw, 2rem) */
.toc-card h3 {
    font-size: clamp(1.2rem, 1.8vw, 2.4rem);  /* Increased */
}

/* TOC Card Description - Currently: clamp(0.8rem, 1vw, 1.3rem) */
.toc-card p {
    font-size: clamp(0.9rem, 1.2vw, 1.6rem);  /* Increased */
}

/* TOC Icon - Currently: clamp(2rem, 3.5vw, 5rem) */
.toc-icon {
    font-size: clamp(2.5rem, 4vw, 6rem);  /* Larger icons */
}
```

## Protected Characteristics (Slide 5)

```css
/* Characteristic Heading - Currently: clamp(0.9rem, 1.4vw, 1.2rem) */
.characteristic-card h3 {
    font-size: clamp(1.1rem, 1.8vw, 1.8rem);  /* Increased */
}

/* Characteristic Description - Currently: clamp(0.75rem, 1.1vw, 0.9rem) */
.characteristic-card p {
    font-size: clamp(0.9rem, 1.3vw, 1.2rem);  /* More readable */
}

/* Characteristic Icon - Currently: clamp(1.8rem, 3vw, 2.5rem) */
.char-icon {
    font-size: clamp(2.2rem, 3.5vw, 3.5rem);  /* Larger icons */
}
```

## Body Text & Lists

```css
/* General paragraph text */
p {
    font-size: clamp(1rem, 1.4vw, 1.6rem);  /* Base increase */
}

/* List items */
li {
    font-size: clamp(0.9rem, 1.3vw, 1.4rem);  /* More readable */
}

/* Info boxes and reminders */
.info-box, .reminder-box, .warning-box {
    font-size: clamp(1rem, 1.5vw, 1.4rem);  /* Increased */
}
```

## Section Headers

```css
/* H3 headers - Currently: various */
h3 {
    font-size: clamp(1.3rem, 2.2vw, 2.8rem);  /* Consistent increase */
}

/* H4 headers */
h4 {
    font-size: clamp(1rem, 1.6vw, 1.8rem);  /* More prominent */
}
```

## Navigation & UI Elements

```css
/* Progress numbers */
.timeline-number, .step-number {
    font-size: clamp(1.2rem, 2vw, 2rem);  /* Larger numbers */
}

/* Tab buttons */
.tab-btn {
    font-size: clamp(0.9rem, 1.4vw, 1.3rem);  /* Increased */
}
```

## Implementation Tips:

1. **Test incrementally**: Apply changes one section at a time
2. **Check overflow**: Ensure content doesn't overflow containers
3. **Maintain hierarchy**: Keep relative size differences between elements
4. **Test on actual devices**: Not just browser resize
5. **Consider line-height**: May need to adjust with larger fonts

## Additional Recommendations:

1. **Increase content wrapper size** on larger screens:
   ```css
   .content-wrapper {
       width: clamp(75vw, 80vw, 1800px);  /* Allow more width on large screens */
       max-width: 1800px;  /* Cap for ultra-wide */
   }
   ```

2. **Adjust padding/margins** proportionally:
   ```css
   .content-wrapper {
       padding: clamp(40px, 5vw, 80px);  /* Responsive padding */
   }
   ```

3. **Consider viewport-based spacing**:
   ```css
   .characteristics-grid {
       gap: clamp(20px, 3vw, 40px);  /* Responsive gaps */
   }
   ```

These changes will significantly improve readability while maintaining the responsive design and preventing overflow at smaller viewports.