'use server';
/**
 * @fileOverview An email validation AI agent.
 *
 * - validateEmail - A function that handles the email validation process.
 * - ValidateEmailOutput - The return type for the validateEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';

const ValidateEmailInputSchema = z.object({
  email: z.string().describe('The email address to validate.'),
});

const ValidateEmailOutputSchema = z.object({
  isValid: z.boolean().describe('Whether or not the email is considered valid and not a disposable or fake email.'),
  reason: z.string().optional().describe('The reason why the email is not valid. This will be shown to the user.'),
});
export type ValidateEmailOutput = z.infer<typeof ValidateEmailOutputSchema>;

export async function validateEmail(email: string): Promise<ValidateEmailOutput> {
  return validateEmailFlow({ email });
}

const emailValidationPrompt = ai.definePrompt({
    name: 'emailValidationPrompt',
    input: { schema: ValidateEmailInputSchema },
    output: { schema: ValidateEmailOutputSchema },
    model: googleAI.model('gemini-2.0-flash'),
    prompt: `You are an expert email validation service. Your task is to determine if the given email address is likely to be a real, personal, active, and non-disposable email address.\n\n    Analyze the email: {{{email}}}\n\n    Do not just check the domain. Analyze the local part (before the @) for keyboard mashing, nonsensical patterns, or things that look like temporary addresses.\n    \n    Also, consider common disposable email domains.\n    \n    If the email address seems valid and legitimate, set isValid to true.\n    \n    If the email address looks like a temporary, disposable, or fake email (e.g., mailinator.com, yopmail.com, or something like "asdfasdf@gmail.com"), or if the local part is excessively generic or a common placeholder that does not suggest a real person's email (e.g., "test@example.com", "info@domain.com", "hello@any.com", "hey@gmail.com"), set isValid to false and provide a brief, user-friendly reason. For example, "Disposable email addresses are not allowed." or "Please provide a more personal email address."`,
});

const validateEmailFlow = ai.defineFlow(
  {
    name: 'validateEmailFlow',
    inputSchema: ValidateEmailInputSchema,
    outputSchema: ValidateEmailOutputSchema,
  },
  async (input) => {
    // Basic regex check for format before calling the AI
    const emailRegex = /^[\S@]+@[\S@]+\.[\S@]+$/;
    if (!emailRegex.test(input.email)) {
        return { isValid: false, reason: 'Invalid email format.' };
    }
      
    const { output } = await emailValidationPrompt(input);
    return output!;
  }
);
