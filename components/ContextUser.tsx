import { ReactElement, Context, useContext } from 'react';

type Props<T> = {
  context: Context<T>;
  children: (value: T) => ReactElement;
};
function ContextUser<T>({ context, children }: Props<T>) {
  return children(useContext(context));
}
export default ContextUser;
