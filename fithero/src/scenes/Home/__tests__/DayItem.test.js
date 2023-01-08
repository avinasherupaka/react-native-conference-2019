/* @flow */

import * as React from 'react';
import { fireEvent, render } from 'react-native-testing-library';
import mockMoment from 'moment';

import DayItem from '../DayItem';
import theme from '../../../utils/theme';
import { isAfter } from '../../../utils/date';

jest.mock('../../../utils/date', () => ({
  getShortDayInfo: jest.fn(() => ({
    date: mockMoment('2019-05-02T00:00:00.000Z').get('date'),
    day: '2019-05-02T00:00:00.000Z',
  })),
  isAfter: jest.fn(() => false),
}));

describe('DayItem', () => {
  const _getRender = props => {
    return render(
      <DayItem
        dateString="2019-05-02T00:00:00.000Z"
        onDaySelected={jest.fn()}
        isSelected={false}
        isWorkout={false}
        theme={theme}
        {...props}
      />
    );
  };

  it('renders a past day', () => {
    const { getByTestId } = _getRender();
    const elem = getByTestId('day-text-container');
    expect(elem.props.style).toEqual([
      { alignItems: 'center', opacity: 0.5 },
      false,
      false,
    ]);
  });

  it('renders a future day', () => {
    // $FlowFixMe
    isAfter.mockImplementation(() => true);
    const { getByTestId } = _getRender({
      dateString: '2019-05-04T00:00:00.000Z',
    });
    const elem = getByTestId('day-text-container');
    expect(elem.props.style).toContainEqual({ opacity: 0.15 });
  });

  it('renders a selected day', () => {
    const { getByTestId } = _getRender({ isSelected: true });
    const elem = getByTestId('day-text-container');
    expect(elem.props.style).toContainEqual({ opacity: 1 });
  });

  it('calls onDaySelected', () => {
    const onDaySelected = jest.fn();
    const { getByTestId } = _getRender({ onDaySelected });
    const touchable = getByTestId('day-touchable');
    fireEvent(touchable, 'onPress');

    expect(onDaySelected).toHaveBeenCalled();
  });

  it('renders without a  dot if there is no workout', () => {
    const { queryByTestId } = _getRender();
    expect(queryByTestId('day-dot')).toBeNull();
  });

  it('renders a dot if there is a workout', () => {
    const { queryByTestId } = _getRender({
      isWorkout: true,
    });
    expect(queryByTestId('day-dot')).toBeDefined();
  });
});
