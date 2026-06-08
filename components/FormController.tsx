// Here we are minimising the code of auth.tsx
// <Controller
//                                 name="password"
//                                 control={form.control}
//                                 render={({ field, fieldState }) => (
//                                     <Field data-invalid={fieldState.invalid}>
//                                         <FieldLabel htmlFor="form-rhf-input-password"
//                                             className="form-label"
//                                         >
//                                             Password
//                                         </FieldLabel>
//                                         <Input
//                                             {...field}
//                                             id="form-rhf-input-email"
//                                             aria-invalid={fieldState.invalid}
//                                             placeholder="write your password"
//                                             className="input-class"
//                                             type="password"
//                                         />
//                                         {fieldState.invalid && (
//                                             <FieldError errors={[fieldState.error]}
//                                             className="form-message mt-[-12]"
//                                             />
//                                         )}
//                                     </Field>
//                                 )}
//                             />


import React from 'react'
import { Controller, FieldPath } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import {Control} from "react-hook-form"
import z from 'zod'
import { authFormSchema } from '@/lib/utils'

const formschema = authFormSchema("sign-up");
interface inputTypes{
    control : Control<z.infer<typeof formschema>>
    // name: "email" | "password" it is same as just below line it is present in react hook form.
    name: FieldPath<z.infer<typeof formschema>> // it is taking type directly as defined in authformschema inside utils.
    label: string
    type?: string 
    placeholder: string
}
const FormController = ({ control, name, placeholder, type, label }: inputTypes) => {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-password"
                            className="form-label"
                        >
                            {label}
                        </FieldLabel>
                        <Input
                            {...field}
                            id="form-rhf-input-email"
                            aria-invalid={fieldState.invalid}
                            placeholder={placeholder}
                            className="input-class"
                            type={type}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]}
                                className="form-message"
                            />
                        )}
                    </Field>
                )}
            />
        </div>
    )
}

export default FormController
