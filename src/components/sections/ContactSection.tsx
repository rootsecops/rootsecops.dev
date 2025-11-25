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
import { ArrowRight, Linkedin, Github, Twitter, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  honeypot: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', subject: '', message: '', honeypot: '' },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    if (data.honeypot) return; // Bot detected

    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!formspreeEndpoint) {
      toast({ title: "Configuration Error", description: "The form endpoint is not configured. Please contact the site administrator.", variant: "destructive" });
      return;
    }

    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, subject: data.subject, message: data.message }),
      });

      if (res.ok) {
        toast({ title: "Message Sent!", description: "Thanks for reaching out. I'll get back to you soon." });
        form.reset();
      } else {
        const errorData = await res.json();
        toast({ title: "Error", description: errorData.error || "Failed to send message. Please try again.", variant: "destructive" });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Something went wrong. Please check your connection and try again.", variant: "destructive" });
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
                     <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="contact@son4jit.qzz.io" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="subject" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl><Input placeholder="e.g.: internship opportunity" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl><Textarea placeholder="Your message here..." rows={5} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Honeypot */}
                    <FormField control={form.control} name="honeypot" render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl><Input {...field} autoComplete="off" /></FormControl>

                      </FormItem>
                    )} />
                    <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                        {form.formState.isSubmitting ? "Sending..." : "Send Message"} 
                        {!form.formState.isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
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
              <CardContent>
                <div className="flex flex-row justify-around md:flex-col md:justify-start md:space-y-4 md:items-stretch items-center">
                    <a href="mailto:contact@son4jit.qzz.io" className="flex items-center group p-3 rounded-md md:hover:bg-muted transition-colors">
                        <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full md:mr-4 group-hover:bg-primary/20 transition-colors">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div className="hidden md:block">
                            <p className="font-semibold text-foreground">Email</p>
                            <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">contact@son4jit.qzz.io</span>
                        </div>
                    </a>
                    <Link href="https://www.linkedin.com/in/sonajitrabha/" target="_blank" rel="noopener noreferrer" className="flex items-center group p-3 rounded-md md:hover:bg-muted transition-colors">
                        <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full md:mr-4 group-hover:bg-primary/20 transition-colors">
                            <Linkedin className="h-6 w-6 text-primary" />
                        </div>
                        <div className="hidden md:block">
                            <p className="font-semibold text-foreground">LinkedIn</p>
                        </div>
                    </Link>
                    <Link href="https://github.com/rootsecops" target="_blank" rel="noopener noreferrer" className="flex items-center group p-3 rounded-md md:hover:bg-muted transition-colors">
                        <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full md:mr-4 group-hover:bg-primary/20 transition-colors">
                            <Github className="h-6 w-6 text-primary" />
                        </div>
                        <div className="hidden md:block">
                            <p className="font-semibold text-foreground">GitHub</p>
                        </div>
                    </Link>
                    <Link href="https://x.com/RootSecOps" target="_blank" rel="noopener noreferrer" className="flex items-center group p-3 rounded-md md:hover:bg-muted transition-colors">
                        <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full md:mr-4 group-hover:bg-primary/20 transition-colors">
                            <Twitter className="h-6 w-6 text-primary" />
                        </div>
                        <div className="hidden md:block">
                            <p className="font-semibold text-foreground">Twitter</p>
                        </div>
                    </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
