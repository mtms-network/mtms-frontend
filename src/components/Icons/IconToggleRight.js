import React from "react";

export const IconToggleRight = ({ color = '#ffffff', size = 24 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke={color} d="M22 8H10C5.58172 8 2 11.5817 2 16C2 20.4183 5.58172 24 10 24H22C26.4183 24 30 20.4183 30 16C30 11.5817 26.4183 8 22 8Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path stroke={color} d="M22 20C24.2091 20 26 18.2091 26 16C26 13.7909 24.2091 12 22 12C19.7909 12 18 13.7909 18 16C18 18.2091 19.7909 20 22 20Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};
