import dotenv from "dotenv";
import { Kysely, PostgresDialect, sql } from "kysely";
import { Pool } from "pg";
import type { DB } from "./db";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: DATABASE_URL,
    }),
  }),
});

export const createMarkerDB = async ({
  description,
  lat,
  lng,
}: {
  description: string;
  lat: number;
  lng: number;
}) => {
  return await db
    .insertInto("public.markers")
    .values({
      description,
      lat,
      lng,
      date_updated: sql<string>`now()`,
      date_created: sql<string>`now()`,
    })
    .returning([
      "id",
      "description",
      "lat",
      "lng",
      "date_created",
      "date_updated",
    ])
    .executeTakeFirstOrThrow();
};

export const findMarkersDB = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) => {
  return await db.transaction().execute(async (transaction) => {
    const data = await transaction
      .selectFrom("public.markers")
      .orderBy("id")
      .limit(limit)
      .offset(offset)
      .selectAll()
      .execute();

    const { count } = await transaction
      .selectFrom("public.markers")
      .select(({ fn }) => {
        return fn.countAll().as("count");
      })
      .executeTakeFirstOrThrow();

    return {
      data,
      count,
    };
  });
};

export const deleteMarkersDB = async (id: number) => {
  return await db
    .deleteFrom("public.markers")
    .where("id", "=", id)
    .returning(["id"])
    .executeTakeFirstOrThrow();
};

export const patchMarkerDB = async ({
  id,
  ...rest
}: {
  description?: string;
  lat?: number;
  lng?: number;
  id: number;
}) => {
  return await db
    .updateTable("public.markers")
    .set({
      ...rest,
      date_updated: sql<string>`now()`,
    })
    .where("id", "=", id)
    .returning([
      "id",
      "description",
      "lat",
      "lng",
      "date_created",
      "date_updated",
    ])
    .executeTakeFirstOrThrow();
};
