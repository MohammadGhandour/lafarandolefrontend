function ErrorMessage({ children, classes }) {
    return (
        <h3 className={`flex-center ${classes}`}>{children}</h3>
    )
}

export default ErrorMessage;
