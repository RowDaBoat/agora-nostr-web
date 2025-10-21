# Screenshots Required for Manual QA

## Overview

Due to the nature of E2E testing with Playwright and the requirement for real Nostr events and authentication, screenshots must be captured manually during QA testing.

## Required Screenshots

### 1. Invite Notification - Not Following State
**Filename**: `invite-notification-with-follow-button.png`

**Capture when**:
- User receives a kind 514 invite acceptance notification
- The invitee is NOT in the user's follows list
- Follow button is visible

**Should show**:
- ✅ Green checkmark icon
- ✅ User avatar (or default if no profile)
- ✅ Display name or pubkey fallback
- ✅ Text: "[Name] accepted your invite 🎉"
- ✅ Timestamp (e.g., "2 hours ago")
- ✅ User bio (if available)
- ✅ **Follow button with "+" icon and "Follow" text**

**How to capture**:
1. Have someone accept an invite you sent (or create test events)
2. Navigate to `/notifications`
3. Click "Invites" filter tab
4. Ensure you are NOT following the invitee
5. Take screenshot of the notification

---

### 2. Invite Notification - Already Following State
**Filename**: `invite-notification-without-follow-button.png`

**Capture when**:
- User receives a kind 514 invite acceptance notification
- The invitee IS in the user's follows list
- Follow button is NOT visible

**Should show**:
- ✅ Green checkmark icon
- ✅ User avatar (or default if no profile)
- ✅ Display name or pubkey fallback
- ✅ Text: "[Name] accepted your invite 🎉"
- ✅ Timestamp (e.g., "2 hours ago")
- ✅ User bio (if available)
- ❌ **NO Follow button** (because already following)

**How to capture**:
1. Follow the user who accepted your invite
2. Navigate to `/notifications`
3. Click "Invites" filter tab
4. Take screenshot of the notification (now without Follow button)

---

### 3. Follow Button - Loading State
**Filename**: `follow-button-loading-state.png`

**Capture when**:
- User clicks the Follow button
- Request is in flight (loading)

**Should show**:
- ✅ Spinning loader icon (replacing the "+" icon)
- ✅ Button appears disabled/grayed out (opacity-50)
- ✅ Cursor changes to not-allowed

**How to capture**:
1. Use browser dev tools to simulate slow network (Network throttling)
2. Click Follow button on an invite notification
3. Quickly take screenshot during loading state
4. Alternatively, add a delay in the code temporarily for screenshot

---

### 4. Follow Success Toast
**Filename**: `follow-success-toast.png`

**Capture when**:
- Follow button clicked successfully
- Success toast appears

**Should show**:
- ✅ Toast notification with message "Now following"
- ✅ Green/success styling
- ✅ Toast positioned appropriately on screen

**How to capture**:
1. Click Follow button on an invite notification
2. Immediately capture screenshot when toast appears
3. Toast disappears after 3 seconds, so be quick!

---

### 5. Follow Error Toast
**Filename**: `follow-error-toast.png`

**Capture when**:
- Follow button clicked but error occurs
- Error toast appears

**Should show**:
- ✅ Toast notification with message "Failed to update follow status"
- ✅ Red/error styling

**How to capture**:
1. Disconnect from network or simulate error
2. Click Follow button
3. Capture screenshot of error toast
4. Alternatively, temporarily modify code to throw error for screenshot

---

### 6. Invites Filter Tab
**Filename**: `invites-filter-tab.png`

**Capture when**:
- On notifications page
- Invites tab is selected
- Shows count of invite notifications

**Should show**:
- ✅ Filter tabs: All, Replies, Mentions, Quotes, Reactions, Reposts, Zaps, **Invites**
- ✅ Invites tab is highlighted/selected (primary color background)
- ✅ Count shown next to "Invites" if any exist (e.g., "Invites (3)")
- ✅ Only invite acceptance notifications visible in feed

**How to capture**:
1. Navigate to `/notifications`
2. Click "Invites" filter tab
3. Take full screenshot showing tabs and filtered notifications

---

### 7. Missing Profile Fallback
**Filename**: `invite-notification-no-profile.png`

**Capture when**:
- Invite acceptance from user with no profile metadata
- Shows pubkey fallback

**Should show**:
- ✅ Default/placeholder avatar
- ✅ Display name shows as "[first 8 chars]..." (e.g., "abc12345...")
- ✅ No bio section (hidden)
- ✅ Follow button still functional

**How to capture**:
1. Create a test account with no profile
2. Have it accept an invite from your main account
3. View notification on main account
4. Take screenshot showing fallback display

---

### 8. Keyboard Focus on Follow Button
**Filename**: `follow-button-keyboard-focus.png`

**Capture when**:
- Follow button has keyboard focus
- Focus ring is visible

**Should show**:
- ✅ Follow button with visible focus ring/outline
- ✅ Distinct focus styling

**How to capture**:
1. Navigate to notifications with keyboard (Tab key)
2. Tab to a Follow button until it has focus
3. Take screenshot showing focus ring

---

## Screenshot Specifications

- **Format**: PNG (preferred) or JPG
- **Resolution**: At least 1920x1080 for desktop, actual device resolution for mobile
- **Browser**: Use Chrome/Chromium for consistency
- **Zoom**: 100% browser zoom
- **Tool**: Use browser screenshot or OS screenshot tool
- **Annotations**: Add red boxes/arrows to highlight key elements (optional)

## Uploading Screenshots

1. Save screenshots with the exact filenames listed above
2. Place in `docs/screenshots/` directory
3. Commit and push to feature branch
4. Reference in PR description

## Alternative: Using Playwright for Screenshots

If you set up test fixtures with mock data, you can use Playwright to capture screenshots:

```typescript
test('capture invite notification with follow button', async ({ page }) => {
  // Setup mock data...
  await page.goto('/notifications');
  await page.getByRole('button', { name: /invites/i }).click();

  // Capture screenshot
  await page.screenshot({
    path: 'docs/screenshots/invite-notification-with-follow-button.png',
    fullPage: false
  });
});
```

## Manual QA Checklist

When capturing screenshots, also verify:
- [ ] All UI elements render correctly
- [ ] Colors match design (green checkmark, etc.)
- [ ] Typography is readable
- [ ] Spacing/margins are appropriate
- [ ] Mobile responsive (capture mobile screenshots too if possible)
- [ ] Dark mode (if implemented)
- [ ] Accessibility (check with screen reader or dev tools)

## Notes

- **Authentication Required**: You must be logged in to capture these screenshots
- **Real Events Required**: You need actual kind 514 events or test fixtures
- **Network Conditions**: Some screenshots require specific network states
- **Timing**: Some screenshots (like toasts) require quick capture

## Current Status

❌ **Screenshots not yet captured** - Manual QA required

**Reason**: Cannot capture screenshots in automated environment without running application and having real Nostr events. This requires:
1. Running dev server
2. Being authenticated
3. Having kind 514 events in the relay
4. Or creating test fixtures with mock data

**Next Steps**: QA team or reviewer should capture these during manual testing.
