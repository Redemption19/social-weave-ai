'use server'

import { db, withDb } from "./dbConfig";
import { Users, Subscriptions, GeneratedContent } from "./schema";
import { eq, sql, desc } from "drizzle-orm";
import { sendWelcomeEmail } from "../mailtrap";

export async function updateUserPoints(userId: string, points: number) {
  try {
    const [updatedUser] = await db
      .update(Users)
      .set({ points: sql`${Users.points} + ${points}` })
      .where(eq(Users.stripeCustomerId, userId))
      .returning();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user points:", error);
    throw error; // Consider if you want to throw or return null based on your error handling strategy
  }
}

export async function getUserPoints(userId: string) {
  try {
    const users = await db
      .select({ points: Users.points, id: Users.id, email: Users.email })
      .from(Users)
      .where(eq(Users.stripeCustomerId, userId));
      
    if (!users.length) return 0;
    return users[0].points ?? 0;
  } catch (error) {
    console.error("Error fetching user points:", error);
    throw error;
  }
}

export async function createOrUpdateSubscription(
  userId: string,
  stripeSubscriptionId: string,
  plan: string,
  status: string,
  currentPeriodStart: Date,
  currentPeriodEnd: Date
) {
  return await withDb(async (db) => {
    const [user] = await db
      .select({ id: Users.id })
      .from(Users)
      .where(eq(Users.stripeCustomerId, userId))
      .limit(1);

    if (!user) throw new Error(`No user found with stripeCustomerId: ${userId}`);

    const [existing] = await db
      .select()
      .from(Subscriptions)
      .where(eq(Subscriptions.stripeSubscriptionId, stripeSubscriptionId))
      .limit(1);

    if (existing) {
      const [subscription] = await db
        .update(Subscriptions)
        .set({
          plan,
          status,
          currentPeriodStart,
          currentPeriodEnd,
        })
        .where(eq(Subscriptions.stripeSubscriptionId, stripeSubscriptionId))
        .returning();
      return subscription;
    }

    const [subscription] = await db
      .insert(Subscriptions)
      .values({
        userId: user.id,
        stripeSubscriptionId,
        plan,
        status,
        currentPeriodStart,
        currentPeriodEnd,
      })
      .returning();
    return subscription;
  });
}

export async function saveGeneratedContent(
  userId: string,
  content: string,
  prompt: string,
  contentType: string
) {
  try {
    const [savedContent] = await db
      .insert(GeneratedContent)
      .values({
        userId: sql`(SELECT id FROM ${Users} WHERE stripe_customer_id = ${userId})`,
        content,
        prompt,
        contentType,
      })
      .returning();
    return savedContent;
  } catch (error) {
    console.error("Error saving generated content:", error);
    throw error;
  }
}

export async function getGeneratedContentHistory(
  userId: string,
  limit: number = 10
) {
  try {
    return await db
      .select({
        id: GeneratedContent.id,
        content: GeneratedContent.content,
        prompt: GeneratedContent.prompt,
        contentType: GeneratedContent.contentType,
        createdAt: GeneratedContent.createdAt,
      })
      .from(GeneratedContent)
      .where(
        eq(
          GeneratedContent.userId,
          sql`(SELECT id FROM ${Users} WHERE stripe_customer_id = ${userId})`
        )
      )
      .orderBy(desc(GeneratedContent.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("Error fetching generated content history:", error);
    throw error;
  }
}

export async function createOrUpdateUser(
  clerkUserId: string,
  email: string,
  name: string
) {
  try {
    const [existingUser] = await db
      .select()
      .from(Users)
      .where(eq(Users.stripeCustomerId, clerkUserId))
      .limit(1);

    if (existingUser) {
      const [updatedUser] = await db
        .update(Users)
        .set({ name, email })
        .where(eq(Users.stripeCustomerId, clerkUserId))
        .returning();
      return updatedUser;
    }

    const [userWithEmail] = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email))
      .limit(1);

    if (userWithEmail) {
      const [updatedUser] = await db
        .update(Users)
        .set({ name, stripeCustomerId: clerkUserId })
        .where(eq(Users.email, email))
        .returning();
      await sendWelcomeEmail(email, name);
      return updatedUser;
    }

    const [newUser] = await db
      .insert(Users)
      .values({ email, name, stripeCustomerId: clerkUserId, points: 50 })
      .returning();
    await sendWelcomeEmail(email, name);
    return newUser;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw error;
  }
}