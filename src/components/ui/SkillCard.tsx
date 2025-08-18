
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
      <div className={`tool-badge ${badgeClass}`}>
        {proficiency}
      </div>
      <Icon className="tool-icon mb-4" />
      <h4 className="font-bold text-lg text-foreground">{name}</h4>
      <p className="text-sm text-muted-foreground">{category}</p>
    </div>
  );
}
