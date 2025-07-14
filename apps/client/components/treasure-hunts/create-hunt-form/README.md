# Create Hunt Form Components

## Overview

A modern, card-based form system for creating treasure hunts in the mobile app. Features clean UI design, validation, theming support, internationalization, and interactive location selection.

## Components

### CreateHuntForm
The main form component with a modern card-based layout.

**Features:**
- Zod schema validation with React Hook Form
- Card-based sectioned layout with emojis
- Dark/Light theme support via NativeWind
- Multi-language support via i18next
- Reusable UI components from `@/components/ui`
- Mock submission (logs to console and navigates back)

### LocationPicker
Interactive map component for selecting hunt location.

**Features:**
- React Native Maps integration
- Dark mode map styling
- Auto-location detection on mount
- Tap to select location functionality
- Real-time coordinate display
- NativeWind styling

## UI Components Used

All form elements use reusable components from `@/components/ui`:

- **Input**: Text input with labels, validation, and multiline support
- **NumberInput**: Specialized numeric input with min/max constraints
- **Switch**: Toggle switch with labels and descriptions
- **DatePicker**: Modal date picker with platform-specific UI
- **SegmentedControl**: Multi-option selector for world type
- **Card**: Container component for organizing form sections
- **Button**: Primary action buttons with variants

## Layout Structure

The form is organized into themed cards:

1. **📝 Basic Information**
   - Hunt title (required)
   - Hunt description (optional)

2. **⚙️ Hunt Settings**
   - Public/Private toggle
   - Max participants (1-100)
   - World type selector (Real/Cartographic)
   - End date picker (optional)

3. **📍 Location**
   - Interactive map
   - Coordinate display
   - Auto-location detection

4. **Action Buttons**
   - Create Hunt (primary)
   - Cancel (outline)

## Styling

Uses NativeWind classes with design tokens from `tailwind.config.js`:

- **Colors**: Primary, secondary, accent, background, foreground, card, content
- **Design**: Card-based layout with shadows and rounded corners
- **Typography**: Consistent font sizes and weights
- **Spacing**: Consistent gap and padding values

## Schema

Validation via Zod schema:
- `title`: Required string (min 3 characters)
- `description`: Optional string (max 500 characters)  
- `isPublic`: Boolean for public/private hunt
- `maxParticipants`: Number (min 1, max 100)
- `worldType`: Enum ("real" | "cartographic")
- `endDate`: Optional future date
- `latitude`: Required number (auto-detected)
- `longitude`: Required number (auto-detected)

## Configuration

### Maps Setup
- **Android**: Google Maps API key in AndroidManifest.xml
- **iOS**: No additional configuration needed
- **Permissions**: Location permissions in AndroidManifest.xml

### Theming
Uses CSS custom properties via NativeWind:
- Light/Dark mode support
- Consistent color palette
- Responsive design tokens

## Usage

```tsx
import { CreateHuntForm } from "@/components/treasure-hunts/create-hunt-form"

const CreateHuntPage = () => (
  <View className="flex-1">
    <CreateHuntForm />
  </View>
)
```

## Translation Keys

All text is internationalized via `react-i18next`:
- Form labels and placeholders
- Validation error messages  
- Button text and descriptions
- Settings explanations

Key translations in `utils/i18n.ts` for EN/FR support.

## Mock Behavior

Since API is not implemented:
- Form data logged to console with proper structure
- Success alert dialog shown
- Navigation back via `router.back()`

## Dependencies

- **react-native-maps**: Interactive map component
- **@react-native-community/geolocation**: Location detection
- **@react-native-community/datetimepicker**: Native date picker
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Zod integration
- **zod**: Schema validation
- **react-i18next**: Internationalization
- **nativewind**: Utility-first styling
