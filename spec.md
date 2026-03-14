# Baby Learning Game

## Current State
App has 23 modes including Stories (StoryGame), all rendered in App.tsx. StoryGame has 5 English-only stories. HomeScreen shows all mode cards in a 2-3 column grid.

## Requested Changes (Diff)

### Add
- **Hindi text in stories**: Each story page should show both English text AND Hindi translation below it
- **Videos section**: New VideoGame screen with curated baby YouTube videos (ABC Song, Hindi Varnamala, Phonics, Nursery Rhymes, Counting Song, etc.) displayed as clickable cards that open in a new tab or embed inline
- **Unique games**:
  - **Balloon Pop Game**: Colorful animated balloons float up, baby taps to pop them with sound and score
  - **Color Mixing Game**: Mix two colors together to see what color they make (interactive)

### Modify
- StoryGame.tsx: Add Hindi text field to each story page, display below English text in a distinct style
- App.tsx: Add new screens "videos", "balloon", "colormix" to GameScreen type and render them
- HomeScreen.tsx: Add new game cards for Videos, Balloon Pop, Color Mixing

### Remove
- Nothing removed

## Implementation Plan
1. Update stories data in StoryGame.tsx with `hindiText` field on each page
2. Update StoryReader component to render Hindi text below English text
3. Create VideoGame.tsx with baby learning YouTube video links as cards
4. Create BalloonGame.tsx with animated popping balloons (CSS animations, click to pop, score counter)
5. Create ColorMixGame.tsx with interactive color mixing (select two colors, see result)
6. Update App.tsx with new GameScreen types and route components
7. Update HomeScreen.tsx with new game cards
