interface IconProps {
    className?: string;
}

export default function Profile(props: IconProps) {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M20.2663 18.1168C20.0996 18.1002 19.8996 18.1002 19.7163 18.1168C15.7496 17.9835 12.5996 14.7335 12.5996 10.7335C12.5996 6.65016 15.8996 3.3335 19.9996 3.3335C24.0829 3.3335 27.3996 6.65016 27.3996 10.7335C27.3829 14.7335 24.2329 17.9835 20.2663 18.1168Z"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.9332 24.2665C7.89987 26.9665 7.89987 31.3665 11.9332 34.0498C16.5165 37.1165 24.0332 37.1165 28.6165 34.0498C32.6499 31.3498 32.6499 26.9498 28.6165 24.2665C24.0499 21.2165 16.5332 21.2165 11.9332 24.2665Z"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
