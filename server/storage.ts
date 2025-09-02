import { users, bots, tests, type User, type InsertUser, type Bot, type InsertBot, type Test, type InsertTest } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Bot methods
  getAllBots(): Promise<Bot[]>;
  getBot(id: string): Promise<Bot | undefined>;
  createBot(insertBot: InsertBot): Promise<Bot>;
  
  // Test methods
  getAllTests(): Promise<Test[]>;
  createTest(insertTest: InsertTest): Promise<Test>;
  getTestsByBotId(botId: string): Promise<Test[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Bot methods
  async getAllBots(): Promise<Bot[]> {
    return await db.select().from(bots);
  }

  async getBot(id: string): Promise<Bot | undefined> {
    const [bot] = await db.select().from(bots).where(eq(bots.id, id));
    return bot || undefined;
  }

  async createBot(insertBot: InsertBot): Promise<Bot> {
    const [bot] = await db
      .insert(bots)
      .values(insertBot)
      .returning();
    return bot;
  }

  // Test methods
  async getAllTests(): Promise<Test[]> {
    return await db.select().from(tests);
  }

  async createTest(insertTest: InsertTest): Promise<Test> {
    const [test] = await db
      .insert(tests)
      .values(insertTest)
      .returning();
    return test;
  }

  async getTestsByBotId(botId: string): Promise<Test[]> {
    return await db.select().from(tests).where(eq(tests.botId, botId));
  }
}

export const storage = new DatabaseStorage();