import React, {useState} from 'react'
import {Button, Form} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {updateEmailApi, updateNameApi} from "../../../api/user";
import {toast} from "react-toastify";

export default function ChangeEmailForm(props) {
    const [loading, setLoading] = useState(false)
    const {user, logout, setReloadUser} = props

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationScheman()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updateEmailApi(user.id, formData.email, logout)
            if (response) {
                setReloadUser(true)
                toast.success('Email actualizado')
                formik.handleReset()
            } else if( response?.status === 400) {
                toast.error('Error al actualizar el email')

            } else {
                toast.error('Error al actualizar el email')
            }
            setLoading(false)
        }
    })
    return (
        <div className={'change-email-form'}>
            <h4>Cambia tu email<span>  (Tu email actual: {user.email})</span></h4>
            <Form widths={'equal'} onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Input
                        name={'email'}
                        placeholder={'Tu nuevo email'}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.errors.email}
                    >
                    </Form.Input>
                    <Form.Input
                        name={'repeatEmail'}
                        placeholder={'Confirma tu nuevo email'}
                        onChange={formik.handleChange}
                        value={formik.values.repeatEmail}
                        error={formik.errors.repeatEmail}
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
        email: '',
        repeatEmail: '',
    }
}

function validationScheman() {
    return {
        email: Yup.string().email(true).required(true).oneOf([Yup.ref('repeatEmail'), true]),
        repeatEmail: Yup.string().email(true).required(true).oneOf([Yup.ref('email'), true]),
    }

}