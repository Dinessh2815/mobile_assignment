/**
 * This file configures twrnc (Tailwind React Native Classnames)
 *
 * Usage:
 * 1. Import this utility: import tw from '../utils/tw';
 * 2. Use in components: <View style={tw`flex-1 bg-white p-4`}>
 * 3. Conditional classes: style={tw`${isActive ? 'bg-primary' : 'bg-gray-300'}`}
 */
import { create } from "twrnc";

// Create the customized version of the library with theme settings
const tw = create({
  theme: {
    extend: {
      colors: {
        primary: "#204CBB",
        secondary: "#00AB9A",
      },
    },
  },
});

export default tw;
