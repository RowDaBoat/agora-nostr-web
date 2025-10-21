# Invite Acceptance Notifications - QA Manual Test Plan

## Test Setup
1. Ensure you have two test accounts:
   - Account A (inviter): The account that sends invites
   - Account B (invitee): The account that accepts invites

## Test Cases

### Test 1: Invite Acceptance Notification Appears
**Objective**: Verify kind 514 events create notifications

**Steps**:
1. Login as Account A
2. Create and send an invite to Account B
3. Login as Account B and accept the invite (complete onboarding)
4. Login back as Account A
5. Navigate to Notifications page

**Expected Result**:
- A new notification appears showing "[Account B display name] accepted your invite 🎉"
- Green checkmark icon is visible
- Timestamp shows when the invite was accepted

### Test 2: Follow Button Appears When Not Following
**Objective**: Verify Follow button shows when not following the invitee

**Steps**:
1. Login as Account A
2. Ensure you're NOT following Account B
3. Navigate to Notifications page
4. Find the invite acceptance notification from Account B

**Expected Result**:
- A "Follow" button is visible in the notification
- Button has "+" icon and "Follow" text

### Test 3: Follow Button Hidden When Already Following
**Objective**: Verify Follow button hides when already following

**Steps**:
1. Login as Account A
2. Follow Account B
3. Navigate to Notifications page
4. Find the invite acceptance notification from Account B

**Expected Result**:
- No Follow button is visible
- Notification shows profile info only

### Test 4: Follow Button Functionality
**Objective**: Verify clicking Follow button works correctly

**Steps**:
1. Login as Account A
2. Navigate to Notifications page
3. Find invite notification with Follow button
4. Click the Follow button

**Expected Result**:
- Button shows loading spinner briefly
- Success toast appears: "Now following"
- Follow button disappears from notification
- User is added to follows list

### Test 5: Follow Button Error Handling
**Objective**: Verify error handling when follow fails

**Steps**:
1. Login as Account A
2. Disconnect from internet or simulate network error
3. Navigate to Notifications page
4. Click Follow button on invite notification

**Expected Result**:
- Error toast appears: "Failed to update follow status"
- Button returns to normal state
- User can try again

### Test 6: Profile Info Fallback
**Objective**: Verify display when invitee has no profile

**Steps**:
1. Create Account B with no profile metadata
2. Accept invite from Account A as Account B
3. Login as Account A
4. Navigate to Notifications page

**Expected Result**:
- Notification shows first 8 characters of pubkey + "..."
- Default avatar is displayed
- No bio section appears (since none exists)
- Follow button still functions correctly

### Test 7: Invite Filter
**Objective**: Verify Invites filter tab works

**Steps**:
1. Login as Account A with multiple notification types
2. Navigate to Notifications page
3. Click "Invites" filter tab

**Expected Result**:
- Only invite acceptance notifications are shown
- Filter tab shows count of invite notifications
- Other notification types are hidden

### Test 8: Tag Detection
**Objective**: Verify only invite acceptances tagging us appear

**Steps**:
1. Login as Account A
2. Have Account B (whom you invited) accept invite
3. Have Account C (whom you did NOT invite) accept someone else's invite
4. Navigate to Notifications page

**Expected Result**:
- Notification from Account B appears (tags Account A)
- NO notification from Account C appears (doesn't tag Account A)

### Test 9: Accessibility
**Objective**: Verify accessibility features

**Steps**:
1. Navigate to Notifications page with invite notifications
2. Use keyboard Tab key to navigate
3. Inspect aria-labels with screen reader or dev tools

**Expected Result**:
- Follow button has `aria-label="Follow"` or `aria-label="Unfollow"`
- Follow button is keyboard accessible
- Focus states are visible
- Button is disabled during loading (can't double-click)

### Test 10: Unread Count
**Objective**: Verify invite notifications increment unread count

**Steps**:
1. Login as Account A
2. Have Account B accept invite while logged in
3. Check notification badge/count

**Expected Result**:
- Unread count increments
- Invite appears in "All" filter
- Invite appears in "Invites" filter

## Performance Verification

### Check 1: No Duplicate Subscriptions
1. Open browser DevTools Network tab
2. Filter for WebSocket connections
3. Login and navigate to Notifications page
4. Verify only one subscription for kind 514 events

**Expected**: Single subscription with filter `kinds: [1, 1111, 6, 16, 7, 9735, 514]` and `#p: [user_pubkey]`

### Check 2: Filter Efficiency
1. Verify subscription uses `#p` tag filter at relay level
2. Confirm no client-side filtering of all 514 events

**Expected**: Relay returns only 514 events tagging current user

## Screenshots Needed
- [ ] Invite notification with Follow button (not following state)
- [ ] Invite notification without Follow button (already following state)
- [ ] Follow button loading state
- [ ] Success toast after following
- [ ] Error toast on failure
- [ ] Profile info fallback (no profile case)
- [ ] Invites filter tab with count
