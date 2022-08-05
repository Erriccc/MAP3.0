import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
export const Form = ({ onSubmit, children, useFormProps, validationSchema, ...formProps }) => {
    const methods = useForm({
        ...useFormProps,
        ...(validationSchema && { resolver: yupResolver(validationSchema) }),
    });
    return (<form onSubmit={methods.handleSubmit(onSubmit)} noValidate {...formProps} className="space-y-4">
      {children(methods)}
    </form>);
};
