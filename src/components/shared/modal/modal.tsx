import { Cross1Icon } from "@radix-ui/react-icons";
import styles from "./modal.module.scss";
import { ReactNode } from "react";
import clsx from "clsx";

interface ModalProps {
  onClose: () => void;
  onSubmit: () => void;
  content: ReactNode | string;
  title: string;
  size?: "small" | "medium" | "large";
}

const Modal = ({
  size = "small",
  title,
  content,
  onClose,
  onSubmit,
}: ModalProps) => {
  const styleSize = {
    small: styles["modal-small"],
    medium: styles["modal-medium"],
    large: styles["modal-large"],
  };

  return (
    <>
      <div className={styles["dark-bg"]} onClick={onClose} />

      <div className={styles["centered"]}>
        <div className={clsx(styles["modal"], styleSize[size])}>
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
