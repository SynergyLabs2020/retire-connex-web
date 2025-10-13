interface AuthHeaderProps {
    heading: string;
    description?: string;
}

export default function AuthHeader({ heading, description }: AuthHeaderProps) {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl w-full sm:text-4xl font-bold px-3 text-foreground text-center">
                {heading}
            </h1>
            {description ? (
                <p className="text-lg sm:text-xl max-w-sm text-muted-foreground text-center mt-3">
                    {description}
                </p>
            ) : (
                ''
            )}
        </div>
    );
}
