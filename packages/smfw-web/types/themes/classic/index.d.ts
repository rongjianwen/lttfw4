declare const theme: import("@material-ui/core").Theme & {
    header: {
        height: string;
        backgroundColor: string;
        color: string;
    };
    logobar: {
        fontSize: string;
        width: string;
    };
    navbar: {
        color: string;
    };
    navbarPopoverPaper: {
        width: string;
    };
    navMenu: {};
    sidebar: {
        width: string;
        backgroundColor: string;
        color: string;
        backgroundColorHover: string;
        colorHover: string;
    };
    extrabar: {
        color: string;
    };
    extrabarMenu: {};
    extrabarPopoverPaper: {
        width: string;
    };
    workspace: {
        backgroundColor: string;
        color: string;
    };
    footer: {
        backgroundColor: string;
        color: string;
        fontSize: string;
    };
    copyrightText: {
        fontSize: string;
        color: string;
    };
    globals: {
        padding: string;
        fontFamily: string;
        primaryBackgroundColor: string;
        secondaryBackgroundColor: string;
    };
};
export default theme;
