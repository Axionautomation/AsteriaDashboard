# Claude AI Integration

This document contains information about integrating Claude AI into the Asteria bot management platform.

## Overview

Claude is Anthropic's AI assistant that can be integrated into the platform to provide AI-powered analysis and automation capabilities for workflow monitoring.

## Integration Setup

### Prerequisites

- ANTHROPIC_API_KEY environment variable configured
- @anthropic-ai/sdk package installed

### Basic Implementation

```typescript
import Anthropic from '@anthropic-ai/sdk';

const DEFAULT_MODEL_STR = "claude-sonnet-4-20250514";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Basic text analysis example
async function analyzeWorkflowFailure(errorLog: string): Promise<string> {
  const prompt = `Analyze this workflow error log and provide actionable insights:\n\n${errorLog}`;

  const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
    model: DEFAULT_MODEL_STR,
  });

  return message.content[0].text;
}

// Sentiment analysis for bot performance
async function analyzeBotPerformance(metrics: string): Promise<{ sentiment: string, confidence: number }> {
  try {
    const response = await anthropic.messages.create({
      model: DEFAULT_MODEL_STR,
      system: `You're a Bot Performance AI. Analyze these metrics and output in JSON format with keys: "sentiment" (positive/negative/neutral) and "confidence" (number, 0 through 1).`,
      max_tokens: 1024,
      messages: [
        { role: 'user', content: metrics }
      ],
    });

    const result = JSON.parse(response.content[0].text);
    return {
      sentiment: result.sentiment,
      confidence: Math.max(0, Math.min(1, result.confidence))
    };
  } catch (error) {
    throw new Error("Failed to analyze bot performance: " + error.message);
  }
}
```

## Use Cases in Asteria

### 1. Workflow Error Analysis
- Automatically analyze failed workflow logs
- Provide intelligent error categorization
- Suggest remediation steps

### 2. Performance Insights
- Analyze workflow performance trends
- Generate performance reports
- Predict potential issues

### 3. Alert Intelligence
- Smart alert filtering and prioritization
- Context-aware alert descriptions
- Automated incident summarization

### 4. Bot Optimization
- Analyze bot configuration effectiveness
- Suggest optimization strategies
- Performance tuning recommendations

## API Configuration

```typescript
// Environment variables required
ANTHROPIC_API_KEY=your_anthropic_api_key_here

// Recommended model settings
const CONFIG = {
  model: "claude-sonnet-4-20250514",
  maxTokens: 1024,
  temperature: 0.1, // For consistent analysis
};
```

## Security Considerations

- Never log or expose API keys
- Implement rate limiting for API calls
- Use environment variables for sensitive configuration
- Monitor API usage and costs

## Integration Points

- **Dashboard Analytics**: Real-time workflow insights
- **Alert System**: Intelligent alert processing
- **Bot Management**: AI-powered bot optimization
- **Reporting**: Automated report generation

## Future Enhancements

- Multi-modal analysis capabilities
- Custom fine-tuned models for domain-specific tasks
- Integration with external monitoring tools
- Advanced predictive analytics