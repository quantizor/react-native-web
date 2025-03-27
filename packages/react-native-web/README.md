THIS IS A FORK. It will differ from `react-native-web` in some ways because I am incorporating various community PRs that have been sitting for some time.

```shell
# to install, simply alias your existing setup to the fork
npm install react-native-web@npm:react-native-web-fork
```

Merged changes:

- [x] Add Image.resolveAssetSource (https://github.com/necolas/react-native-web/pull/2728)
- [x] fix: support for react 19 and next15 (https://github.com/necolas/react-native-web/pull/2731)
- [x] refactor(deps): removing fbjs dependency by creating a local module for invariant and warning (https://github.com/necolas/react-native-web/pull/2727)
- [x] Add ...children rest parameter to unstable_createElement (https://github.com/necolas/react-native-web/pull/2761)
- [x] inline-style-prefixer version bump (https://github.com/necolas/react-native-web/pull/2764)
- [x] [ImageLoader] Simplify getSize implementation, call failure callback when decoding fails (https://github.com/necolas/react-native-web/pull/2750)

# React Native for Web

[![npm version][package-badge]][package-url][![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

"React Native for Web" makes it possible to run [React Native][react-native-url] components and APIs on the web using React DOM.

## Documentation

The [documentation site](https://necolas.github.io/react-native-web/) ([source](https://github.com/necolas/react-native-web/blob/master/packages/react-native-web-docs)) covers installation, guides, and APIs.

## Example

The [examples app](https://p9t5cp.sse.codesandbox.io/) ([source](https://github.com/necolas/react-native-web/blob/master/packages/react-native-web-examples)) demonstrates many available features. Fork the [codesandbox](https://codesandbox.io/s/github/necolas/react-native-web/tree/master/packages/react-native-web-examples) to make changes and see the results.

You'll notice that there is no reference to `react-dom` in components. The `App` component that is shown below is defined using the APIs and Components of React Native, but it can also be rendered on the web using React Native for Web.

```js
// Example component
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

class App extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.text}>Hello, world!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: { padding: 10 },
  text: { fontWeight: 'bold' }
});

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('react-root')
});
```

## Contributing

Development happens in the open on GitHub and we are grateful for contributions including bugfixes, improvements, and ideas. Read below to learn how you can take part in improving React Native for Web.

### Code of conduct

This project expects all participants to adhere to Meta's OSS [Code of Conduct][code-of-conduct]. Please read the full text so that you can understand what actions will and will not be tolerated.

### Contributing guide

Read the [contributing guide][contributing-url] to learn about the development process, how to propose bugfixes and improvements, and how to build and test your changes to React Native for Web.

### Good first issues

To help you get you familiar with the contribution process, there is a list of [good first issues][good-first-issue-url] that contain bugs which have a relatively limited scope. This is a great place to get started.

## License

React Native for Web is [MIT licensed](./LICENSE). By contributing to React Native for Web, you agree that your contributions will be licensed under its MIT license.

[package-badge]: https://img.shields.io/npm/v/react-native-web-fork.svg?style=flat
[package-url]: https://www.npmjs.com/package/react-native-web-fork
[react-native-url]: https://reactnative.dev/
[contributing-url]: https://github.com/quantizor/react-native-web-fork/blob/master/.github/CONTRIBUTING.md
