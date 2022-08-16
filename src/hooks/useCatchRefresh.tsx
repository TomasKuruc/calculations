import React, {useEffect} from 'react';

const useCatchRefresh = (): void => {
    useEffect(() => {
        const beforeUnloadCallback = (event: { preventDefault: () => void; returnValue: string; }) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        const unloadCallback = (event: any) => {
            event.preventDefault();
            event.returnValue = window.location.replace('/');
        }

        window.addEventListener("beforeunload", beforeUnloadCallback);
        window.addEventListener('unload', unloadCallback);
        return () => {
            window.removeEventListener("beforeunload", beforeUnloadCallback);
            window.removeEventListener("unload", unloadCallback);
        }
    }, []);
};

export default useCatchRefresh;