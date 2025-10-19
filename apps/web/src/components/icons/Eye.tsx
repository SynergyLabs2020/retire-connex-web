interface IconProps {
    className?: string;
}

export default function Eye(props: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.42 13.9799 8.42 11.9999C8.42 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z" />
            <path d="M11.9998 20.2688C15.5298 20.2688 18.8198 18.1887 21.1098 14.5887C22.0098 13.1787 22.0098 10.8087 21.1098 9.39875C18.8198 5.79875 15.5298 3.71875 11.9998 3.71875C8.46984 3.71875 5.17984 5.79875 2.88984 9.39875C1.98984 10.8087 1.98984 13.1787 2.88984 14.5887C5.17984 18.1887 8.46984 20.2688 11.9998 20.2688Z" />
        </svg>
    );
}
