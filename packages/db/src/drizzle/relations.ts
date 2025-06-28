import { relations } from "drizzle-orm/relations";
import { treasureHunts, treasureHuntLandmarks, users, mfaTokens, treasureHuntSteps, images, treasureHuntImages, userWinnings, winnings, treasureHuntWinnings, treasureHuntParticipants } from "./schema";

export const treasureHuntLandmarksRelations = relations(treasureHuntLandmarks, ({one}) => ({
	treasureHunt: one(treasureHunts, {
		fields: [treasureHuntLandmarks.treasureHuntId],
		references: [treasureHunts.id]
	}),
	user: one(users, {
		fields: [treasureHuntLandmarks.userId],
		references: [users.id]
	}),
}));

export const treasureHuntsRelations = relations(treasureHunts, ({one, many}) => ({
	treasureHuntLandmarks: many(treasureHuntLandmarks),
	user_winnerId: one(users, {
		fields: [treasureHunts.winnerId],
		references: [users.id],
		relationName: "treasureHunts_winnerId_users_id"
	}),
	user_creatorId: one(users, {
		fields: [treasureHunts.creatorId],
		references: [users.id],
		relationName: "treasureHunts_creatorId_users_id"
	}),
	treasureHuntSteps: many(treasureHuntSteps),
	treasureHuntImages: many(treasureHuntImages),
	treasureHuntWinnings: many(treasureHuntWinnings),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	treasureHuntLandmarks: many(treasureHuntLandmarks),
	treasureHunts_winnerId: many(treasureHunts, {
		relationName: "treasureHunts_winnerId_users_id"
	}),
	treasureHunts_creatorId: many(treasureHunts, {
		relationName: "treasureHunts_creatorId_users_id"
	}),
	mfaTokens: many(mfaTokens),
	image: one(images, {
		fields: [users.imageId],
		references: [images.id]
	}),
	userWinnings: many(userWinnings),
	treasureHuntParticipants: many(treasureHuntParticipants),
}));

export const mfaTokensRelations = relations(mfaTokens, ({one}) => ({
	user: one(users, {
		fields: [mfaTokens.userId],
		references: [users.id]
	}),
}));

export const treasureHuntStepsRelations = relations(treasureHuntSteps, ({one}) => ({
	treasureHunt: one(treasureHunts, {
		fields: [treasureHuntSteps.treasureHuntId],
		references: [treasureHunts.id]
	}),
}));

export const imagesRelations = relations(images, ({many}) => ({
	users: many(users),
	treasureHuntImages: many(treasureHuntImages),
}));

export const treasureHuntImagesRelations = relations(treasureHuntImages, ({one}) => ({
	treasureHunt: one(treasureHunts, {
		fields: [treasureHuntImages.treasureHuntId],
		references: [treasureHunts.id]
	}),
	image: one(images, {
		fields: [treasureHuntImages.imageId],
		references: [images.id]
	}),
}));

export const userWinningsRelations = relations(userWinnings, ({one}) => ({
	user: one(users, {
		fields: [userWinnings.userId],
		references: [users.id]
	}),
	winning: one(winnings, {
		fields: [userWinnings.winningId],
		references: [winnings.id]
	}),
}));

export const winningsRelations = relations(winnings, ({many}) => ({
	userWinnings: many(userWinnings),
	treasureHuntWinnings: many(treasureHuntWinnings),
}));

export const treasureHuntWinningsRelations = relations(treasureHuntWinnings, ({one}) => ({
	treasureHunt: one(treasureHunts, {
		fields: [treasureHuntWinnings.treasureHuntId],
		references: [treasureHunts.id]
	}),
	winning: one(winnings, {
		fields: [treasureHuntWinnings.winningId],
		references: [winnings.id]
	}),
}));

export const treasureHuntParticipantsRelations = relations(treasureHuntParticipants, ({one}) => ({
	user: one(users, {
		fields: [treasureHuntParticipants.userId],
		references: [users.id]
	}),
}));