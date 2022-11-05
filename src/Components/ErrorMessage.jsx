function ErrorMessage({ children, classes }) {
    return (
        <h2 className={`flex-center ${classes}`}>{children}</h2>
    )
}

export default ErrorMessage;
