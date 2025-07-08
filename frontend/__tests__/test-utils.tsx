import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store';

function ReduxProvider({ children }: { children: React.ReactNode }) {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
}

export function renderWithRedux(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: ReduxProvider, ...options });
}

export * from '@testing-library/react';
