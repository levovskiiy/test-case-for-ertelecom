import { reactive, watch } from 'vue';

export function useForm(initialValues) {
    let defaultValues = initialValues;

    const formState = reactive({
        fields: structuredClone(defaultValues),
        errors: {},
        dirty: false,
        hasErrors: false,
        processing: false,
        wasSuccessful: false,
    });

    async function onBeforeSubmit() {
        formState.processing = true;
        formState.wasSuccessful = false;
    }

    async function onAfterSubmit() {
        formState.processing = false;
        formState.wasSuccessful = true;
    }

    async function onErrorSubmit(error) {
        formState.hasErrors = true;
        formState.errors = error;
    }

    function clearErrors() {
        formState.errors = {};
    }

    async function onSuccessSubmit() {
        clearErrors();
        formState.processing = false;
        formState.wasSuccessful = true;
        defaultValues = structuredClone(formState.fields);
    }

    async function submit(submitHandler, hooks = {
        onSuccess: () => null,
        onBefore: () => null,
        onError: () => null,
        onFinish: () => null,
    }) {
        if (formState.processing)
            return;

        await onBeforeSubmit();
        await hooks.onBefore();

        try {
            const result = await submitHandler(formState.fields);
            await onSuccessSubmit();
            await hooks.onSuccess(result);

            return result;
        } catch (e) {
            await onErrorSubmit(e);
            await hooks.onError(formState.errors);
        } finally {
            await onAfterSubmit();
            await hooks.onFinish();
        }
    }

    watch(() => formState.fields, (value) => {
        formState.dirty = value !== defaultValues;
    });

    return {
        formState,
        submit,
    };
}