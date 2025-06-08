import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import classNames from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  alphabetically = 'Sort alphabetically',
  byLength = 'Sort by length',
  none = '',
}

interface Props {
  sortField: `${SortType}`;
  isReversed: boolean;
}

function getPreparedGoods(goods: string[], { sortField, isReversed }: Props) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);

        case SortType.byLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<`${SortType}`>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const resetGoods = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
          onClick={() => setSortField(SortType.alphabetically)}
        >
          {SortType.alphabetically}
        </button>

        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.byLength,
          })}
          onClick={() => setSortField(SortType.byLength)}
        >
          {SortType.byLength}
        </button>

        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
