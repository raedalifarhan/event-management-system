import { FieldValues } from "react-hook-form";

const convertFieldValuesToFormData = (data: FieldValues): FormData => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });

    return formData;
};

export default convertFieldValuesToFormData