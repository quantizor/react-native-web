/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Platform from '../../../exports/Platform';
import FlatList from './components/AnimatedFlatList';
import Image from './components/AnimatedImage';
import ScrollView from './components/AnimatedScrollView';
import SectionList from './components/AnimatedSectionList';
import Text from './components/AnimatedText';
import View from './components/AnimatedView';

import AnimatedMock from './AnimatedMock';
import AnimatedImplementation from './AnimatedImplementation';

const Animated = (
  Platform.isTesting ? AnimatedMock : AnimatedImplementation
) as typeof AnimatedMock;

export default {
  FlatList,
  Image,
  ScrollView,
  SectionList,
  Text,
  View,
  ...Animated
};
