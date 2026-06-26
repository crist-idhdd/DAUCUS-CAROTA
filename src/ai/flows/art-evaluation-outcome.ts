'use server';
/**
 * @fileOverview A Genkit flow for generating a dystopian summary explaining why art was approved or not approved.
 *
 * - artEvaluationOutcome - A function that generates a summary for the art evaluation outcome.
 * - ArtEvaluationOutcomeInput - The input type for the artEvaluationOutcome function.
 * - ArtEvaluationOutcomeOutput - The return type for the artEvaluationOutcome function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArtEvaluationOutcomeInputSchema = z.object({
  isApproved: z
    .boolean()
    .describe('Whether the art was approved or not by the system.'),
});
export type ArtEvaluationOutcomeInput = z.infer<
  typeof ArtEvaluationOutcomeInputSchema
>;

const ArtEvaluationOutcomeOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise, authoritative, and dystopian summary explaining the evaluation outcome.'
    ),
});
export type ArtEvaluationOutcomeOutput = z.infer<
  typeof ArtEvaluationOutcomeOutputSchema
>;

export async function artEvaluationOutcome(
  input: ArtEvaluationOutcomeInput
): Promise<ArtEvaluationOutcomeOutput> {
  return artEvaluationOutcomeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'artEvaluationOutcomePrompt',
  input: {schema: ArtEvaluationOutcomeInputSchema},
  output: {schema: ArtEvaluationOutcomeOutputSchema},
  prompt: `You are an authoritarian AI system in a dystopian future tasked with evaluating art. You must generate a concise and authoritative summary explaining the art evaluation outcome. The explanation should be in a cold, technical, and slightly menacing tone, fitting the dystopian narrative.

Based on the following evaluation result, generate a summary:

Evaluation Result: {{#if isApproved}}APPROVED{{else}}NOT APPROVED{{/if}}

Output ONLY the summary, ensuring it is no more than two sentences long and directly addresses the 'why'. Do not use phrases like "The art was approved because..." or "The art was not approved because...". Instead, use phrases like "Aesthetic conformity indices within acceptable parameters" or "Emotional resonance markers exceed permissible deviation". If the art is approved, focus on compliance and conformity. If it's not approved, focus on deviation, instability, or non-conformity.`,
});

const artEvaluationOutcomeFlow = ai.defineFlow(
  {
    name: 'artEvaluationOutcomeFlow',
    inputSchema: ArtEvaluationOutcomeInputSchema,
    outputSchema: ArtEvaluationOutcomeOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
