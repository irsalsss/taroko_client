import { Cross1Icon } from "@radix-ui/react-icons";
import ButtonIcon from "../button-icon/button-icon";
import styles from "./modal.module.scss";

interface ModalProps {
  onClose: () => void;
  onSubmit: () => void;
  content: string;
  title: string;
}

const Modal = ({ title, content, onClose, onSubmit }: ModalProps) => {
  return (
    <>
      <div className={styles["dark-bg"]} onClick={onClose} />

      <div className={styles["centered"]}>
        <div className={styles["modal"]}>
          <div className={styles["modal-header"]}>
            <h5 className={styles["heading"]}>{title}</h5>
          </div>

          <div className={styles["close-btn"]} onClick={onClose}>
            <Cross1Icon />
          </div>

          <div className={styles["modal-content"]}>{content}</div>

          <div className={styles["modal-actions"]}>
            <div className={styles["actions-container"]}>
              <button className={styles["delete-btn"]} onClick={onSubmit}>
                Submit
              </button>

              <button className={styles["cancel-btn"]} onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
