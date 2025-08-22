
"use client";

import * as React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ScrollArea } from './scroll-area';

interface SearchDialogProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
  resultsClassName?: string;
  noResultsContent?: React.ReactNode;
  hasResults: boolean;
}

export function SearchDialog({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
  children,
  className,
  resultsClassName,
  noResultsContent,
  hasResults,
}: SearchDialogProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const DesktopSearch = () => (
    <div className={cn("relative w-full max-w-xs", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="pl-10"
      />
    </div>
  );

  const MobileSearch = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("flex-shrink-0", className)}>
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 gap-0 sm:max-w-md md:max-w-lg h-[80vh] flex flex-col">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <DialogDescription className="sr-only">Search for content within the site.</DialogDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={placeholder}
              value={searchTerm}
              onChange={handleInputChange}
              className="pl-10"
              autoFocus
            />
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1">
           <div className={cn("p-4", resultsClassName)}>
              {searchTerm && !hasResults ? noResultsContent : children}
           </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );

  return isMobile ? <MobileSearch /> : <DesktopSearch />;
}
