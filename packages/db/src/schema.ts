import * as contacts from "./schemas/contacts"
import * as images from "./schemas/images"
import * as mfaTokens from "./schemas/mfa-tokens"
import * as treasureHuntImages from "./schemas/treasure-hunt-images"
import * as treasureHuntLandmarks from "./schemas/treasure-hunt-landmarks"
import * as treasureHuntParticipants from "./schemas/treasure-hunt-participants"
import * as treasureHuntSteps from "./schemas/treasure-hunt-steps"
import * as treasureHuntWinnings from "./schemas/treasure-hunt-winnings"
import * as treasureHunts from "./schemas/treasure-hunts"
import * as userWinnings from "./schemas/user-winnings"
import * as users from "./schemas/users"
import * as winnings from "./schemas/winnings"

export const schema = {
  ...contacts,
  ...images,
  ...mfaTokens,
  ...treasureHuntImages,
  ...treasureHuntLandmarks,
  ...treasureHuntParticipants,
  ...treasureHuntSteps,
  ...treasureHuntWinnings,
  ...treasureHunts,
  ...userWinnings,
  ...users,
  ...winnings,
}
