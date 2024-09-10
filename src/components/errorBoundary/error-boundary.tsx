'use client';
import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

interface IErrorBoundaryProps {
    fallback?: React.ReactNode;
};

interface IErrorBoundaryState {
    hasError: boolean;
};

export class ErrorBoundary extends Component<PropsWithChildren<IErrorBoundaryProps>, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error({ error, errorInfo });
    }
    render(): ReactNode {
        return (this.state.hasError) ? this.props.fallback : this.props.children;
    }
}; 