
import type { IconType } from 'react-icons';

export interface SkillCardProps {
  icon: IconType;
  name: string;
  category: string;
  proficiency: 'Expert' | 'Intermediate' | 'Beginner';
}

const proficiencyStyles = {
  Expert: 'tool-badge-expert',
  Intermediate: 'tool-badge-intermediate',
  Beginner: 'tool-badge-beginner',
};

export default function SkillCard({ icon: Icon, name, category, proficiency }: SkillCardProps) {
  const badgeClass = proficiencyStyles[proficiency];

  return (
    <div className="tool-card">
      <div className="flex items-center gap-4 mb-4 w-full">
        <div className="flex-shrink-0">
           <Icon className="w-8 h-8 tool-icon" />
        </div>
        <div className="flex flex-col flex-grow">
            <h4 className="font-semibold text-base text-primary leading-tight">{name}</h4>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{category}</p>
        </div>
      </div>
      <div className="self-start">
        <div className={`tool-badge ${badgeClass}`}>
          {proficiency}
        </div>
      </div>
    </div>
  );
}
