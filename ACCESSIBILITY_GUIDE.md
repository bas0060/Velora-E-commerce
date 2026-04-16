# Accessibility (a11y) Implementation Guide

This guide documents accessibility standards and patterns used in the Velora e-commerce application.

## WCAG 2.1 Compliance Level: AA

The application follows Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.

---

## Implemented Accessibility Patterns

### 1. Navigation & Structure

#### Landmark Regions

```jsx
<header role="banner">Navigation</header>
<main role="main">Page Content</main>
<footer role="contentinfo">Footer</footer>
<nav aria-label="Primary Navigation">Menu</nav>
```

#### Breadcrumb Navigation

```jsx
<nav aria-label="breadcrumb">
  <ol>
    <li>
      <a href="/shop">Shop</a>
    </li>
    <li aria-current="page">Product</li>
  </ol>
</nav>
```

### 2. Form Accessibility

#### Proper Label Association

```jsx
<label htmlFor="email">Email Address</label>
<input id="email" type="email" required />

<!-- Alternative using aria-label -->
<input aria-label="Email address" type="email" />
```

#### Error Messages

```jsx
<input
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>;
{
  hasError && (
    <p id="email-error" role="alert">
      {error}
    </p>
  );
}
```

#### Input Sizing (Mobile)

```jsx
/* iOS requires 16px to prevent zoom */
input {
  font-size: 16px;
  -webkit-appearance: none;
}
```

### 3. Image Accessibility

#### All Images Must Have Alt Text

```jsx
/* GOOD */
<img src="product.jpg" alt="Red winter coat with wool lining" />

/* BAD */
<img src="product.jpg" alt="product" />
<img src="icon.svg" alt="" /> /* Hidden from screen readers */

/* Decorative Images */
<img src="divider.svg" alt="" aria-hidden="true" />
```

#### Hero Images

```jsx
<img
  src="hero.jpg"
  alt="A woman wearing a green dress shopping in an outdoor market"
  role="img"
/>
```

#### Product Images

```jsx
<img
  src={product.image}
  alt={`${product.name} - ${product.color} color, ${product.size} size`}
/>
```

### 4. Interactive Elements

#### Button Accessibility

```jsx
/* Descriptive button text */
<button>Delete Account</button> /* GOOD */
<button>Delete</button> /* BAD */

/* Icon-only buttons need aria-label */
<button aria-label="Add to favorites">
  <FavoriteIcon />
</button>

/* aria-pressed for toggle buttons */
<button
  aria-pressed={isActive}
  onClick={toggle}
>
  {isActive ? 'Following' : 'Follow'}
</button>
```

#### Link Accessibility

```jsx
/* Descriptive link text */
<Link to="/privacy">Read our privacy policy</Link> /* GOOD */
<Link to="/privacy">Click here</Link> /* BAD */

/* External links should indicate so */
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit Example (opens in new window)"
>
  Example Site
</a>
```

### 5. Dynamic Content & Updates

#### Live Regions

```jsx
/* Announce updates to screen readers */
<div role="status" aria-live="polite" aria-atomic="true">
  {successMessage}
</div>

<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

#### Loading States

```jsx
<div aria-busy={isLoading} role="status">
  {isLoading ? "Loading..." : "Loaded"}
</div>
```

### 6. Modal & Dialog Accessibility

```jsx
<div
  role="dialog"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
  aria-modal="true"
>
  <h2 id="dialog-title">Confirm Purchase</h2>
  <p id="dialog-description">Are you sure you want to proceed?</p>
  <button onClick={closeModal} autoFocus>
    Cancel
  </button>
</div>
```

### 7. Product Carousel/Carousel Accessibility

```jsx
<div role="region" aria-label="Featured Products">
  <button aria-label="Previous product" onClick={handlePrevious}>
    ←
  </button>

  <ul>
    {products.map((product, index) => (
      <li key={product.id} aria-label={`${index + 1} of ${products.length}`}>
        <Product {...product} />
      </li>
    ))}
  </ul>

  <button aria-label="Next product" onClick={handleNext}>
    →
  </button>
</div>
```

### 8. Footer Improvements (Implemented)

#### Social Links

```jsx
<a
  href="https://facebook.com/velora"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit Velora on Facebook"
>
  <img src={fbIcon} alt="Facebook" />
</a>
```

#### Payment Methods

```jsx
<img src={visaIcon} alt="Visa payment method accepted" />
<img src={paypalIcon} alt="PayPal payment method accepted" />
```

---

## Color & Contrast

### WCAG AA Requirements

- **Normal text**: 4.5:1 contrast ratio
- **Large text** (18pt+): 3:1 contrast ratio
- **Graphics**: 3:1 contrast ratio

### Implementation

```css
/* Ensure sufficient contrast */
.text-primary {
  color: #212121;
} /* Dark on light */
.text-on-primary {
  color: #ffffff;
} /* Light on dark */

/* Test with: WebAIM Color Contrast Checker */
```

---

## Focus Management & Keyboard Navigation

### Tab Order

```jsx
/* Natural tab order follows source order */
<button tabIndex={0}>First</button>
<button tabIndex={1}>Second</button>

/* Only for complex widgets */
<div role="menubar">
  <button role="menuitem" tabIndex={-1}>Item 1</button>
  <button role="menuitem" tabIndex={-1}>Item 2</button>
</div>
```

### Focus Styles (MUST NOT BE REMOVED)

```css
button:focus,
a:focus {
  outline: 3px solid #4f46e5;
  outline-offset: 2px;
}

/* Don't use */
:focus {
  outline: none;
} /* BREAKS KEYBOARD NAVIGATION */
```

### Skip Navigation Link

```jsx
<a href="#main-content" className="sr-only">
  Skip to main content
</a>

<main id="main-content">
  Page content
</main>
```

---

## Semantic HTML Usage

```jsx
/* USE SEMANTIC ELEMENTS */
<header>Logo & Navigation</header>
<nav>Menu</nav>
<main>Page Content</main>
<article>Blog Post</article>
<section>Related Products</section>
<aside>Sidebar</aside>
<footer>Footer</footer>

/* DON'T USE DIVS FOR EVERYTHING */
/* <div className="header"> is less accessible than <header> */
```

---

## Reduced Motion Preference

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Screen Reader Testing Checklist

### Before Deploying Changes

- [ ] Test with NVDA (Windows) or VoiceOver (Mac/iOS)
- [ ] Verify all images have descriptive alt text
- [ ] Check form labels are associated with inputs
- [ ] Verify buttons and links have descriptive text
- [ ] Test keyboard navigation (Tab, Shift+Tab, Enter)
- [ ] Test focus indicators visible on all interactive elements
- [ ] Verify dynamic content is announced
- [ ] Check contrast ratios with WCAG AA requirements

### Tools

- **NVDA**: Free screen reader for Windows
- **JAWS**: Premium screen reader (trial available)
- **VoiceOver**: Built-in on macOS and iOS
- **Chrome DevTools**: Accessibility audit
- **Axe DevTools**: Browser extension for accessibility testing

---

## Accessibility Testing Commands

```bash
# Use Chrome DevTools
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Select "Accessibility"
# 4. Click "Generate Report"

# Or use Axe browser extension
# Elements -> Axe DevTools -> Scan Page
```

---

## Common Mistakes to Avoid

### ❌ DON'T Do This

```jsx
/* Missing alt text */
<img src="product.jpg" />

/* Non-descriptive button text */
<button>Click</button>

/* No label for input */
<input type="email" />

/* Using divs for buttons */
<div onClick={handler}>Button</div>

/* Missing focus outline */
:focus { outline: none; }

/* Placeholder instead of label */
<input placeholder="Email" />

/* Auto-playing audio/video */
<video autoPlay muted>

/* Keyboard trap */
setInterval(() => element.focus(), 100);
```

### ✅ DO This Instead

```jsx
/* Descriptive alt text */
<img src="product.jpg" alt="Blue leather handbag" />

/* Descriptive button text */
<button>Add to Cart</button>

/* Associated label */
<label htmlFor="email">Email</label>
<input id="email" type="email" />

/* Proper semantic button */
<button onClick={handler}>Button</button>

/* Visible focus outline */
:focus { outline: 3px solid #4F46E5; }

/* Label for input */
<label htmlFor="email">Email</label>
<input id="email" type="email" />

/* User-initiated audio */
<button onClick={() => audio.play()}>Play</button>

/* Proper keyboard handling */
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Button
</button>
```

---

## Accessibility Audit Results

### Current Status (Post-Implementation)

- ✅ Route landmarks properly defined
- ✅ Images have descriptive alt text
- ✅ Forms have associated labels
- ✅ Buttons and links are descriptive
- ✅ Color contrast meets WCAG AA
- ✅ Keyboard navigation supported
- ✅ Focus indicators visible
- ✅ No keyboard traps
- ✅ Semantic HTML used correctly
- ✅ Footer social icons accessible

### Areas for Further Improvement

- [ ] Add skip navigation link to homepage
- [ ] Audit all modal dialogs for proper focus management
- [ ] Test with real screen reader users
- [ ] Add ARIA labels to carousel regions
- [ ] Verify form error messages are announced

---

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resource Library](https://webaim.org/resources/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [React Accessibility](https://react.dev/learn/accessibility)
- [Apple Accessibility](https://www.apple.com/accessibility/)
