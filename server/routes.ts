import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBotSchema, insertTestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Bot routes
  app.get("/api/bots", async (req, res) => {
    try {
      const bots = await storage.getAllBots();
      res.json(bots);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bots" });
    }
  });

  app.post("/api/bots", async (req, res) => {
    try {
      const bot = insertBotSchema.parse(req.body);
      const newBot = await storage.createBot(bot);
      res.status(201).json(newBot);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid bot data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create bot" });
      }
    }
  });

  app.get("/api/bots/:id", async (req, res) => {
    try {
      const bot = await storage.getBot(req.params.id);
      if (!bot) {
        res.status(404).json({ message: "Bot not found" });
      } else {
        res.json(bot);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bot" });
    }
  });

  app.patch("/api/bots/:id", async (req, res) => {
    try {
      const bot = insertBotSchema.partial().parse(req.body);
      const updatedBot = await storage.updateBot(req.params.id, bot);
      if (!updatedBot) {
        res.status(404).json({ message: "Bot not found" });
      } else {
        res.json(updatedBot);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid bot data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update bot" });
      }
    }
  });

  // Test routes
  app.get("/api/tests", async (req, res) => {
    try {
      const tests = await storage.getAllTests();
      res.json(tests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tests" });
    }
  });

  app.post("/api/tests", async (req, res) => {
    try {
      const test = insertTestSchema.parse(req.body);
      const newTest = await storage.createTest(test);
      res.status(201).json(newTest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid test data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create test" });
      }
    }
  });

  app.get("/api/tests/bot/:botId", async (req, res) => {
    try {
      const tests = await storage.getTestsByBotId(req.params.botId);
      res.json(tests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tests for bot" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
