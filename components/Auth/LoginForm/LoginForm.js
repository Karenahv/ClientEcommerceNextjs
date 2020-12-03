import React, {useState} from 'react'
import {Button, Form} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {toast} from "react-toastify";
import {loginApi, resetPasswordApi} from "../../../api/user";
import useAuth from "../../../hooks/useAuth";


export default function LoginForm(props) {
    const {showRegisterForm, onCloseModal} = props
    const [loading, setLoading] = useState(false)
    const {login} = useAuth()


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationScheman()),
        onSubmit: async (formData) => {
            setLoading(true);
           const response = await loginApi(formData)
            if(response?.jwt) {
                login(response.jwt)
                toast.success('Login exitoso')
                onCloseModal()
            } else {
               toast.error('Email o contraseña incorrectos')
            }
            setLoading(false)
        }

    })

    const resetPassword =  () => {
        formik.setErrors({})
        const validateEmail = Yup.string().email().required()
        if(!validateEmail.isValidSync(formik.values.identifier)){
            formik.setErrors({
                identifier: true,
            })
        } else{
           resetPasswordApi(formik.values.identifier)
        }
    }
    return (
        <Form className={'login-form'} onSubmit={formik.handleSubmit}>

            <Form.Input name={'identifier'} type={'text'} placeholder={'Correo Electronico'}
                        onChange={formik.handleChange}
                        error={formik.errors.identifier}>
            </Form.Input>
            <Form.Input name={'password'} type={'password'} placeholder={'Contraseña'}
                        onChange={formik.handleChange}
                        error={formik.errors.password}>
            </Form.Input>
            <div className={'actions'}>
                <Button type={'button'} basic
                        onClick={showRegisterForm}>
                    Registrarse
                </Button>
                <div>
                    <Button type={'submit'} className={'submit'}
                            loading={loading}>
                        Ingresar
                    </Button>
                </div>
                <Button type={'button'} onClick={resetPassword}>
                    Has olvidado tu contraseña?
                </Button>
            </div>
        </Form>
    )
}


function initialValues() {
    return {
        identifier: '',
        password: '',
    }
}

function validationScheman() {
    return {
        identifier: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
    }

}