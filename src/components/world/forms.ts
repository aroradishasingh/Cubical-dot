/**
 * The shapes the form can take, in the order the home page walks through
 * them. Sections opt in with `data-form="<index>"`.
 */
export const FORMS = ["logo", "fusion", "orbit", "screens", "cube", "dot"] as const;
export type FormName = (typeof FORMS)[number];
export const formIndex = (name: FormName) => FORMS.indexOf(name);
