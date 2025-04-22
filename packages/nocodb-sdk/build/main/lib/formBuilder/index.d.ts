export declare enum FormBuilderInputType {
    Input = "input",
    Select = "select",
    Switch = "switch",
    Space = "space",
    Password = "password",
    SelectIntegration = "integration",
    SelectBase = "select-base",
    OAuth = "oauth"
}
export interface FormBuilderElement {
    type: FormBuilderInputType;
    model?: string;
    defaultValue?: string;
    label?: string;
    placeholder?: string;
    width?: number;
    category?: string;
    options?: {
        value: string;
        label: string;
    }[];
    selectMode?: 'single' | 'multiple' | 'multipleWithInput';
    integrationFilter?: {
        type?: string;
        sub_type?: string;
    };
    oauthMeta?: {
        provider: string;
        authUri: string;
        redirectUri: string;
        clientId: string;
        codeKey?: string;
        scopes?: string[];
    };
    condition?: {
        model: string;
        value: string;
    };
    border?: boolean;
    showHintAsTooltip?: boolean;
    validators?: {
        type: 'required';
        message?: string;
    }[];
}
export type FormDefinition = FormBuilderElement[];
export declare const FORM_BUILDER_NON_CATEGORIZED = "form-builder-non-categorized";
