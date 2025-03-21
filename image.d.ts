declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpg' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: string;
    export default value;
  }
  
  declare module '*.svg' {
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const content: string;
    export { ReactComponent, content };
    export default content;
  }
  
  declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
  
  // Add declarations for other image/asset types as needed