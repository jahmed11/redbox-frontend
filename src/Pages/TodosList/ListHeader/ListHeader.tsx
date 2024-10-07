import { IListHeaderProps } from "types/todo";
import AppButton from "Components/Button";
import styles from "./listHeader.module.css";

const ListHeader = ({ onAddClick }: IListHeaderProps) => {
  return (
    <div className={styles["header-container"]}>
      <h2 className={styles["header"]}>Todo List</h2>
      <AppButton type="primary" onClick={onAddClick}>
        Add Todo
      </AppButton>
    </div>
  );
};

export default ListHeader;
