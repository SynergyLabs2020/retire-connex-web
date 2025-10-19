import Image from 'next/image';

interface AuthHeaderProps {
    heading: string;
    description?: string;
    step?: number;
}

export default function AuthHeader({ heading, description, step }: AuthHeaderProps) {
    return (
        <div className="flex flex-col items-center">
            <Image
                src="/logo.svg"
                alt="Connex Logo"
                width={90}
                height={48}
                priority
                className="mb-6"
            />
            {step ? (
                <>
                    <Image
                        src={`/${step}.png`}
                        alt="Connex Logo"
                        width={step > 4 ? 350 : 500}
                        height={100}
                        priority
                        className="mb-6"
                    />
                </>
            ) : (
                <></>
            )}
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
        </div>
    );
}
