/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProgressCreateFormInputValues = {
    userID?: string;
    progress?: string;
};
export declare type ProgressCreateFormValidationValues = {
    userID?: ValidationFunction<string>;
    progress?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgressCreateFormOverridesProps = {
    ProgressCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
    progress?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ProgressCreateFormProps = React.PropsWithChildren<{
    overrides?: ProgressCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProgressCreateFormInputValues) => ProgressCreateFormInputValues;
    onSuccess?: (fields: ProgressCreateFormInputValues) => void;
    onError?: (fields: ProgressCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProgressCreateFormInputValues) => ProgressCreateFormInputValues;
    onValidate?: ProgressCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProgressCreateForm(props: ProgressCreateFormProps): React.ReactElement;
