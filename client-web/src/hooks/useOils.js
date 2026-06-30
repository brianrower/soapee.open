import _ from 'lodash';
import { useCreation } from 'ahooks';

import oilProperties from 'services/oilProperties';

import oilsData from 'data/oils.json';

export default function useOils() {
  const mappedOils = useCreation(
    () => _.map(oilsData, oilProperties),
    []
  );

  return [mappedOils, false];
}
