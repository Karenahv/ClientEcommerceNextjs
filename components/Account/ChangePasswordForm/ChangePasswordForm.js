import React, {useState} from 'react'
import {Button, Form} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {updatePasswordApi} from "../../../api/user";
import {toast} from "react-toastify";

export default function ChangePasswordForm(props) {
    const [loading, setLoading] = useState(false)
    const {user, logout} = props

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationScheman()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updatePasswordApi(user.id, formData.password, logout)
            if (response) {
                toast.success('Password actualizado')
                formik.handleReset()
                logout()
            } else if( response?.status === 400) {
                toast.error('Error al actualizar el Password')

            } else {
                toast.error('Error al actualizar el Password')

            }
            setLoading(false)
        }
    })
    return (
        <div className={'change-password-form'}>
            <h4>Cambiar tu contraseña</h4>
            <Form widths={'equal'} onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Input
                        name={'password'}
                        type={'password'}
                        placeholder={'Tu nueva contraseña'}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password}
                    >
                    </Form.Input>
                    <Form.Input
                        name={'repeatPassword'}
                        placeholder={'Confirma tu nueva contraseña'}
                        type={'password'}
                        onChange={formik.handleChange}
                        value={formik.values.repeatPassword}
                        error={formik.errors.repeatPassword}
                    >
                    </Form.Input>
                </Form.Group>
                <Button className={'submit'} loading={loading}>Actualizar</Button>

            </Form>

        </div>
    )
}

function initialValues(user) {
    return {
        password: '',
        repeatPassword: '',
    }
}

function validationScheman() {
    return {
        password: Yup.string().required(true).oneOf([Yup.ref('repeatPassword'), true]),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref('password'), true]),
    }

}