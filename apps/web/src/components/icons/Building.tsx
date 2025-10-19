import React from 'react';

interface IconProps {
    className?: string;
}

export default function Building(props: IconProps) {
    return (
        <svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props} // Allows you to pass other props like className, etc.
        >
            <path
                d="M20.8332 36.6674H6.79987C4.86654 36.6674 3.2832 35.1174 3.2832 33.2174V8.48408C3.2832 4.11741 6.5332 2.13408 10.5165 4.08408L17.9165 7.71741C19.5165 8.50074 20.8332 10.5841 20.8332 12.3507V36.6674Z"
                stroke="#F37543"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M36.6173 25.1V31.4C36.6173 35 34.9506 36.6667 31.3506 36.6667H20.834V17.3667L21.6173 17.5334L29.1173 19.2167L32.5006 19.9667C34.7006 20.45 36.5006 21.5834 36.6006 24.7834C36.6173 24.8834 36.6173 24.9834 36.6173 25.1Z"
                stroke="#F37543"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.16602 15H14.9493"
                stroke="#F37543"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.16602 21.667H14.9493"
                stroke="#F37543"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M29.1172 19.2175V24.5842C29.1172 26.6508 27.4339 28.3342 25.3672 28.3342C23.3005 28.3342 21.6172 26.6508 21.6172 24.5842V17.5342L29.1172 19.2175Z"
                stroke="#F37543"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M36.6005 24.7835C36.5005 26.7501 34.8672 28.3335 32.8672 28.3335C30.8005 28.3335 29.1172 26.6501 29.1172 24.5835V19.2168L32.5005 19.9668C34.7005 20.4501 36.5005 21.5835 36.6005 24.7835Z"
                stroke="#F37543"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
