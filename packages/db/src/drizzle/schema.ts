import { pgTable, serial, text, timestamp, foreignKey, uuid, doublePrecision, integer, boolean, unique, date, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const category = pgEnum("category", ['intern', 'extern'])
export const role = pgEnum("role", ['player', 'organizer', 'partner', 'admin'])
export const type = pgEnum("type", ['artefact', 'discount', 'hardware'])
export const validationKey = pgEnum("validation_key", ['hunt_discovery', 'passphrase', 'landmark'])
export const winningRarity = pgEnum("winning_rarity", ['common', 'rare', 'epic', 'legendary'])
export const worldType = pgEnum("world_type", ['real', 'cartographic'])


export const contacts = pgTable("contacts", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const treasureHuntLandmarks = pgTable("treasure_hunt_landmarks", {
	treasureHuntId: uuid("treasure_hunt_id").notNull(),
	userId: uuid("user_id").notNull(),
	latitude: doublePrecision().notNull(),
	longitude: doublePrecision().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.treasureHuntId],
			foreignColumns: [treasureHunts.id],
			name: "treasure_hunt_landmarks_treasure_hunt_id_treasure_hunts_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "treasure_hunt_landmarks_user_id_users_id_fk"
		}),
]);

export const treasureHunts = pgTable("treasure_hunts", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	worldType: worldType("world_type").notNull(),
	latitude: doublePrecision().notNull(),
	longitude: doublePrecision().notNull(),
	maxParticipants: integer("max_participants"),
	participationFees: integer("participation_fees").default(0).notNull(),
	diggingTime: integer("digging_time").default(60).notNull(),
	diggingCost: integer("digging_cost"),
	isPrivate: boolean("is_private").default(false).notNull(),
	startDate: timestamp("start_date", { mode: 'string' }).notNull(),
	endDate: timestamp("end_date", { mode: 'string' }),
	grade: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	winnerId: uuid("winner_id"),
	creatorId: uuid("creator_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.winnerId],
			foreignColumns: [users.id],
			name: "treasure_hunts_winner_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.creatorId],
			foreignColumns: [users.id],
			name: "treasure_hunts_creator_id_users_id_fk"
		}),
]);

export const images = pgTable("images", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	key: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("images_key_unique").on(table.key),
]);

export const mfaTokens = pgTable("mfa_tokens", {
	id: serial().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	otpCode: text("otp_code").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "mfa_tokens_user_id_users_id_fk"
		}),
]);

export const treasureHuntSteps = pgTable("treasure_hunt_steps", {
	treasureHuntId: uuid("treasure_hunt_id").notNull(),
	order: integer().notNull(),
	clue: text().notNull(),
	validationKey: validationKey("validation_key").notNull(),
	validationData: text("validation_data").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.treasureHuntId],
			foreignColumns: [treasureHunts.id],
			name: "treasure_hunt_steps_treasure_hunt_id_treasure_hunts_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	auth0Id: text("auth0_id").notNull(),
	role: role().default('player').notNull(),
	email: text().notNull(),
	name: text().notNull(),
	nickname: text(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	age: date(),
	coins: integer().default(0).notNull(),
	isMfaEnabled: boolean("is_mfa_enabled").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	imageId: integer("image_id"),
}, (table) => [
	foreignKey({
			columns: [table.imageId],
			foreignColumns: [images.id],
			name: "users_image_id_images_id_fk"
		}),
	unique("users_email_unique").on(table.email),
]);

export const winnings = pgTable("winnings", {
	id: serial().primaryKey().notNull(),
	category: category().notNull(),
	type: type().notNull(),
	name: text().notNull(),
	description: text(),
	rarity: winningRarity().default('common').notNull(),
	data: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const treasureHuntImages = pgTable("treasure_hunt_images", {
	treasureHuntId: uuid("treasure_hunt_id").notNull(),
	imageId: integer("image_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.treasureHuntId],
			foreignColumns: [treasureHunts.id],
			name: "treasure_hunt_images_treasure_hunt_id_treasure_hunts_id_fk"
		}),
	foreignKey({
			columns: [table.imageId],
			foreignColumns: [images.id],
			name: "treasure_hunt_images_image_id_images_id_fk"
		}),
	primaryKey({ columns: [table.treasureHuntId, table.imageId], name: "treasure_hunt_images_treasure_hunt_id_image_id_pk"}),
]);

export const userWinnings = pgTable("user_winnings", {
	userId: uuid("user_id").notNull(),
	winningId: integer("winning_id").notNull(),
	obtainedAt: timestamp("obtained_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_winnings_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.winningId],
			foreignColumns: [winnings.id],
			name: "user_winnings_winning_id_winnings_id_fk"
		}),
	primaryKey({ columns: [table.userId, table.winningId], name: "user_winnings_user_id_winning_id_pk"}),
]);

export const treasureHuntWinnings = pgTable("treasure_hunt_winnings", {
	treasureHuntId: uuid("treasure_hunt_id").notNull(),
	winningId: integer("winning_id").notNull(),
	coins: integer().default(0).notNull(),
	conditionOfAward: text("condition_of_award").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.treasureHuntId],
			foreignColumns: [treasureHunts.id],
			name: "treasure_hunt_winnings_treasure_hunt_id_treasure_hunts_id_fk"
		}),
	foreignKey({
			columns: [table.winningId],
			foreignColumns: [winnings.id],
			name: "treasure_hunt_winnings_winning_id_winnings_id_fk"
		}),
	primaryKey({ columns: [table.treasureHuntId, table.winningId], name: "treasure_hunt_winnings_treasure_hunt_id_winning_id_pk"}),
]);

export const treasureHuntParticipants = pgTable("treasure_hunt_participants", {
	treasureHuntId: uuid("treasure_hunt_id").notNull(),
	userId: uuid("user_id").notNull(),
	lastAttempt: timestamp("last_attempt", { mode: 'string' }),
	currentStep: integer("current_step"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "treasure_hunt_participants_user_id_users_id_fk"
		}),
	primaryKey({ columns: [table.treasureHuntId, table.userId], name: "treasure_hunt_participants_treasure_hunt_id_user_id_pk"}),
]);
