export default {
    dialect: "postgresql",
    schema: "./utils/db/schema.ts",
    out: "./drizzle",

    dbCredentials: {
        url: "postgresql://neondb_owner:Pl8gDifGK6YA@ep-withered-dust-a5wwnaye.us-east-2.aws.neon.tech/postify_ai?sslmode=require",
        connecttionString: "postgresql://neondb_owner:Pl8gDifGK6YA@ep-withered-dust-a5wwnaye.us-east-2.aws.neon.tech/postify_ai?sslmode=require"
    },
};