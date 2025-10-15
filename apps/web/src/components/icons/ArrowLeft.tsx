import React from 'react';

interface IconProps {
    className?: string;
}

export default function ArrowLeft(props: IconProps) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props} // Spreads passed props like className, style, etc. onto the SVG
        >
            <path
                d="M7.97435 4.94189L2.91602 10.0002L7.97435 15.0586"
                stroke="#103C52"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17.0836 10H3.05859"
                stroke="#103C52"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
