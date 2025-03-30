/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import invariant from '../../../modules/invariant';
import * as React from 'react';

/**
 * `setState` is called asynchronously, and should not rely on the value of
 * `this.props` or `this.state`:
 * https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
 *
 * SafePureComponent adds runtime enforcement, to catch cases where these
 * variables are read in a state updater function, instead of the ones passed
 * in.
 */
export default class StateSafePureComponent<
  Props,
  State,
  Context
> extends React.PureComponent<Props, State> {
  _inAsyncStateUpdate = false;
  declare context: Context;

  constructor(props: Props) {
    super(props);
    this._installSetStateHooks();
  }

  setState<K extends keyof State>(
    state: State | ((prevState: Readonly<State>, props: Readonly<Props>) => State | Pick<State, K> | null) | Pick<State, K> | null,
    callback?: () => void
  ): void {
    if (typeof state === 'function' && !('length' in state)) {
      super.setState((prevState, props) => {
        this._inAsyncStateUpdate = true;
        let ret;
        try {
          ret = (state as (prevState: Readonly<State>, props: Readonly<Props>) => State | Pick<State, K> | null)(prevState, props);
        } catch (err) {
          throw err;
        } finally {
          this._inAsyncStateUpdate = false;
        }
        return ret;
      }, callback);
    } else {
      super.setState(state, callback);
    }
  }

  _installSetStateHooks() {
    const that = this;
    let { props, state } = this;

    Object.defineProperty(this, 'props', {
      get() {
        invariant(
          !that._inAsyncStateUpdate,
          '"this.props" should not be accessed during state updates'
        );
        return props;
      },
      set(newProps: Props) {
        props = newProps;
      }
    });
    Object.defineProperty(this, 'state', {
      get() {
        invariant(
          !that._inAsyncStateUpdate,
          '"this.state" should not be acceessed during state updates'
        );
        return state;
      },
      set(newState: State) {
        state = newState;
      }
    });
  }
}
