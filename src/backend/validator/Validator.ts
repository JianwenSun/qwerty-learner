import { isNotEmpty, trim } from "../utils/stringUtils";

export const validate = (value: string, fieldName: string) => {
    const trimmed = trim(value);
    if (!isNotEmpty(trimmed)) {
        throw new Error(`${fieldName}不能为空`);
    }
    return trimmed;
};
