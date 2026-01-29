import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <div className="max-w-md w-full text-center space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-destructive">Oops!</h1>
                            <h2 className="text-2xl font-semibold">Something went wrong</h2>
                            <p className="text-muted-foreground">
                                We're sorry for the inconvenience. Please try refreshing the page.
                            </p>
                        </div>
                        {this.state.error && (
                            <details className="text-left bg-secondary p-4 rounded-lg">
                                <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
                                <pre className="text-xs overflow-auto">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                        <Button
                            onClick={() => window.location.href = '/'}
                            size="lg"
                        >
                            Go to Homepage
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
