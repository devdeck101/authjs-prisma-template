import React from 'react';
import type { SVGProps } from 'react';

export function LineMdCogLoop(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="2em" viewBox="0 0 24 24" {...props}>
        <title>LineMdCogLoop</title>
        <defs>
            <symbol id="lineMdCogLoop0">
                <path fill="none" strokeWidth={2} d="M15.24 6.37C15.65 6.6 16.04 6.88 16.38 7.2C16.6 7.4 16.8 7.61 16.99 7.83C17.46 8.4 17.85 9.05 18.11 9.77C18.2 10.03 18.28 10.31 18.35 10.59C18.45 11.04 18.5 11.52 18.5 12">
                    <animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M15.24 6.37C15.65 6.6 16.04 6.88 16.38 7.2C16.6 7.4 16.8 7.61 16.99 7.83C17.46 8.4 17.85 9.05 18.11 9.77C18.2 10.03 18.28 10.31 18.35 10.59C18.45 11.04 18.5 11.52 18.5 12;M15.24 6.37C15.65 6.6 16.04 6.88 16.38 7.2C16.38 7.2 19 6.12 19.01 6.14C19.01 6.14 20.57 8.84 20.57 8.84C20.58 8.87 18.35 10.59 18.35 10.59C18.45 11.04 18.5 11.52 18.5 12">
                    </animate>
                </path>
            </symbol>
        </defs>
        <g fill="none" stroke="currentColor" strokeWidth={2}>
            <g strokeLinecap="round" strokeLinejoin="round">
                <path strokeDasharray={42} strokeDashoffset={42} d="M12 5.5C15.59 5.5 18.5 8.41 18.5 12C18.5 15.59 15.59 18.5 12 18.5C8.41 18.5 5.5 15.59 5.5 12C5.5 8.41 8.41 5.5 12 5.5z" opacity={0}>
                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.3s" values="42;0">
                    </animate><set attributeName="opacity" begin="0.2s" to={1}>
                    </set><set attributeName="opacity" begin="0.7s" to={0}>
                    </set>
                </path>
                <path strokeDasharray={20} strokeDashoffset={20} d="M12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9z">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0" />
                </path></g><g opacity={0}><use href="#lineMdCogLoop0">
                </use><use href="#lineMdCogLoop0" transform="rotate(60 12 12)" /><use href="#lineMdCogLoop0" transform="rotate(120 12 12)">
                </use><use href="#lineMdCogLoop0" transform="rotate(180 12 12)" /><use href="#lineMdCogLoop0" transform="rotate(240 12 12)">
                </use><use href="#lineMdCogLoop0" transform="rotate(300 12 12)" /><set attributeName="opacity" begin="0.7s" to={1}>
                </set><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12">
                </animateTransform></g></g></svg>);
}