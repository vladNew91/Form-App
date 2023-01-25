import { useCallback, useState } from "react";
import "yup-phone";
import * as yup from 'yup';
import { FormData } from "../../types";
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorAlertComponent, TextFieldComponent } from "../../components";
import styles from "./index.module.css";

const schema = yup
    .object()
    .shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().phone().required(),
    });

export const FormComponent: React.FC = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const [errorSubmit, setErrorSubmit] = useState<AxiosError>();

    const succesSubmit = useCallback(() => {
        reset();
        alert("Succesfull submit");
    }, []);

    const onSubmit = handleSubmit(data => {
        axios.post("http://localhost:3004/feedback", {
            name: data.name,
            email: data.email,
            phone: data.phone,
        })
            .then(() => succesSubmit())
            .catch((err) => setErrorSubmit(err));
    });

    const isBtnSubmitDisabled: boolean = !!(errors.name || errors.email || errors.phone);

    return (
        <div className={`${styles.container} ${styles.gradiendBorder}`}>
            <form onSubmit={onSubmit}>
                <p className={styles.title}>Contact us</p>

                <p className={styles.description}>
                    Do you have any kind of help please contact with us
                </p>

                <div className={styles.inputsBlock}>
                    <TextFieldComponent error={errors.name} register={register} placeholder="name" />

                    <div className={styles.inputMargin}>
                        <TextFieldComponent error={errors.phone} register={register} placeholder="phone" />
                    </div>

                    <TextFieldComponent error={errors.email} register={register} placeholder="email" />
                </div>

                <button disabled={isBtnSubmitDisabled} type="submit" className={styles.btnSend}>Send</button>
            </form>

            {errorSubmit && <ErrorAlertComponent error={errorSubmit.message} />}
        </div>
    );
};
