
"use client";

import { useState } from 'react';
import { Download, Linkedin, Github, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ResumeHeader = () => (
  <div className="text-center pb-4 sm:pb-8 border-b border-gray-300">
    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800">Sonajit Rabha</h1>
    <p className="text-base sm:text-lg text-gray-600 mt-1 sm:mt-2">Cybersecurity | VAPT | DFIR | OSINT</p>
    <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-6 mt-2 sm:mt-4 text-xs sm:text-sm">
      <Link href="https://linkedin.com/in/sonajitrabha" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
        <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
        linkedin.com/in/sonajitrabha
      </Link>
      <Link href="https://github.com/rootsecops" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
        <Github className="h-3 w-3 sm:h-4 sm:w-4" />
        github.com/rootsecops
      </Link>
    </div>
  </div>
);

const ResumeSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="mb-4 sm:mb-8 resume-section">
    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-4 border-b-2 border-gray-300 pb-1 sm:pb-2">
      {title}
    </h2>
    <div className="space-y-2 sm:space-y-4">
      {children}
    </div>
  </section>
);

const ResumeEntry = ({ title, subtitle, date, children }: { title: string, subtitle: string, date?: string, children: React.ReactNode }) => (
    <div className="ml-2 sm:ml-4 break-inside-avoid">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-1">
            <div className="flex items-center gap-2">
                <div>
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-xs sm:text-md text-gray-600">{subtitle}</p>
                </div>
            </div>
            {date && <p className="text-[10px] sm:text-sm text-gray-500 text-left sm:text-right flex-shrink-0 ml-0 sm:ml-4 mt-1 sm:mt-0">{date}</p>}
        </div>
        <div className="prose text-xs sm:text-sm prose-sm text-gray-600 max-w-none mt-1 sm:mt-2 ml-2 sm:ml-4 prose-ul:list-disc prose-ul:p-0 prose-li:my-0 prose-p:my-0">
            {children}
        </div>
    </div>
);

const ProjectEntry = ({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) => (
    <div className="ml-2 sm:ml-4 break-inside-avoid">
        <div className="flex items-start mb-1">
            <div className="flex-shrink-0 w-2 h-2 mt-[6px] text-gray-800">
                <svg viewBox="0 0 100 100" fill="currentColor"><polygon points="0,0 100,50 0,100" /></svg>
            </div>
            <div className="ml-2">
                <h3 className="text-sm sm:text-lg font-semibold text-gray-900">
                    {title} <span className="text-gray-600 font-normal">| {subtitle}</span>
                </h3>
            </div>
        </div>
        <div className="prose text-xs sm:text-sm prose-sm text-gray-600 max-w-none mt-1 sm:mt-2 ml-5 prose-ul:p-0 prose-ul:list-['•'] prose-li:my-0 prose-li:pl-2 prose-p:my-0">
            {children}
        </div>
    </div>
);

const TimelineEntry = ({ degree, institution, date, isLast = false }: { degree: string, institution: string, date: string, isLast?: boolean }) => (
    <div className="relative pl-4">
        <div className="absolute left-0 top-1.5 h-full">
            {/* Dot */}
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full absolute -left-[3.5px] top-0.5"></div>
            {/* Line */}
            {!isLast && <div className="absolute top-2 left-0 h-full w-px bg-gray-300"></div>}
        </div>
        <div>
            <h3 className="font-semibold text-sm sm:text-lg text-gray-900">{degree}</h3>
            <p className="text-xs sm:text-md text-gray-600">{institution}</p>
            <p className="text-[10px] sm:text-sm text-gray-500 mt-1">{date}</p>
        </div>
    </div>
);


const ResumePage = () => {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const pdfUrl = "https://github.com/rootsecops/rootsecops/blob/main/assets/resume/resume.pdf?raw=true";

  const handleDownloadPdf = () => {
    if (downloadState !== 'idle') return;

    setDownloadState('downloading');

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', 'Sonajit-Rabha-Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setDownloadState('completed');
      setTimeout(() => {
        setDownloadState('idle');
      }, 2000); // Show "Completed" for 2 seconds
    }, 1500); // Simulate download time
  };

  const getButtonContent = () => {
    switch (downloadState) {
        case 'downloading':
            return <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Downloading...</>;
        case 'completed':
            return <><Check className="mr-2 h-4 w-4" /> Downloaded!</>;
        default:
            return <><Download className="mr-2 h-4 w-4" /> Download PDF</>;
    }
  };


  return (
    <div className="bg-black text-black min-h-screen py-2 sm:py-8 px-1 sm:px-4">
       <div 
        id="download-button-container"
        className="fixed top-4 right-4 z-50"
       >
            <Button onClick={handleDownloadPdf} disabled={downloadState !== 'idle'}>
                {getButtonContent()}
            </Button>
        </div>
      <div id="resume-content" className="container mx-auto max-w-4xl bg-white rounded-lg">
       
        <div className="p-2 sm:p-4 md:p-12">
            <div className="resume-section">
                <ResumeHeader />
            </div>

            <div className="pt-4 sm:pt-8 space-y-4 sm:space-y-6">
                <ResumeSection title="Professional Summary">
                  <p className="text-xs sm:text-base text-gray-700 leading-relaxed text-balance">
                    A BSc Computer Science student with a strong passion for cybersecurity. I have hands-on experience in Digital Forensics and Incident Response (DFIR), SOC operations, OSINT, and Vulnerability Assessment & Penetration Testing (VAPT) gained through an intensive internship. Skilled at identifying vulnerabilities, analyzing security risks, and applying practical testing methods, I bring a detail-oriented and proactive approach to problem-solving.
                  </p>
                </ResumeSection>

                <ResumeSection title="Technical Skills">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 sm:gap-y-4 text-xs sm:text-base text-gray-800">
                        <div><strong>Operating Systems:</strong> Linux (Kali, Ubuntu), Windows</div>
                        <div><strong>Programming & Scripting:</strong> C/C++ (Intermediate), Python (Basic)</div>
                        <div><strong>Security Tools:</strong> Nmap, Burp Suite, OWASP ZAP, Metasploit, Wireshark, John the Ripper, Hashcat, Maltego, and more.</div>
                        <div><strong>Concepts:</strong> Social Engineering, Phishing Threats, Network Security Fundamentals, VPAT, OSINT</div>
                    </div>
                </ResumeSection>
                
                <ResumeSection title="Experience">
                   <ResumeEntry title="Cybersecurity Intern" subtitle="Encoderspro Pvt. Ltd. (via ECSIP 2025 Program)" date="1 month">
                        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                            <li>Gained hands-on experience in DFIR, SOC operations, OSINT, network security, and VAPT.</li>
                            <li>Assisted in vulnerability assessments and penetration testing simulations.</li>
                            <li>Developed foundational skills in threat detection and security monitoring.</li>
                        </ul>
                    </ResumeEntry>
                </ResumeSection>
                
                 <ResumeSection title="Education">
                    <div className="ml-2 sm:ml-4 space-y-4 sm:space-y-6">
                        <TimelineEntry 
                            degree="Bachelor of Science in Computer Science" 
                            institution="Pandit Deendayal Upadhyaya Adarsha Mahavidyalaya"
                            date="2024 – 2028"
                        />
                        <TimelineEntry 
                            degree="Diploma in Computer Applications" 
                            institution="Private Institution"
                            date="2024 – 2025"
                        />
                        <TimelineEntry
                            degree="Higher Secondary — Science Stream" 
                            institution="Jawaharlal Nehru College"
                            date="2022 – 2024"
                            isLast={true}
                        />
                    </div>
                </ResumeSection>

                <ResumeSection title="Projects">
                    <ProjectEntry title="MetaWiper" subtitle="Python">
                         <ul className="text-xs sm:text-sm">
                            <li>A custom-designed data-wiping tool to understand secure data deletion principles.</li>
                            <li>Operates at a low level to ensure data is irrecoverable.</li>
                        </ul>
                    </ProjectEntry>
                    <ProjectEntry title="Personal Portfolio" subtitle="Next.js, JavaScript">
                         <ul className="text-xs sm:text-sm">
                            <li>A modern, responsive website showcasing projects, skills, and resume.</li>
                            <li>Built with the Next.js framework to demonstrate modern web development practices.</li>
                        </ul>
                    </ProjectEntry>
                </ResumeSection>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;

    