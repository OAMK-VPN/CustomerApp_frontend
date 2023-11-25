import React, { useState } from "react";
import styles from './Usrsetings.module.css'
import { usersAPI } from "../../Instance";
import { debounce } from "lodash";

const CustomPrompt = ({showPrompt, setshowPrompt}) => {
    const [error, setError] = useState(null);
    const [pwd, updatePwd] = useState({
        current_pwd: '',
        new_pwd: '',
    })

    const handlepwdUpdate = debounce((e) => {
        updatePwd({
            ...pwd,
            [e.target.name]: e.target.value,
        });
    }, 75);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await usersAPI.put('/authUser/updatePassword', {
                password: pwd.current_pwd,
                newPassword: pwd.new_pwd,
                confirmPassword: pwd.new_pwd,
            })
            console.log("success")
            setshowPrompt(false);
        } catch (error) {
            console.log(error)
            setError(true);

            setTimeout(() => {
                setError(false);
            }, 500)
        }
    };

    return (
        <div className={styles.prompt_div}>
            <form className={styles.prompt_form} onSubmit={submitHandler}>
                <div className={styles.prompt_chdiv}>
                    <label className={styles.prompt_label} htmlFor="1"> Password </label>
                    <input
                        className={error ? styles.prompt_input_wrong : styles.prompt_input}
                        id="1"
                        type="text"
                        name="current_pwd"
                        onChange={handlepwdUpdate}
                        required
                    />
                </div>
                <div className={styles.prompt_chdiv}>
                    <label className={styles.prompt_label} htmlFor="2">New password</label>
                    <input
                        className={styles.prompt_input}
                        id="2"
                        type="text"
                        name="new_pwd"
                        onChange={handlepwdUpdate}
                        required
                    />
                </div>
                <button className={styles.prompt_button} type="submit">Update</button>
                <button
                    className={styles.prompt_button}
                    type="button"
                    onClick={() => setshowPrompt(false)}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default CustomPrompt;
