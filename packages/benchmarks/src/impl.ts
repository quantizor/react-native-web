import { type ComponentType } from 'react';
import packageJson from '../package.json';

const context = require.context('./implementations/', true, /index\.js$/);
const { dependencies } = packageJson;

type RequireContext = ReturnType<typeof require.context>;

export type ComponentsType = {
  Box: ComponentType<any>;
  Dot: ComponentType<any>;
  Provider: ComponentType<any>;
  View: ComponentType<any>;
};

type ImplementationType = {
  components: ComponentsType;
  name: string;
  version: string;
};

const toImplementations = <T extends RequireContext>(
  context: T
): Array<ImplementationType> =>
  Object.keys(context).map((path) => {
    const components = context(path).default;
    const name = path.split('/')[1];
    const version = dependencies[name] || '';
    return { components, name, version };
  });

const toObject = (
  impls: Array<ImplementationType>
): Record<string, ImplementationType> =>
  impls.reduce((acc, impl) => {
    acc[impl.name] = impl;
    return acc;
  }, {});

const map = toObject(toImplementations(context));

export default map;
