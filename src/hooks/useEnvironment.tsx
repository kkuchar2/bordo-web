import {useEffect, useState} from "react";
import {missingEnvVars} from "../api/config";

export const useEnvironment = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(missingEnvVars.length === 0);
    }, []);

    return loaded;
}
