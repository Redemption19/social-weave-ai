import { db } from "./dbConfig";
import { eq, sql, desc } from 'drizzle-orm';
import { Users, Subscriptions, GeneratedContent } from './schema';
export async function createOrUpdateUser(
    clerkUserId: string,
    email: string,
    name: string,
) {
    try {
        const [updatedUser] = await db
          .update(Users)
          .set({ name, email})
          .where(eq(Users.stripeCustomerId, clerkUserId))
          .returning()
          .execute();
          console.log("Updated user:", updatedUser)
        return updatedUser;
      } catch (error) {
        console.error("Error updating user points:", error);
        return null;
      }
    }