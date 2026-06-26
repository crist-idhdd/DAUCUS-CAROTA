'use server';
/**
 * @fileOverview A Genkit flow that generates simulated AI analysis messages for art evaluation.
 *
 * - generateArtAnalysisMessages - A function that triggers the generation of simulated analysis messages.
 * - GenerateArtAnalysisMessagesInput - The input type for the generateArtAnalysisMessages function.
 * - GenerateArtAnalysisMessagesOutput - The return type for the generateArtAnalysisMessages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArtAnalysisMessagesInputSchema = z
  .object({
    artDescription: z
      .string()
      .optional()
      .describe('An optional description of the art being analyzed.'),
  })
  .optional();
export type GenerateArtAnalysisMessagesInput = z.infer<
  typeof GenerateArtAnalysisMessagesInputSchema
>;

const GenerateArtAnalysisMessagesOutputSchema = z.object({
  messages: z
    .array(z.string())
    .describe('An array of simulated AI analysis messages.'),
});
export type GenerateArtAnalysisMessagesOutput = z.infer<
  typeof GenerateArtAnalysisMessagesOutputSchema
>;

export async function generateArtAnalysisMessages(
  input?: GenerateArtAnalysisMessagesInput
): Promise<GenerateArtAnalysisMessagesOutput> {
  return simulatedArtAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArtAnalysisMessagesPrompt',
  input: {schema: GenerateArtAnalysisMessagesInputSchema},
  output: {schema: GenerateArtAnalysisMessagesOutputSchema},
  prompt: `You are an AI art evaluation system. Generate a sequence of exactly 5 distinct, concise, and futuristic-sounding analysis messages that mimic an AI processing artwork. Each message should describe a step in the evaluation process, such as analyzing visual elements, emotional impact, or historical context. Do not include introductory or concluding remarks, just the list of messages.

Example:
[
  "Analyzing chromatic variance...",
  "Evaluating emotional resonance patterns...",
  "Cross-referencing historical art markers...",
  "Detecting algorithmic integrity deviations...",
  "Synthesizing aesthetic compliance metrics..."
]

${'artDescription' in (GenerateArtAnalysisMessagesInputSchema || {}) ? 'If an art description is provided, subtly incorporate elements related to it into the analysis messages.' : ''}
`,
});

const simulatedArtAnalysisFlow = ai.defineFlow(
  {
    name: 'simulatedArtAnalysisFlow',
    inputSchema: GenerateArtAnalysisMessagesInputSchema,
    outputSchema: GenerateArtAnalysisMessagesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
