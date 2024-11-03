import { AxiosError } from 'axios';
import {RequestError} from "../lib/RequestError";

export type FallbackProps = {
    error: RequestError;
    resetErrorBoundary: () => void;
};
