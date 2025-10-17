import AuthHeader from '@/components/AuthHeader';

export default function SkillsPage() {
    return (
        <div className="flex flex-col items-center">
            <AuthHeader
                heading="Show us what you love"
                description="Tell us about your hobbies and skills. This helps connect you with meaningful opportunities to do what you enjoy."
                step={3}
            />
        </div>
    );
}
