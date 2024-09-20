import { type UserPermissions } from "@/lib/permissions";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const users = pgTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  permissions: text("permissions").array().$type<UserPermissions>(),
  isAdmin: boolean("isAdmin").notNull().default(false),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  attendances: integer("attendance_count").notNull().default(0),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  attendedMeetings: many(attendedMeetings),
}));

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const meetings = pgTable(
  "meeting",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    isEvent: boolean("isEvent").notNull().default(false),
    location: varchar("location", { length: 256 }),
    isPublic: boolean("isPublic").notNull().default(false),
    isRequired: boolean("isRequired").notNull().default(false),
    link: text("link"),
    date: timestamp("meeting_date", {
      mode: "date",
    }).notNull(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    createdByIdIdx: index("userCreatedBy_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
    dateIndex: index("date_idx").on(example.date),
  }),
);

export const attendedMeetings = pgTable(
  "attended_meetings",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    meetingId: integer("meetingId")
      .notNull()
      .references(() => meetings.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    pk: primaryKey({ columns: [example.userId, example.meetingId] }),
    userIdIdx: index("userId_idx").on(example.userId),
    meetingIdIdx: index("meetingId_idx").on(example.meetingId),
  }),
);

export const attendedMeetingsRelations = relations(
  attendedMeetings,
  ({ one }) => ({
    user: one(users, {
      fields: [attendedMeetings.userId],
      references: [users.id],
    }),
    meeting: one(meetings, {
      fields: [attendedMeetings.meetingId],
      references: [meetings.id],
    }),
  }),
);

export const meetingsRelations = relations(meetings, ({ one, many }) => ({
  author: one(users, {
    fields: [meetings.createdById],
    references: [users.id],
  }),
  attendees: many(attendedMeetings),
}));

export const updateMeetingSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(256).optional(),
  location: z.string().min(1).max(256).optional(),
  isPublic: z.boolean().optional(),
  date: z.date().optional(),
  isEvent: z.boolean().optional(),
});
