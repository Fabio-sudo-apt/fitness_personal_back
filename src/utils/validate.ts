import * as Yup from "yup";

export const validate = async <T extends Yup.Maybe<Yup.AnyObject>>(data: T, schema: Yup.ObjectSchema<T>) => {
    try {
        await schema.validate(data, { abortEarly: false });
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            throw new Error(
                `${error.errors.join(', ')}`,
            );
        }
        throw error;
    }
};