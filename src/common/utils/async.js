export function getPromiseProxy() {
    const proxy = {};

    proxy.promise = new Promise((resolve, reject) => {
        proxy.resolve = resolve;
        proxy.reject = reject;
    });

    return proxy;
}