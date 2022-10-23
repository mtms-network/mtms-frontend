import React from "react";

export const IconChat = ({ color = '#181818' }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20.3996 13.875C20.3996 14.3391 20.2029 14.7842 19.8529 15.1124C19.5028 15.4406 19.028 15.625 18.5329 15.625H7.33294L3.59961 19.125V5.125C3.59961 4.66087 3.79628 4.21575 4.14634 3.88756C4.49641 3.55937 4.97121 3.375 5.46628 3.375H18.5329C19.028 3.375 19.5028 3.55937 19.8529 3.88756C20.2029 4.21575 20.3996 4.66087 20.3996 5.125V13.875Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
