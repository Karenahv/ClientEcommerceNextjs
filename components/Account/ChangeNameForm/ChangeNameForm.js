import React, {useState} from 'react'
import {Button, Form} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {updateNameApi} from "../../../api/user";
import {toast} from "react-toastify";

export default function ChangeNameForm(props) {
    const [loading, setLoading] = useState(false)
    const {user, logout, setReloadUser} = props

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: Yup.object(validationScheman()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updateNameApi(user.id, formData, logout)
            if (response) {
                setReloadUser(true)
                toast.success('Datos actualizados')
                debugger
            } else {
                toast.error('Error al actualizar')

            }
            setLoading(false)
        }
    })
    return (
        <div className={'change-name-form'}>
            <h4>Cambia tu nombre y apellido</h4>
            <Form widths={'equal'} onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Input
                        name={'name'}
                        placeholder={'Tu nuevo nombre'}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name}
                    >
                    </Form.Input>
                    <Form.Input
                        name={'lastname'}
                        placeholder={'Tus nuevos apellidos'}
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                        error={formik.errors.lastname}
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
        name: user?.name,
        lastname: user?.lastname,
    }
}

function validationScheman() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
    }

}