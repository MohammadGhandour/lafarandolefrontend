import styles from "../../styles";

function UIButton({ children, submitting }) {
    return (
        <button type='submit' disabled={submitting} className={`${styles.blackButton} ${submitting ? "disabled:cursor-not-allowed" : ""}`}>{children}</button>
    )
}

export default UIButton;
