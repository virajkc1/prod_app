# Capto App - Pre-Launch Checklist (20 Tasks)

## 🔴 Critical Functionality (Must Have)

### 1. **Connect Create Post to Storage**

- Add state management for title, topic, and lessons inputs
- Generate unique IDs for posts (use `uuid` or timestamp-based IDs)
- Implement form validation (title and topic required, at least one lesson)
- Connect Submit button to `savePosts()` function
- Add success feedback (toast/alert) and navigate back to home
- Filter out empty lessons before saving

### 2. **Connect Home Page to Real Data**

- Replace hardcoded `lessons` array with data from `getPosts()`
- Add `useEffect` to load posts on component mount
- Map stored posts to the lesson card format
- Extract topics dynamically from posts
- Show "Latest Learnings" from the most recent post
- Handle empty state when no posts exist

### 3. **Fix Storage savePosts Logic**

- Current implementation spreads array incorrectly
- Should save single post: `savePost(post: Post)` function
- OR fix `savePosts` to handle appending correctly
- Add function to save single post: `savePost(post: Post)`

### 4. **Add Date Generation for Posts**

- Generate current date in format used (DD/MM/YYYY)
- Store date when post is created
- Display dates correctly on home page

### 5. **Implement Navigation Flow**

- Add logic to check if user completed onboarding
- Store onboarding completion in AsyncStorage
- Route to onboarding if not completed, else to tabs
- Handle navigation from onboarding completion to tabs

## 🟠 Core Features (Should Have)

### 6. **Complete Topics Screen**

- Display all unique topics from posts
- Allow filtering posts by topic
- Show post count per topic
- Add topic color mapping logic
- Implement topic selection/filtering

### 7. **Complete Search Screen**

- Add search input field
- Implement search functionality across post titles, topics, and lessons
- Display filtered results
- Add empty state for no search results
- Highlight search terms in results

### 8. **Complete Profile Screen**

- Display user name (from onboarding or default)
- Show total posts count
- Show current streak calculation
- Display account creation date
- Add settings/options section

### 9. **Implement Post Expansion Feature**

- Add expand/collapse functionality on home page
- Show full post details when expanded
- Store expanded state per post
- Add animation for expand/collapse

### 10. **Add Delete/Edit Post Functionality**

    - Add delete button to posts
    - Implement delete function in storage utils
    - Add edit functionality (navigate to create-post with pre-filled data)
    - Add confirmation dialog for delete

## 🟡 User Experience (Nice to Have)

### 11. **Add Loading States**

    - Show loading spinner when fetching posts
    - Add loading state for form submission
    - Add skeleton loaders for better UX
    - Handle async operations with proper loading indicators

### 12. **Add Error Handling**

    - Add try-catch blocks where missing
    - Show user-friendly error messages
    - Handle storage errors gracefully
    - Add error boundaries for React components
    - Log errors appropriately

### 13. **Form Validation & User Feedback**

    - Validate required fields before submission
    - Show inline error messages
    - Add character limits for inputs
    - Prevent duplicate empty lessons
    - Add success/error toasts or alerts

### 14. **Implement Streak Calculation**

    - Calculate streak based on consecutive days with posts
    - Store last post date
    - Update streak on home page
    - Reset streak if gap detected

### 15. **Add Empty States**

    - Empty state for home page (no posts)
    - Empty state for search (no results)
    - Empty state for topics (no topics)
    - Provide helpful guidance in empty states

## 🟢 Polish & Optimization

### 16. **Calendar Functionality**

    - Make calendar interactive (show dates with posts)
    - Highlight current date
    - Show post count per day on calendar
    - Add tap to filter by date

### 17. **New Topic Feature**

    - Implement "New Topic" button functionality
    - Create topic management screen or modal
    - Allow creating custom topic colors
    - Validate topic names

### 18. **Performance Optimization**

    - Optimize re-renders with React.memo where needed
    - Add proper key props to lists
    - Optimize image loading if adding images
    - Debounce search input
    - Use useMemo for expensive calculations

### 19. **Accessibility**

    - Add accessibility labels to buttons and inputs
    - Ensure proper contrast ratios
    - Add screen reader support
    - Test with accessibility tools
    - Add proper focus management

### 20. **Final Testing & Bug Fixes**

    - Test all user flows end-to-end
    - Test on iOS and Android devices
    - Test edge cases (empty data, large datasets)
    - Fix any UI/UX inconsistencies
    - Test onboarding flow completion
    - Verify data persistence across app restarts
    - Test form validation edge cases
    - Performance testing with many posts

---

## Additional Recommendations (Post-Launch)

- Add post sharing functionality
- Add data export feature
- Add dark mode support
- Add analytics tracking
- Add crash reporting
- Add push notifications for streak reminders
- Add search history
- Add favorite/bookmark posts
- Add post categories/tags
- Add backup/restore functionality
