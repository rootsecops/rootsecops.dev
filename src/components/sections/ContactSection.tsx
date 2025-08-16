"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SectionTitle from '@/components/ui/SectionTitle';
import { ArrowRight, Linkedin, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const contactFormSchema = z.object({
  firstName: z.string().min(2).regex(/^[a-zA-Z]+$/, "Only letters allowed"),
  lastName: z.string().min(2).regex(/^[a-zA-Z]+$/, "Only letters allowed"),
  email: z.string().email(),
  subject: z.string().min(3).regex(/^[a-zA-Z\s]+$/, "Only letters & spaces"),
  message: z.string().min(10),
  honeypot: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { firstName: '', lastName: '', email: '', subject: '', message: '', honeypot: '' },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    if (data.honeypot) return; // Bot detected

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({ title: "Message Sent!", description: "Thanks for reaching out." });
        form.reset();
      } else {
        toast({ title: "Error", description: "Failed to send message.", variant: "destructive" });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    }
  };

  return (
    <motion.section id="contact" ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
      <div className="container mx-auto px-4">
        <SectionTitle tagText="Contact" title="Get In Touch" description="Let's connect for collaborations or a chat." />
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.div>
            <Card>
              <CardHeader>
                <CardTitle>Send a Direct Message</CardTitle>
                <CardDescription>Fill out the form below.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="subject" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl><Textarea rows={5} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Honeypot */}
                    <FormField control={form.control} name="honeypot" render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl><Input {...field} autoComplete="off" /></FormControl>
                      </FormItem>
                    )} />
                    <Button type="submit" className="w-full">{form.formState.isSubmitting ? "Sending..." : "Send Message"} <ArrowRight className="ml-2" /></Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div>
            <Card>
            <CardHeader>
                <CardTitle className="text-2xl text-primary">Let's Connect</CardTitle>
                <CardDescription className="text-muted-foreground text-sm pt-1">
                  I&apos;m always open to discussing project ideas, career opportunities, or just chatting about new Threats and Challenges.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <Link href="https://www.linkedin.com/in/sonajit-rabha" target="_blank" rel="noopener noreferrer" className="flex items-center group p-3 rounded-md hover:bg-muted transition-colors">
                      <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                          <Linkedin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                          <p className="font-semibold text-foreground">LinkedIn</p>
                      </div>
                  </Link>
                  <Link href="https://github.com/rootsecops" target="_blank" rel="noopener noreferrer" className="flex items-center group p-3 rounded-md hover:bg-muted transition-colors">
                      <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                          <Github className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                          <p className="font-semibold text-foreground">GitHub</p>
                      </div>
                  </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
