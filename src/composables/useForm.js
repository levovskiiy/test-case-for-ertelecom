import { reactive, watch } from 'vue';

export function useForm(initialValues) {
    let defaultValues = initialValues;

    const formState = reactive({
        fields: defaultValues,
        errors: {},
        dirty: false,
        hasErrors: false,
        processing: false,
        wasSuccessful: false,
    });

    function onBeforeSubmit() {
        formState.processing = true;
        formState.wasSuccessful = false;
    }

    function onAfterSubmit() {
        formState.processing = false;
        formState.wasSuccessful = true;
    }

    function onErrorSubmit(error) {
        formState.hasErrors = true;
        formState.errors = error;
    }

    function clearErrors() {
        formState.errors = {};
    }

    function onSuccessSubmit() {
        clearErrors();
        formState.processing = false;
        formState.wasSuccessful = true;
    }

    async function submit(submitHandler, hooks = {
        onSuccess: () => null,
        onBefore: () => null,
        onError: () => null,
        onFinish: () => null,
    }) {
        if (formState.processing)
            return;

        onBeforeSubmit();
        await hooks.onBefore();

        try {
            const result = await submitHandler(formState.fields);
            onSuccessSubmit();
            await hooks.onSuccess(result);

            return result;
        } catch (e) {
            onErrorSubmit(e);
            await hooks.onError(formState.errors);
        } finally {
            onAfterSubmit();
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