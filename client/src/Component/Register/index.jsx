import { useState } from "react";
import FormGroup from "../FormGroup"
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import "./style.scss"
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { regex_email, regex_password, regex_phone, regex_name } from '../../const/regex'
import { addUserToDb } from "../../store/slice/UserSlice"


function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [user, setUser] = useState({});

    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            fullname:
                Yup.string()
                    .required("Required")
                    .matches(regex_name, "vui lòng nhập tên hợp lệ")
                    .max(50, "Quá giới hạn ký tự"),
            email:
                Yup.string()
                    .required("Required")
                    .matches(regex_email, "Please enter a valid email address"),
            phone:
                Yup.string()
                    .required("Required")
                    .matches(regex_phone, "Must be a valid phone number"),
            password:
                Yup.string()
                    .required("Required")
                    .matches(regex_password, "Password must be 7-19 charactors and contain at least one uppercase letter, one lowercase letter and one number"),
            confirmPassword:
                Yup.string()
                    .required("Required")
                    .oneOf([Yup.ref("password"), null], "Password must match")
        }),
        onSubmit: async (value) => {
            try {
                const { fullname, email, password, phone, confirmPassword } = formik.values
                const newUser = { id: user.uid, fullname, email, phone, password, confirmPassword, gender: 'male', age: 0, role: 2 }
                dispatch(addUserToDb(newUser))
                localStorage.setItem('user-info', JSON.stringify({
                    fullname,
                    email,
                    phone
                }))
                navigate("/login")
            } catch (err) {
                return err.message
            }
        }
    });

    return (
        <div className="signup">
            <div className="d-flex justify-content-center">
                <div className="col-auto col-lg-4 form">
                    <Form className="form-style" onSubmit={formik.handleSubmit}>
                        <h2 className="form-title">{'Đăng ký'}</h2>
                        <FormGroup
                            label={'Họ và tên'}
                            id='fullname'
                            type='fullname'
                            name='fullname'
                            placeholder='Nhập họ và tên'
                            value={formik.values.fullname}
                            handleChange={formik.handleChange}
                            error={formik.errors.fullname}
                        />
                        <FormGroup
                            label={'Email'}
                            id='email'
                            type='email'
                            name='email'
                            placeholder='Nhập email của bạn'
                            value={formik.values.email}
                            handleChange={formik.handleChange}
                            error={formik.errors.email}
                        />
                        <FormGroup
                            label={'Số điện thoại'}
                            id='phone'
                            type='text'
                            name='phone'
                            placeholder='Nhập số điện thoại'
                            value={formik.values.phone}
                            handleChange={formik.handleChange}
                            error={formik.errors.phone}
                        />
                        <FormGroup
                            label={'Mật khẩu'}
                            id='password'
                            type='password'
                            name='password'
                            placeholder='Nhập mật khẩu'
                            value={formik.values.password}
                            handleChange={formik.handleChange}
                            error={formik.errors.password}
                        />
                        <FormGroup
                            label={'Xác minh mật khẩu'}
                            id='confirmPassword'
                            type='password'
                            name='confirmPassword'
                            placeholder='Xác minh mật khẩu'
                            value={formik.values.confirmPassword}
                            handleChange={formik.handleChange}
                            error={formik.errors.confirmPassword}
                        />
                        <div className="d-flex justify-content-center align-items-center">
                            <Button type="submit" className="btn_submit btn text-center" size="lg">Đăng nhập</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
