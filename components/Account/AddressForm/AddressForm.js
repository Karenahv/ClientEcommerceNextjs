import React, {useState} from 'react'
import {Button, Form} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {createAddressApi, updateEmailApi} from "../../../api/user";
import {toast} from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import {updateAddressApi} from "../../../api/address";

export default function AddressForm(props) {
    const [loading, setLoading] = useState(false)
    const {auth, logout} = useAuth()
    const {setShowModal, setReloadAddresess, newAddress, address} = props

    const formik = useFormik({
        initialValues: initialValues(address),
        validationSchema: Yup.object(validationScheman()),
        onSubmit: (formData) => {
            newAddress ? createAddress(formData) : updateAddress(formData);
        },
    });

    const createAddress = async (formData) => {
        setLoading(true);
        const formDataTemp = {
            ...formData,
            users_permissions_user: auth.idUser,
        };
        const response = await createAddressApi(formDataTemp, logout);

        if (!response) {
            toast.warning("Error al crear la dirección");
            setLoading(false);
        } else {
            formik.resetForm();
            setReloadAddresess(true);
            setLoading(false);
            setShowModal(false);
        }
    };

    const updateAddress = async (formData) => {
        setLoading(true);
        const formDataTemp = {
            ...formData,
            users_permissions_user: auth.idUser,
        };
        const response = await updateAddressApi(address._id, formDataTemp, logout);

        if (!response) {
            toast.warning("Error al actualizar la direccion");
            setLoading(false);
        } else {
            formik.resetForm();
            setReloadAddresess(true);
            setLoading(false);
            setShowModal(false);
        }
    };
    return (

        <Form widths={'equal'} onSubmit={formik.handleSubmit}>
            <Form.Input
                name={'title'}
                type={'text'}
                label={'Título de la dirección'}
                placeholder={'Título de la dirección'}
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.errors.title}
            >
            </Form.Input>
            <Form.Group widths={'equal'}>
                <Form.Input
                    name={'name'}
                    type={'text'}
                    label={'Nombre y Apellidos'}
                    placeholder={'Nombre y Apellidos'}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name}
                >
                </Form.Input>
                <Form.Input
                    name={'address'}
                    type={'text'}
                    label={'Dirección'}
                    placeholder={'Dirección'}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    error={formik.errors.address}
                >
                </Form.Input>
            </Form.Group>dasd
            <Form.Group widths={'equal'}>
                <Form.Input
                    name={'city'}
                    type={'text'}
                    label={'Ciudad'}
                    placeholder={'Ciudad'}
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    error={formik.errors.city}
                >
                </Form.Input>
                <Form.Input
                    name={'state'}
                    type={'text'}
                    label={'Estado/Provincia/Región'}
                    placeholder={'Estado/Provincia/Región'}
                    onChange={formik.handleChange}
                    value={formik.values.state}
                    error={formik.errors.state}
                >
                </Form.Input>

            </Form.Group>
            <Form.Group widths={'equal'}>
                <Form.Input
                    name={'postalCode'}
                    type={'text'}
                    label={'Código Postal'}
                    placeholder={'Código Postal'}
                    onChange={formik.handleChange}
                    value={formik.values.postalCode}
                    error={formik.errors.postalCode}
                >
                </Form.Input>
                <Form.Input
                    name={'phone'}
                    type={'text'}
                    label={'Número de teléfono'}
                    placeholder={'Número de teléfono'}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    error={formik.errors.phone}
                >
                </Form.Input>


            </Form.Group>
            <div className={'actions'}>
                <Button className={'submit'} type={'submit'} loading={loading}>
                    {
                        newAddress ? 'Crear Dirección' : 'Actualizar Dirección'
                    }</Button>
            </div>

        </Form>
    )
}

function initialValues(address) {
  return {
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
  };
}

function validationScheman() {
    return {
        title: Yup.string().required(true),
        name: Yup.string().required(true),
        address: Yup.string().required(true),
        city: Yup.string().required(true),
        state: Yup.string().required(true),
        postalCode: Yup.string().required(true),
        phone: Yup.string().required(true),
    }

}