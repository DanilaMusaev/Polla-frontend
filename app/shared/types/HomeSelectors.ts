export interface HomeSelectorsProps {
    icon: string;
    iconFill?: 'primary' | 'secondary';
    title: string;
    text: string;
    handler: (args?: any) => void;
}