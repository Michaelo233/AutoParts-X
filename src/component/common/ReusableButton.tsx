import styles from './ReusableButton.module.css';

type ReusableButtonProps = {
  label: string;
  onClick: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function ReusableButton({
    label,
    onClick,
    type = "button",
    disabled = false,
}: ReusableButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles.button}>
      {label}
    </button>
  );
}