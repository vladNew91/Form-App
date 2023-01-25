import { FieldError, UseFormRegister } from "react-hook-form";
import { capitalizedWord } from "../../helpers";
import { FormData } from "../../types";
import styles from "./index.module.css";

interface TextFieldComponentProps {
    error?: FieldError,
    register: UseFormRegister<FormData>
    placeholder: "name" | "email" | "phone",
}

export const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
    error,
    register,
    placeholder,
}: TextFieldComponentProps): JSX.Element => {
    return (
        <>
            <input
                {...register(placeholder)}
                placeholder={placeholder !== "email" ? capitalizedWord(placeholder) : "E-mail"}
                className={
                    `${styles.textField} ${!error ? styles.textFieldDefault : styles.textFieldError}`
                }
            />

            {error && <span role="alert">{error.message}</span>}
        </>
    );
};
