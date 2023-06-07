import styles from "../../styles";

function UIButton({ children }) {
    return (
        <button type='submit' className={`${styles.blackButton}`}>{children}</button>
    )
}

export default UIButton;
