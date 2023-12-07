"use client"

const ErrorPage = ({
                       error,
                   }: {
    error: Error & { digest?: string }
}) => {
    return (
        <div>
            <p>{error.message}</p>
        </div>
    );
};

export default ErrorPage;