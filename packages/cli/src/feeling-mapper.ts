import { FeelingVectorId, ArchetypeId } from './types.js';

// 120-word offline lexicon mapped into 4 sensory feeling vectors (30 words each)
export const SENSORY_LEXICON: Record<FeelingVectorId, string[]> = {
  'calm': [
    'peaceful', 'tranquil', 'warm', 'quiet', 'serene', 'gentle', 'soft', 'slow',
    'breathing', 'literary', 'cozy', 'organic', 'muted', 'relaxed', 'subtle', 'elegant',
    'editorial', 'reflective', 'human', 'crafted', 'artisan', 'paper', 'archival', 'balanced',
    'unhurried', 'thoughtful', 'contemplative', 'patient', 'delicate', 'soothing'
  ],
  'urgent-precise': [
    'forensic', 'sharp', 'fast', 'critical', 'rapid', 'audit', 'telemetry', 'precise',
    'exact', 'clinical', 'technical', 'dense', 'swift', 'immediate', 'focused', 'analytical',
    'crisp', 'realtime', 'instant', 'prompt', 'accurate', 'strict', 'zero-latency', 'razor',
    'rigorous', 'surgical', 'computational', 'deterministic', 'direct', 'snappy'
  ],
  'playful-tactile': [
    'fun', 'vibrant', 'energetic', 'bouncy', 'poppy', 'punchy', 'tactile', 'clicky',
    'springy', 'lively', 'joyful', 'whimsical', 'creative', 'cheerful', 'friendly', 'bold',
    'chunky', 'dynamic', 'playful', 'engaging', 'interactive', 'fresh', 'expressive', 'punch',
    'responsive', 'loud', 'physical', 'raw', 'juicy', 'quirky'
  ],
  'authoritative': [
    'solid', 'stable', 'institutional', 'enterprise', 'secure', 'reliable', 'corporate', 'grounded',
    'heavy', 'formal', 'established', 'trusted', 'compliant', 'legal', 'financial', 'architectural',
    'structured', 'monolithic', 'robust', 'sovereign', 'permanent', 'hardened', 'certified', 'conservative',
    'stern', 'standard', 'governance', 'steady', 'deep', 'immutable'
  ]
};

export interface FeelingMatchResult {
  feeling: FeelingVectorId;
  scores: Record<FeelingVectorId, number>;
  confidence: number;
  lowConfidence: boolean;
}

/**
 * Maps freeform user creative input or adjectives against the 120-word offline lexicon
 * using frequency scoring and linear interpolation.
 */
export function mapFeelingFromText(
  inputText: string,
  archetypeFallback?: ArchetypeId
): FeelingMatchResult {
  const normalized = inputText.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');
  const tokens = normalized.split(/\s+/).filter(t => t.length > 2);

  const scores: Record<FeelingVectorId, number> = {
    'calm': 0,
    'urgent-precise': 0,
    'playful-tactile': 0,
    'authoritative': 0
  };

  for (const token of tokens) {
    for (const [vector, lexicon] of Object.entries(SENSORY_LEXICON) as [FeelingVectorId, string[]][]) {
      if (lexicon.includes(token)) {
        scores[vector] += 1;
      } else {
        // Substring / stem match
        for (const word of lexicon) {
          if (word.startsWith(token) || token.startsWith(word)) {
            scores[vector] += 0.5;
            break;
          }
        }
      }
    }
  }

  // Find max score
  let maxScore = 0;
  let topVector: FeelingVectorId = 'urgent-precise';
  let totalScore = 0;

  for (const [vector, score] of Object.entries(scores) as [FeelingVectorId, number][]) {
    totalScore += score;
    if (score > maxScore) {
      maxScore = score;
      topVector = vector;
    }
  }

  // Linear interpolation / confidence calculation
  const confidence = totalScore > 0 ? maxScore / totalScore : 0;
  const lowConfidence = maxScore === 0 || confidence < 0.35;

  if (lowConfidence && archetypeFallback) {
    if (archetypeFallback === 'editorial-serif-paper') topVector = 'calm';
    else if (archetypeFallback === 'neo-brutalism') topVector = 'playful-tactile';
    else topVector = 'urgent-precise';
  }

  return {
    feeling: topVector,
    scores,
    confidence,
    lowConfidence
  };
}

