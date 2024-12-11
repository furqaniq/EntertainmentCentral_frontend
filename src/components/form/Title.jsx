import React from "react";

export default function Title({ Children }) {
    return (
        <h1 className="text-xl dark:text-white text-secondary  font-semibold text-center">{Children}</h1>
    );
}